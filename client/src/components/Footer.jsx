import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10 px-6 border-t">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-gray-700">
        {/* Logo */}
        <div>
          <h3 className="font-bold text-lg text-blue-600">🛡️ SafeTour India</h3>
          <p className="mt-2 text-sm">Smart technology for safer tourism across India</p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold mb-2">For Tourists</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#">Digital ID Registration</a></li>
            <li><a href="#">Route Planning</a></li>
            <li><a href="#">Emergency Services</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">For Authorities</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#">Police Dashboard</a></li>
            <li><a href="#">Hotel Verification</a></li>
            <li><a href="#">Monitoring Tools</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Support</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm text-gray-500 mt-6">
        © 2024 SafeTour India. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
