import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ARCHITECTURE_ITEMS, AUDIT_CHECKLIST } from '../../data/mockData';
import { ArchitectureItem, AuditChecklistItem } from '../../types';
import { Logo } from '../../components/common/Logo';
import {
  Cpu,
  Layers,
  Shield,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Database,
  Key,
  Server,
  Lock,
  ChevronDown,
  ChevronUp,
  FileText,
  Terminal,
  Activity,
  Zap,
} from 'lucide-react';

export const ArchitecturePage: React.FC = () => {
  const [selectedArchItem, setSelectedArchItem] = useState<ArchitectureItem>(ARCHITECTURE_ITEMS[3]); // Default to Tenant Isolation
  const [expandedAuditId, setExpandedAuditId] = useState<number | null>(4); // Default to Multi-tenant audit point

  const toggleAudit = (id: number) => {
    setExpandedAuditId(expandedAuditId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background text-charcoal pt-16 pb-24 text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between pb-6 border-b border-border">
          <div className="flex items-center gap-3">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <Logo size="sm" showTagline={false} />
            </Link>
            <span className="text-border">/</span>
            <span className="text-xs font-mono font-bold text-forest">ARCHITECTURE & AUDIT SPEC</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-xl bg-forest text-white text-xs font-bold hover:bg-forest-light shadow-xs"
            >
              Open Live Dashboard
            </Link>
          </div>
        </div>

        {/* Hero Banner: Architectural Context */}
        <div className="p-8 sm:p-10 rounded-3xl bg-forest text-white shadow-elevated relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sage-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-linen border border-white/20 text-xs font-semibold tracking-wide mb-4">
              <Cpu className="w-4 h-4" />
              <span>TECHNICAL CONSULTING & FOUNDATION EVALUATION</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white leading-tight">
              Under the Hood — LaundryOS Architecture
            </h1>

            <p className="mt-4 text-sm sm:text-base text-white/80 leading-relaxed font-normal">
              The founder has developed an initial backend using <strong>NestJS</strong>, <strong>TypeScript</strong>,{' '}
              <strong>PostgreSQL</strong>, and <strong>Prisma</strong>. Before committing substantial capital to an
              unnecessary rebuild, our methodology advocates a rigorous security and code audit to determine which
              modules can be retained, hardened, and scaled.
            </p>

            {/* Strategic Recommendation Callout */}
            <div className="mt-8 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs space-y-1">
              <div className="font-bold text-linen flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Strategic Recommendation:</span>
              </div>
              <p className="text-white/90 leading-relaxed pl-6 italic">
                "We recommend evaluating the existing NestJS and Prisma foundation before committing to a rebuild.
                Retain and improve sound components wherever practical, and rebuild only where the audit identifies
                fundamental architectural or security vulnerabilities."
              </p>
            </div>
          </div>
        </div>

        {/* INTERACTIVE ARCHITECTURE COMPONENT MAP */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-forest bg-sage-100 px-2 py-0.5 rounded">
                SECTION 01
              </span>
              <span className="text-xs text-charcoal-muted font-medium">Interactive Diagram</span>
            </div>
            <h2 className="text-2xl font-display font-bold text-charcoal mt-1">
              System Topology & Request Lifecycle
            </h2>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Click any block in the architecture tree below to inspect its operational responsibilities and audit focal points.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Visual Architecture Tree (7 cols) */}
            <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-border shadow-xs space-y-4">
              <div className="text-center font-mono text-[11px] text-charcoal-muted mb-2 font-semibold">
                --- INGRESS TRAFFIC ---
              </div>

              {/* Layer 1: Client App */}
              <button
                onClick={() => setSelectedArchItem(ARCHITECTURE_ITEMS[0])}
                className={`w-full p-4 rounded-2xl border text-left transition-all ${
                  selectedArchItem.id === ARCHITECTURE_ITEMS[0].id
                    ? 'border-forest bg-sage-50 shadow-card'
                    : 'border-border bg-white hover:border-sage-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-forest text-white flex items-center justify-center font-bold text-xs">
                      1
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-charcoal">Customer Mobile & Driver Web App</h4>
                      <span className="text-[10px] text-charcoal-muted font-mono">React 18 / Vite / Tailwind</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-forest bg-sage-100 px-2 py-0.5 rounded">Client Tier</span>
                </div>
              </button>

              <div className="flex justify-center text-charcoal-muted">
                <div className="w-0.5 h-6 bg-border" />
              </div>

              {/* Layer 2: API Gateway */}
              <button
                onClick={() => setSelectedArchItem(ARCHITECTURE_ITEMS[1])}
                className={`w-full p-4 rounded-2xl border text-left transition-all ${
                  selectedArchItem.id === ARCHITECTURE_ITEMS[1].id
                    ? 'border-forest bg-sage-50 shadow-card'
                    : 'border-border bg-white hover:border-sage-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-forest text-white flex items-center justify-center font-bold text-xs">
                      2
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-charcoal">NestJS API Layer & Rate Limiting</h4>
                      <span className="text-[10px] text-charcoal-muted font-mono">Pipes / Validation / Guards</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-forest bg-sage-100 px-2 py-0.5 rounded">Gateway</span>
                </div>
              </button>

              <div className="flex justify-center text-charcoal-muted">
                <div className="w-0.5 h-6 bg-border" />
              </div>

              {/* Layer 3: Split Services (Auth & Orders) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setSelectedArchItem(ARCHITECTURE_ITEMS[2])}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    selectedArchItem.id === ARCHITECTURE_ITEMS[2].id
                      ? 'border-forest bg-sage-50 shadow-card'
                      : 'border-border bg-white hover:border-sage-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Key className="w-4 h-4 text-forest" />
                    <h4 className="text-xs font-bold text-charcoal">Authentication Module</h4>
                  </div>
                  <div className="text-[10px] text-charcoal-muted">JWT / Argon2id / Role Guards</div>
                </button>

                <button
                  onClick={() => setSelectedArchItem(ARCHITECTURE_ITEMS[4])}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    selectedArchItem.id === ARCHITECTURE_ITEMS[4].id
                      ? 'border-forest bg-sage-50 shadow-card'
                      : 'border-border bg-white hover:border-sage-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Activity className="w-4 h-4 text-forest" />
                    <h4 className="text-xs font-bold text-charcoal">Order Workflow State Machine</h4>
                  </div>
                  <div className="text-[10px] text-charcoal-muted">8-Stage Machine / BullMQ</div>
                </button>
              </div>

              <div className="flex justify-center text-charcoal-muted">
                <div className="w-0.5 h-6 bg-border" />
              </div>

              {/* Layer 4: Multi-Tenant Isolation Layer */}
              <button
                onClick={() => setSelectedArchItem(ARCHITECTURE_ITEMS[3])}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all relative ${
                  selectedArchItem.id === ARCHITECTURE_ITEMS[3].id
                    ? 'border-forest bg-sage-50 shadow-card'
                    : 'border-forest/40 bg-white hover:border-forest'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-5 h-5 text-forest" />
                    <div>
                      <h4 className="text-sm font-bold text-charcoal">Tenant Access & Scope Enforcement</h4>
                      <span className="text-[10px] text-charcoal-muted font-mono">AsyncLocalStorage / Prisma Extensions</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-white bg-forest px-2 py-0.5 rounded">
                    Critical Security
                  </span>
                </div>
              </button>

              <div className="flex justify-center text-charcoal-muted">
                <div className="w-0.5 h-6 bg-border" />
              </div>

              {/* Layer 5: Prisma ORM */}
              <button
                onClick={() => setSelectedArchItem(ARCHITECTURE_ITEMS[5])}
                className={`w-full p-4 rounded-2xl border text-left transition-all ${
                  selectedArchItem.id === ARCHITECTURE_ITEMS[5].id
                    ? 'border-forest bg-sage-50 shadow-card'
                    : 'border-border bg-white hover:border-sage-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Server className="w-4 h-4 text-forest" />
                    <div>
                      <h4 className="text-sm font-bold text-charcoal">Prisma ORM & Schema Engine</h4>
                      <span className="text-[10px] text-charcoal-muted font-mono">Migrations / Relational Queries</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-charcoal-muted font-mono">ORM Layer</span>
                </div>
              </button>

              <div className="flex justify-center text-charcoal-muted">
                <div className="w-0.5 h-6 bg-border" />
              </div>

              {/* Layer 6: PostgreSQL Database */}
              <button
                onClick={() => setSelectedArchItem(ARCHITECTURE_ITEMS[6])}
                className={`w-full p-4 rounded-2xl border text-left transition-all ${
                  selectedArchItem.id === ARCHITECTURE_ITEMS[6].id
                    ? 'border-forest bg-sage-50 shadow-card'
                    : 'border-border bg-white hover:border-sage-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Database className="w-4 h-4 text-forest" />
                    <div>
                      <h4 className="text-sm font-bold text-charcoal">PostgreSQL 16 Database Tier</h4>
                      <span className="text-[10px] text-charcoal-muted font-mono">Row-Level Security / ACID / PgBouncer</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-forest bg-sage-100 px-2 py-0.5 rounded">Database</span>
                </div>
              </button>
            </div>

            {/* Component Detail Inspector Card (5 cols) */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-border shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="text-[10px] font-bold uppercase tracking-wider text-forest font-mono">
                  {selectedArchItem.technology}
                </span>
                <span className="text-xs text-charcoal-muted font-semibold">{selectedArchItem.role}</span>
              </div>

              <h3 className="text-xl font-display font-bold text-charcoal">
                {selectedArchItem.title}
              </h3>

              <p className="text-xs text-charcoal-muted leading-relaxed">
                {selectedArchItem.description}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-2">
                  System Responsibilities:
                </h4>
                <ul className="space-y-1.5 text-xs text-charcoal">
                  {selectedArchItem.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-forest shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 p-3.5 rounded-xl bg-sage-50 border border-sage-200">
                <div className="flex items-center gap-1.5 font-bold text-forest text-xs mb-1">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Audit Focus Area:</span>
                </div>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  {selectedArchItem.auditFocus}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 10-POINT TECHNICAL REVIEW CHECKLIST */}
        <div className="space-y-6 pt-6 border-t border-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-forest bg-sage-100 px-2 py-0.5 rounded">
                SECTION 02
              </span>
              <span className="text-xs text-charcoal-muted font-medium">Proposed Review Methodology</span>
            </div>
            <h2 className="text-2xl font-display font-bold text-charcoal mt-1">
              "Audit first. Rebuild only when justified."
            </h2>
            <p className="text-xs text-charcoal-muted mt-0.5">
              10 comprehensive review angles to assess the founder's existing NestJS, TypeScript, Prisma, and PostgreSQL repository.
            </p>
          </div>

          <div className="space-y-3">
            {AUDIT_CHECKLIST.map((item) => {
              const isExpanded = expandedAuditId === item.id;
              return (
                <div
                  key={item.id}
                  className="rounded-2xl bg-white border border-border shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleAudit(item.id)}
                    className="w-full p-4 flex items-center justify-between hover:bg-surface-subtle transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-forest text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        {item.id < 10 ? `0${item.id}` : item.id}
                      </span>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-forest block">
                          {item.category}
                        </span>
                        <h4 className="text-sm font-bold text-charcoal mt-0.5">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-charcoal-muted" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-charcoal-muted" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="p-5 pt-1 border-t border-border/60 text-xs space-y-4 bg-surface-subtle/50">
                      <p className="text-charcoal-muted leading-relaxed">
                        <strong className="text-charcoal">Audit Scope: </strong>
                        {item.scope}
                      </p>

                      <div>
                        <strong className="text-charcoal block mb-1.5 font-bold uppercase tracking-wider text-[10px]">
                          Key Inquiry Questions:
                        </strong>
                        <ul className="space-y-1 text-charcoal-muted">
                          {item.keyQuestions.map((q, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-forest font-bold">•</span>
                              <span>{q}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
                          <span className="font-bold text-rose-800 uppercase tracking-wider text-[10px] block mb-1">
                            Risk If Ignored:
                          </span>
                          <span className="text-charcoal-muted leading-relaxed">{item.riskIfIgnored}</span>
                        </div>

                        <div className="p-3 rounded-xl bg-sage-50 border border-sage-200">
                          <span className="font-bold text-forest uppercase tracking-wider text-[10px] block mb-1">
                            Engineering Recommendation:
                          </span>
                          <span className="text-charcoal-muted leading-relaxed">{item.recommendation}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* SECURITY & ENGINEERING PRODUCTION CONSIDERATIONS */}
        <div className="p-8 rounded-3xl bg-white border border-border shadow-xs space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-forest bg-sage-100 px-2 py-0.5 rounded">
                SECTION 03
              </span>
              <span className="text-xs text-charcoal-muted font-medium">Production Hardening Checklist</span>
            </div>
            <h2 className="text-2xl font-display font-bold text-charcoal mt-1">
              Production Security & Reliability Considerations
            </h2>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Architectural controls required before launching paying commercial laundromats on LaundryOS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-4 rounded-xl border border-border bg-surface-subtle space-y-2">
              <div className="flex items-center gap-2 text-forest font-bold">
                <Lock className="w-4 h-4" />
                <span>Zero Raw Card Data</span>
              </div>
              <p className="text-charcoal-muted leading-relaxed">
                Stripe Elements tokenization guarantees zero PAN or CVV information enters the NestJS backend, satisfying strict PCI-DSS SAQ A requirements.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-surface-subtle space-y-2">
              <div className="flex items-center gap-2 text-forest font-bold">
                <Zap className="w-4 h-4" />
                <span>Idempotent Webhooks</span>
              </div>
              <p className="text-charcoal-muted leading-relaxed">
                Webhook deduplication tables prevent network retries from triggering double-charges, accidental duplicate driver dispatches, or duplicate invoices.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-surface-subtle space-y-2">
              <div className="flex items-center gap-2 text-forest font-bold">
                <Database className="w-4 h-4" />
                <span>Point-in-Time Recovery</span>
              </div>
              <p className="text-charcoal-muted leading-relaxed">
                Automated continuous WAL archiving with Amazon S3 / Google Cloud Storage providing 5-minute RPO for customer order and transaction logs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
