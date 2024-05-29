import React from 'react'
import TopDetail from './components/TopDetail';
import Description from './components/Description';
import Rightbar from './components/Rightbar';

const JobDetail = () => {

    return (
        <div>
          <div className="pl-16 pr-16">
            <img src="images\banner4.jpg" className="w-full h-[400px]" alt="" />
          </div>
    
          <div className="py-10 pl-16 pr-16 ">
            <div className="container grid grid-cols-12 gap-8">
              <div className="col-span-8 gap-10 ">
                <TopDetail />
               
    
              
                {/*  description */}
    
                <Description />
                {/* property details */}
    
                
              </div>
    
              <div className="col-span-4">
                <Rightbar/>
              </div>
            </div>
          </div>
        </div>
      );

}

export default JobDetail