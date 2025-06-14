import React, { useState } from 'react';
import { Mail, Phone, User, Search, ArrowRight } from 'lucide-react'; // Assuming lucide-react is available for icons

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    message: '',
    privacyAccepted: false,
  });

  const MESSAGE_MAX_LENGTH = 300;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacyAccepted) {
      alert('Please agree to the Privacy Policy terms.');
      return;
    }
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      fullName: '',
      email: '',
      phoneNumber: '',
      message: '',
      privacyAccepted: false,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
        {/* Left Section - Text Content */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <span className="inline-block bg-gray-800 text-gray-200 text-xs font-semibold px-3 py-1 rounded-full mb-4">Contact Us</span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">Let's Get In Touch.</h1>
          <p className="text-gray-400 text-lg">
            Or just reach out manually to <a href="mailto:hello@slothui.com" className="text-appPalette-purple-300 hover:underline">hello@slothui.com</a>.
          </p>
        </div>

        {/* Right Section - Contact Form */}
        <div className="bg-gray-800 p-8 md:p-12 lg:p-16 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name..."
                  className="w-full px-4 py-3 pl-10 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-appPalette-purple-500 text-white placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address..."
                  className="w-full px-4 py-3 pl-10 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-appPalette-purple-500 text-white placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
              <div className="relative">
                {/* Simplified phone input - real app would use a dedicated library for country codes */}
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+44 (000) 000-0000"
                  className="w-full px-4 py-3 pl-10 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-appPalette-purple-500 text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                maxLength={MESSAGE_MAX_LENGTH}
                placeholder="Enter your main text here..."
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-appPalette-purple-500 resize-y"
                required
              ></textarea>
              <div className="text-right text-sm text-gray-400 mt-1">
                {formData.message.length}/{MESSAGE_MAX_LENGTH}
              </div>
            </div>

            {/* Privacy Policy Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="privacyAccepted"
                name="privacyAccepted"
                checked={formData.privacyAccepted}
                onChange={handleChange}
                className="h-4 w-4 text-appPalette-purple-500 rounded border-gray-600 focus:ring-appPalette-purple-500 bg-gray-700"
              />
              <label htmlFor="privacyAccepted" className="ml-2 block text-sm text-gray-300">
                I hereby agree to our <a href="#" className="text-appPalette-purple-300 hover:underline">Privacy Policy</a> terms.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-appPalette-purple-500 hover:bg-appPalette-purple-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-appPalette-purple-500 focus:ring-offset-2 focus:ring-offset-appPalette-purple-900"
            >
              Submit Form
              <ArrowRight className="ml-2" size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 