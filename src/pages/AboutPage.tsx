import React from 'react';
import VisionSection from '../components/organisms/about/VisionSection';
import ExpertiseSection from '../components/organisms/about/ExpertiseSection';
import TeamSection from '../components/organisms/about/TeamSection';
import ContactSection from '../components/organisms/about/ContactSection';

const AboutPage = () => {
  return (
    <main className="min-h-screen pt-24">
    <VisionSection />
    <ExpertiseSection />
    <TeamSection />
    <ContactSection />
  </main>
  );
};

export default AboutPage;
