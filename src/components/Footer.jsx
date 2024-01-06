import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <h1 className="text-3xl font-bold tracking-wide">UrbanGuard</h1>
          <p className="text-gray-500">Building safer and smarter cities</p>
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
          <div>
            <h2 className="text-lg font-bold mb-2">Contact Us</h2>
            <p>Email: info@urbanguard.com</p>
            <p>Phone: +1 123-456-7890</p>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-2">Quick Links</h2>
            <ul className="list-none p-0">
              <li className="mb-2"><a href="#home" className="text-gray-400 hover:text-white">Home</a></li>
              <li className="mb-2"><a href="#features" className="text-gray-400 hover:text-white">Features</a></li>
              <li className="mb-2"><a href="#safety-tips" className="text-gray-400 hover:text-white">Safety Tips</a></li>
              {/* Add more links as needed */}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-800 text-center">
        <p className="text-sm text-gray-500 mt-3">
          &copy; {new Date().getFullYear()} UrbanGuard. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
