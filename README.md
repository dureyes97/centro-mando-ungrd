# Centro de mando UNGRD

Widget personalizado para **ArcGIS Experience Builder (Developer Edition 1.21)** que convierte el web map de afectaciones de infraestructura de la UNGRD en un centro de mando multisectorial: agua y saneamiento, educación, energía, salud y transporte.

El panel flota sobre el mapa, lee las capas directamente del web map y aplica sus filtros al mapa en tiempo real.

## Funcionalidades

**Encabezado**
- Indicadores de registros, municipios, departamentos e infraestructura crítica, recalculados con cada filtro.

**Filtros**
- Departamento y municipio en cascada, con zoom automático a la zona elegida.
- Búsqueda libre por tipo de infraestructura, institución o entidad.
- Opción *Solo la vista del mapa* para calcular todo con lo que se ve en pantalla.
- Filtros activos como etiquetas que se quitan con un clic.

**Pestaña Panorama**
- **Índice de criticidad (0–100)** en un medidor semicircular. Pondera Crítico ×3, Alto ×2 y Menor ×1.
- Distribución por nivel de afectación (Crítico, Alto, Menor, Otro). Cada nivel filtra al tocarlo.
- Tarjetas por sector con conteo, barra de gravedad y porcentaje crítico. Clic muestra u oculta el sector; doble clic deja solo ese sector.

**Pestaña Territorio**
- **Matriz departamento × sector** con intensidad de color según el número de registros. Clic en una celda filtra ese sector y departamento. Exportable a CSV.
- Ranking de municipios más afectados, con barra dividida por sector.

**Pestaña Críticos**
- Lista de infraestructura en nivel crítico, filtrable por sector. Clic acerca el mapa y abre el pop-up configurado en el web map.

**En el mapa**
- Lo que no cumple los filtros se atenúa en gris translúcido o se oculta (configurable).
- Las capas agrupadas en clústeres siempre usan el modo *ocultar*, porque la atenuación no se aplica a clústeres.

## Requisitos de datos

El widget busca en el mapa conectado las capas cuyo título contenga `agua`, `educacion`, `energia`, `salud` o `transporte` (sin importar mayúsculas ni tildes). De cada capa usa estos campos:

| Campo | Uso |
|---|---|
| `NIVEL_AFEC` | Nivel de afectación; se clasifica por palabras clave (total, colapso, parcial, menor…) |
| `NOM_DPTO` | Departamento |
| `NOM_MPIO` | Municipio |
| `TIPO_INFRA` | Tipo de infraestructura (búsqueda y nombre en la lista de críticos) |
| `NOM_INST` | Nombre de la institución, si existe (Salud) |
| `ENTIDAD` | Entidad que reporta (búsqueda) |

Las palabras clave de cada nivel y los colores de cada sector están en [`src/sectors.ts`](widgets/centro-mando-ungrd/src/sectors.ts).

## Instalación

1. Copie la carpeta `widgets/centro-mando-ungrd` en `client/your-extensions/widgets/` de su Experience Builder Developer Edition.
2. Reinicie el cliente (`pnpm start` en la carpeta `client`) para que compile el widget nuevo.
3. En el builder, agregue un widget **Mapa** con el web map de afectaciones y luego el widget **Centro de mando UNGRD**.
4. En la configuración del widget, seleccione el mapa. También puede cambiar el título, el modo de filtrado en el mapa y la cantidad de municipios del ranking.

### App de ejemplo

`app/config.json` es la configuración de una experiencia lista para usar: el mapa a pantalla completa y el panel flotando a la derecha. Para usarla:

1. Cree la carpeta `server/public/apps/<id>/`, con un id que no exista.
2. Copie `config.json` en esa carpeta y también en `resources/config/` dentro de ella.
3. Cambie `itemId` y `portalUrl` en `dataSources` si usa otro web map u otra organización.

## App publicada (GitHub Pages + ArcGIS Online)

ArcGIS Online no permite registrar widgets personalizados en su Experience Builder (solo ArcGIS Enterprise 11.0 o posterior). Por eso la experiencia completa se descarga desde la Developer Edition y se publica como sitio estático en [`docs/app`](docs/app):

```
https://dureyes97.github.io/centro-mando-ungrd/app/
```

En ArcGIS Online se referencia como un elemento **Aplicación → Web mapping** con esa URL. El Client ID de ese elemento va en `docs/app/cdn/1/config.json` (`attributes.clientId`), y la URL de arriba debe figurar como URL de redirección en sus credenciales.

Para regenerar la app tras cambiar el widget:

```
cd client
pnpm run build:for-download
cd ../server
node -e "require('./src/middlewares/dev/apps/app-download.js').zipApp('7', 'app7.zip', '<CLIENT_ID>', { locales: ['es'] })"
```

Luego descomprima `app7.zip` sobre `docs/app`.

## Registro del widget en ArcGIS Enterprise

La carpeta [`docs/centro-mando-ungrd`](docs/centro-mando-ungrd) contiene el widget compilado en modo producción y se publica con GitHub Pages. Un portal de ArcGIS Enterprise 11.0 o posterior puede registrarlo a partir de esta URL:

```
https://dureyes97.github.io/centro-mando-ungrd/centro-mando-ungrd/manifest.json
```

1. Un administrador del portal entra en **Mi contenido → Agregar elemento → Una aplicación → Widget de Experience Builder**.
2. Pega la URL del `manifest.json`, asigna un título y guarda.
3. En Experience Builder del portal: **Insertar widget → Personalizado → Centro de mando UNGRD**.

Para actualizar la versión en línea, compile en producción y copie el resultado en `docs/centro-mando-ungrd`:

```
cd client
pnpm exec cross-env NODE_ENV=production OUTPUT_FOLDER=./dist-prod webpack --mode production
```

La salida queda en `client/dist-prod/widgets/centro-mando-ungrd`. El `exbVersion` del manifest (1.21.0) no puede ser mayor que la versión de Experience Builder del portal.

## Estructura

```
widgets/centro-mando-ungrd/
├── manifest.json        # metadatos del widget
├── config.json          # configuración por defecto
├── icon.svg
└── src/
    ├── config.ts        # tipos de configuración
    ├── sectors.ts       # sectores, niveles, colores y clasificación
    ├── runtime/widget.tsx
    └── setting/setting.tsx
app/
└── config.json          # experiencia de ejemplo
docs/
├── app/                 # experiencia completa descargada (GitHub Pages)
└── centro-mando-ungrd/  # widget compilado (para ArcGIS Enterprise)
```

Probado con ArcGIS Experience Builder 1.21 y ArcGIS Maps SDK for JavaScript 5.1.
