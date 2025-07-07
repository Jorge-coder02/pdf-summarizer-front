import { useState, useEffect, useRef } from "react";
import { useMyDropzone } from "./hooks/useDropzone"; // hook que maneja el drag and drop de archivos
import { PDFPreview } from "./components/PDFPreview";
import { getNumPages } from "./utils/pdf"; // función para obtener número de páginas
import LoadingDots from "./assets/LoadingDots";
import FileDropzone from "./components/FileDropzone";
import flechatop from "./assets/flechatop.svg"; // ruta correcta
import { Button } from "./components/Button";

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; //  || "http://localhost:5000"

  const { files, setFiles, errorMessage, open, getInputProps } =
    useMyDropzone();

  // Cuando cambia el archivo, limpiamos el resumen para que el botón reaparezca
  useEffect(() => {
    if (files.length > 0) {
      setSummary(null);
    } else {
      setSummary(null);
      setNumPages(null);
    }
  }, [files]);

  // Obtener número de páginas solo si hay archivo
  useEffect(() => {
    if (files.length > 0) {
      getNumPages(files[0])
        .then((pages) => setNumPages(pages))
        .catch(console.error);
    }
  }, [files]);

  // Scroll al resumen cuando cambia
  useEffect(() => {
    if (summary && summaryRef.current) {
      summaryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [summary]);

  const handleSummarize = async () => {
    if (!files.length) return alert("Sube un archivo primero");

    const formData = new FormData();
    formData.append("file", files[0]);

    setIsLoading(true);
    try {
      const uploadRes = await fetch(`${BACKEND_URL}/upload`, {
        method: "POST",
        body: formData,
      });
      const { id } = await uploadRes.json();

      // Polling para obtener resumen
      const pollInterval = 2000;
      const maxAttempts = 30;
      let attempts = 0;

      const poll = async () => {
        const res = await fetch(`${BACKEND_URL}/result/${id}`);
        const data = await res.json();

        if (data.status === "done") {
          setSummary(data.summary);
          setIsLoading(false);
        } else if (data.status === "error") {
          console.error("Error al procesar:", data.error);
          setIsLoading(false);
        } else {
          attempts++;
          if (attempts < maxAttempts) {
            setTimeout(poll, pollInterval);
          } else {
            console.error("Tiempo agotado esperando el resumen");
            setIsLoading(false);
          }
        }
      };

      poll();
    } catch (err) {
      console.error("Error al subir el archivo:", err);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[100vh] flex flex-col gap-y-12 items-center justify-center pt-16 pb-60">
      <h1 className="text-5xl font-bold text-center">PDF Summarizer</h1>

      <div
        className={`flex flex-col md:flex-row px-6 md:px-0 gap-8 max-w-4xl mx-auto ${
          files.length > 0 ? "justify-between" : "justify-center"
        }`}
      >
        {/* Zona carga archivos */}
        <div className="flex flex-col justify-center items-center rounded-lg shadow-lg border-2 border-black h-[320px] px-16">
          <h1 className="text-2xl text-center font-bold mb-2">
            Sube tu archivo PDF
          </h1>
          <div className="flex flex-col items-center gap-y-4 w-full max-w-[420px]">
            <FileDropzone onDrop={(acceptedFiles) => setFiles(acceptedFiles)} />
            <input {...getInputProps()} style={{ display: "none" }} />
            <Button
              onClick={open}
              icon={<img src={flechatop} alt="Flecha arriba" />}
            >
              Subir PDF
            </Button>
            {errorMessage && (
              <div className="text-red-500 text-sm text-center">
                {errorMessage}
              </div>
            )}
          </div>
        </div>

        {/* Previsualización y resumen */}
        <div
          className={`${
            files.length > 0
              ? "flex flex-col justify-center items-center"
              : "hidden"
          } rounded-lg shadow-lg border-2 border-black px-12 py-2`}
        >
          <h2 className="text-xl font-bold mb-2 text-center pt-2">
            Previsualización
          </h2>

          {files.length > 0 && (
            <div className="mt-4 flex flex-col items-center">
              <strong>Archivo válido:</strong> <span>{files[0].name}</span>{" "}
              <span>
                {files[0].size >= 1024 * 1024
                  ? `${(files[0].size / (1024 * 1024)).toFixed(2)} MB`
                  : `${(files[0].size / 1024).toFixed(2)} KB`}
              </span>
              <PDFPreview file={files[0]} />
            </div>
          )}

          <span className="mt-2 text-gray-600">
            {numPages !== null
              ? `${numPages} página${numPages === 1 ? "" : "s"}`
              : "Cargando..."}
          </span>

          {/* Mostrar botón solo si hay archivo y NO hay resumen */}
          {files.length > 0 && !summary && (
            <Button onClick={handleSummarize} disabled={isLoading}>
              {isLoading ? "Resumiendo..." : "Resumir PDF"}
            </Button>
          )}
        </div>
      </div>

      {/* Estado de carga */}
      <div className="flex justify-center items-center">
        {isLoading && (
          <div className="flex flex-col items-center">
            <p className="text-lg text-gray-700">Resumiendo PDF...</p>
            <LoadingDots />
          </div>
        )}
      </div>

      {/* Mostrar resumen */}
      {summary && (
        <div ref={summaryRef} className="max-w-4xl mx-auto px-6 md:px-0">
          <h2 className="text-2xl font-bold mb-4">
            Resumen del PDF <span className="text-gray-500">(inglés)</span>
          </h2>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <p className="text-gray-800 whitespace-pre-wrap">{summary}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
