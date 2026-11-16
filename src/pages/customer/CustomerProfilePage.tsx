import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomerLayout } from '../../components/customer/CustomerLayout';
import { useLaundry } from '../../context/LaundryContext';
import {
  User,
  MapPin,
  CreditCard,
  Bell,
  HelpCircle,
  LogOut,
  ShieldCheck,
  Check,
  Smartphone,
  Mail,
  Phone,
  Edit2,
  Save,
  MessageSquare,
} from 'lucide-react';

export const CustomerProfilePage: React.FC = () => {
  const { currentTenant, addToast } = useLaundry();
  const navigate = useNavigate();

  const [name, setName] = useState('Alex Morgan');
  const [email, setEmail] = useState('alex.morgan@gmail.com');
  const [phone, setPhone] = useState('+1 (416) 555-8821');
  const [address, setAddress] = useState('142 King Street East, Apt 402, Toronto, ON M5A 1J4');

  const [smsAlerts, setSmsAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [emailReceipts, setEmailReceipts] = useState(true);
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Profile Updated', 'Saved customer preferences.', 'success');
  };

  const handleLogout = () => {
    addToast('Logged Out', 'Demo session ended. Returned to landing.', 'info');
    navigate('/');
  };

  const handleSendSupport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;
    setSupportModalOpen(false);
    setSupportMessage('');
    addToast('Message Dispatched', `Our ${currentTenant.name} support operator will respond via SMS shortly.`, 'success');
  };

  return (
    <CustomerLayout onOpenBookingModal={() => navigate('/app')}>
      <div className="space-y-6 text-left">
        {/* Profile Header Avatar */}
        <div className="p-5 rounded-2xl bg-white border border-border flex items-center gap-4 shadow-xs">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-forest/20 shrink-0">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"
              alt="Alex Morgan"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-charcoal">{name}</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-forest text-white">
                VIP Member
              </span>
            </div>
            <p className="text-xs text-charcoal-muted mt-0.5">{email}</p>
            <p className="text-[11px] text-forest font-semibold mt-1">14 Lifetime Laundry Orders</p>
          </div>
        </div>

        {/* Personal Info Form */}
        <form onSubmit={handleSaveProfile} className="p-5 rounded-2xl bg-white border border-border space-y-4 shadow-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
            <User className="w-4 h-4 text-forest" />
            <span>Personal Information</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-charcoal-muted mb-1 font-medium">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-border text-charcoal focus:outline-none focus:border-forest"
              />
            </div>

            <div>
              <label className="block text-charcoal-muted mb-1 font-medium">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-border text-charcoal focus:outline-none focus:border-forest"
              />
            </div>

            <div>
              <label className="block text-charcoal-muted mb-1 font-medium">Phone Number (SMS Updates)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-border text-charcoal focus:outline-none focus:border-forest"
              />
            </div>

            <div>
              <label className="block text-charcoal-muted mb-1 font-medium">Default Delivery Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-border text-charcoal focus:outline-none focus:border-forest"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-forest text-white text-xs font-semibold hover:bg-forest-light transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Profile Changes</span>
          </button>
        </form>

        {/* Notifications & Preferences */}
        <div className="p-5 rounded-2xl bg-white border border-border space-y-3 shadow-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
            <Bell className="w-4 h-4 text-forest" />
            <span>Notification Channels</span>
          </h3>

          <label className="flex items-center justify-between p-2.5 rounded-xl border border-border text-xs cursor-pointer hover:bg-sage-50">
            <div>
              <span className="font-semibold text-charcoal">SMS Driver Arrival Alerts</span>
              <span className="block text-[10px] text-charcoal-muted">Receive a text 15 mins before arrival</span>
            </div>
            <input
              type="checkbox"
              checked={smsAlerts}
              onChange={(e) => setSmsAlerts(e.target.checked)}
              className="w-4 h-4 accent-forest rounded"
            />
          </label>

          <label className="flex items-center justify-between p-2.5 rounded-xl border border-border text-xs cursor-pointer hover:bg-sage-50">
            <div>
              <span className="font-semibold text-charcoal">Washing & Folding Status Updates</span>
              <span className="block text-[10px] text-charcoal-muted">Real-time machine completion alerts</span>
            </div>
            <input
              type="checkbox"
              checked={pushAlerts}
              onChange={(e) => setPushAlerts(e.target.checked)}
              className="w-4 h-4 accent-forest rounded"
            />
          </label>

          <label className="flex items-center justify-between p-2.5 rounded-xl border border-border text-xs cursor-pointer hover:bg-sage-50">
            <div>
              <span className="font-semibold text-charcoal">Digital Tax Receipts</span>
              <span className="block text-[10px] text-charcoal-muted">PDF invoices sent upon delivery</span>
            </div>
            <input
              type="checkbox"
              checked={emailReceipts}
              onChange={(e) => setEmailReceipts(e.target.checked)}
              className="w-4 h-4 accent-forest rounded"
            />
          </label>
        </div>

        {/* Support & Logout */}
        <div className="space-y-2">
          <button
            onClick={() => setSupportModalOpen(true)}
            className="w-full p-3.5 rounded-xl bg-white border border-border hover:bg-secondary text-xs font-semibold text-charcoal transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-forest" />
              <span>Contact Laundromat Support</span>
            </div>
            <span className="text-[10px] text-forest font-bold">Open Help Desk</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full p-3.5 rounded-xl bg-white border border-rose-200 hover:bg-rose-50 text-xs font-semibold text-rose-700 transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              <span>Sign Out of Demo Account</span>
            </div>
            <span className="text-[10px] text-rose-600 font-bold">End Session</span>
          </button>
        </div>
      </div>

      {/* Support Modal */}
      {supportModalOpen && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-2xl border border-border p-6 shadow-drawer text-left">
            <h3 className="text-base font-bold text-charcoal flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-forest" />
              <span>Support Desk</span>
            </h3>
            <p className="text-xs text-charcoal-muted mt-1">
              Have questions about your wash batch or driver arrival? Leave a message below.
            </p>

            <form onSubmit={handleSendSupport} className="mt-4 space-y-3">
              <textarea
                value={supportMessage}
                onChange={(e) => setSupportMessage(e.target.value)}
                placeholder="Type your message here..."
                rows={4}
                required
                className="w-full p-3 rounded-xl border border-border text-xs text-charcoal focus:outline-none focus:border-forest"
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSupportModalOpen(false)}
                  className="flex-1 py-2 rounded-xl border border-border text-xs font-semibold text-charcoal hover:bg-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-forest text-white text-xs font-semibold hover:bg-forest-light"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </CustomerLayout>
  );
};
