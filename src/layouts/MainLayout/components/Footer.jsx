import React, { useState } from "react";


const Footer = () => {
  return (
    <div className="w-full h-80 bg-[#18191C] p-28">
      <div className=" grid grid-cols-12">
        <div className="col-span-3 flex flex-col gap-6">
          <h1 className="text-xl font-medium leading-7 text-white ">Support</h1>
          <div className="flex flex-col gap-4">
            <p className="text-base leading-6 text-white">Kathmandu, Nepal</p>
            <p className="text-base leading-6 text-white">
              hamropasal@gmail.com
            </p>
            <p className="text-base leading-6 text-white">+014822095</p>
          </div>
        </div>
        <div className="col-span-3 flex flex-col gap-6">
          <h1 className="text-xl font-medium leading-7 text-white ">Account</h1>
          <div className="flex flex-col gap-4">
            <p className="text-base leading-6 text-white">My Account</p>
            <p className="text-base leading-6 text-white">Login / Register </p>
            <p className="text-base leading-6 text-white">Cart</p>
            <p className="text-base leading-6 text-white">Wishlist</p>
          </div>
        </div>
        <div className="col-span-3 flex flex-col gap-6">
          <h1 className="text-xl font-medium leading-7 text-white ">
            Quick Link
          </h1>
          <div className="flex flex-col gap-4">
            <p className="text-base leading-6 text-white">Privacy Policy</p>
            <p className="text-base leading-6 text-white">Terms Of Use </p>
            <p className="text-base leading-6 text-white">FAQ</p>
            <p className="text-base leading-6 text-white">Contact</p>
          </div>
        </div>
        {/* <div className="col-span-3 flex flex-col gap-6">
          <h1 className="text-xl font-medium leading-7 text-white ">
            Download
          </h1>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-6">
              <img src={qrcode} className="w-full h-auto" alt="QR-Code" />
            </div>
            <div className="col-span-6 flex flex-col gap-2">
              <img src={appstore} className="w-full h-auto" alt="appstore" />
              <img
                src={googlestore}
                className="w-full h-auto"
                alt="googlestore"
              />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Footer;