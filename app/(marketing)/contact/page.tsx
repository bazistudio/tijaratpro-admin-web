import React from 'react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Text from '@/components/ui/Text';
import MarketingButton from '@/components/ui/MarketingButton';

export default function ContactPage() {
  return (
    <>
      <Section className="bg-[#EDEDE9]">
        <Container className="max-w-4xl">
          <SectionHeading 
            title="Get in Touch" 
            subtitle="Have questions about TijaratPro? Want to schedule a personalized demo? Fill out the form below and our team will get back to you within 24 hours." 
          />
          
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-soft border border-gray-100">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block font-semibold text-sm text-[#003049]">
                    Full Name <span className="text-[#DA627D]">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0077B6] focus:border-[#0077B6] transition-all outline-none" 
                    placeholder="Ali Khan"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="block font-semibold text-sm text-[#003049]">
                    Phone Number <span className="text-[#DA627D]">*</span>
                  </label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0077B6] focus:border-[#0077B6] transition-all outline-none" 
                    placeholder="0300 1234567"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="shopName" className="block font-semibold text-sm text-[#003049]">
                  Shop Name
                </label>
                <input 
                  type="text" 
                  id="shopName" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0077B6] focus:border-[#0077B6] transition-all outline-none" 
                  placeholder="Ali Mobile & Accessories"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block font-semibold text-sm text-[#003049]">
                  Message <span className="text-[#DA627D]">*</span>
                </label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0077B6] focus:border-[#0077B6] transition-all outline-none resize-none" 
                  placeholder="Tell us about your business needs..."
                  required
                ></textarea>
              </div>

              <div className="pt-4">
                <MarketingButton type="submit" variant="primary" fullWidth>
                  Send Message
                </MarketingButton>
              </div>
            </form>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8 text-center border-t border-gray-200 pt-16">
            <div>
              <span className="material-symbols-outlined text-3xl text-[#0077B6] mb-3">call</span>
              <Text variant="label" className="block mb-1">Call Us</Text>
              <Text className="font-semibold text-[#003049]">+92 300 1234567</Text>
            </div>
            <div>
              <span className="material-symbols-outlined text-3xl text-[#0077B6] mb-3">mail</span>
              <Text variant="label" className="block mb-1">Email Support</Text>
              <Text className="font-semibold text-[#003049]">support@tijaratpro.pk</Text>
            </div>
            <div>
              <span className="material-symbols-outlined text-3xl text-[#0077B6] mb-3">location_on</span>
              <Text variant="label" className="block mb-1">Office</Text>
              <Text className="font-semibold text-[#003049]">Lahore, Pakistan</Text>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
