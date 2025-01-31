import { Metadata } from 'next';
import ContactHeader from '@/components/organisms/contact/ContactHeader';
import ContactFormSection from '@/components/organisms/contact/ContactFormSection';

export const metadata: Metadata = {
  title: 'Contact PENTHOUSE LUXURY | Connect with Our Luxury Specialists',
  description: 'Connect with PENTHOUSE LUXURY\'s elite team of specialists. We\'re here to help you find your perfect luxury penthouse and answer any questions about our premium properties.',
  keywords: 'luxury penthouses, contact penthouse luxury, luxury real estate contact, premium properties inquiry, penthouse specialists',
  openGraph: {
    title: 'Contact PENTHOUSE LUXURY | Connect with Our Luxury Specialists',
    description: 'Reach out to our elite team of specialists at PENTHOUSE LUXURY. We\'re here to guide you through our exclusive collection of premium penthouses.',
    type: 'website',
    images: ['/og-image.jpg'],
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-24">
      <ContactHeader />
      <ContactFormSection />
    </main>
  );
}
