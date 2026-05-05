import React from 'react';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';

const Features = () => {
  return (
    <>
      {/* Features Bento Grid */}
      <section className="py-xl bg-white/50" id="features">
        <Container>
          <SectionHeading 
            title="Everything you need to grow" 
            subtitle="Powerful tools tailored for retail success, from single boutiques to multi-branch chains." 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {/* Feature Card 1 */}
            <div className="bg-white p-8 rounded-xl shadow-soft border border-gray-100 hover:scale-[1.02] transition-transform">
              <div className="w-12 h-12 rounded-lg bg-[#0077B6]/10 text-[#0077B6] flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">inventory_2</span>
              </div>
              <h3 className="font-h3 text-h3 text-[#003049] mb-3">Inventory</h3>
              <p className="font-body-md text-gray-600">Real-time stock tracking with automated low-stock alerts and smart reordering suggestions.</p>
            </div>
            {/* Feature Card 2 */}
            <div className="bg-white p-8 rounded-xl shadow-soft border border-gray-100 hover:scale-[1.02] transition-transform">
              <div className="w-12 h-12 rounded-lg bg-[#0077B6]/10 text-[#0077B6] flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">point_of_sale</span>
              </div>
              <h3 className="font-h3 text-h3 text-[#003049] mb-3">Sales</h3>
              <p className="font-body-md text-gray-600">Fast, intuitive POS system that works offline and handles complex promotions effortlessly.</p>
            </div>
            {/* Feature Card 3 */}
            <div className="bg-white p-8 rounded-xl shadow-soft border border-gray-100 hover:scale-[1.02] transition-transform">
              <div className="w-12 h-12 rounded-lg bg-[#0077B6]/10 text-[#0077B6] flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">storefront</span>
              </div>
              <h3 className="font-h3 text-h3 text-[#003049] mb-3">Multi-Shop</h3>
              <p className="font-body-md text-gray-600">Manage multiple locations from a single dashboard. Synchronize pricing and stock across branches.</p>
            </div>
            {/* Feature Card 4 */}
            <div className="bg-white p-8 rounded-xl shadow-soft border border-gray-100 hover:scale-[1.02] transition-transform">
              <div className="w-12 h-12 rounded-lg bg-[#0077B6]/10 text-[#0077B6] flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">group</span>
              </div>
              <h3 className="font-h3 text-h3 text-[#003049] mb-3">Customers</h3>
              <p className="font-body-md text-gray-600">Built-in CRM to track purchase history, manage loyalty programs, and drive repeat visits.</p>
            </div>
            {/* Feature Card 5 */}
            <div className="bg-white p-8 rounded-xl shadow-soft border border-gray-100 hover:scale-[1.02] transition-transform">
              <div className="w-12 h-12 rounded-lg bg-[#0077B6]/10 text-[#0077B6] flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">bar_chart</span>
              </div>
              <h3 className="font-h3 text-h3 text-[#003049] mb-3">Reports</h3>
              <p className="font-body-md text-gray-600">Deep insights with automated financial reports, sales trends, and tax-ready documentation.</p>
            </div>
            {/* Feature Card 6 */}
            <div className="bg-white p-8 rounded-xl shadow-soft border border-gray-100 hover:scale-[1.02] transition-transform">
              <div className="w-12 h-12 rounded-lg bg-[#0077B6]/10 text-[#0077B6] flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">cloud_done</span>
              </div>
              <h3 className="font-h3 text-h3 text-[#003049] mb-3">Cloud</h3>
              <p className="font-body-md text-gray-600">Your data is safe and accessible from anywhere. Secure cloud backups happen automatically.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* How it Works Section */}
      <section className="py-xl" id="about">
        <Container>
          <SectionHeading 
            title="Start selling in minutes" 
            subtitle="Getting started with TijaratPro is simple. Follow these three easy steps." 
          />
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-1/4 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#0077B6] text-white flex items-center justify-center text-h3 font-bold mb-6 border-8 border-white shadow-md">1</div>
              <h3 className="font-h3 text-h3 text-[#003049] mb-3">Create Shop</h3>
              <p className="font-body-md text-gray-600">Register your business and set up your profile in just a few clicks.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#0077B6] text-white flex items-center justify-center text-h3 font-bold mb-6 border-8 border-white shadow-md">2</div>
              <h3 className="font-h3 text-h3 text-[#003049] mb-3">Add Products</h3>
              <p className="font-body-md text-gray-600">Upload your inventory via Excel or use our easy manual entry tool.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#0077B6] text-white flex items-center justify-center text-h3 font-bold mb-6 border-8 border-white shadow-md">3</div>
              <h3 className="font-h3 text-h3 text-[#003049] mb-3">Start Selling</h3>
              <p className="font-body-md text-gray-600">Open your register and begin processing orders with our lightning-fast POS.</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Features;
