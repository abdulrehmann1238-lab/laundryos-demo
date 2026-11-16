import React, { useState } from 'react';
import { useLaundry } from '../../context/LaundryContext';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { TeamMember } from '../../types';
import {
  UserCheck,
  Plus,
  Shield,
  Mail,
  User,
  CheckCircle2,
  X,
  Edit2,
  Lock,
  Truck,
  Building,
  Key,
} from 'lucide-react';

export const TeamPage: React.FC = () => {
  const { teamMembers, addTeamMember, updateTeamMember, addToast } = useLaundry();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formRole, setFormRole] = useState<'Owner' | 'Manager' | 'Laundry Operator' | 'Driver'>('Laundry Operator');
  const [formZone, setFormZone] = useState('West End Facility');

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim()) return;

    addTeamMember({
      name: formName,
      email: formEmail,
      role: formRole,
      status: 'Active',
      assignedZone: formZone,
    });

    setAddModalOpen(false);
    setFormName('');
    setFormEmail('');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    updateTeamMember({
      ...editingMember,
      name: formName,
      email: formEmail,
      role: formRole,
      assignedZone: formZone,
    });

    setEditingMember(null);
  };

  const handleToggleStatus = (member: TeamMember) => {
    const newStatus = member.status === 'Active' ? 'Inactive' : 'Active';
    updateTeamMember({
      ...member,
      status: newStatus,
    });
    addToast('Status Updated', `${member.name} marked ${newStatus}.`, 'info');
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Owner':
        return 'bg-forest text-white';
      case 'Manager':
        return 'bg-sage-100 text-forest border border-sage-300';
      case 'Driver':
        return 'bg-sky-100 text-sky-800 border border-sky-300';
      default:
        return 'bg-secondary text-charcoal';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 text-left">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-charcoal tracking-tight">
              Team & Staff Management
            </h1>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Role-based access control, operator shift permissions, and courier zone assignments
            </p>
          </div>

          <button
            onClick={() => {
              setFormName('');
              setFormEmail('');
              setFormRole('Laundry Operator');
              setFormZone('Downtown Route');
              setAddModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-forest text-white text-xs font-bold hover:bg-forest-light shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Invite Team Member</span>
          </button>
        </div>

        {/* RBAC Role Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white border border-border shadow-xs">
            <div className="flex items-center gap-2 text-forest font-bold mb-1">
              <Key className="w-4 h-4" />
              <span>Owner Role</span>
            </div>
            <p className="text-charcoal-muted leading-relaxed">
              Full administrative authority over billing, bank settlements, tenant settings, and employee roles.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-border shadow-xs">
            <div className="flex items-center gap-2 text-forest font-bold mb-1">
              <Shield className="w-4 h-4" />
              <span>Manager Role</span>
            </div>
            <p className="text-charcoal-muted leading-relaxed">
              Order oversight, refunds, pricing catalog edits, shift scheduling, and business analytics.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-border shadow-xs">
            <div className="flex items-center gap-2 text-forest font-bold mb-1">
              <Building className="w-4 h-4" />
              <span>Laundry Operator</span>
            </div>
            <p className="text-charcoal-muted leading-relaxed">
              Shop floor access to advance washing, drying, and folding states; print claim tags; weigh laundry bags.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-border shadow-xs">
            <div className="flex items-center gap-2 text-forest font-bold mb-1">
              <Truck className="w-4 h-4" />
              <span>Driver Role</span>
            </div>
            <p className="text-charcoal-muted leading-relaxed">
              Restricted to pickup & delivery routes, customer address navigation, and scan-at-doorstep confirmation.
            </p>
          </div>
        </div>

        {/* Team Members Table */}
        <div className="rounded-2xl bg-white border border-border shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-subtle border-b border-border text-charcoal-muted font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4">Employee</th>
                  <th className="p-4">Assigned Role</th>
                  <th className="p-4">Assigned Operational Zone</th>
                  <th className="p-4">Account Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-medium">
                {teamMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-sage-50/40 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-forest text-white flex items-center justify-center font-bold text-xs shrink-0">
                          {member.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-bold text-charcoal">{member.name}</div>
                          <div className="text-[10px] text-charcoal-muted">{member.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${getRoleBadge(member.role)}`}>
                        {member.role}
                      </span>
                    </td>

                    <td className="p-4 text-charcoal-muted">
                      {member.assignedZone || 'All Zones'}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          member.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-800'
                            : 'bg-rose-50 text-rose-800'
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>

                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setEditingMember(member);
                            setFormName(member.name);
                            setFormEmail(member.email);
                            setFormRole(member.role);
                            setFormZone(member.assignedZone || 'Downtown');
                          }}
                          className="p-1.5 rounded-lg border border-border hover:bg-secondary text-charcoal transition-colors"
                          title="Edit Role"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        {member.role !== 'Owner' && (
                          <button
                            onClick={() => handleToggleStatus(member)}
                            className="px-2 py-1 rounded-lg border border-border hover:bg-secondary text-[11px] font-semibold text-charcoal transition-colors"
                          >
                            {member.status === 'Active' ? 'Deactivate' : 'Activate'}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Invite Member Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl border border-border p-6 shadow-drawer text-left">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="text-base font-bold text-charcoal">Invite Staff Member</h3>
              <button onClick={() => setAddModalOpen(false)} className="p-1 rounded-lg text-charcoal-muted">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block text-charcoal-muted mb-1 font-medium">Employee Full Name *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Jordan Blake"
                  className="w-full p-2.5 rounded-xl border border-border text-charcoal"
                />
              </div>

              <div>
                <label className="block text-charcoal-muted mb-1 font-medium">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="jordan@freshfold.ca"
                  className="w-full p-2.5 rounded-xl border border-border text-charcoal"
                />
              </div>

              <div>
                <label className="block text-charcoal-muted mb-1 font-medium">System Role & Permissions</label>
                <select
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-border font-medium text-charcoal"
                >
                  <option value="Manager">Manager (Operations & Refunds)</option>
                  <option value="Laundry Operator">Laundry Operator (Shop Floor Machines)</option>
                  <option value="Driver">Driver (Pickup & Delivery Logistics)</option>
                </select>
              </div>

              <div>
                <label className="block text-charcoal-muted mb-1 font-medium">Assigned Zone / Facility</label>
                <input
                  type="text"
                  value={formZone}
                  onChange={(e) => setFormZone(e.target.value)}
                  placeholder="e.g. West End & Midtown"
                  className="w-full p-2.5 rounded-xl border border-border text-charcoal"
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
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Role Modal */}
      {editingMember && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl border border-border p-6 shadow-drawer text-left">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="text-base font-bold text-charcoal">Edit Employee Profile</h3>
              <button onClick={() => setEditingMember(null)} className="p-1 rounded-lg text-charcoal-muted">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block text-charcoal-muted mb-1 font-medium">Full Name</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-border text-charcoal font-bold"
                />
              </div>

              <div>
                <label className="block text-charcoal-muted mb-1 font-medium">Email</label>
                <input
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-border text-charcoal"
                />
              </div>

              <div>
                <label className="block text-charcoal-muted mb-1 font-medium">Assigned Role</label>
                <select
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-border font-medium text-charcoal"
                >
                  <option value="Owner">Owner</option>
                  <option value="Manager">Manager</option>
                  <option value="Laundry Operator">Laundry Operator</option>
                  <option value="Driver">Driver</option>
                </select>
              </div>

              <div>
                <label className="block text-charcoal-muted mb-1 font-medium">Assigned Zone</label>
                <input
                  type="text"
                  value={formZone}
                  onChange={(e) => setFormZone(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-border text-charcoal"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="px-4 py-2 rounded-xl border border-border hover:bg-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-forest text-white font-bold hover:bg-forest-light"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
