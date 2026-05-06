import React from 'react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import MarketingButton from '@/components/ui/MarketingButton';

export default function AboutPage() {
  return (
    <>
      {/* Short Hero */}
      <Section className="bg-[#0077B6] text-white pt-32 pb-20 mt-[-80px]">
        <Container className="text-center max-w-3xl pt-12">
          <Heading level={1} className="text-white mb-6">Revolutionizing Retail in Pakistan</Heading>
          <Text variant="body-lg" className="text-white/90">
            We built TijaratPro to solve the real, everyday challenges faced by shop owners. Say goodbye to messy khata registers and missing stock.
          </Text>
        </Container>
      </Section>

      {/* The Problem */}
      <Section className="bg-[#EDEDE9]">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Text variant="label" className="text-[#DA627D] mb-2">The Problem</Text>
              <Heading level={2}>Manual systems are costing you money.</Heading>
              <Text className="mb-6">
                Most retailers still rely on manual "hisaab kitabo" (ledgers) and basic calculators. This leads to missing stock, unrecorded sales, forgotten debts, and hours wasted on end-of-day calculations.
              </Text>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#DA627D]">close</span>
                  <Text>Hours lost calculating daily cash</Text>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#DA627D]">close</span>
                  <Text>No clear idea of which items are out of stock</Text>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#DA627D]">close</span>
                  <Text>Lost customer udhaar (credit) records</Text>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-soft border border-gray-200">
              <div className="w-16 h-16 bg-[#DA627D]/10 rounded-xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[#DA627D] text-3xl">calculate</span>
              </div>
              <Heading level={3}>The hidden cost of manual labor</Heading>
              <Text>
                Every mistake in manual calculation eats directly into your profit margin. Without proper systems, scaling to a second branch is almost impossible.
              </Text>
            </div>
          </div>
        </Container>
      </Section>

      {/* The Solution */}
      <Section className="bg-white">
        <Container>
          <SectionHeading 
            title="The Solution: TijaratPro" 
            subtitle="We built a platform that thinks like a retailer, but operates with the speed of modern cloud technology." 
          />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-gray-100 bg-[#f1f4f9]">
              <span className="material-symbols-outlined text-[#0077B6] text-3xl mb-4">bolt</span>
              <Heading level={3}>Lightning Fast</Heading>
              <Text>Process sales in seconds. Keep the queue moving even during peak rush hours.</Text>
            </div>
            <div className="p-6 rounded-xl border border-gray-100 bg-[#f1f4f9]">
              <span className="material-symbols-outlined text-[#0077B6] text-3xl mb-4">sync</span>
              <Heading level={3}>Always Synced</Heading>
              <Text>Check your shop's performance from your mobile device while sitting at home.</Text>
            </div>
            <div className="p-6 rounded-xl border border-gray-100 bg-[#f1f4f9]">
              <span className="material-symbols-outlined text-[#0077B6] text-3xl mb-4">account_balance_wallet</span>
              <Heading level={3}>Accurate Hisaab</Heading>
              <Text>Automated daily closing, expense tracking, and credit ledgers with zero math errors.</Text>
            </div>
          </div>
        </Container>
      </Section>

      {/* Who it's for */}
      <Section className="bg-[#EDEDE9]">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2}>Who is TijaratPro for?</Heading>
          </div>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <span className="material-symbols-outlined text-4xl text-[#6A994E] mb-3">smartphone</span>
              <Heading level={4}>Mobile Shops</Heading>
              <Text variant="body-sm">Track IMEIs, accessories, and repairs easily.</Text>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <span className="material-symbols-outlined text-4xl text-[#E9C46A] mb-3">checkroom</span>
              <Heading level={4}>Garment Boutiques</Heading>
              <Text variant="body-sm">Manage sizes, colors, and seasonal stock.</Text>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <span className="material-symbols-outlined text-4xl text-[#0077B6] mb-3">local_pharmacy</span>
              <Heading level={4}>Pharmacies</Heading>
              <Text variant="body-sm">Monitor expiry dates and batch numbers.</Text>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <span className="material-symbols-outlined text-4xl text-[#DA627D] mb-3">store</span>
              <Heading level={4}>General Retailers</Heading>
              <Text variant="body-sm">Supermarkets, grocers, and electronic stores.</Text>
            </div>
          </div>
        </Container>
      </Section>

      {/* Simple CTA */}
      <Section className="bg-white border-t border-gray-100">
        <Container className="text-center max-w-2xl">
          <Heading level={2}>Ready to digitize your shop?</Heading>
          <Text className="mb-8">Join hundreds of smart retailers who have already upgraded their business.</Text>
          <div className="flex justify-center">
            <MarketingButton variant="primary">Start your free trial today</MarketingButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
