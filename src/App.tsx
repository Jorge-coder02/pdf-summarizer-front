import { useMyDropzone } from "./hooks/useDropzone";

export const App = () => {
  const { getRootProps, getInputProps, isDragActive, files, errorMessage } =
    useMyDropzone();

  return (
    <div className="min-h-[100vh] flex flex-col gap-y-12 items-center justify-center pb-60">
      <h1 className="text-4xl font-bold">PDF Summarizer</h1>
      {/* Contenedor principal */}
      <div className="rounded-lg shadow-lg border-2 border-black p-8">
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

          {files.length > 0 && (
            <div style={{ marginTop: 10 }}>
              <strong>Archivo válido:</strong> {files[0].name}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
