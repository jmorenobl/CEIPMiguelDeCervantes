#!/bin/bash
# Configura este directorio como repositorio git listo para GitHub Pages.
# Uso (desde la terminal del Mac, dentro del directorio web/):
#   chmod +x setup_git.sh
#   ./setup_git.sh

set -e

cd "$(dirname "$0")"

# Limpiar cualquier .git previo (puede haber quedado uno inicial parcialmente creado)
if [ -d ".git" ]; then
  echo "Eliminando .git previo…"
  rm -rf .git
fi

echo "Inicializando repositorio git…"
git init -b main

# Configuración local (puedes cambiarla luego con git config --global)
read -p "Nombre para los commits (ej. AMPA CEIP Cervantes): " GIT_NAME
read -p "Email para los commits: " GIT_EMAIL
git config user.name "$GIT_NAME"
git config user.email "$GIT_EMAIL"

git add .
git commit -m "Initial commit: web del AMPA para la campaña de quejas formales

- Landing mobile-first con secciones: problema, historial, 6 pasos, 4 escritos,
  efecto multiplicador, base legal (verificada en BOE) y FAQ
- Sin frameworks ni build (HTML + CSS + JS plano)
- Listo para GitHub Pages (.nojekyll incluido)"

echo ""
echo "✅ Repositorio git inicializado y commit inicial creado."
echo ""
echo "SIGUIENTES PASOS:"
echo ""
echo "1. Crea un repositorio vacío en GitHub (sin README ni nada):"
echo "   https://github.com/new"
echo ""
echo "2. Conecta este repo local con el remoto y empuja:"
echo "   git remote add origin https://github.com/<TU-USUARIO>/<TU-REPO>.git"
echo "   git push -u origin main"
echo ""
echo "3. Activa GitHub Pages en el repositorio:"
echo "   Settings → Pages → Source: Deploy from a branch → Branch: main / (root)"
echo ""
echo "4. Espera 1-2 minutos y abre la URL que aparece"
echo "   (suele ser https://<usuario>.github.io/<repo>/)"
echo ""
