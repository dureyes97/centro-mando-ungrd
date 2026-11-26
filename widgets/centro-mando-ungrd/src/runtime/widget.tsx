import { React, type AllWidgetProps, css } from 'jimu-core'
import { JimuMapViewComponent, type JimuMapView } from 'jimu-arcgis'
import { Select, Option, Switch, Loading, LoadingType, TextInput } from 'jimu-ui'
import FeatureFilter from 'esri/layers/support/FeatureFilter'
import FeatureEffect from 'esri/layers/support/FeatureEffect'
import * as reactiveUtils from 'esri/core/reactiveUtils'
import type { IMConfig } from '../config'
import { SECTORS, SEVERITIES, classify, norm, type SevKey, type SectorDef } from '../sectors'
import defaultMessages from './translations/default'

const { useState, useEffect, useMemo, useRef } = React

// ---------- tipos ----------
interface Fields { nivel?: string, dpto?: string, mpio?: string, tipo?: string, inst?: string, entidad?: string }
interface SectorRT {
  def: SectorDef
  layer: __esri.FeatureLayer
  oid: string
  f: Fields
  sevValues: Record<SevKey, string[]>
}
type SevCounts = Record<SevKey, number>
interface Stats {
  sev: { [sector: string]: SevCounts }
  byDpto: { [sector: string]: { [dpto: string]: number } }
  byMpio: { [key: string]: { dpto: string, mpio: string, bySector: { [sector: string]: number }, total: number } }
}
interface CritItem { sector: string, oid: number, name: string, mpio: string, dpto: string, nivel: string }
type Tab = 'panorama' | 'territorio' | 'criticos'

// ---------- utilidades ----------
const nf = new Intl.NumberFormat('es-CO')
const fmt = (n: number) => nf.format(Math.round(n || 0))
const sql = (v: string) => `'${String(v).replace(/'/g, "''")}'`
const emptySev = (): SevCounts => ({ critico: 0, alto: 0, menor: 0, otro: 0 })
const sevDef = (k: SevKey) => SEVERITIES.find(s => s.key === k)
const COUNT = (field: string) => [{ statisticType: 'count', onStatisticField: field, outStatisticFieldName: 'n' }] as any

const Icon = ({ d, color, size = 16 }: { d: string, color: string, size?: number }) => (
  <svg viewBox='0 0 24 24' width={size} height={size} aria-hidden='true' style={{ flex: 'none' }}><path d={d} fill={color} /></svg>
)

/** Arco SVG desde el ángulo a0 hasta a1 (grados, 0 = izquierda, 180 = derecha) sobre un semicírculo */
const arcPath = (cx: number, cy: number, r: number, a0: number, a1: number) => {
  const p = (a: number) => [cx - r * Math.cos((a * Math.PI) / 180), cy - r * Math.sin((a * Math.PI) / 180)]
  const [x0, y0] = p(a0)
  const [x1, y1] = p(a1)
  return `M ${x0} ${y0} A ${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1}`
}

