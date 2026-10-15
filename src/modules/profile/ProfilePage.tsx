import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { UserRole } from '../../types';
import {
  Building,
  Award,
  CheckCircle,
  Tag,
  Mail,
  Layers
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, switchUserRole, updateUser } = useAuth();
  const { language, t } = useLanguage();
  const { addToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [editedCompany, setEditedCompany] = useState(user.company);
  const [newSkillText, setNewSkillText] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name: editedName,
      nameAr: editedName,
      company: editedCompany,
      companyAr: editedCompany
    });
    setIsEditing(false);
    addToast(language === 'ar' ? 'تم تحديث الملف الشخصي' : 'Profile updated successfully', 'success');
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillText.trim()) return;
    if (!user.skills.includes(newSkillText.trim())) {
      updateUser({ skills: [...user.skills, newSkillText.trim()] });
      setNewSkillText('');
      addToast(language === 'ar' ? 'تمت إضافة المهارة' : 'Skill added', 'success');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200 dark:border-night-800 pb-5">
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
          {t('profileTitle')}
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
          {t('profileSubtitle')}
        </p>
      </div>

      {/* Account Type Simulation Switcher Banner */}
      <div className="p-4 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-0.5 text-center md:text-start">
          <div className="text-sm font-semibold text-stone-900 dark:text-stone-100 flex items-center justify-center md:justify-start gap-2">
            <Layers className="w-4 h-4 text-accent" strokeWidth={1.5} />
            <span>{t('switchRole')}</span>
          </div>
          <div className="text-xs text-stone-500">
            Switch between Developer, Partner Company, and Customer IT accounts to preview specific entitlements.
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {(['developer', 'partner', 'customer_it', 'admin'] as UserRole[]).map((r) => {
            const isCurrent = user.role === r;
            const labels: Record<UserRole, string> = {
              developer: 'Developer',
              partner: 'Solution Partner',
              customer_it: 'Customer IT',
              admin: 'DMS Core Admin'
            };
            return (
              <button
                key={r}
                onClick={() => switchUserRole(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isCurrent
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-stone-100 dark:bg-night-800 border border-stone-200 dark:border-night-700 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                {labels[r]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Avatar & Basic Information */}
        <div className="lg:col-span-5 p-6 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-6">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover border border-stone-200 dark:border-night-700"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                {language === 'ar' ? user.nameAr : user.name}
              </h2>
              <div className="text-xs text-stone-500 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-stone-400" strokeWidth={1.5} />
                <span>{language === 'ar' ? user.companyAr : user.company}</span>
              </div>
              <div className="text-xs text-stone-500 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-stone-400" strokeWidth={1.5} />
                <span>{user.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-stone-100 dark:border-night-800/80 text-xs">
            <div className="p-3 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 space-y-1">
              <div className="text-stone-500 font-medium">{t('profileTier')}</div>
              <div className="text-base font-semibold text-accent">{user.tier} Tier</div>
            </div>
            <div className="p-3 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 space-y-1">
              <div className="text-stone-500 font-medium">{t('profilePoints')}</div>
              <div className="text-base font-bold text-stone-900 dark:text-stone-100 font-mono-code">
                {user.points.toLocaleString()} pts
              </div>
            </div>
          </div>

          {/* Edit form */}
          {!isEditing ? (
            <button
              onClick={() => {
                setEditedName(user.name);
                setEditedCompany(user.company);
                setIsEditing(true);
              }}
              className="w-full py-2 rounded-lg bg-stone-100 dark:bg-night-800 hover:bg-stone-200 dark:hover:bg-night-700 text-stone-800 dark:text-stone-200 text-xs font-medium transition-colors"
            >
              {t('edit')}
            </button>
          ) : (
            <form onSubmit={handleSaveProfile} className="space-y-3 pt-2 text-xs">
              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-link"
                />
              </div>
              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-1">Company</label>
                <input
                  type="text"
                  required
                  value={editedCompany}
                  onChange={(e) => setEditedCompany(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-link"
                />
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-night-800 text-stone-700 dark:text-stone-300"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium shadow-sm transition-colors"
                >
                  {t('save')}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Column: Certifications & Skills */}
        <div className="lg:col-span-7 space-y-6">
          {/* Certifications Earned Card */}
          <div className="p-6 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-4">
            <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-base flex items-center gap-2">
              <Award className="w-4 h-4 text-accent" strokeWidth={1.5} />
              <span>{t('profileCertifications')} ({user.certifications.length})</span>
            </h3>

            {user.certifications.length > 0 ? (
              <div className="space-y-2.5">
                {user.certifications.map((cert) => (
                  <div
                    key={cert}
                    className="p-3.5 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" strokeWidth={1.5} />
                      <span className="font-medium text-stone-900 dark:text-stone-100">{cert}</span>
                    </div>
                    <span className="text-[11px] font-mono-code text-stone-500">
                      ID: DMS-CERT-2026-OK
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-stone-500 p-4 border border-dashed border-stone-200 dark:border-night-800 rounded-lg text-center">
                No verified certifications yet. Complete a track in the DMS Academy to earn credentials.
              </div>
            )}
          </div>

          {/* Skills & Tech Stack Card */}
          <div className="p-6 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-4">
            <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-base flex items-center gap-2">
              <Tag className="w-4 h-4 text-accent" strokeWidth={1.5} />
              <span>{t('profileSkills')}</span>
            </h3>

            <div className="flex flex-wrap items-center gap-2">
              {user.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-md bg-stone-100 dark:bg-night-800 text-xs text-stone-700 dark:text-stone-300 font-mono-code border border-stone-200 dark:border-night-700"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Add skill input */}
            <form onSubmit={handleAddSkill} className="flex gap-2 pt-2 border-t border-stone-100 dark:border-night-800/80">
              <input
                type="text"
                value={newSkillText}
                onChange={(e) => setNewSkillText(e.target.value)}
                placeholder="Add custom skill (e.g. MQTT, Docker, FHIR)..."
                className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-link"
              />
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium text-xs shadow-sm transition-colors"
              >
                Add Skill
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
