import React from 'react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import MarketingButton from '@/components/ui/MarketingButton';

export default function PublicProductsPage() {
  return (
    <>
      <Section className="bg-[#0077B6] text-white pt-32 pb-20 mt-[-80px]">
        <Container className="text-center max-w-3xl pt-12">
          <Heading level={1} className="text-white mb-6">Built for Every Business</Heading>
          <Text variant="body-lg" className="text-white/90">
            Explore our specialized modules designed for the unique needs of different retail industries in Pakistan.
          </Text>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <SectionHeading 
            title="Our Modules" 
            subtitle="Choose the perfect fit for your shop. Each module comes with custom fields and workflows tailored to your business." 
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-gray-100 bg-[#f8f9fa] hover:shadow-lg transition-all">
              <span className="material-symbols-outlined text-4xl text-[#0077B6] mb-4">smartphone</span>
              <Heading level={3}>Mobile & Electronics</Heading>
              <Text className="mb-4">Track IMEI numbers, warranty status, and handle repair tickets with ease.</Text>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm text-gray-600 italic">
                  <span className="material-symbols-outlined text-xs text-[#0077B6]">check_circle</span>
                  IMEI Management
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600 italic">
                  <span className="material-symbols-outlined text-xs text-[#0077B6]">check_circle</span>
                  Repair Tracking
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl border border-gray-100 bg-[#f8f9fa] hover:shadow-lg transition-all">
              <span className="material-symbols-outlined text-4xl text-[#DA627D] mb-4">local_pharmacy</span>
              <Heading level={3}>Pharmacy & Healthcare</Heading>
              <Text className="mb-4">Manage batch numbers, expiry dates, and formula-based inventory tracking.</Text>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm text-gray-600 italic">
                  <span className="material-symbols-outlined text-xs text-[#DA627D]">check_circle</span>
                  Expiry Alerts
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600 italic">
                  <span className="material-symbols-outlined text-xs text-[#DA627D]">check_circle</span>
                  Batch Tracking
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl border border-gray-100 bg-[#f8f9fa] hover:shadow-lg transition-all">
              <span className="material-symbols-outlined text-4xl text-[#6A994E] mb-4">settings</span>
              <Heading level={3}>Auto Parts & Hardware</Heading>
              <Text className="mb-4">Specialized search by vehicle model, engine type, and part number compatibility.</Text>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm text-gray-600 italic">
                  <span className="material-symbols-outlined text-xs text-[#6A994E]">check_circle</span>
                  Vehicle Compatibility
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600 italic">
                  <span className="material-symbols-outlined text-xs text-[#6A994E]">check_circle</span>
                  Part No. Search
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#EDEDE9]">
        <Container className="text-center">
          <Heading level={2} className="mb-6">Don't see your industry?</Heading>
          <Text className="mb-8 max-w-2xl mx-auto">
            Our general retail module is flexible enough to handle any business. Contact us for a custom consultation.
          </Text>
          <MarketingButton variant="primary">Talk to an Expert</MarketingButton>
        </Container>
      </Section>
    </>
  );
}
