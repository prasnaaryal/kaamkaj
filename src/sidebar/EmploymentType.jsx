import React from 'react'
import InputField from '../components/InputField'

const EmploymentType = ({ handleChange }) => {
  return (
    <div>
    <h4 className="text-lg font-medium mb-2">Employment Type</h4>
    <div className="flex flex-col gap-2">
      <label className="sidebar-label-container">
        <input
          type="radio"
          name="test"
          id="test"
          value=""
          onChange={handleChange}
        />
        <span className="checkmark px-2"></span>Any type
      </label>


      <InputField
        handleChange={handleChange}
        value="Full-time"
        title="Full-time"
        name="test"
      />



      <InputField
        handleChange={handleChange}
        value="Part-time"
        title="Part-time"
        name="test"
      />

      <InputField
        handleChange={handleChange}
        value="Temporary"
        title="Temporary"
        name="test"
      />

    </div>
  </div>
  )
}

export default EmploymentType