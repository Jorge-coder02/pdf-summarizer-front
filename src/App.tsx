import { useMyDropzone } from "./hooks/useDropzone";
import { PDFPreview } from "./components/PDFPreview";

export const App = () => {
  const { getRootProps, getInputProps, isDragActive, files, errorMessage } =
    useMyDropzone();

  return (
    <div className="min-h-[100vh] flex flex-col gap-y-12 items-center justify-center pt-16 pb-60">
      <h1 className="text-4xl font-bold">PDF Summarizer</h1>
      {/* Contenedor principal */}
      <div className="flex">
        {/* Contenedor de carga de archivos */}
        <div className="rounded-lg shadow-lg border-2 border-black p-8 max-h-[30vh] overflow-y-auto">
          <h1 className="text-2xl text-center font-bold mb-4">
            Sube tu archivo PDF
          </h1>
          <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
            <div
              {...getRootProps()}
              style={{
                border: "2px dashed #666",
                padding: 40,
                width: 400,
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: isDragActive ? "#eee" : undefined,
              }}
            >
              <input {...getInputProps()} />
              {isDragActive
                ? "Suelta el archivo PDF aquí..."
                : "Arrastra un PDF o haz click para seleccionar"}
            </div>

            {errorMessage && (
              <div style={{ marginTop: 10, color: "red" }}>{errorMessage}</div>
            )}
          </div>
        </div>

        {/* Contenedor de previsualización */}
        <div
          className={`${
            files.length > 0 ? "flex flex-col" : "hidden"
          } ml-8 rounded-lg shadow-lg border-2 border-black px-8 py-2`}
        >
          <h2 className="text-xl font-bold mb-2 text-center pt-2">
            Previsualización
          </h2>
          {files.length > 0 && (
            <div style={{ marginTop: 10 }}>
              <strong>Archivo válido:</strong> <span>{files[0].name}</span>
              <PDFPreview file={files[0]} /> {/* 📋 Previsualización del PDF */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
