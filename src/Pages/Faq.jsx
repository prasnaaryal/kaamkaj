import React from 'react';

const FAQ = () => {
  const faqs = [
    {
      question: "What is Kaamkaj?",
      answer: "Kaamkaj is a job portal based in Kathmandu, Nepal, designed to connect job seekers with employers across various industries.",
    },
    {
      question: "How can I create an account?",
      answer: "To create an account, click on the 'Sign Up' button at the top right corner of the page, fill in your details, and submit the form.",
    },
    {
      question: "How do I apply for jobs?",
      answer: "Once you have created an account and logged in, you can browse job listings and click on the 'Apply' button for the jobs you are interested in.",
    },
    {
      question: "How can I post a job?",
      answer: "If you are an employer, you can post a job by logging into your account and clicking on the 'Post a Job' button. Fill in the job details and submit the form.",
    },
    {
      question: "Is there a fee to use Kaamkaj?",
      answer: "Creating an account and browsing job listings is free. However, there may be fees for premium services such as featured job postings and employer branding.",
    },
    {
      question: "How can I contact customer support?",
      answer: "You can contact our customer support team by emailing us at support@kaamkaj.com or calling us at +977-01-1234567.",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
     

      <main className="container mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">{faq.question}</h2>
              <p className="text-lg text-gray-700 leading-7">{faq.answer}</p>
            </div>
          ))}
        </div>
      </main>

      
    </div>
  );
};

export default FAQ;
