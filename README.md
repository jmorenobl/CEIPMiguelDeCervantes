# Web — Quejas CEIP Miguel de Cervantes

Web informativa del AMPA del CEIP Miguel de Cervantes (Leganés) sobre la campaña de quejas formales por el estado del centro.

## Qué es

Una página estática (HTML + CSS + JS sin frameworks ni build) pensada para móvil que reúne en un solo sitio toda la información que las familias necesitan para presentar las quejas:

- Contexto y problema documentado
- Historial cronológico
- 6 pasos para presentar (incluido el aviso al AMPA)
- Las 4 plantillas con plazos y enlaces a las sedes electrónicas oficiales
- Visualización del efecto multiplicador
- Base legal verificada contra el BOE
- FAQ

Las plantillas en sí mismas viven en el Google Drive del AMPA (no se publican aquí por respeto a la confidencialidad de la documentación interna del centro). Los botones "Descargar plantilla" abren un mensaje que invita a contactar al AMPA mientras no se configure el enlace al Drive.

## Cómo verla en local

Cualquier servidor estático sirve. Lo más rápido:

```bash
cd web
python3 -m http.server 8080
# abrir http://localhost:8080
```

O con Node:

```bash
npx serve .
```

## Cómo subir a GitHub Pages

Hay un script `setup_git.sh` que automatiza el primer paso. Desde la terminal de tu Mac:

```bash
cd /Users/jorge/Projects/CPMiguelDeCervantes/web
./setup_git.sh
```

Te pedirá nombre y correo para los commits, hará `git init`, añadirá los archivos y creará el primer commit. Al terminar te imprime las instrucciones para vincular con GitHub.

### Resumen del proceso completo

1. **Ejecutar `./setup_git.sh`** en tu Mac (inicializa git + primer commit).
2. **Crear el repositorio en GitHub** (vacío, sin README inicial): https://github.com/new
3. **Vincular y empujar**:

   ```bash
   git remote add origin https://github.com/<TU-USUARIO>/<TU-REPO>.git
   git push -u origin main
   ```

4. **Activar GitHub Pages** en el repositorio:
   - Ir a *Settings → Pages*
   - *Source*: **Deploy from a branch**
   - *Branch*: `main`, *Folder*: `/ (root)`
   - Guardar
5. **Esperar 1-2 minutos** y abrir la URL que aparece (suele ser `https://<usuario>.github.io/<repo>/`).

El archivo `.nojekyll` ya está incluido para que GitHub Pages no procese la web como Jekyll.

## Cómo configurar el enlace al Google Drive

Cuando subas las plantillas al Drive y obtengas la URL pública (o el enlace de "ver con cualquiera que tenga el enlace"), edita `script.js`:

```js
const DRIVE_BASE = 'https://drive.google.com/drive/folders/XXXXXXXXX';
```

Vuelve a hacer commit y push, y GitHub Pages actualizará la web automáticamente (puede tardar 1-2 minutos).

Si prefieres enlaces individuales por documento (uno por escrito), reemplaza la lógica en `script.js` por un mapa `nombre → URL`:

```js
const DRIVE_LINKS = {
  'General_01_Queja_Ayuntamiento.docx': 'https://drive.google.com/file/d/AAA/view',
  'General_02_Transparencia.docx':       'https://drive.google.com/file/d/BBB/view',
  // ...
};
```

y úsalo en el handler de clic.

## Dominio personalizado (opcional)

Si el AMPA tiene un dominio propio (p. ej. `quejas-cervantes.es`), crear un archivo `CNAME` en la raíz con el dominio:

```bash
echo "quejas-cervantes.es" > CNAME
git add CNAME && git commit -m "Custom domain"
git push
```

Y configurar el DNS en el proveedor del dominio apuntando a las IPs de GitHub Pages (185.199.108-111.153).

## Estructura del repo

```
web/
├── index.html         # Página única con todo el contenido
├── styles.css         # Estilos mobile-first
├── script.js          # Menú móvil + enlaces a Drive + animaciones
├── .nojekyll          # Desactiva el procesamiento de Jekyll
├── .gitignore
└── README.md          # Este archivo
```

## Actualizar la web

Cualquier cambio:

```bash
cd web
# editar archivos
git add .
git commit -m "Descripción del cambio"
git push
```

GitHub Pages se actualiza solo en 1-2 minutos.

## Licencia

Material elaborado por el AMPA del CEIP Miguel de Cervantes para uso de las familias del centro. El contenido normativo procede del BOE (dominio público).
