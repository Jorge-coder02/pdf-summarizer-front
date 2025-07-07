# 📋📖 PDF Summarizer (Resumir archivos pdf)

[![PDF Summarizer](https://img.shields.io/badge/Status-Complete-green)](https://github.com/Jorge-coder02/pdf-summarizer-front)
[![Licencia](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

🔗 **Visitar sitio:** [Ver en vivo](https://padsummarizer.up.railway.app/) https://pdfsummarizer.up.railway.app/

## Sobre el sitio
**PDF Summarizer** es una aplicación que permite la subida de archivos PDF y resumir su contenido con IA.

## 🚀 Tecnologías Principales (proyecto completo)

![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.3-06B6D4?logo=tailwind-css)
![Node.js](https://img.shields.io/badge/Node.js-22.14.0-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.1.0-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8.0.4-47A248?logo=mongodb&logoColor=white)

## ✨ Herramientas utilizadas

- ✅ pdfjs -> Previsualizar
- ✅ pdf-parse -> Extraer texto (backend)
- ✅ CohereAI -> IA para resumir textos


## 🧱 Arquitectura General

```mermaid
flowchart TD
    A[Frontend (React)] --> B[[POST /upload (archivo PDF)]]
    B --> C[Backend (Node + Express)]
    C --> D[pdf-parse → extrae texto]
    D --> E[Cohere API → resumen]
    E --> F[Respuesta al Frontend]
```

## 📦 Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/Jorge-coder02/pdf-summarizer-front.git
cd tienda-ropa-frontend
```

2. **Instalar dependencias**

```bash
npm install
```

o si usas Yarn

```bash
yarn install
```

3. **Ejecutar en modo desarrollo**

```bash
npm run dev
```

## El servidor estará disponible en:

## http://localhost:3000

## 🗂️ Estructura del Proyecto

```plaintext
📦 root
├── 📁 public/                  # Archivos públicos accesibles
│
├── 📁 src/
│   ├── 📁 components/
│   ├── 📁 hooks/
│   ├── 📁 utils/
│
├── ⚙️  .env                    # Variables de entorno (ignorado por Git)
├── 🎨 tailwind.config.js
├── 📜 README.md                # Documentación principal del proyecto

```

# Versiones

- React: `19.1.0`
- Tailwind CSS: `3.3.2`

## Dependencias principales
- axios: `1.10.0`

## Dependencias de desarrollo:

- eslint: `9.29.0`
- vite: `7.0.0`
- postcss: `8.4.21`

## Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

Si tienes preguntas o sugerencias, no dudes en abrir un issue o PR.


