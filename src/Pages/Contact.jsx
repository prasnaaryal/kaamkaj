import React from 'react';

const Contact = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
   

      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Contact us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Reach Us At</h2>
            <p className="mb-2"><strong>Phone:</strong> +91-9998887776</p>
            <p className="mb-2"><strong>Email:</strong> feedback@kaamkaj.org</p>
            <p><strong>Address:</strong> K.L Tower, Chabahil,Kathmandu,Nepal</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Branding & Collaboration</h2>
            <p className="mb-2"><strong>Email:</strong> branding@kaamkaj.org</p>
            <p><strong>Address:</strong> K.L Tower, Chabahil,Kathmandu,Nepal</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Feedback & Queries</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="issue" className="block text-sm font-medium text-gray-700">Select Issue*</label>
              <select id="issue" name="issue" className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                <option>-- Select Your Query --</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address*</label>
              <input type="email" id="email" name="email" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="abc@kaamkaj.org" />
            </div>
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact No</label>
              <input type="text" id="contact" name="contact" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Submit</button>
            </div>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26815.840528783585!2d85.35064874714767!3d27.72066174502338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb197d9d23f7ed%3A0x2724281b4393865d!2sChabahil%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1721024913774!5m2!1sen!2snp"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </main>

     
    </div>
  );
};

export default Contact;
