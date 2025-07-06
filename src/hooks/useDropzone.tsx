import { useCallback, useState } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";

// * Definir tamaño máximo *
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export const useMyDropzone = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setErrorMessage("");
    setFiles(acceptedFiles);
  }, []);

  // Manejo de archivos rechazados
  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    const rejection = fileRejections[0];
    if (!rejection) return;

    const { file, errors } = rejection;
    const firstError = errors[0];

    if (firstError.code === "file-too-large") {
      setErrorMessage(
        `El archivo "${file.name}" supera el tamaño máximo de 5MB.`
      );
    } else if (firstError.code === "file-invalid-type") {
      setErrorMessage(`El archivo "${file.name}" no es un PDF válido.`);
    } else {
      setErrorMessage(
        `Error con el archivo "${file.name}": ${firstError.message}`
      );
    }
    setFiles([]);
  }, []);

  const dropzone = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxSize: MAX_SIZE,
    onDrop,
    onDropRejected,
    multiple: false,
  });

  return { ...dropzone, files, errorMessage, setFiles };
};
