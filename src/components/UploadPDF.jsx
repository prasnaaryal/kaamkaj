import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineFilePdf } from "react-icons/ai";
import { IoRemoveCircle } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";

const UploadPDF = ({ onFileSelected, initialFile, cv }) => {
  const getFileName = (path) => {
    return path ? path.split("/").pop() : "";
  };

  const [file, setFile] = useState(
    initialFile || (cv ? { name: getFileName(cv) } : null)
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
      onFileSelected(acceptedFiles[0]);
    },
    onFileDialogCancel: () => onFileSelected(null),
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  useEffect(() => {
    if (cv) {
      setFile({ name: getFileName(cv) });
    }
  }, [cv]);

  const removeFile = () => {
    setFile(null);
    onFileSelected(null);
  };

  return (
    <div className="w-full flex gap-4">
      <div
        {...getRootProps()}
        className="flex items-center justify-center min-w-[400px] h-28 cursor-pointer border-dashed border-2 border-gray-400 rounded-lg"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here...</p>
        ) : (
          <div className="flex gap-3">
            <IoMdAddCircleOutline className="w-6 h-6 text-blue-500" />
            <div>
              <p className="text-sm text-black">Add CV/Resume</p>
              <p className="text-xs text-gray-500">
                Browse file or drop here, only pdf
              </p>
            </div>
          </div>
        )}
      </div>
      {file && (
        <div className="w-full h-full flex items-center">
          <div className="relative flex items-center justify-center min-w-52 h-20 px-4 bg-gray-100 rounded-md">
            <AiOutlineFilePdf className="w-8 h-8 text-primary" />
            <p className="text-sm text-black mt-2">{getFileName(file.name)}</p>
            <IoRemoveCircle
              className="absolute -top-7 right-0 w-6 h-6 text-red-600 cursor-pointer"
              onClick={removeFile}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPDF;
