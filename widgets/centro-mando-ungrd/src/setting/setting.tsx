import { React } from 'jimu-core'
import type { AllWidgetSettingProps } from 'jimu-for-builder'
import { SettingSection, SettingRow, MapWidgetSelector } from 'jimu-ui/advanced/setting-components'
import { Switch, TextInput, Select, Option, NumericInput } from 'jimu-ui'
import type { IMConfig } from '../config'
import defaultMessages from './translations/default'

export default function Setting (props: AllWidgetSettingProps<IMConfig>) {
  const { id, config, useMapWidgetIds, onSettingChange } = props
  const setConfig = (key: string, value: any) => { onSettingChange({ id, config: config.set(key, value) }) }

  return (
    <div className='widget-setting-centro-mando-ungrd'>
      <SettingSection title={defaultMessages.mapSection}>
        <SettingRow>
          <MapWidgetSelector useMapWidgetIds={useMapWidgetIds} onSelect={(ids: string[]) => { onSettingChange({ id, useMapWidgetIds: ids }) }} />
        </SettingRow>
        <SettingRow>
          <span style={{ fontSize: 12, opacity: 0.8 }}>{defaultMessages.mapHint}</span>
        </SettingRow>
      </SettingSection>

      <SettingSection title={defaultMessages.displaySection}>
        <SettingRow flow='wrap' label={defaultMessages.titleLabel}>
          <TextInput size='sm' className='w-100' defaultValue={config.title} onAcceptValue={(v: string) => { setConfig('title', v) }} />
        </SettingRow>
        <SettingRow flow='wrap' label={defaultMessages.subtitleLabel}>
          <TextInput size='sm' className='w-100' defaultValue={config.subtitle} onAcceptValue={(v: string) => { setConfig('subtitle', v) }} />
        </SettingRow>
        <SettingRow flow='wrap' label={defaultMessages.effectMode}>
          <Select size='sm' value={config.effectMode || 'dim'} onChange={(e) => { setConfig('effectMode', e.target.value) }}>
            <Option value='dim'>{defaultMessages.dim}</Option>
            <Option value='hide'>{defaultMessages.hide}</Option>
          </Select>
        </SettingRow>
        <SettingRow label={defaultMessages.extentDefault}>
          <Switch checked={!!config.extentDefault} onChange={(e) => { setConfig('extentDefault', e.target.checked) }} />
        </SettingRow>
        <SettingRow label={defaultMessages.topCount}>
          <NumericInput size='sm' style={{ width: 80 }} min={5} max={30} value={config.topCount}
            onAcceptValue={(v: number) => { setConfig('topCount', v || 12) }} />
        </SettingRow>
      </SettingSection>
    </div>
  )
}
