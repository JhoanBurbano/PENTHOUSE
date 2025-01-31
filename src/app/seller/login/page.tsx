import { Metadata } from 'next';
import LoginHeader from '@/components/organisms/login/LoginHeader';
import LoginForm from '@/components/molecules/LoginForm';

export const metadata: Metadata = {
  title: 'Seller Login | PENTHOUSE LUXURY Portal',
  description: 'Access the exclusive PENTHOUSE LUXURY seller portal. Manage your luxury properties and connect with elite buyers seeking premium penthouses.',
  keywords: 'luxury real estate portal, penthouse seller login, luxury property management, premium real estate platform',
  openGraph: {
    title: 'Seller Login | PENTHOUSE LUXURY Portal',
    description: 'Access your exclusive seller portal at PENTHOUSE LUXURY. Manage your premium properties and connect with qualified buyers.',
    type: 'website',
    images: ['/og-image.jpg'],
  },
};

export default function LoginPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center">
          <LoginHeader />
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
