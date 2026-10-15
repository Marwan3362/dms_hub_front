import React, { useState } from 'react';
import { INITIAL_TICKETS, AUDIT_LOGS } from '../../data/tickets';
import { SupportTicket, ProductLine } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import { Modal } from '../../components/ui/Modal';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { SyntheticBadge } from '../../components/ui/SyntheticBadge';
import {
  LifeBuoy,
  Plus,
  Send
} from 'lucide-react';

export const PartnerDashboardPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { addToast } = useToast();
  const { user } = useAuth();

  const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(INITIAL_TICKETS[0]);
  const [ticketReplyText, setTicketReplyText] = useState('');

  // Create Ticket Modal State
  const [createTicketModalOpen, setCreateTicketModalOpen] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [newCategory, setNewCategory] = useState<'api' | 'sandbox' | 'marketplace' | 'billing' | 'security'>('api');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [newProduct, setNewProduct] = useState<ProductLine>('industrial_erp');
  const [newMessage, setNewMessage] = useState('');

  // Send Reply in ticket conversation
  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketReplyText.trim() || !selectedTicket) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: user.name,
      isStaff: false,
      message: ticketReplyText,
      timestamp: 'Just now'
    };

    const updated = {
      ...selectedTicket,
      updatedAt: 'Just now',
      messages: [...selectedTicket.messages, newMsg]
    };

    setSelectedTicket(updated);
    setTickets((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    setTicketReplyText('');
    addToast(language === 'ar' ? 'تم إرسال الرد على التذكرة' : 'Reply sent to DMS support team', 'success');
  };

  // Submit New Ticket
  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim() || !newMessage.trim()) return;

    const ticketNum = `DMS-TCK-${Math.floor(Math.random() * 900) + 9100}`;
    const newTkt: SupportTicket = {
      id: `tkt-${Date.now()}`,
      ticketNumber: ticketNum,
      subject: newSubject,
      category: newCategory,
      priority: newPriority,
      status: 'open',
      product: newProduct,
      createdAt: 'Just now',
      updatedAt: 'Just now',
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: user.name,
          isStaff: false,
          message: newMessage,
          timestamp: 'Just now'
        }
      ]
    };

    setTickets([newTkt, ...tickets]);
    setSelectedTicket(newTkt);
    setCreateTicketModalOpen(false);
    setNewSubject('');
    setNewMessage('');
    addToast(
      language === 'ar'
        ? `تم فتح التذكرة رقم ${ticketNum} بنجاح`
        : `Support ticket ${ticketNum} opened successfully`,
      'success',
      'Ticket Created'
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-night-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
              {t('partnerDashTitle')}
            </h1>
            <SyntheticBadge size="sm" />
          </div>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
            {t('partnerDashSubtitle')}
          </p>
        </div>

        <button
          onClick={() => setCreateTicketModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium text-xs shadow-sm transition-colors self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span>{t('createTicketBtn')}</span>
        </button>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-1">
          <div className="text-xs text-stone-500 font-medium">Monthly API Volume</div>
          <div className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 font-mono-code">23,090</div>
          <div className="text-[11px] text-accent">99.94% Success Rate</div>
        </div>

        <div className="p-5 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-1">
          <div className="text-xs text-stone-500 font-medium">Marketplace Net Revenue</div>
          <div className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 font-mono-code">$4,850</div>
          <div className="text-[11px] text-stone-500">≈ 235,225 EGP / Month</div>
        </div>

        <div className="p-5 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-1">
          <div className="text-xs text-stone-500 font-medium">Contribution Points & Tier</div>
          <div className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 font-mono-code">
            {user.points.toLocaleString()} pts
          </div>
          <div className="text-[11px] text-accent font-medium">{user.tier} Partner Status</div>
        </div>

        <div className="p-5 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-1">
          <div className="text-xs text-stone-500 font-medium">Earned Certifications</div>
          <div className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 font-mono-code">
            {user.certifications.length}
          </div>
          <div className="text-[11px] text-stone-500">Accredited Credentials</div>
        </div>
      </div>

      {/* Support Tickets Section: List + Conversation Thread */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-base flex items-center gap-2">
            <LifeBuoy className="w-4 h-4 text-accent" strokeWidth={1.5} />
            <span>Dedicated Engineering Support Tickets</span>
          </h3>
          <span className="text-xs font-mono-code text-stone-500">
            {tickets.length} Active Tickets
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Tickets List */}
          <div className="lg:col-span-5 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 p-3 space-y-2 max-h-[500px] overflow-y-auto">
            {tickets.map((tkt) => {
              const isSelected = selectedTicket?.id === tkt.id;
              return (
                <div
                  key={tkt.id}
                  onClick={() => setSelectedTicket(tkt)}
                  className={`p-3.5 rounded-lg cursor-pointer transition-colors border text-xs space-y-2 ${
                    isSelected
                      ? 'border-accent bg-stone-50 dark:bg-night-800/80 text-stone-900 dark:text-stone-100'
                      : 'border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 text-stone-600 dark:text-stone-400 hover:border-stone-300 dark:hover:border-night-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono-code font-bold text-accent">
                      {tkt.ticketNumber}
                    </span>
                    <StatusBadge status={tkt.status} />
                  </div>

                  <h4 className="font-medium text-stone-900 dark:text-stone-100 line-clamp-1">
                    {tkt.subject}
                  </h4>

                  <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-100 dark:border-night-800/80">
                    <span className="uppercase text-[10px] font-bold text-stone-600 dark:text-stone-400">
                      {tkt.priority} Priority
                    </span>
                    <span className="font-mono-code">{tkt.updatedAt}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Ticket Thread */}
          <div className="lg:col-span-7 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 p-6 space-y-4 flex flex-col justify-between min-h-[460px]">
            {selectedTicket ? (
              <div className="space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 dark:border-night-800/80 pb-3">
                    <div>
                      <span className="font-mono-code font-bold text-accent text-xs">
                        {selectedTicket.ticketNumber}
                      </span>
                      <h4 className="font-semibold text-stone-900 dark:text-stone-100 text-base mt-0.5">
                        {selectedTicket.subject}
                      </h4>
                    </div>
                    <StatusBadge status={selectedTicket.status} />
                  </div>

                  {/* Messages Bubble Thread */}
                  <div className="space-y-3 py-4 max-h-[280px] overflow-y-auto">
                    {selectedTicket.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-3.5 rounded-xl text-xs space-y-1.5 max-w-[85%] ${
                          msg.isStaff
                            ? 'ms-auto bg-stone-100 dark:bg-night-800 border border-stone-200 dark:border-night-700 text-stone-900 dark:text-stone-100'
                            : 'me-auto bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 text-stone-800 dark:text-stone-200'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3 text-[11px] text-stone-500 border-b border-stone-200/60 dark:border-night-700/60 pb-1">
                          <span className="font-semibold text-stone-900 dark:text-stone-100">
                            {msg.sender} {msg.isStaff && '(DMS Staff)'}
                          </span>
                          <span className="font-mono-code">{msg.timestamp}</span>
                        </div>
                        <p className="leading-relaxed font-normal">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reply Form */}
                <form onSubmit={handleSendReply} className="pt-3 border-t border-stone-100 dark:border-night-800/80 flex gap-2">
                  <input
                    type="text"
                    required
                    value={ticketReplyText}
                    onChange={(e) => setTicketReplyText(e.target.value)}
                    placeholder={t('replyToTicket')}
                    className="flex-1 px-3 py-2 text-xs rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-link"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium text-xs shrink-0 flex items-center gap-1 shadow-sm transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>{t('sendReplyBtn')}</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-8 text-center text-stone-400 text-xs">
                Select a ticket to view the conversation.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Activity History Audit Trail */}
      <div className="p-6 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-4">
        <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-base">
          {t('auditLogTitle')}
        </h3>
        <div className="space-y-2 text-xs">
          {AUDIT_LOGS.map((log) => (
            <div
              key={log.id}
              className="p-3 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div className="space-y-0.5">
                <span className="font-mono-code text-[11px] font-bold text-accent">
                  {language === 'ar' ? log.actionAr : log.action}
                </span>
                <p className="text-stone-600 dark:text-stone-300 font-normal">
                  {language === 'ar' ? log.descriptionAr : log.description}
                </p>
              </div>

              <div className="text-stone-500 text-[11px] font-mono-code text-end shrink-0">
                <div>{log.ipAddress}</div>
                <div className="text-stone-400">{log.timestamp}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Create Support Ticket */}
      <Modal
        isOpen={createTicketModalOpen}
        onClose={() => setCreateTicketModalOpen(false)}
        title={t('createTicketBtn')}
        maxWidth="lg"
      >
        <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
          <div>
            <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">{t('ticketSubject')}</label>
            <input
              type="text"
              required
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              placeholder="e.g., Assistance with HL7 Observation mapping"
              className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-link"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-link"
              >
                <option value="api">REST API / OPC-UA</option>
                <option value="sandbox">Sandbox Environment</option>
                <option value="marketplace">Marketplace & Revenue</option>
                <option value="billing">Enterprise Licensing</option>
                <option value="security">Security Clearance</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">{t('ticketPriority')}</label>
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-link"
              >
                <option value="low">Low (Standard)</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent (Plant / ICU Incident)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">Detailed Inquiry</label>
            <textarea
              rows={4}
              required
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Describe your issue with error codes, endpoint URL, and tenant ID..."
              className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-link"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setCreateTicketModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-stone-100 dark:bg-night-800 text-stone-700 dark:text-stone-300 font-medium"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium shadow-sm transition-colors"
            >
              Submit Ticket
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
