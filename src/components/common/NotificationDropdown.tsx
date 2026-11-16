import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLaundry } from '../../context/LaundryContext';
import { Bell, CheckCheck, Clock, Check, Package, Truck, CreditCard } from 'lucide-react';

interface NotificationDropdownProps {
  recipient: 'customer' | 'business';
  align?: 'left' | 'right';
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  recipient,
  align = 'right',
}) => {
  const {
    customerNotifications,
    businessNotifications,
    markNotificationRead,
    markAllNotificationsRead,
  } = useLaundry();

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const notifs = recipient === 'customer' ? customerNotifications : businessNotifications;
  const unreadCount = notifs.filter((n) => !n.read).length;

  const handleNotificationClick = (id: string, orderId?: string) => {
    markNotificationRead(id);
    setIsOpen(false);
    if (orderId) {
      if (recipient === 'customer') {
        navigate(`/app/track/${orderId}`);
      } else {
        navigate('/dashboard/orders');
      }
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'delivery':
      case 'pickup':
        return <Truck className="w-4 h-4 text-sky-600" />;
      case 'payment':
        return <CreditCard className="w-4 h-4 text-emerald-600" />;
      default:
        return <Package className="w-4 h-4 text-forest" />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-charcoal hover:bg-black/5 transition-colors focus:outline-none"
        title="Notifications"
      >
        <Bell className="w-5 h-5 text-charcoal" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-forest text-[10px] font-bold text-white shadow-xs">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className={`absolute ${
            align === 'right' ? 'right-0' : 'left-0'
          } mt-2 w-80 sm:w-96 rounded-2xl bg-white border border-border shadow-drawer z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150`}
          onMouseLeave={() => setIsOpen(false)}
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-border flex items-center justify-between bg-surface-subtle">
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal">
                Notifications
              </h4>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-sage-100 text-forest">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={() => markAllNotificationsRead(recipient)}
                className="text-[11px] font-medium text-forest hover:text-forest-dark flex items-center gap-1 hover:underline"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-border/60">
            {notifs.length === 0 ? (
              <div className="p-6 text-center text-xs text-charcoal-muted">
                No notifications right now.
              </div>
            ) : (
              notifs.slice(0, 8).map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleNotificationClick(item.id, item.orderId)}
                  className={`p-3.5 flex items-start gap-3 cursor-pointer hover:bg-sage-50/60 transition-colors ${
                    !item.read ? 'bg-sage-50/30 font-medium' : 'opacity-80'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center shrink-0 mt-0.5">
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-charcoal truncate">{item.title}</p>
                      <span className="text-[10px] text-charcoal-muted flex items-center gap-1 shrink-0 ml-2">
                        <Clock className="w-2.5 h-2.5" />
                        {item.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-charcoal-muted mt-0.5 line-clamp-2 leading-relaxed">
                      {item.message}
                    </p>
                    {item.orderId && (
                      <span className="inline-block mt-1 text-[10px] font-bold text-forest bg-sage-100/80 px-1.5 py-0.5 rounded">
                        #{item.orderId}
                      </span>
                    )}
                  </div>
                  {!item.read && (
                    <span className="w-2 h-2 rounded-full bg-forest shrink-0 mt-1.5" />
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-border bg-surface-subtle text-center text-[11px] text-charcoal-muted">
            Live synchronized state updates
          </div>
        </div>
      )}
    </div>
  );
};
