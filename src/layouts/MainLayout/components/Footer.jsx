import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full h-80 bg-[#18191C] px-28 py-16">
      <div className="grid grid-cols-12">
        <div className="col-span-3 flex gap-6">
          <img className="w-28 h-8" src="/images/Jendo.png" alt="Logo" />       
        </div>
        <div className="col-span-3 flex flex-col gap-6 pb-10">
          <h1 className="text-xl font-medium leading-7 text-white">Support</h1>
          <div className="flex flex-col gap-4">
            <p className="text-base leading-6 text-white">Kathmandu, Nepal</p>
            <p className="text-base leading-6 text-white">kaamkaj@gmail.com</p>
            <p className="text-base leading-6 text-white">+014822095</p>
          </div>
        </div>
        <div className="col-span-3 flex flex-col gap-6">
          <h1 className="text-xl font-medium leading-7 text-white">Account</h1>
          <div className="flex flex-col gap-4">
            <Link to="/" className="text-base leading-6 text-white">Login</Link>
            <Link to="/" className="text-base leading-6 text-white">Register</Link>
            <Link to="/" className="text-base leading-6 text-white">Search a Job</Link>
            <Link to="/aboutus" className="text-base leading-6 text-white">About us</Link>
          </div>
        </div>
        <div className="col-span-3 flex flex-col gap-6">
          <h1 className="text-xl font-medium leading-7 text-white">Quick Link</h1>
          <div className="flex flex-col gap-4">
            <Link to="/" className="text-base leading-6 text-white">Privacy Policy</Link>
            <Link to="/" className="text-base leading-6 text-white">Terms Of Use</Link>
            <Link to="/faq" className="text-base leading-6 text-white">FAQ</Link>
            <Link to="/contactus" className="text-base leading-6 text-white">Contact</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
