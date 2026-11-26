import type { ImmutableObject } from 'seamless-immutable'

export interface Config {
  title: string
  subtitle: string
  /** 'dim' atenúa en el mapa lo que no cumple el filtro; 'hide' lo oculta */
  effectMode: 'dim' | 'hide'
  extentDefault: boolean
  topCount: number
}

export type IMConfig = ImmutableObject<Config>
