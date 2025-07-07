// PDFDropzone.tsx
import { useDropzone } from "react-dropzone";
import pdfIcon from "../assets/pdficon.svg"; // asegúrate de que la ruta sea correcta

<img src={pdfIcon} alt="PDFicon" className="w-12 h-12 mx-auto mb-2" />;

const FileDropzone = ({ onDrop }: { onDrop: (files: File[]) => void }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [] },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-col py-4 border-2 border-dashed border-gray-600 p-6 md:p-10 w-full max-w-xs md:w-2xl text-center cursor-pointer 
        transition-colors bg-gray-50 hover:bg-gray-100 rounded-lg"
      style={{
        backgroundColor: isDragActive ? "#eee" : undefined,
        height: 120,
        width: 480,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input {...getInputProps()} />
      <img src={pdfIcon} alt="PDFicon" className="w-10 h-10 mx-auto mb-2" />
      <span className="block text-base md:text-lg">
        {isDragActive
          ? "Suelta el archivo PDF aquí..."
          : "Arrastra un PDF o toca para seleccionar"}
      </span>
    </div>
  );
};

export default FileDropzone;
