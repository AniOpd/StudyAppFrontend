// ContactUs.jsx
import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState('');
  const serviceID = import.meta.env.VITE_SERVICE_ID;
  const templateID = import.meta.env.VITE_TEMPLATE_ID;
  const userID = import.meta.env.VITE_PUBLIC_KEY;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(serviceID, templateID, formData,userID)
      .then((response) => {
        setStatus('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      })
      .catch((error) => {
        console.error('Failed to send message. Error: ', error);
        setStatus('Failed to send message. Please try again.');
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white text-gray-900 shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-blue-500 mb-4">Contact Us</h1>
      <p className="text-gray-600 mb-6">We would love to hear from you! Please fill out the form below to get in touch.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-gray-700 font-medium">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-700 font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="subject" className="text-gray-700 font-medium">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="message" className="text-gray-700 font-medium">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="mt-1 p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Send Message
        </button>
        {status && <p className="mt-4 text-gray-700">{status}</p>}
      </form>
    </div>
  );
};

export default ContactUs;
