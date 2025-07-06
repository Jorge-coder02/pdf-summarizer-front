import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export async function getNumPages(file: File): Promise<number> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  return pdf.numPages;
}
