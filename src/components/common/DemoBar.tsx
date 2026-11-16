import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLaundry } from '../../context/LaundryContext';
import {
  Smartphone,
  LayoutDashboard,
  Layers,
  Cpu,
  RefreshCw,
  Building2,
  ChevronDown,
  Sparkles,
  ExternalLink,
  ChevronUp,
} from 'lucide-react';

export const DemoBar: React.FC = () => {
  const { currentTenant, tenants, switchTenant, resetDemoData } = useLaundry();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [tenantDropdownOpen, setTenantDropdownOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="fixed top-0 inset-x-0 z-50 pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <div
          className={`pointer-events-auto mx-auto transition-all duration-300 rounded-full border border-forest/15 bg-white/95 backdrop-blur-md shadow-elevated px-4 py-1.5 flex items-center justify-between gap-3 text-xs ${
            collapsed ? 'w-fit' : 'w-full max-w-4xl'
          }`}
        >
          {/* Left: Demo Badge & Tenant Switcher */}
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-forest text-white font-medium text-[11px] tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              DEMO MODE
            </span>

            {!collapsed && (
              <div className="relative">
                <button
                  onClick={() => setTenantDropdownOpen(!tenantDropdownOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface hover:bg-secondary text-charcoal border border-border font-medium transition-colors"
                  title="Switch current active laundromat tenant"
                >
                  <Building2 className="w-3.5 h-3.5 text-sage-600" />
                  <span className="font-semibold truncate max-w-[140px] sm:max-w-none">{currentTenant.name}</span>
                  <span className="text-[10px] text-charcoal-muted hidden md:inline">({currentTenant.city})</span>
                  <ChevronDown className="w-3 h-3 text-charcoal-muted" />
                </button>

                {tenantDropdownOpen && (
                  <div
                    className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-drawer border border-border py-1.5 z-50 text-left"
                    onMouseLeave={() => setTenantDropdownOpen(false)}
                  >
                    <div className="px-3 py-1.5 text-[10px] font-semibold text-charcoal-muted uppercase tracking-wider border-b border-border/60">
                      Multi-Tenant Simulation (3 Businesses)
                    </div>
                    {tenants.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          switchTenant(t.id);
                          setTenantDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-left flex items-start justify-between hover:bg-sage-50 transition-colors ${
                          t.id === currentTenant.id ? 'bg-sage-100/60 font-semibold text-forest' : 'text-charcoal'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-medium">{t.name}</div>
                          <div className="text-[10px] text-charcoal-muted">{t.city}, {t.province} • {t.subscriptionPlan} Plan</div>
                        </div>
                        {t.id === currentTenant.id && (
                          <span className="text-[10px] text-forest font-bold bg-sage-200 px-1.5 py-0.5 rounded">Active</span>
                        )}
                      </button>
                    ))}
                    <div className="p-2 border-t border-border/60 text-[10px] text-charcoal-muted leading-tight">
                      Switching tenant isolates orders, customers, pricing, and live analytics.
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Center Navigation Shortcuts */}
          {!collapsed && (
            <div className="hidden sm:flex items-center gap-1 overflow-x-auto py-0.5">
              <Link
                to="/"
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  location.pathname === '/' ? 'bg-forest/10 text-forest font-semibold' : 'text-charcoal-muted hover:text-charcoal'
                }`}
              >
                Landing
              </Link>

              <Link
                to="/app"
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  isActive('/app') ? 'bg-forest text-white shadow-xs' : 'text-charcoal-muted hover:text-charcoal'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                Customer App
              </Link>

              <Link
                to="/dashboard"
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  isActive('/dashboard') ? 'bg-forest text-white shadow-xs' : 'text-charcoal-muted hover:text-charcoal'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Dashboard
              </Link>

              <Link
                to="/platform"
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  isActive('/platform') ? 'bg-forest text-white shadow-xs' : 'text-charcoal-muted hover:text-charcoal'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Platform Admin
              </Link>

              <Link
                to="/architecture"
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  isActive('/architecture') ? 'bg-forest text-white shadow-xs' : 'text-charcoal-muted hover:text-charcoal'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                Architecture
              </Link>
            </div>
          )}

          {/* Right Controls: Reset & Collapse */}
          <div className="flex items-center gap-2">
            {!collapsed && (
              <button
                onClick={resetDemoData}
                className="flex items-center gap-1 text-[11px] text-charcoal-muted hover:text-rose-700 font-medium px-2 py-1 rounded hover:bg-rose-50 transition-colors"
                title="Reset demo data back to default Toronto seed"
              >
                <RefreshCw className="w-3 h-3" />
                <span className="hidden md:inline">Reset Seed</span>
              </button>
            )}

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 rounded-full text-charcoal-muted hover:text-charcoal hover:bg-secondary transition-colors"
              title={collapsed ? 'Expand Demo Controls' : 'Collapse Demo Bar'}
            >
              {collapsed ? (
                <div className="flex items-center gap-1 px-2">
                  <Sparkles className="w-3.5 h-3.5 text-sage-600" />
                  <span className="font-semibold text-[11px]">Demo Views</span>
                  <ChevronDown className="w-3 h-3 ml-0.5" />
                </div>
              ) : (
                <ChevronUp className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