export default function Widget (props: AllWidgetProps<IMConfig>) {
  const { config, useMapWidgetIds } = props
  const effectMode = config?.effectMode || 'dim'
  const topCount = config?.topCount || 12

  const [jimuMapView, setJimuMapView] = useState<JimuMapView>(null)
  const [sectors, setSectors] = useState<SectorRT[]>([])
  const [active, setActive] = useState<string[]>([])
  const [dpto, setDpto] = useState('')
  const [mpio, setMpio] = useState('')
  const [search, setSearch] = useState('')
  const [searchReset, setSearchReset] = useState(0)
  const [sevSel, setSevSel] = useState<SevKey[]>([])
  const [byExtent, setByExtent] = useState(!!config?.extentDefault)
  const [extent, setExtent] = useState<__esri.Extent>(null)
  const [tab, setTab] = useState<Tab>('panorama')
  const [dptoList, setDptoList] = useState<string[]>([])
  const [mpioList, setMpioList] = useState<string[]>([])
  const [stats, setStats] = useState<Stats>({ sev: {}, byDpto: {}, byMpio: {} })
  const [crit, setCrit] = useState<CritItem[]>([])
  const [critSector, setCritSector] = useState('')
  const [selected, setSelected] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const view = jimuMapView?.view as __esri.MapView
  const geometry = byExtent && extent ? extent : null
  const activeSectors = useMemo(() => sectors.filter(s => active.includes(s.def.key)), [sectors, active])
  const originals = useRef(new Map<__esri.FeatureLayer, { visible: boolean }>())

  // ---------- descubrir las capas de cada sector en el web map ----------
  useEffect(() => {
    if (!view) return
    let canceled = false
    ;(async () => {
      await view.when()
      const layers = view.map.allLayers.toArray().filter((l: any) => l.type === 'feature') as __esri.FeatureLayer[]
      const found: SectorRT[] = []
      for (const def of SECTORS) {
        const layer = layers.find(l => def.keywords.some(k => norm(l.title).includes(k) || norm((l as any).url).includes(k)))
        if (!layer) continue
        await layer.load()
        const up: { [k: string]: string } = {}
        layer.fields.forEach(fd => { up[fd.name.toUpperCase()] = fd.name })
        const f: Fields = { nivel: up.NIVEL_AFEC, dpto: up.NOM_DPTO, mpio: up.NOM_MPIO, tipo: up.TIPO_INFRA, inst: up.NOM_INST, entidad: up.ENTIDAD }
        const sevValues: Record<SevKey, string[]> = { critico: [], alto: [], menor: [], otro: [] }
        if (f.nivel) {
          const fs = await layer.queryFeatures({ where: '1=1', groupByFieldsForStatistics: [f.nivel], outStatistics: COUNT(layer.objectIdField) } as any)
          fs.features.forEach(g => {
            const v = g.attributes[f.nivel]
            if (v !== null && v !== undefined && v !== '') sevValues[classify(v)].push(v)
          })
        }
        found.push({ def, layer, oid: layer.objectIdField, f, sevValues })
      }
      if (canceled) return
      if (found.length === 0) setError(defaultMessages.noLayers)
      setSectors(found)
      setActive(found.map(s => s.def.key))

      // lista de departamentos (unión de todas las capas)
      const all = new Set<string>()
      await Promise.all(found.filter(s => s.f.dpto).map(async s => {
        const fs = await s.layer.queryFeatures({ where: '1=1', groupByFieldsForStatistics: [s.f.dpto], outStatistics: COUNT(s.oid) } as any)
        fs.features.forEach(g => { const v = g.attributes[s.f.dpto]; if (v) all.add(v) })
      }))
      if (!canceled) setDptoList([...all].sort((a, b) => a.localeCompare(b, 'es')))
    })().catch(err => { if (!canceled) setError(err?.message || String(err)) })
    return () => { canceled = true }
  }, [view])

  // municipios del departamento elegido
  useEffect(() => {
    if (!dpto) { setMpioList([]); return }
    let canceled = false
    const all = new Set<string>()
    Promise.all(sectors.filter(s => s.f.dpto && s.f.mpio).map(async s => {
      const fs = await s.layer.queryFeatures({ where: `${s.f.dpto} = ${sql(dpto)}`, groupByFieldsForStatistics: [s.f.mpio], outStatistics: COUNT(s.oid) } as any)
      fs.features.forEach(g => { const v = g.attributes[s.f.mpio]; if (v) all.add(v) })
    })).then(() => { if (!canceled) setMpioList([...all].sort((a, b) => a.localeCompare(b, 'es'))) })
      .catch(() => { if (!canceled) setMpioList([]) })
    return () => { canceled = true }
  }, [dpto, sectors])

  // ---------- construcción de filtros ----------
  const whereFor = (s: SectorRT, withSev = true) => {
    const parts: string[] = []
    if (dpto && s.f.dpto) parts.push(`${s.f.dpto} = ${sql(dpto)}`)
    if (mpio && s.f.mpio) parts.push(`${s.f.mpio} = ${sql(mpio)}`)
    if (search) {
      const cols = [s.f.tipo, s.f.inst, s.f.entidad].filter(Boolean)
      if (cols.length) parts.push(`(${cols.map(c => `UPPER(${c}) LIKE ${sql(`%${search.toUpperCase()}%`)}`).join(' OR ')})`)
    }
    if (withSev && sevSel.length && s.f.nivel) {
      const ors: string[] = []
      sevSel.forEach(k => {
        if (s.sevValues[k].length) ors.push(`${s.f.nivel} IN (${s.sevValues[k].map(sql).join(',')})`)
        if (k === 'otro') ors.push(`${s.f.nivel} IS NULL`)
      })
      parts.push(ors.length ? `(${ors.join(' OR ')})` : '1=0')
    }
    return parts.length ? parts.join(' AND ') : '1=1'
  }
  const filterKey = `${dpto}|${mpio}|${search}|${sevSel.join(',')}`

  // ---------- seguir la extensión del mapa ----------
  useEffect(() => {
    if (!view || !byExtent) { setExtent(null); return }
    const h = reactiveUtils.when(() => view.stationary, () => { setExtent(view.extent?.clone()) }, { initial: true })
    return () => { h.remove() }
  }, [view, byExtent])

  // ---------- estadísticas ----------
  useEffect(() => {
    if (!activeSectors.length) { setStats({ sev: {}, byDpto: {}, byMpio: {} }); return }
    let canceled = false
    setLoading(true)
    setError('')
    const next: Stats = { sev: {}, byDpto: {}, byMpio: {} }
    Promise.all(activeSectors.map(async s => {
      const key = s.def.key
      const base = { geometry, spatialRelationship: 'intersects', outStatistics: COUNT(s.oid) }
      const [qSev, qDpto, qMpio] = await Promise.all([
        s.f.nivel ? s.layer.queryFeatures({ ...base, where: whereFor(s, false), groupByFieldsForStatistics: [s.f.nivel] } as any) : null,
        s.f.dpto ? s.layer.queryFeatures({ ...base, where: whereFor(s), groupByFieldsForStatistics: [s.f.dpto] } as any) : null,
        s.f.dpto && s.f.mpio ? s.layer.queryFeatures({ ...base, where: whereFor(s), groupByFieldsForStatistics: [s.f.dpto, s.f.mpio] } as any) : null
      ])
      const sev = emptySev()
      if (qSev) qSev.features.forEach(g => { sev[classify(g.attributes[s.f.nivel])] += g.attributes.n })
      else {
        const t = await s.layer.queryFeatureCount({ where: whereFor(s, false), geometry } as any)
        sev.otro = t
      }
      next.sev[key] = sev
      next.byDpto[key] = {}
      qDpto?.features.forEach(g => { next.byDpto[key][g.attributes[s.f.dpto] || 'Sin dato'] = g.attributes.n })
      qMpio?.features.forEach(g => {
        const d = g.attributes[s.f.dpto] || 'Sin dato'
        const m = g.attributes[s.f.mpio] || 'Sin dato'
        const k = `${d}|${m}`
        if (!next.byMpio[k]) next.byMpio[k] = { dpto: d, mpio: m, bySector: {}, total: 0 }
        next.byMpio[k].bySector[key] = (next.byMpio[k].bySector[key] || 0) + g.attributes.n
        next.byMpio[k].total += g.attributes.n
      })
    })).then(() => { if (!canceled) setStats(next) })
      .catch(err => { if (!canceled) setError(err?.message || String(err)) })
      .finally(() => { if (!canceled) setLoading(false) })
    return () => { canceled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSectors, filterKey, geometry])

  // ---------- infraestructura crítica ----------
  useEffect(() => {
    if (tab !== 'criticos') return
    let canceled = false
    Promise.all(activeSectors.filter(s => s.f.nivel && s.sevValues.critico.length).map(async s => {
      const fields = [s.oid, s.f.inst, s.f.tipo, s.f.mpio, s.f.dpto, s.f.nivel].filter(Boolean)
      const fs = await s.layer.queryFeatures({
        where: `${whereFor(s, false)} AND ${s.f.nivel} IN (${s.sevValues.critico.map(sql).join(',')})`,
        geometry, spatialRelationship: 'intersects', outFields: fields, returnGeometry: false, num: 300,
        orderByFields: [s.f.dpto, s.f.mpio].filter(Boolean)
      } as any)
      return fs.features.map(g => ({
        sector: s.def.key,
        oid: g.attributes[s.oid],
        name: (s.f.inst && g.attributes[s.f.inst]) || (s.f.tipo && g.attributes[s.f.tipo]) || 'Sin nombre',
        mpio: g.attributes[s.f.mpio] || '',
        dpto: g.attributes[s.f.dpto] || '',
        nivel: g.attributes[s.f.nivel] || ''
      }))
    })).then(lists => { if (!canceled) setCrit(lists.flat()) })
      .catch(() => { if (!canceled) setCrit([]) })
    return () => { canceled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, activeSectors, filterKey, geometry])

  // ---------- aplicar al mapa: visibilidad por sector + filtro/atenuación ----------
  useEffect(() => {
    if (!view) return
    sectors.forEach(s => {
      const layer = s.layer
      if (!originals.current.has(layer)) originals.current.set(layer, { visible: layer.visible })
      const on = active.includes(s.def.key)
      layer.visible = on ? true : false
      const where = whereFor(s)
      const clustered = (layer as any).featureReduction?.type === 'cluster'
      const useHide = effectMode === 'hide' || clustered
      ;(layer as any).featureEffect = (!useHide && where !== '1=1')
        ? new FeatureEffect({ filter: new FeatureFilter({ where }), excludedEffect: 'grayscale(100%) opacity(15%)', includedEffect: 'brightness(115%)' } as any)
        : null
      view.whenLayerView(layer).then((lv: any) => {
        lv.filter = (useHide && where !== '1=1') ? new FeatureFilter({ where }) : null
      }).catch(() => {})
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, sectors, active, filterKey, effectMode])

  // restaurar el mapa al desmontar
  useEffect(() => {
    const map = originals.current
    return () => {
      map.forEach((o, layer) => {
        if (layer.destroyed) return
        layer.visible = o.visible
        ;(layer as any).featureEffect = null
        if (view && !view.destroyed) view.whenLayerView(layer).then((lv: any) => { lv.filter = null }).catch(() => {})
      })
      map.clear()
    }
  }, [view])

  // ---------- navegación ----------
  const zoomTo = async (whereOf: (s: SectorRT) => string, list = activeSectors) => {
    if (!view) return
    let ext: __esri.Extent = null
    for (const s of list) {
      try {
        const r: any = await s.layer.queryExtent({ where: whereOf(s), outSpatialReference: view.spatialReference } as any)
        if (r?.count && r.extent) ext = ext ? ext.union(r.extent) : r.extent
      } catch { /* capa sin el campo */ }
    }
    if (!ext) return
    await view.goTo(ext.width === 0 && ext.height === 0 ? { target: ext.center, zoom: 13 } : ext.clone().expand(1.4)).catch(() => {})
  }
  const dptoWhere = (d: string) => (s: SectorRT) => s.f.dpto ? `${s.f.dpto} = ${sql(d)}` : '1=0'
  const mpioWhere = (d: string, m: string) => (s: SectorRT) => s.f.dpto && s.f.mpio ? `${s.f.dpto} = ${sql(d)} AND ${s.f.mpio} = ${sql(m)}` : '1=0'

  const chooseDpto = (d: string) => { setDpto(d); setMpio(''); if (d) zoomTo(dptoWhere(d)) }
  const chooseMpio = (d: string, m: string) => { setDpto(d); setMpio(m); if (m) zoomTo(mpioWhere(d, m)) }

  const openFeature = async (item: CritItem) => {
    setSelected(`${item.sector}-${item.oid}`)
    const s = sectors.find(x => x.def.key === item.sector)
    if (!view || !s) return
    const fs = await s.layer.queryFeatures({ objectIds: [item.oid], outFields: ['*'], returnGeometry: true, outSpatialReference: view.spatialReference } as any)
    const f = fs.features[0]
    if (!f?.geometry) return
    f.layer = s.layer
    await view.goTo({ target: f.geometry, zoom: Math.max(view.zoom, 14) }).catch(() => {})
    view.openPopup({ features: [f], location: f.geometry as any })
  }

  const toggleSector = (key: string, solo: boolean) => {
    if (solo) { setActive(active.length === 1 && active[0] === key ? sectors.map(s => s.def.key) : [key]); return }
    setActive(active.includes(key) ? active.filter(k => k !== key) : [...active, key])
  }
  const toggleSev = (k: SevKey) => { setSevSel(sevSel.includes(k) ? sevSel.filter(x => x !== k) : [...sevSel, k]) }
  const clearAll = () => {
    setDpto(''); setMpio(''); setSearch(''); setSearchReset(searchReset + 1); setSevSel([]); setByExtent(false); setSelected('')
    setActive(sectors.map(s => s.def.key))
  }

  // ---------- derivados ----------
  const filteredCount = (key: string) => {
    const c = stats.sev[key]
    if (!c) return 0
    return (sevSel.length ? sevSel : (Object.keys(c) as SevKey[])).reduce((a, k) => a + (c[k] || 0), 0)
  }
  const sevTotals = useMemo(() => {
    const t = emptySev()
    Object.values(stats.sev).forEach(c => { (Object.keys(t) as SevKey[]).forEach(k => { t[k] += c[k] || 0 }) })
    return t
  }, [stats])
  const total = activeSectors.reduce((a, s) => a + filteredCount(s.def.key), 0)
  const sevAll = sevTotals.critico + sevTotals.alto + sevTotals.menor + sevTotals.otro
  const ratedAll = sevTotals.critico + sevTotals.alto + sevTotals.menor
  const indice = ratedAll ? Math.round((100 * (3 * sevTotals.critico + 2 * sevTotals.alto + sevTotals.menor)) / (3 * ratedAll)) : 0
  const indiceColor = indice >= 66 ? '#e0313f' : indice >= 40 ? '#f46d43' : '#fee08b'

  const matrixRows = useMemo(() => {
    const rows: { [d: string]: { [s: string]: number } } = {}
    Object.entries(stats.byDpto).forEach(([sk, m]) => Object.entries(m).forEach(([d, n]) => { rows[d] = rows[d] || {}; rows[d][sk] = n }))
    return Object.entries(rows)
      .map(([d, v]) => ({ dpto: d, v, total: Object.values(v).reduce((a, b) => a + b, 0) }))
      .sort((a, b) => b.total - a.total)
  }, [stats])
  const colMax = useMemo(() => {
    const mx: { [s: string]: number } = {}
    matrixRows.forEach(r => Object.entries(r.v).forEach(([s, n]) => { mx[s] = Math.max(mx[s] || 0, n) }))
    return mx
  }, [matrixRows])
  const ranking = useMemo(() => Object.values(stats.byMpio).sort((a, b) => b.total - a.total).slice(0, topCount), [stats, topCount])
  const nMpios = Object.keys(stats.byMpio).length

  const exportCsv = () => {
    const cols = activeSectors.map(s => s.def.label)
    const lines = [['Departamento', ...cols, 'Total'].join(';')]
    matrixRows.forEach(r => lines.push([r.dpto, ...activeSectors.map(s => r.v[s.def.key] || 0), r.total].join(';')))
    const blob = new Blob(['﻿' + lines.join('\n')], { type: 'text/csv;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `afectaciones_por_departamento${dpto ? '_' + dpto : ''}.csv`
    a.click()
    setTimeout(() => { URL.revokeObjectURL(a.href) }, 1000)
  }

  const pills: { label: string, clear: () => void }[] = []
  if (dpto) pills.push({ label: dpto, clear: () => { setDpto(''); setMpio('') } })
  if (mpio) pills.push({ label: mpio, clear: () => { setMpio('') } })
  if (search) pills.push({ label: `“${search}”`, clear: () => { setSearch(''); setSearchReset(searchReset + 1) } })
  sevSel.forEach(k => pills.push({ label: sevDef(k).label, clear: () => { toggleSev(k) } }))
  if (byExtent) pills.push({ label: 'Vista del mapa', clear: () => { setByExtent(false) } })
  if (active.length && active.length < sectors.length) pills.push({ label: `${active.length}/${sectors.length} sectores`, clear: () => { setActive(sectors.map(s => s.def.key)) } })

  const critShown = crit.filter(c => !critSector || c.sector === critSector)

  // ---------- render ----------
  return (
    <div className='jimu-widget widget-centro-mando-ungrd' css={style}>
      {useMapWidgetIds?.[0] && (
        <JimuMapViewComponent useMapWidgetId={useMapWidgetIds[0]} onActiveViewChange={(jmv: JimuMapView) => { setJimuMapView(jmv) }} />
      )}

      <header className='cm-head'>
        <div className='cm-title-row'>
          <div>
            <h2 className='cm-title'>{config?.title || defaultMessages.titleDefault}</h2>
            <p className='cm-sub'>{config?.subtitle || defaultMessages.subtitleDefault}</p>
          </div>
          <span className='cm-live'><i />EN VIVO</span>
        </div>
        <div className='cm-kpis'>
          <div><b>{fmt(total)}</b><span>registros</span></div>
          <div><b>{fmt(nMpios)}</b><span>municipios</span></div>
          <div><b>{fmt(matrixRows.length)}</b><span>departamentos</span></div>
          <div><b style={{ color: '#e0313f' }}>{fmt(sevTotals.critico)}</b><span>críticos</span></div>
        </div>
      </header>

      {!useMapWidgetIds?.[0] && <div className='cm-note'>{defaultMessages.noMap}</div>}

      <section className='cm-filters'>
        <div className='cm-row2'>
          <Select size='sm' value={dpto} onChange={(e) => { chooseDpto(e.target.value) }} aria-label='Departamento'>
            <Option value=''>Todos los departamentos</Option>
            {dptoList.map(d => <Option key={d} value={d}>{d}</Option>)}
          </Select>
          <Select size='sm' value={mpio} disabled={!dpto} onChange={(e) => { chooseMpio(dpto, e.target.value) }} aria-label='Municipio'>
            <Option value=''>{dpto ? 'Todos los municipios' : 'Elija un departamento'}</Option>
            {mpioList.map(m => <Option key={m} value={m}>{m}</Option>)}
          </Select>
        </div>
        <TextInput
          size='sm' allowClear placeholder='Buscar infraestructura, institución o entidad…'
          key={searchReset} defaultValue={search}
          onChange={(e) => { if (!e.target.value) setSearch('') }}
          onAcceptValue={(v: string) => { setSearch((v || '').trim()) }}
        />
        <div className='cm-switch-row'>
          {view && <label><Switch checked={byExtent} onChange={(e) => { setByExtent(e.target.checked) }} /> Solo la vista del mapa</label>}
          {pills.length > 0 && <button type='button' className='cm-link' onClick={clearAll}>Limpiar todo</button>}
        </div>
        {pills.length > 0 && (
          <div className='cm-pills'>
            {pills.map(p => <button key={p.label} type='button' className='cm-pill' onClick={p.clear} title='Quitar filtro'>{p.label} <span aria-hidden='true'>×</span></button>)}
          </div>
        )}
      </section>

      <div className='cm-loading'>{loading && <Loading type={LoadingType.Bar} />}</div>
      {error && <div className='cm-error'>{error}</div>}

      <nav className='cm-tabs' role='tablist'>
        {([['panorama', 'Panorama'], ['territorio', 'Territorio'], ['criticos', `Críticos (${fmt(sevTotals.critico)})`]] as [Tab, string][]).map(([k, l]) => (
          <button key={k} type='button' role='tab' aria-selected={tab === k} className={`cm-tab${tab === k ? ' on' : ''}`} onClick={() => { setTab(k) }}>{l}</button>
        ))}
      </nav>

      <div className='cm-body'>
        {tab === 'panorama' && (
          <>
            <section className='cm-gauge-wrap'>
              <svg viewBox='0 0 200 118' className='cm-gauge' role='img' aria-label={`Índice de criticidad ${indice} de 100`}>
                <defs>
                  <linearGradient id='cm-grad' x1='0' x2='1'>
                    <stop offset='0%' stopColor='#fee08b' /><stop offset='55%' stopColor='#f46d43' /><stop offset='100%' stopColor='#e0313f' />
                  </linearGradient>
                </defs>
                <path d={arcPath(100, 100, 80, 0, 180)} stroke='rgba(148,163,184,.18)' strokeWidth='16' fill='none' strokeLinecap='round' />
                {indice > 0 && <path d={arcPath(100, 100, 80, 0, Math.max(1, indice * 1.8))} stroke='url(#cm-grad)' strokeWidth='16' fill='none' strokeLinecap='round' />}
                <text x='100' y='88' textAnchor='middle' className='cm-gauge-val' fill={indiceColor}>{indice}</text>
                <text x='100' y='108' textAnchor='middle' className='cm-gauge-lbl'>ÍNDICE DE CRITICIDAD</text>
              </svg>
              <div className='cm-sevlist'>
                {SEVERITIES.map(sv => (
                  <button key={sv.key} type='button' className={`cm-sev${sevSel.includes(sv.key) ? ' on' : ''}`} onClick={() => { toggleSev(sv.key) }} aria-pressed={sevSel.includes(sv.key)}>
                    <i style={{ background: sv.color }} />
                    <span>{sv.label}</span>
                    <b>{fmt(sevTotals[sv.key])}</b>
                    <em>{sevAll ? Math.round((100 * sevTotals[sv.key]) / sevAll) : 0}%</em>
                  </button>
                ))}
              </div>
            </section>
            <p className='cm-hint'>El índice pondera Crítico ×3, Alto ×2 y Menor ×1 (0 = todo menor, 100 = todo crítico). Toque un nivel para filtrar.</p>

            <h3 className='cm-h3'>Sectores <span>clic: mostrar/ocultar · doble clic: solo este</span></h3>
            <div className='cm-sectors'>
              {sectors.map(s => {
                const key = s.def.key
                const on = active.includes(key)
                const c = stats.sev[key] || emptySev()
                const t = c.critico + c.alto + c.menor + c.otro
                return (
                  <button
                    key={key} type='button' className={`cm-sector${on ? '' : ' off'}`} style={{ '--sc': s.def.color } as any}
                    onClick={(e) => { if (e.detail === 1) toggleSector(key, false) }}
                    onDoubleClick={() => { toggleSector(key, true) }}
                    aria-pressed={on}
                  >
                    <div className='cm-sector-top'><Icon d={s.def.icon} color={s.def.color} /><span>{s.def.label}</span></div>
                    <div className='cm-sector-val'>{on ? fmt(filteredCount(key)) : '—'}</div>
                    <div className='cm-sector-bar'>
                      {on && t > 0 && SEVERITIES.map(sv => c[sv.key] ? <span key={sv.key} style={{ width: `${(100 * c[sv.key]) / t}%`, background: sv.color }} /> : null)}
                    </div>
                    <div className='cm-sector-foot'>{on && t ? `${Math.round((100 * c.critico) / t)}% crítico` : on ? 'sin registros' : 'oculto'}</div>
                  </button>
                )
              })}
            </div>
          </>
        )}

        {tab === 'territorio' && (
          <>
            <h3 className='cm-h3'>Matriz departamento × sector <button type='button' className='cm-link' onClick={exportCsv}>Descargar CSV</button></h3>
            {matrixRows.length === 0
              ? <div className='cm-note'>Sin registros para los filtros actuales.</div>
              : (
                <div className='cm-matrix-wrap'>
                  <table className='cm-matrix'>
                    <thead>
                      <tr>
                        <th />
                        {activeSectors.map(s => <th key={s.def.key} title={s.def.label}><Icon d={s.def.icon} color={s.def.color} size={14} /></th>)}
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {matrixRows.map(r => (
                        <tr key={r.dpto} className={dpto === r.dpto ? 'on' : ''}>
                          <th><button type='button' onClick={() => { chooseDpto(dpto === r.dpto ? '' : r.dpto) }}>{r.dpto}</button></th>
                          {activeSectors.map(s => {
                            const n = r.v[s.def.key] || 0
                            const a = n && colMax[s.def.key] ? 0.18 + 0.82 * (n / colMax[s.def.key]) : 0
                            return (
                              <td key={s.def.key}>
                                {n > 0 && (
                                  <button
                                    type='button' title={`${s.def.label} · ${r.dpto}: ${fmt(n)}`}
                                    style={{ background: `color-mix(in srgb, ${s.def.color} ${Math.round(a * 100)}%, transparent)`, color: a > 0.6 ? '#0b1220' : '#e2e8f0' }}
                                    onClick={() => { setActive([s.def.key]); chooseDpto(r.dpto) }}
                                  >{fmt(n)}</button>
                                )}
                              </td>
                            )
                          })}
                          <td className='cm-tot'>{fmt(r.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                )}
            <p className='cm-hint'>Clic en una celda: filtra ese sector y departamento y acerca el mapa.</p>

            <h3 className='cm-h3'>Municipios más afectados</h3>
            <ol className='cm-rank'>
              {ranking.map((r, i) => {
                const k = `${r.dpto}|${r.mpio}`
                return (
                  <li key={k}>
                    <button type='button' className={`cm-rank-item${mpio === r.mpio && dpto === r.dpto ? ' on' : ''}`} onClick={() => { chooseMpio(r.dpto, r.mpio) }}>
                      <span className='cm-rank-pos'>{i + 1}</span>
                      <span className='cm-rank-main'>
                        <span className='cm-rank-name'>{r.mpio}<small>{r.dpto}</small></span>
                        <span className='cm-rank-bar' style={{ width: `${ranking[0]?.total ? (100 * r.total) / ranking[0].total : 0}%` }}>
                          {activeSectors.map(s => r.bySector[s.def.key]
                            ? <span key={s.def.key} title={`${s.def.label}: ${fmt(r.bySector[s.def.key])}`} style={{ flex: r.bySector[s.def.key], background: s.def.color }} />
                            : null)}
                        </span>
                      </span>
                      <b className='cm-rank-val'>{fmt(r.total)}</b>
                    </button>
                  </li>
                )
              })}
            </ol>
          </>
        )}

        {tab === 'criticos' && (
          <>
            <div className='cm-chips'>
              <button type='button' className={`cm-chip${!critSector ? ' on' : ''}`} onClick={() => { setCritSector('') }}>Todos <b>{fmt(crit.length)}</b></button>
              {activeSectors.map(s => {
                const n = crit.filter(c => c.sector === s.def.key).length
                return n
                  ? <button key={s.def.key} type='button' className={`cm-chip${critSector === s.def.key ? ' on' : ''}`} onClick={() => { setCritSector(s.def.key) }}><Icon d={s.def.icon} color={s.def.color} size={12} />{s.def.label} <b>{fmt(n)}</b></button>
                  : null
              })}
            </div>
            {critShown.length === 0
              ? <div className='cm-note'>No hay infraestructura en nivel crítico con los filtros actuales.</div>
              : (
                <ul className='cm-crit'>
                  {critShown.slice(0, 200).map(c => {
                    const s = sectors.find(x => x.def.key === c.sector)
                    const id = `${c.sector}-${c.oid}`
                    return (
                      <li key={id}>
                        <button type='button' className={`cm-crit-item${selected === id ? ' on' : ''}`} style={{ '--sc': s?.def.color } as any} onClick={() => { openFeature(c).catch(err => { console.error(err) }) }}>
                          <Icon d={s?.def.icon} color={s?.def.color} />
                          <span className='cm-crit-main'>
                            <span className='cm-crit-name'>{c.name}</span>
                            <span className='cm-crit-sub'>{c.mpio}{c.dpto ? `, ${c.dpto}` : ''}</span>
                          </span>
                          <span className='cm-crit-lvl'>{c.nivel}</span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
                )}
            {critShown.length > 200 && <p className='cm-hint'>Mostrando 200 de {fmt(critShown.length)}. Acote con los filtros.</p>}
          </>
        )}
      </div>
    </div>
  )
}

// ---------- estilos ----------
const style = css`
  --bg: rgba(10, 16, 30, .94);
  --card: rgba(30, 41, 59, .55);
  --line: rgba(148, 163, 184, .16);
  --tx: #e2e8f0;
  --mut: #94a3b8;
  font-family: 'Inter', -apple-system, 'Segoe UI', Roboto, Arial, sans-serif;
  box-sizing: border-box;
  width: 100%; height: 100%;
  display: flex; flex-direction: column;
  background: var(--bg);
  backdrop-filter: blur(10px);
  color: var(--tx);
  border: 1px solid var(--line);
  border-radius: 14px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, .45);
  overflow: hidden;
  *, *::before, *::after { box-sizing: border-box; }
  button { font: inherit; color: inherit; }

  .cm-head { padding: 14px 16px 10px; background: linear-gradient(135deg, rgba(224,49,63,.22), rgba(56,189,248,.08) 60%, transparent); border-bottom: 1px solid var(--line); }
  .cm-title-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
  .cm-title { margin: 0; font-size: 17px; font-weight: 800; letter-spacing: .01em; color: #fff; }
  .cm-sub { margin: 2px 0 0; font-size: 12px; color: var(--mut); }
  .cm-live { display: inline-flex; align-items: center; gap: 6px; font-size: 10px; font-weight: 800; letter-spacing: .12em; color: #fca5a5; border: 1px solid rgba(224,49,63,.5); border-radius: 999px; padding: 3px 8px; }
  .cm-live i { width: 7px; height: 7px; border-radius: 50%; background: #e0313f; animation: cm-pulse 1.6s infinite; }
  @keyframes cm-pulse { 0% { box-shadow: 0 0 0 0 rgba(224,49,63,.7) } 70% { box-shadow: 0 0 0 7px rgba(224,49,63,0) } 100% { box-shadow: 0 0 0 0 rgba(224,49,63,0) } }
  .cm-kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin-top: 12px; }
  .cm-kpis div { background: var(--card); border: 1px solid var(--line); border-radius: 8px; padding: 6px 8px; min-width: 0; }
  .cm-kpis b { display: block; font-size: 18px; font-weight: 800; font-variant-numeric: tabular-nums; color: #fff; }
  .cm-kpis span { font-size: 10px; text-transform: uppercase; letter-spacing: .06em; color: var(--mut); }

  .cm-filters { padding: 10px 16px 4px; display: flex; flex-direction: column; gap: 8px; }
  .cm-row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
  .cm-filters .jimu-input, .cm-filters select, .cm-filters .dropdown-button { background: rgba(15,23,42,.8) !important; color: var(--tx) !important; border-color: var(--line) !important; }
  .cm-switch-row { display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: var(--mut); }
  .cm-switch-row label { display: flex; align-items: center; gap: 6px; margin: 0; }
  .cm-link { background: none; border: 0; padding: 0; cursor: pointer; color: #7dd3fc !important; font-size: 12px; font-weight: 600; }
  .cm-link:hover { text-decoration: underline; }
  .cm-pills { display: flex; flex-wrap: wrap; gap: 5px; }
  .cm-pill { cursor: pointer; font-size: 11px; font-weight: 600; background: rgba(56,189,248,.12); border: 1px solid rgba(56,189,248,.35); border-radius: 999px; padding: 2px 9px; }
  .cm-pill span { opacity: .7; margin-left: 2px; }

  .cm-loading { height: 3px; position: relative; }
  .cm-error, .cm-note { margin: 6px 16px; font-size: 12px; border-radius: 8px; padding: 8px 10px; }
  .cm-error { color: #fecaca; background: rgba(127,29,29,.4); border: 1px solid rgba(248,113,113,.4); }
  .cm-note { color: var(--mut); background: var(--card); border: 1px dashed var(--line); }

  .cm-tabs { display: flex; gap: 2px; padding: 0 12px; border-bottom: 1px solid var(--line); }
  .cm-tab { flex: 1; background: none; border: 0; cursor: pointer; font-size: 12px; font-weight: 700; color: var(--mut) !important; padding: 9px 4px; border-bottom: 3px solid transparent; }
  .cm-tab.on { color: #fff !important; border-bottom-color: #e0313f; }

  .cm-body { flex: 1; overflow-y: auto; padding: 12px 16px 16px; }
  .cm-body::-webkit-scrollbar { width: 8px; } .cm-body::-webkit-scrollbar-thumb { background: rgba(148,163,184,.25); border-radius: 4px; }
  .cm-h3 { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; margin: 14px 0 8px; font-size: 11px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: #cbd5e1; }
  .cm-h3 span { font-size: 10px; font-weight: 500; letter-spacing: 0; text-transform: none; color: var(--mut); }
  .cm-hint { font-size: 11px; color: var(--mut); margin: 6px 0 0; }

  .cm-gauge-wrap { display: grid; grid-template-columns: 170px 1fr; gap: 10px; align-items: center; }
  .cm-gauge { width: 100%; }
  .cm-gauge-val { font-size: 40px; font-weight: 800; }
  .cm-gauge-lbl { font-size: 8.5px; font-weight: 700; letter-spacing: .14em; fill: #94a3b8; }
  .cm-sevlist { display: flex; flex-direction: column; gap: 4px; }
  .cm-sev { display: grid; grid-template-columns: 10px 1fr auto 34px; align-items: center; gap: 7px; cursor: pointer; background: transparent; border: 1px solid transparent; border-radius: 6px; padding: 4px 6px; font-size: 12px; text-align: left; }
  .cm-sev:hover { background: var(--card); }
  .cm-sev.on { border-color: #fff; background: var(--card); }
  .cm-sev i { width: 10px; height: 10px; border-radius: 3px; }
  .cm-sev b { font-variant-numeric: tabular-nums; }
  .cm-sev em { font-style: normal; color: var(--mut); text-align: right; font-size: 11px; }

  .cm-sectors { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
  .cm-sector { text-align: left; cursor: pointer; background: var(--card); border: 1px solid var(--line); border-top: 3px solid var(--sc); border-radius: 10px; padding: 9px 10px; transition: transform .12s, opacity .12s; user-select: none; }
  .cm-sector:hover { transform: translateY(-1px); border-color: var(--sc); }
  .cm-sector.off { opacity: .4; border-top-color: var(--line); }
  .cm-sector-top { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #cbd5e1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .cm-sector-val { font-size: 24px; font-weight: 800; color: var(--sc); font-variant-numeric: tabular-nums; margin: 2px 0 6px; }
  .cm-sector-bar { display: flex; height: 6px; border-radius: 3px; overflow: hidden; background: rgba(148,163,184,.15); }
  .cm-sector-bar span { display: block; height: 100%; }
  .cm-sector-foot { font-size: 10px; color: var(--mut); margin-top: 5px; }

  .cm-matrix-wrap { overflow-x: auto; border: 1px solid var(--line); border-radius: 10px; }
  .cm-matrix { width: 100%; border-collapse: separate; border-spacing: 2px; font-size: 11px; }
  .cm-matrix thead th { text-align: center; padding: 6px 2px; color: var(--mut); font-weight: 700; }
  .cm-matrix tbody th { text-align: left; font-weight: 600; max-width: 120px; }
  .cm-matrix tbody th button { background: none; border: 0; cursor: pointer; padding: 3px 4px; text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 120px; display: block; }
  .cm-matrix tr.on th button { color: #7dd3fc; }
  .cm-matrix td { padding: 0; text-align: center; min-width: 36px; }
  .cm-matrix td button { width: 100%; border: 0; border-radius: 4px; padding: 4px 2px; cursor: pointer; font-weight: 700; font-variant-numeric: tabular-nums; }
  .cm-matrix td button:hover { outline: 2px solid #fff; }
  .cm-matrix .cm-tot { font-weight: 800; color: #fff; padding: 0 4px; }

  .cm-rank { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 3px; }
  .cm-rank-item { width: 100%; display: grid; grid-template-columns: 18px 1fr auto; gap: 8px; align-items: center; background: transparent; border: 1px solid transparent; border-radius: 8px; padding: 5px 6px; cursor: pointer; text-align: left; }
  .cm-rank-item:hover { background: var(--card); }
  .cm-rank-item.on { border-color: #7dd3fc; background: rgba(56,189,248,.1); }
  .cm-rank-pos { font-size: 11px; font-weight: 800; color: var(--mut); text-align: right; }
  .cm-rank-main { min-width: 0; display: flex; flex-direction: column; gap: 4px; }
  .cm-rank-name { font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .cm-rank-name small { font-size: 11px; font-weight: 400; color: var(--mut); margin-left: 6px; }
  .cm-rank-bar { display: flex; height: 6px; border-radius: 3px; overflow: hidden; min-width: 4px; }
  .cm-rank-bar span { display: block; height: 100%; }
  .cm-rank-val { font-size: 14px; font-variant-numeric: tabular-nums; }

  .cm-chips { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px; }
  .cm-chip { display: inline-flex; align-items: center; gap: 5px; cursor: pointer; font-size: 11px; background: var(--card); border: 1px solid var(--line); border-radius: 999px; padding: 3px 9px; }
  .cm-chip.on { border-color: #fff; }
  .cm-crit { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 5px; }
  .cm-crit-item { width: 100%; display: grid; grid-template-columns: 16px 1fr auto; gap: 9px; align-items: center; text-align: left; cursor: pointer; background: var(--card); border: 1px solid var(--line); border-left: 3px solid var(--sc); border-radius: 8px; padding: 7px 9px; }
  .cm-crit-item:hover, .cm-crit-item.on { border-color: var(--sc); background: rgba(30,41,59,.9); }
  .cm-crit-main { min-width: 0; display: flex; flex-direction: column; }
  .cm-crit-name { font-size: 12.5px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .cm-crit-sub { font-size: 11px; color: var(--mut); }
  .cm-crit-lvl { font-size: 10px; font-weight: 700; color: #fecaca; background: rgba(224,49,63,.22); border: 1px solid rgba(224,49,63,.45); border-radius: 999px; padding: 2px 7px; white-space: nowrap; }
`
