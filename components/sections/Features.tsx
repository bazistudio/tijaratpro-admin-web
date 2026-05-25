import React from 'react';
import { Package, CreditCard, BarChart3, Users, Cloud, Bell, ArrowRight } from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: 'Inventory Management',
      description: 'Track stock levels, suppliers, categories, and automated low stock alerts in real-time.',
      icon: <Package className="text-primary" />,
      color: 'bg-primary/10'
    },
    {
      title: 'Smart Billing POS',
      description: 'Fast checkout system with barcode support, digital receipts, and WhatsApp integration.',
      icon: <CreditCard className="text-success" />,
      color: 'bg-success/10'
    },
    {
      title: 'Profit Analytics',
      description: 'Understand your revenue, daily profit, expenses, and business growth with visual insights.',
      icon: <BarChart3 className="text-blue-500" />,
      color: 'bg-blue-500/10'
    },
    {
      title: 'Customer Records',
      description: 'Manage customer dues, purchase history, and personalized reminders to drive repeat sales.',
      icon: <Users className="text-indigo-500" />,
      color: 'bg-indigo-500/10'
    },
    {
      title: 'Cloud Backup',
      description: 'Your business data stays secure, synced, and accessible from anywhere, anytime.',
      icon: <Cloud className="text-sky-500" />,
      color: 'bg-sky-500/10'
    },
    {
      title: 'Smart Alerts',
      description: 'Get notified about expired stock, low inventory, and pending payments instantly.',
      icon: <Bell className="text-warning" />,
      color: 'bg-warning/10'
    }
  ];

  return (
    <section className="section-padding relative overflow-hidden" id="features">
      <div className="container-width">
        <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col gap-6">
          <h2 className="text-4xl md:text-5xl font-black">
            Everything Your <span className="gradient-text">Shop Needs</span>
          </h2>
          <p className="text-lg text-text-soft">
            Inventory, billing, analytics, and business automation in one place. 
            Built specifically to modernize Pakistani businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="glass-card p-8 group">
              <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {React.cloneElement(feature.icon as React.ReactElement<any>, { size: 28 })}
              </div>
              <h3 className="text-xl font-bold text-text mb-4">{feature.title}</h3>
              <p className="text-text-soft leading-relaxed mb-6">
                {feature.description}
              </p>
              <div className="flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-4 transition-all opacity-0 group-hover:opacity-100 cursor-pointer">
                Learn more
                <ArrowRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
