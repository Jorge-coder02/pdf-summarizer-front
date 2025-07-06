<!-- 1. Soltar el archivo -> se valida tamaño y formato pdf al soltar
2. Se previsualiza a la derecha (flex-row padre y a la derecha hidden según estado) -->

<!-- 3. Aceptar -> se hace llamada al backend, que llama a la OpenAPI y devuelve resumen, que muestro abajo. -->

# To-do:

- Funcionalidad al botón (reutilizar)
- Subir a producción - front y back (back mover rutas si procede)
- Traducir en front al recibir respuesta?
- Poder moverme entre páginas del archivo subido

🧱 ARQUITECTURA GENERAL

Frontend (React)
↓
[POST] /api/summarize (archivo PDF)
↓
Backend (Node + Express)
↓
pdf-parse → extrae texto
↓
Cohere API → resumen
↓
Respuesta al frontend

# Herramientas:

- pdfjs
- pdf-parse
- Cohere
