import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { PiLinkSimpleLight } from "react-icons/pi";
import UploadFile from "../../components/UploadFile";

const EditProfile = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelected = (file) => {
    setSelectedFile(file);
  };
  return (
    <div className="grid grid-cols-8 gap-4 px-6 py-8">
      <div className="col-span-2 flex justify-center">
        <UploadFile onFileSelected={handleFileSelected} initialFile={null} />
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
