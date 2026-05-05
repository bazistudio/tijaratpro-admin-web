import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200" id="contact">
      <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12">
        <div className="col-span-2">
          <div className="text-xl font-bold text-[#003049] mb-6">TijaratPro</div>
          <p className="text-gray-500 font-manrope text-sm max-w-xs leading-relaxed mb-8">Empowering retailers with the tools they need to manage inventory, sales, and customers in a unified cloud ecosystem.</p>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#0077B6] hover:text-white transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-sm">public</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#0077B6] hover:text-white transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-sm">mail</span>
            </div>
          </div>
        </div>
        <div>
          <h5 className="font-bold text-[#003049] mb-6">Product</h5>
          <ul className="space-y-4">
            <li><a className="text-gray-500 font-manrope text-sm hover:underline hover:text-[#0077B6]" href="#">Inventory Management</a></li>
            <li><a className="text-gray-500 font-manrope text-sm hover:underline hover:text-[#0077B6]" href="#">POS Software</a></li>
            <li><a className="text-gray-500 font-manrope text-sm hover:underline hover:text-[#0077B6]" href="#">Reporting Tools</a></li>
            <li><a className="text-gray-500 font-manrope text-sm hover:underline hover:text-[#0077B6]" href="#">Integrations</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-[#003049] mb-6">Solutions</h5>
          <ul className="space-y-4">
            <li><a className="text-gray-500 font-manrope text-sm hover:underline hover:text-[#0077B6]" href="#">Boutiques</a></li>
            <li><a className="text-gray-500 font-manrope text-sm hover:underline hover:text-[#0077B6]" href="#">Electronics</a></li>
            <li><a className="text-gray-500 font-manrope text-sm hover:underline hover:text-[#0077B6]" href="#">Supermarkets</a></li>
            <li><a className="text-gray-500 font-manrope text-sm hover:underline hover:text-[#0077B6]" href="#">Pharmacy</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-[#003049] mb-6">Support</h5>
          <ul className="space-y-4">
            <li><a className="text-gray-500 font-manrope text-sm hover:underline hover:text-[#0077B6]" href="#">Help Center</a></li>
            <li><a className="text-gray-500 font-manrope text-sm hover:underline hover:text-[#0077B6]" href="#">Contact Us</a></li>
            <li><a className="text-gray-500 font-manrope text-sm hover:underline hover:text-[#0077B6]" href="#">Documentation</a></li>
            <li><a className="text-gray-500 font-manrope text-sm hover:underline hover:text-[#0077B6]" href="#">Live Chat</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-[#003049] mb-6">Legal</h5>
          <ul className="space-y-4">
            <li><a className="text-gray-500 font-manrope text-sm hover:underline hover:text-[#0077B6]" href="#">Privacy Policy</a></li>
            <li><a className="text-gray-500 font-manrope text-sm hover:underline hover:text-[#0077B6]" href="#">Terms of Service</a></li>
            <li><a className="text-gray-500 font-manrope text-sm hover:underline hover:text-[#0077B6]" href="#">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 py-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 font-manrope text-sm">© 2024 TijaratPro ERP. All rights reserved.</p>
        <div className="flex gap-6">
          <span className="text-gray-500 text-sm">English (US)</span>
          <span className="text-gray-500 text-sm">System Status: <span className="text-[#6A994E] font-bold">Operational</span></span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
