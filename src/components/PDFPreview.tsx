// components/PDFPreview.tsx
import { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.min.mjs";

interface Props {
  file: File;
}

export const PDFPreview = ({ file }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const desiredWidth = 500;
  const desiredHeight = 800;

  useEffect(() => {
    const render = async () => {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const page = await pdf.getPage(1); // Obtener la primera página

      // Obtener viewport base sin escalar
      const unscaledViewport = page.getViewport({ scale: 1 });

      // Calcular escala proporcional para que encaje completamente
      const scaleX = desiredWidth / unscaledViewport.width;
      const scaleY = desiredHeight / unscaledViewport.height;
      const scale = Math.min(scaleX, scaleY); // mantener proporciones

      // Aplicar escala y rotación real
      const viewport = page.getViewport({ scale, rotation: page.rotate });

      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const context = canvas.getContext("2d");
      if (!context) return;

      await page.render({ canvasContext: context, viewport }).promise;
    };

    render(); // Llamar a la función de renderizado
  }, [file]);

  return <canvas ref={canvasRef} className="mt-4 rounded shadow-md" />;
};
