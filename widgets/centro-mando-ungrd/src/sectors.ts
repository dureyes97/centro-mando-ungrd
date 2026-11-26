export type SevKey = 'critico' | 'alto' | 'menor' | 'otro'

export interface SevDef {
  key: SevKey
  label: string
  color: string
  weight: number
  words: string[]
}

/** Mismos criterios y tonos que la simbología del web map */
export const SEVERITIES: SevDef[] = [
  { key: 'critico', label: 'Crítico', color: '#e0313f', weight: 3, words: ['total', 'colapso', 'reposicion', 'destru', 'inminente'] },
  { key: 'alto', label: 'Alto', color: '#f46d43', weight: 2, words: ['parcial', 'mayor', 'reforz'] },
  { key: 'menor', label: 'Menor', color: '#fee08b', weight: 1, words: ['menor', 'leve', 'adecuacion'] },
  { key: 'otro', label: 'Otro / sin dato', color: '#94a3b8', weight: 0, words: [] }
]

export interface SectorDef {
  key: string
  label: string
  color: string
  keywords: string[]
  /** path SVG en un viewBox de 24×24 */
  icon: string
}

export const SECTORS: SectorDef[] = [
  { key: 'agua', label: 'Agua y saneamiento', color: '#38bdf8', keywords: ['agua'], icon: 'M12 2.5c-3.5 4.6-6.5 8.4-6.5 11.6a6.5 6.5 0 0 0 13 0c0-3.2-3-7-6.5-11.6z' },
  { key: 'educacion', label: 'Educación', color: '#a78bfa', keywords: ['educacion'], icon: 'M12 4 1.5 9 12 14l8.5-4.05V16H22V9L12 4zm-6 8.2V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-3.8l-6 2.85-6-2.85z' },
  { key: 'energia', label: 'Energía', color: '#fbbf24', keywords: ['energia'], icon: 'M13.5 2 4 14h6.5l-1 8L19 10h-6.5l1-8z' },
  { key: 'salud', label: 'Salud', color: '#f472b6', keywords: ['salud'], icon: 'M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3z' },
  { key: 'transporte', label: 'Transporte', color: '#94a3b8', keywords: ['transporte'], icon: 'M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-1 1.7V20h-3v-2H7v2H4v-2.3A2 2 0 0 1 3 16V6a2 2 0 0 1 2-2zm0 3v5h14V7H5zm1.5 7h3v2h-3v-2zm8 0h3v2h-3v-2z' }
]

export const norm = (s: any): string =>
  String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export const classify = (value: any): SevKey => {
  const n = norm(value)
  if (!n) return 'otro'
  for (const s of SEVERITIES) {
    if (s.words.some(w => n.includes(w))) return s.key
  }
  return 'otro'
}
