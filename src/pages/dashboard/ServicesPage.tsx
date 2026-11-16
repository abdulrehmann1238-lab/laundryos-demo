import React, { useState } from 'react';
import { useLaundry } from '../../context/LaundryContext';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { ServiceOffering } from '../../types';
import {
  Tags,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Clock,
  DollarSign,
  Sparkles,
  ArrowRight,
  Info,
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { services, addService, updateService, deleteService, toggleServiceStatus, currentTenant } = useLaundry();

  const [editingService, setEditingService] = useState<ServiceOffering | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Form State
  const [formName, setFormName] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formPrice, setFormPrice] = useState(2.50);
  const [formModel, setFormModel] = useState<'per_lb' | 'per_item' | 'flat_rate'>('per_lb');
  const [formUnit, setFormUnit] = useState('per lb');
  const [formTurnaround, setFormTurnaround] = useState('24 hours');
  const [formImage, setFormImage] = useState('https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80');

  const openEditModal = (srv: ServiceOffering) => {
    setEditingService(srv);
    setFormName(srv.name);
    setFormDesc(srv.description);
    setFormPrice(srv.price);
    setFormModel(srv.pricingModel);
    setFormUnit(srv.unitLabel);
    setFormTurnaround(srv.turnaroundTime);
    setFormImage(srv.imageUrl);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    updateService({
      ...editingService,
      name: formName,
      description: formDesc,
      price: Number(formPrice),
      pricingModel: formModel,
      unitLabel: formUnit,
      turnaroundTime: formTurnaround,
      imageUrl: formImage,
    });

    setEditingService(null);
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    addService({
      name: formName || 'New Specialty Wash',
      description: formDesc || 'Commercial grade fabric cleaning and finishing.',
      price: Number(formPrice),
      pricingModel: formModel,
      unitLabel: formUnit,
      turnaroundTime: formTurnaround,
      isActive: true,
      imageUrl: formImage,
    });

    setAddModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 text-left">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sage-100 text-forest">
                BIDIRECTIONAL PRICING ENGINE
              </span>
              <span className="text-xs text-charcoal-muted">Connected to Customer App</span>
            </div>
            <h1 className="text-2xl font-display font-bold text-charcoal tracking-tight mt-1">
              Services & Pricing Catalog
            </h1>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Edit pricing and turnaround times. Price updates sync immediately to customer mobile booking.
            </p>
          </div>

          <button
            onClick={() => {
              setFormName('');
              setFormDesc('');
              setFormPrice(3.00);
              setFormModel('per_lb');
              setFormUnit('per lb');
              setFormTurnaround('24 hours');
              setAddModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-forest text-white text-xs font-bold hover:bg-forest-light shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </button>
        </div>

        {/* Sync Callout banner */}
        <div className="p-4 rounded-2xl bg-sage-50 border border-sage-200 flex items-start gap-3 text-xs">
          <Info className="w-4 h-4 text-forest shrink-0 mt-0.5" />
          <div className="text-charcoal-muted leading-relaxed">
            <strong className="text-charcoal">Workflow D Active: </strong>
            Changing a service's price below updates the customer booking wizard instantaneously.
            Current currency is <strong className="text-forest font-semibold">CAD ({currentTenant.currencySymbol})</strong>.
          </div>
        </div>

        {/* 5 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv) => (
            <div
              key={srv.id}
              className={`rounded-2xl border transition-all flex flex-col justify-between overflow-hidden ${
                srv.isActive
                  ? 'bg-white border-border shadow-xs hover:border-sage-300 hover:shadow-card'
                  : 'bg-surface-subtle border-border/60 opacity-60'
              }`}
            >
              <div>
                {/* Image Header with Active Toggle */}
                <div className="relative h-44 overflow-hidden bg-secondary">
                  <img
                    src={srv.imageUrl}
                    alt={srv.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <button
                      onClick={() => toggleServiceStatus(srv.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold shadow-xs transition-colors ${
                        srv.isActive
                          ? 'bg-emerald-600 text-white'
                          : 'bg-charcoal text-white'
                      }`}
                    >
                      {srv.isActive ? 'Active Menu' : 'Disabled'}
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 text-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-bold text-charcoal">{srv.name}</h3>
                      <span className="text-[10px] text-charcoal-muted capitalize">
                        Model: {srv.pricingModel.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-bold font-mono text-forest">
                        ${srv.price.toFixed(2)}
                      </div>
                      <span className="text-[10px] text-charcoal-muted font-medium">{srv.unitLabel}</span>
                    </div>
                  </div>

                  <p className="mt-3 text-charcoal-muted leading-relaxed line-clamp-2">
                    {srv.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-[11px] text-charcoal-muted">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-sage-600" />
                      Turnaround: <strong className="text-charcoal">{srv.turnaroundTime}</strong>
                    </span>
                    {srv.popular && (
                      <span className="px-2 py-0.5 rounded bg-linen text-charcoal font-bold text-[10px]">
                        Popular
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-4 pt-0 flex items-center justify-between gap-2 border-t border-border/40 mt-3 pt-3">
                <button
                  onClick={() => openEditModal(srv)}
                  className="flex-1 py-1.5 rounded-xl border border-border text-xs font-semibold text-charcoal hover:bg-secondary flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Edit2 className="w-3 h-3 text-sage-600" />
                  <span>Edit Details</span>
                </button>

                <button
                  onClick={() => {
                    if (window.confirm(`Delete service "${srv.name}"?`)) {
                      deleteService(srv.id);
                    }
                  }}
                  className="p-2 rounded-xl border border-border hover:bg-rose-50 hover:border-rose-200 text-charcoal-muted hover:text-rose-700 transition-colors"
                  title="Delete Service"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl border border-border p-6 shadow-drawer text-left">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="text-base font-bold text-charcoal">Edit Service & Pricing</h3>
              <button onClick={() => setEditingService(null)} className="p-1 rounded-lg text-charcoal-muted">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block text-charcoal-muted mb-1 font-medium">Service Name</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-border font-bold text-charcoal"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-charcoal-muted mb-1 font-medium">Price (CAD $)</label>
                  <input
                    type="number"
                    step="0.05"
                    min="0.5"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-border font-bold font-mono text-forest"
                  />
                </div>

                <div>
                  <label className="block text-charcoal-muted mb-1 font-medium">Pricing Unit Label</label>
                  <input
                    type="text"
                    required
                    value={formUnit}
                    onChange={(e) => setFormUnit(e.target.value)}
                    placeholder="e.g. per lb, per item"
                    className="w-full p-2.5 rounded-xl border border-border"
                  />
                </div>
              </div>

              <div>
                <label className="block text-charcoal-muted mb-1 font-medium">Turnaround Time</label>
                <input
                  type="text"
                  required
                  value={formTurnaround}
                  onChange={(e) => setFormTurnaround(e.target.value)}
                  placeholder="e.g. 24 hours, 48 hours"
                  className="w-full p-2.5 rounded-xl border border-border"
                />
              </div>

              <div>
                <label className="block text-charcoal-muted mb-1 font-medium">Description</label>
                <textarea
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  rows={2}
                  className="w-full p-2.5 rounded-xl border border-border"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 rounded-xl border border-border hover:bg-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-forest text-white font-bold hover:bg-forest-light"
                >
                  Save & Sync to App
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Service Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl border border-border p-6 shadow-drawer text-left">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="text-base font-bold text-charcoal">Add New Service</h3>
              <button onClick={() => setAddModalOpen(false)} className="p-1 rounded-lg text-charcoal-muted">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateService} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block text-charcoal-muted mb-1 font-medium">Service Name *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Heavy Duty Woolens"
                  className="w-full p-2.5 rounded-xl border border-border font-bold text-charcoal"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-charcoal-muted mb-1 font-medium">Price (CAD $)</label>
                  <input
                    type="number"
                    step="0.05"
                    min="0.5"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-border font-bold font-mono text-forest"
                  />
                </div>

                <div>
                  <label className="block text-charcoal-muted mb-1 font-medium">Pricing Model</label>
                  <select
                    value={formModel}
                    onChange={(e) => {
                      const val = e.target.value as any;
                      setFormModel(val);
                      setFormUnit(val === 'per_lb' ? 'per lb' : val === 'per_item' ? 'per item' : 'flat rate');
                    }}
                    className="w-full p-2.5 rounded-xl border border-border"
                  >
                    <option value="per_lb">Per Pound (per_lb)</option>
                    <option value="per_item">Per Item (per_item)</option>
                    <option value="flat_rate">Flat Rate (flat_rate)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-charcoal-muted mb-1 font-medium">Turnaround Time</label>
                <input
                  type="text"
                  required
                  value={formTurnaround}
                  onChange={(e) => setFormTurnaround(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-border"
                />
              </div>

              <div>
                <label className="block text-charcoal-muted mb-1 font-medium">Description</label>
                <textarea
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  rows={2}
                  className="w-full p-2.5 rounded-xl border border-border"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-border hover:bg-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-forest text-white font-bold hover:bg-forest-light"
                >
                  Create Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
