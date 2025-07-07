import { useState, useEffect, useRef } from "react";
import { useMyDropzone } from "./hooks/useDropzone"; // hook que maneja el drag and drop de archivos
import { PDFPreview } from "./components/PDFPreview";
import { getNumPages } from "./utils/pdf"; // importar función para obtener número de páginas
import LoadingDots from "./assets/LoadingDots";
import FileDropzone from "./components/FileDropzone";
import flechatop from "./assets/flechatop.svg"; // asegúrate de que la ruta sea correcta
import { Button } from "./components/Button";

export const App = () => {
  const [isLoading, setIsLoading] = useState(false); // Estado de carga
  const [numPages, setNumPages] = useState<number | null>(null); // Estado para el número de páginas
  const [summary, setSummary] = useState<string | null>(null); // Estado para el resumen
  const summaryRef = useRef<HTMLDivElement>(null);

  const { files, setFiles, errorMessage, open, getInputProps } =
    useMyDropzone(); // Hook personalizado para manejar la carga de archivos

  // Obtener número de páginas del PDF
  useEffect(() => {
    if (files.length > 0) {
      getNumPages(files[0])
        .then((pages) => setNumPages(pages))
        .catch(console.error);
    } else {
      setNumPages(null);
    }
  }, [files]);

  // Referencia para el resumen
  useEffect(() => {
    if (summary && summaryRef.current) {
      summaryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [summary]);

  // const fetchTest = async () => {
  //   try {
  //     const res = await fetch("http://localhost:5000/test-openai");
  //     const data = await res.json();
  //     console.log("✅ OpenAI respondió:", data);
  //   } catch (err) {
  //     console.error("❌ Error:", err);
  //   }
  // };

  // 🚀 Validar que existe el archivo y realizar petición al backend con el pdf
  const handleSummarize = async () => {
    if (!files.length) return alert("Sube un archivo primero");

    const formData = new FormData();
    formData.append("file", files[0]);

    setIsLoading(true); // Actualizo el estado de carga
    // Envío el archivo al backend (** separar en otro archivo **)
    try {
      const response = await fetch("http://localhost:5000/upload", {
        // ***
        method: "POST",
        body: formData,
      });
      const text = await response.text();
      const data = JSON.parse(text); // así ves el error si no es JSON
      setSummary(data.summary); // Asignar el resumen al estado
    } catch (err) {
      console.error("Error al enviar el archivo:", err);
    } finally {
      setIsLoading(false); // Actualizo el estado de carga
    }
  };

  //   try {
  //     const response = await fetch("http://localhost:5000/upload-test");

  //     const data = await response.json();
  //     console.log("Resumen:", data); // 📋 Respuesta resumen en consola
  //   } catch (err) {
  //     console.error("Error al enviar el archivo:", err);
  //   }
  // };

  return (
    <div className="min-h-[100vh] flex flex-col gap-y-12 items-center justify-center pt-16 pb-60">
      <h1 className="text-5xl font-bold text-center">PDF Summarizer</h1>
      {/* Contenedor principal */}
      <div
        className={`flex flex-col md:flex-row px-6 md:px-0 gap-8 max-w-4xl mx-auto ${
          files.length > 0 ? "justify-between" : "justify-center"
        }`}
      >
        {/* Contenedor de carga de archivos */}
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

        {/* Contenedor de previsualización */}
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
              <PDFPreview file={files[0]} /> {/* 📋 Previsualización del PDF */}
            </div>
          )}

          <span className="mt-2 text-gray-600">
            {numPages !== null
              ? `${numPages} página${numPages === 1 ? "" : "s"}`
              : "Cargando..."}
          </span>

          {!summary && (
            <Button onClick={handleSummarize} disabled={isLoading}>
              {isLoading ? "Resumiendo..." : "Resumir PDF"}
            </Button>
          )}
        </div>
      </div>
      {/* Contenedor de carga */}
      <div className="flex justify-center items-center">
        {isLoading && (
          <div className="flex flex-col items-center">
            <p className="text-lg text-gray-700">Resumiendo PDF...</p>
            <LoadingDots />
          </div>
        )}
      </div>
      {/* Contenedor de resumen */}
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
