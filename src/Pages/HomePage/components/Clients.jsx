import React from "react";

const Clients = () => {
  return (
    <div className="flex flex-col bg-slate-100 py-12">
      <div className="container mx-auto">
        <h1 className="text-center text-3xl font-semibold mb-8">
          Clients Testimonials
        </h1>
        <div className="flex justify-center space-x-4">
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <img src="images/Rating.png" alt="Rating" className="w-20 mx-auto" />
            <p className="text-center mt-4 text-gray-700">
              Ut ullamcorper hendrerit tempor. Aliquam in rutrum dui. Maecenas ac placerat metus, in faucibus est.
            </p>
            <div className="flex items-center mt-16 justify-center">
              <img src="images\Image (1).png" alt="Robert Fox" className="w-12 h-12 rounded-full" />
              <div className="ml-4 text-center">
                <h1 className="font-semibold">Robert Fox</h1>
                <p className="text-gray-500">UI/UX Designer</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <img src="images/Rating.png" alt="Rating" className="w-20 mx-auto" />
            <p className="text-center mt-4 text-gray-700">
              Mauris eget lorem odio. Mauris convallis justo molestie metus aliquam lacinia. Suspendisse ut dui vulputate augue condimentum ornare. Morbi vitae tristique ante.
            </p>
            <div className="flex items-center mt-6 justify-center">
              <img src="images/person.png" alt="Bessie Cooper" className="w-12 h-12 rounded-full" />
              <div className="ml-4 text-center">
                <h1 className="font-semibold">Bessie Cooper</h1>
                <p className="text-gray-500">Creative Director</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <img src="images/Rating.png" alt="Rating" className="w-20 mx-auto" />
            <p className="text-center mt-4 text-gray-700">
              Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse et magna quis nibh accumsan venenatis et amet orci.
            </p>
            <div className="flex items-center mt-6 justify-center">
              <img src="images/person2.png" alt="Jane Cooper" className="w-12 h-12 rounded-full" />
              <div className="ml-4 text-center">
                <h1 className="font-semibold">Jane Cooper</h1>
                <p className="text-gray-500">Photographer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex justify-center mt-10 ">
        <img src="images\Tracker.png" alt="tracker"/>
      </div>
   

    </div>
  );
};

export default Clients;
