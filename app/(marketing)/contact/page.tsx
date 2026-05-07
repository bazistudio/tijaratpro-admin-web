import React from 'react';
import { MessageCircle, Mail, Phone, MapPin, Send, ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | TijaratPro',
  description: 'Need help, a demo, or partnership? We\'re here to help your business grow.',
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-width text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-xl text-text-soft max-w-3xl mx-auto leading-relaxed">
            Need help, a custom demo, or partnership? Our team is here to 
            help your business transition to the cloud.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-width grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-black">Contact Information</h2>
              <p className="text-text-soft">
                Reach out to us through any of these channels. Our support team 
                usually responds within 2 hours during business hours.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <a href="https://wa.me/923000000000" className="glass-card p-8 flex flex-col gap-4 border-success/20 hover:bg-success/5">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <MessageCircle className="text-success" size={24} />
                </div>
                <h3 className="font-bold text-white text-lg">WhatsApp</h3>
                <p className="text-xs text-text-soft">Instant chat with support</p>
                <div className="flex items-center gap-1 text-success text-xs font-bold mt-2">
                  Chat Now <ChevronRight size={12} />
                </div>
              </a>

              <a href="mailto:support@tijaratpro.com" className="glass-card p-8 flex flex-col gap-4 border-primary/20 hover:bg-primary/5">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Mail className="text-primary" size={24} />
                </div>
                <h3 className="font-bold text-white text-lg">Email</h3>
                <p className="text-xs text-text-soft">support@tijaratpro.com</p>
                <div className="flex items-center gap-1 text-primary text-xs font-bold mt-2">
                  Send Email <ChevronRight size={12} />
                </div>
              </a>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 text-text-soft">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                  <Phone size={18} />
                </div>
                <span>+92 300 0000000</span>
              </div>
              <div className="flex items-center gap-4 text-text-soft">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                  <MapPin size={18} />
                </div>
                <span>Rawalpindi, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card p-10 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
            
            <form className="flex flex-col gap-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-text-soft uppercase tracking-wider">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full bg-white/5 border border-white/10 rounded-sm p-4 text-text placeholder:text-text-soft/30 focus:border-primary/50 outline-none transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-text-soft uppercase tracking-wider">Business Name</label>
                  <input 
                    type="text" 
                    placeholder="Mobile Shop Name" 
                    className="w-full bg-white/5 border border-white/10 rounded-sm p-4 text-text placeholder:text-text-soft/30 focus:border-primary/50 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-text-soft uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full bg-white/5 border border-white/10 rounded-sm p-4 text-text placeholder:text-text-soft/30 focus:border-primary/50 outline-none transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-text-soft uppercase tracking-wider">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="+92 300 0000000" 
                    className="w-full bg-white/5 border border-white/10 rounded-sm p-4 text-text placeholder:text-text-soft/30 focus:border-primary/50 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-text-soft uppercase tracking-wider">Message</label>
                <textarea 
                  rows={4} 
                  placeholder="How can we help your business?" 
                  className="w-full bg-white/5 border border-white/10 rounded-sm p-4 text-text placeholder:text-text-soft/30 focus:border-primary/50 outline-none transition-all resize-none"
                />
              </div>

              <button className="w-full py-5 rounded-sm font-bold text-lg bg-primary hover:bg-primary-dark text-white transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group mt-4">
                Send Message
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
