import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Smartphone,
  LayoutDashboard,
  Layers,
  Cpu,
  X,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSelect = (route: string) => {
    onClose();
    navigate(route);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-charcoal/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-background rounded-2xl border border-border shadow-drawer overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-border flex items-start justify-between bg-white">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-sage-100 text-forest border border-sage-200">
                INTERACTIVE PROTOTYPE
              </span>
              <span className="text-xs text-charcoal-muted">Zero setup required</span>
            </div>
            <h2 className="text-2xl font-display font-bold text-charcoal mt-1.5">
              Explore LaundryOS Demo
            </h2>
            <p className="text-sm text-charcoal-muted mt-0.5">
              Experience the end-to-end multi-tenant platform from 3 interconnected perspectives.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-charcoal-muted hover:text-charcoal rounded-xl hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Main Demo Experiences */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 bg-background">
          {/* 1. Customer App */}
          <div
            onClick={() => handleSelect('/app')}
            className="group cursor-pointer rounded-xl bg-white border border-border p-5 hover:border-sage-400 hover:shadow-card transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-sage-100 text-forest flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-sage-600 mb-1">
                Experience 01
              </div>
              <h3 className="text-base font-bold text-charcoal group-hover:text-forest transition-colors">
                Customer App
              </h3>
              <p className="text-xs text-charcoal-muted mt-2 leading-relaxed">
                Book laundry, customize detergent & wash preferences, schedule pickups, and track every stage in real-time.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-forest">
              <span>Open Customer App</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 2. Business Dashboard */}
          <div
            onClick={() => handleSelect('/dashboard')}
            className="group cursor-pointer rounded-xl bg-white border-2 border-forest/30 p-5 hover:border-forest hover:shadow-card transition-all flex flex-col justify-between relative"
          >
            <div className="absolute top-3 right-3 px-2 py-0.5 bg-forest text-white text-[10px] font-bold rounded-md">
              PRIMARY
            </div>
            <div>
              <div className="w-10 h-10 rounded-xl bg-forest text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-forest mb-1">
                Experience 02
              </div>
              <h3 className="text-base font-bold text-charcoal group-hover:text-forest transition-colors">
                Business Dashboard
              </h3>
              <p className="text-xs text-charcoal-muted mt-2 leading-relaxed">
                Manage orders, customer profiles, dynamic service pricing, delivery dispatches, refunds, and revenue analytics.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-forest">
              <span>Open Business Hub</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 3. Platform Admin */}
          <div
            onClick={() => handleSelect('/platform')}
            className="group cursor-pointer rounded-xl bg-white border border-border p-5 hover:border-sage-400 hover:shadow-card transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-linen text-charcoal flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-sage-600 mb-1">
                Experience 03
              </div>
              <h3 className="text-base font-bold text-charcoal group-hover:text-forest transition-colors">
                Platform Admin
              </h3>
              <p className="text-xs text-charcoal-muted mt-2 leading-relaxed">
                Explore how the LaundryOS parent company oversees multiple independent laundromat tenants and MRR.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-forest">
              <span>Open Platform Admin</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Technical Architecture Footnote */}
        <div className="px-6 py-4 bg-white border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-charcoal-muted">
            <Cpu className="w-4 h-4 text-sage-600" />
            <span>Interested in the NestJS, Prisma & Postgres audit?</span>
          </div>
          <button
            onClick={() => handleSelect('/architecture')}
            className="inline-flex items-center gap-1.5 font-semibold text-forest hover:text-forest-dark transition-colors"
          >
            <span>Explore Technical Architecture</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
