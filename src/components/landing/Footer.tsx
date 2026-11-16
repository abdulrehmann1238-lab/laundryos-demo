import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../common/Logo';
import {
  Mail,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Phone,
  Shield,
  Heart,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please provide a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true);
  };

  return (
    <footer className="bg-background border-t border-border pt-16 pb-12 text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-border">
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <Logo size="md" showTagline={true} />
              <p className="mt-4 text-xs sm:text-sm text-charcoal-muted leading-relaxed max-w-sm">
                LaundryOS is the modern operating system for independent laundromats and dry cleaners.
                Built for multi-tenant scalability, real-time logistics, and effortless customer experiences.
              </p>
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-2">
                Operator Dispatch & Product Updates
              </h4>
              <p className="text-xs text-charcoal-muted mb-3">
                Monthly insights on laundromat unit economics, equipment maintenance, and route optimization.
              </p>

              {subscribed ? (
                <div className="p-3 rounded-xl bg-sage-100 border border-sage-300 text-forest flex items-center gap-2 text-xs font-semibold animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Thank you! You're subscribed to LaundryOS updates.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <div className="flex items-center gap-2 max-w-md">
                    <div className="relative flex-1">
                      <Mail className="w-4 h-4 text-charcoal-muted absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError('');
                        }}
                        placeholder="operator@laundromat.ca"
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-border bg-white text-xs text-charcoal placeholder:text-charcoal-muted/60 focus:outline-none focus:border-forest shadow-xs"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-forest text-white text-xs font-semibold hover:bg-forest-light transition-colors shrink-0 shadow-xs"
                    >
                      Subscribe
                    </button>
                  </div>
                  {error && <p className="text-[11px] text-rose-600 font-medium">{error}</p>}
                </form>
              )}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs text-charcoal-muted font-medium">
              <li>
                <Link to="/app" className="hover:text-forest transition-colors">
                  Customer Mobile App
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-forest transition-colors">
                  Business Dashboard
                </Link>
              </li>
              <li>
                <Link to="/dashboard/operations" className="hover:text-forest transition-colors">
                  Pickup & Delivery Logistics
                </Link>
              </li>
              <li>
                <Link to="/dashboard/orders" className="hover:text-forest transition-colors">
                  Order Management
                </Link>
              </li>
              <li>
                <Link to="/dashboard/services" className="hover:text-forest transition-colors">
                  Pricing & Catalog Editor
                </Link>
              </li>
              <li>
                <Link to="/platform" className="hover:text-forest transition-colors">
                  Platform Administration
                </Link>
              </li>
            </ul>
          </div>

          {/* Architecture & Engineering */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-4">
              Technical
            </h4>
            <ul className="space-y-2.5 text-xs text-charcoal-muted font-medium">
              <li>
                <Link to="/architecture" className="hover:text-forest transition-colors flex items-center gap-1 font-semibold text-forest">
                  <span>NestJS Architecture</span>
                  <span className="text-[10px] px-1 rounded bg-sage-200">v2</span>
                </Link>
              </li>
              <li>
                <Link to="/architecture" className="hover:text-forest transition-colors">
                  Prisma ORM & PostgreSQL
                </Link>
              </li>
              <li>
                <Link to="/architecture" className="hover:text-forest transition-colors">
                  Multi-Tenant RLS Scope
                </Link>
              </li>
              <li>
                <Link to="/architecture" className="hover:text-forest transition-colors">
                  10-Point Backend Audit
                </Link>
              </li>
              <li>
                <Link to="/architecture" className="hover:text-forest transition-colors">
                  Idempotent Stripe Webhooks
                </Link>
              </li>
              <li>
                <span className="text-charcoal-light cursor-not-allowed">
                  OpenAPI / Swagger Specs
                </span>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-4">
              FreshFold Demo HQ
            </h4>
            <div className="space-y-3 text-xs text-charcoal-muted">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                <span>482 Queen St West, Toronto, ON M5V 2B2 Canada</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-forest shrink-0" />
                <span>+1 (416) 555-0182</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-forest shrink-0" />
                <span>founders@laundryos.ca</span>
              </div>
              <div className="pt-2 flex items-center gap-2 text-[11px] text-charcoal-muted">
                <Shield className="w-3.5 h-3.5 text-emerald-700" />
                <span>PIPEDA & GDPR Ready Design</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-muted">
          <div>
            © {new Date().getFullYear()} LaundryOS Technologies Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-forest cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-forest cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-forest cursor-pointer transition-colors">Security Architecture</span>
            <Link to="/dashboard/settings" className="hover:text-forest transition-colors">
              Demo Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
