import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { PiLinkSimpleLight } from "react-icons/pi";

const EditProfile = () => {
  const MyDropzone = () => {
    const onDrop = useCallback((acceptedFiles) => {
      // Handle file upload here
      console.log(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });

    return (
      <div
        {...getRootProps()}
        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 w-64 h-64 text-center mx-auto"
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center text-gray-500">
          <svg
            className="w-12 h-12 mb-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16V10M7 10H3m4 0h4m4 0h4M5 16h2m4 0h2m4 0h2M5 16H3m6 0h2m4 0h2m-8-6h4M5 12h2m4 0h2m4 0h2M5 12H3m6 0h2m4 0h2M5 8h2m4 0h2m4 0h2M5 8H3m6 0h2m4 0h2"
            />
          </svg>
          {isDragActive ? (
            <p className="text-blue-500">Drop the files here...</p>
          ) : (
            <p>
              <span className="font-semibold text-gray-600">Browse photo</span>{" "}
              or drop here
              <br />
              <span className="text-sm text-gray-400">
                A photo larger than 400 pixels works best. Max photo size 5 MB.
              </span>
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-8 gap-4 px-6 py-8">

      <div className="col-span-2 flex justify-center">
        <MyDropzone />
      </div>
      <div className="col-span-6">
        <form className="space-y-6">
          <div className="flex flex-col">
            <label
              htmlFor="companyName"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Company Name
            </label>
            <input
              className="border rounded py-2 px-3 font-normal h-10 w-full placeholder-[#9199A3]"
              id="companyName"
              type="text"
              placeholder="Ex: Softwarica"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="companyAddress"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Company Address
            </label>
            <input
              className="border rounded py-2 px-3 h-10 w-full placeholder-[#9199A3]"
              id="companyAddress"
              type="text"
              placeholder="Company Address"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="companyWebsite"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Company Website
            </label>
            <div className="relative w-full">
              <span className="absolute left-3 top-2.5 text-gray-500">
                <PiLinkSimpleLight className="text-blue-600" />
              </span>
              <input
                className="border rounded py-2 pl-10 pr-3 h-10 w-full placeholder-[#9199A3]"
                id="companyWebsite"
                type="url"
                placeholder="Website URL"
              />
            </div>
          </div>
        </form>
      </div>

      <div className="col-span-8">
        <hr className="border-gray-300" />
      </div>

      <div className="col-span-8 flex flex-col">
        <h1 className="text-lg font-semibold text-gray-700">About us</h1>
        <textarea
          className="border rounded py-2 px-3 h-24 w-full placeholder-[#9199A3] hover:border-bg-blue-100"
          placeholder="Write down about your company here. Let the candidate know who we are..."
        />
        <button className="bg-blue-500 text-white font-bold py-2 px-4 mt-8 rounded h-10 w-52">
        Save Changes
      </button>
      </div>

      
    </div>
  );
};

export default EditProfile;
