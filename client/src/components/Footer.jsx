import React from 'react'
import logo from '../assets/logo.svg' // adjust path if needed

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500 bg-gray-50">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
        
        {/* Logo + About */}
        <div className="md:max-w-96">
          <img src={logo} alt="Quick AI Logo" className="w-32 h-auto" />
          <p className="mt-6 text-sm leading-relaxed">
            Quick AI helps you create, enhance, and optimize your content with 
            lightning-fast AI tools. Built to make your workflow smoother, 
            smarter, and more efficient.
          </p>
        </div>

        {/* Links + Newsletter */}
        <div className="flex-1 flex items-start md:justify-end gap-20">
          <div>
            <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-indigo-600">Home</a></li>
              <li><a href="#" className="hover:text-indigo-600">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-600">Contact</a></li>
              <li><a href="#" className="hover:text-indigo-600">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-gray-800 mb-5">Stay Updated</h2>
            <div className="text-sm space-y-2">
              <p>Get the latest AI tools, updates, and insights delivered weekly.</p>
              <div className="flex items-center gap-2 pt-4">
                <input 
                  className="border border-gray-500/30 placeholder-gray-500 focus:ring-2 ring-indigo-600 outline-none w-full max-w-64 h-9 rounded px-2" 
                  type="email" 
                  placeholder="Enter your email"
                />
                <button className="bg-indigo-600 w-24 h-9 text-white rounded hover:bg-indigo-700 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <p className="pt-4 text-center text-xs md:text-sm pb-5">
        © {new Date().getFullYear()} <span className="font-semibold text-indigo-600">Quick AI</span>. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
