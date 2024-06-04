import React from 'react'
import InputField from '../components/InputField'

const WorkExperience = ({ handleChange }) => {
  return (
    <div>
    <h4 className="text-lg font-medium mb-2">Work Experience</h4>
    <div className="flex flex-col gap-2">
     

      <InputField
        handleChange={handleChange}
        value="All"
        title="All"
        name="test"
      />

      <InputField
        handleChange={handleChange}
        value="Intership"
        title="Intership"
        name="test"
      />

      <InputField
        handleChange={handleChange}
        value="Work remotely"
        title="Work remotely"
        name="test"
      />

    </div>
  </div>  )
}

export default WorkExperience