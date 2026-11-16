import React, { useState } from 'react';
import { LandingNav } from '../components/landing/LandingNav';
import { HeroSection } from '../components/landing/HeroSection';
import { ProblemSection } from '../components/landing/ProblemSection';
import { FeaturesSection } from '../components/landing/FeaturesSection';
import { OrderJourneySection } from '../components/landing/OrderJourneySection';
import { ProductShowcaseSection } from '../components/landing/ProductShowcaseSection';
import { PricingSection } from '../components/landing/PricingSection';
import { FinalCta } from '../components/landing/FinalCta';
import { Footer } from '../components/landing/Footer';
import { DemoModal } from '../components/common/DemoModal';
import { useLaundry } from '../context/LaundryContext';

export const LandingPage: React.FC = () => {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const { updateTenantSubscription, currentTenantId, addToast } = useLaundry();

  const handleSelectPlan = (plan: 'Starter' | 'Growth' | 'Enterprise') => {
    updateTenantSubscription(currentTenantId, plan);
    setDemoModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-charcoal">
      {/* Navigation */}
      <LandingNav onOpenDemoModal={() => setDemoModalOpen(true)} />

      {/* Hero Section */}
      <HeroSection onOpenDemo={() => setDemoModalOpen(true)} />

      {/* Problem Section */}
      <ProblemSection />

      {/* Platform Features Section */}
      <FeaturesSection onOpenDemo={() => setDemoModalOpen(true)} />

      {/* 8-Stage Order Journey */}
      <OrderJourneySection />

      {/* Product Showcase Inside Laptop Frame */}
      <ProductShowcaseSection />

      {/* Pricing Section */}
      <PricingSection onSelectPlan={handleSelectPlan} />

      {/* Final Conversion CTA */}
      <FinalCta onOpenDemo={() => setDemoModalOpen(true)} />

      {/* Footer */}
      <Footer />

      {/* Demo Modal */}
      <DemoModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </div>
  );
};
