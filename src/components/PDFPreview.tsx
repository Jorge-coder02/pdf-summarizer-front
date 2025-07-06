// components/PDFPreview.tsx
import { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.min.mjs";

interface Props {
  file: File;
}

export const PDFPreview = ({ file }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cancelled = false;
    const canvas = canvasRef.current;

    const render = async () => {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const page = await pdf.getPage(1);

      const unscaledViewport = page.getViewport({ scale: 1 });
      const maxHeight = window.innerHeight * 0.4;
      const scale = maxHeight / unscaledViewport.height;

      const viewport = page.getViewport({ scale, rotation: 0 });

      if (!canvas || cancelled) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      // 🧼 Limpieza del canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Asignamos nuevas dimensiones
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      // Renderizamos la página
      await page.render({ canvasContext: context, viewport }).promise;
    };

    render();

    return () => {
      cancelled = true;
      if (canvas) {
        const context = canvas.getContext("2d");
        context?.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
  }, [file]);

  return (
    <canvas
      ref={canvasRef}
      className="mt-4 rounded shadow-md border border-gray-300"
      style={{ maxWidth: "100%", height: "auto" }}
    />
  );
};
