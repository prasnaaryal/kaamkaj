import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
    

      <main className="container mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">About Kaamkaj</h1>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-7">
            At Kaamkaj, our mission is to bridge the gap between employers and job seekers in Kathmandu by providing a user-friendly and efficient job portal. We aim to simplify the job search process and help individuals find their dream jobs while assisting companies in finding the right talent.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Who We Are</h2>
          <p className="text-lg text-gray-700 leading-7">
            Kaamkaj is a dedicated team of professionals based in Kathmandu, Nepal. With extensive experience in the recruitment industry, we understand the challenges faced by both job seekers and employers. Our platform is designed to address these challenges by offering a comprehensive and easy-to-use job portal.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">What We Offer</h2>
          <ul className="list-disc list-inside text-lg text-gray-700 leading-7">
            <li>Wide range of job listings across various industries</li>
            <li>Easy and efficient job application process</li>
            <li>Resources and tips for job seekers</li>
            <li>Advanced search and filtering options</li>
            <li>Company profiles and reviews</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
          <p className="text-lg text-gray-700 leading-7 mb-4">
            We’d love to hear from you! Whether you have a question about our services, need assistance, or want to provide feedback, feel free to reach out.
          </p>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
            <p className="mb-2"><strong>Email:</strong> info@kaamkaj.com</p>
            <p className="mb-2"><strong>Phone:</strong> +977-01-1234567</p>
            <p><strong>Address:</strong> New Baneshwor, Kathmandu, Nepal</p>
          </div>
        </section>
      </main>

  
    </div>
  );
};

export default About;
