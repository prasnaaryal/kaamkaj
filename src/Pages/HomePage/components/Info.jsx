import React from 'react';

const Info = () => {
  return (
    <div className="bg-[#f1f6fe] w-full h-[132px] flex justify-center items-center py-4 gap-12">
      <div className="flex items-center justify-between w-[200px] h-22 bg-white shadow-md rounded-lg p-4">
          <img src="images/Icon.png" alt="" className="w-12 h-12" />
          <div className="text-center">
            <p className="text-lg font-semibold text-black">1,75,324</p>
            <p className="text-gray-700">Live Job</p>
          </div>
        </div>

        <div className="flex flex-col gap-8 items-center">
            <div className="flex justify-center py-4">
              <div className="flex items-center space-x-4 m-4">
                <div className="flex items-center justify-between w-[200px] h-22 bg-white shadow-md rounded-lg p-4">
                  <img src="images/Icon1.png" alt="" className="w-12 h-12" />
                  <div className="text-center ml-2">
                    <p className="text-lg font-semibold">1550</p>
                    <p className="text-gray-500">Live Job</p>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="flex items-center justify-between w-[170px] h-22 bg-white shadow-md rounded-lg p-4">
          <img src="images/Icon2.png" alt="" className="w-12 h-12" />
          <div className="text-center">
            <p className="text-lg font-semibold text-black">38,47,154</p>
            <p className="text-gray-700">Candidates</p>
          </div>
        </div>

        <div className="flex items-center justify-between w-[170px] h-22 bg-white shadow-md rounded-lg p-4">
          <img src="images/Icon3.png" alt="" className="w-12 h-12" />
          <div className="text-center">
            <p className="text-lg font-semibold text-black">7,532</p>
            <p className="text-gray-700">New Jobs</p>
          </div>
        </div>
      </div>
  );
};

export default Info;
