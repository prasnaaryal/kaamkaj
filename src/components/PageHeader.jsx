import React from 'react'

const PageHeader = ({title,path}) => {
  return (
    <div>
        <div>
            <h2 className='text-3xl text-blue-300 font-medium mb-1 text-center'>Estimate Salary</h2>
            <p className='text-sm text-center'><a href="/">Home</a>/ Salary</p>
        </div>
    </div>
  )
}

export default PageHeader