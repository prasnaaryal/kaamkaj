import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";

const UploadFile = ({ onFileSelected, initialFile }) => {
  const [file, setFile] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0];
        setFile(selectedFile);
        onFileSelected(selectedFile);
      }
    },
    onFileDialogCancel: () => onFileSelected(null),
    accept: {
      "image/*": [],
    },
  });

  useEffect(() => {
    if (initialFile && !file) {
      setFile(initialFile);
    }
  }, [initialFile, file]);

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className="flex items-center justify-center h-48 w-full bg-silver cursor-pointer"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here...</p>
        ) : file ? (
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center w-32 h-24 justify-center rounded-md">
              {file instanceof File ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-full h-full object-cover rounded-md"
                />
              )}
            </div>
            <p className="flex flex-col text-sm text-black items-center gap-2">
              {file instanceof File ? file.name : file.name || "Profile Image"}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center w-32 h-24 justify-center rounded-md border-2 border-primary border-dashed">
              <IoCloudUploadOutline className="w-10 h-10 text-primary" />
            </div>
            <p className="flex flex-col text-sm text-black items-center gap-2">
              Upload image
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadFile;
