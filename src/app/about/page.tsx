import { Metadata } from 'next';
import About from '@/pages/AboutPage'

export const metadata: Metadata = {
  title: 'About PENTHOUSE LUXURY | Premium Living Redefined',
  description: 'Discover PENTHOUSE LUXURY\'s commitment to excellence in premium penthouses and luxury properties. Our expert team provides personalized service in finding exceptional penthouses worldwide.',
  keywords: 'luxury penthouses, PENTHOUSE LUXURY, premium properties, luxury homes, exclusive penthouses, high-end real estate, luxury apartments',
  openGraph: {
    title: 'About PENTHOUSE LUXURY | Premium Living Redefined',
    description: 'Experience unparalleled luxury with PENTHOUSE LUXURY. Our expert team specializes in exceptional penthouses and premium properties worldwide.',
    type: 'website',
    images: ['/og-image.jpg'],
  },
};

export default function AboutPage() {
  return (
    <>
    <About /></>
  );
}