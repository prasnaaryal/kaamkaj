import React, { useEffect, useState } from 'react'
import { FaArrowsAlt } from 'react-icons/fa'
import { FaBath, FaLocationDot } from 'react-icons/fa6'
import { IoBed } from 'react-icons/io5'
import Card from '../../../components/Card'
import Jobs from '../../Jobs'

const TopDetail = () => {

  return (
    <div className="bg-white shadow-lg">
    <button
      className="rounded-full h-7 w-14 bg-green-500 bg-opacity-20 text-teal-500 font-xl m-4 "
    
      size="lg"
    >
      Sale
    </button>

    <div className="px-6 mb-4">
      <div className="font-bold text-xl mb-2">Resort Valley Ocs</div>
      <p className="text-teal-400 mb-2">$7000</p>
      <p className="text-indigo-300 text-base flex">
        <FaLocationDot className="text-indigo-200 mt-1" />
        778 Panama City,FL
      </p>
    </div>

    <div className="flex ml-5 gap-5 pb-4 pt-4">
      <div className="flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full">
        <IoBed />
      </div>
      <p className="text-[#616E96] font-semibold text-sm	">4 Beds</p>

      <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full">
        <FaBath />
      </div>
      <p className="text-[#616E96] font-semibold text-sm">4 Baths</p>

      <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full">
        <FaArrowsAlt />
      </div>
      <p className="text-[#616E96] font-semibold text-sm	">
        1200 sqft
      </p>
    </div>
  </div> 





)
}

export default TopDetail