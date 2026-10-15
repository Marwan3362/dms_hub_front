import React, { useState } from 'react';
import { MARKETPLACE_LISTINGS } from '../../data/marketplace';
import { MarketplaceListing, ProductLine } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import { Modal } from '../../components/ui/Modal';
import { StatusBadge } from '../../components/ui/StatusBadge';
import {
  Search,
  Plus,
  Star,
  CheckCircle,
  ShieldCheck,
  Server,
  Activity,
  ArrowRight,
  ArrowLeft,
  Upload,
  Download,
  Check
} from 'lucide-react';

export const MarketplacePage: React.FC = () => {
  const { language, t, dir } = useLanguage();
  const { addToast } = useToast();
  const { user } = useAuth();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const [listings, setListings] = useState<MarketplaceListing[]>(MARKETPLACE_LISTINGS);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [productFilter, setProductFilter] = useState<'all' | ProductLine>('all');
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [certifiedOnly, setCertifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'popularity' | 'rating' | 'priceAsc' | 'newest'>('popularity');

  // Modals state
  const [detailModalItem, setDetailModalItem] = useState<MarketplaceListing | null>(null);
  const [installConfirmModalItem, setInstallConfirmModalItem] = useState<MarketplaceListing | null>(null);
  const [publishWizardOpen, setPublishWizardOpen] = useState(false);

  // Publish Wizard Multi-step State
  const [wizardStep, setWizardStep] = useState(1);
  const [newTitle, setNewTitle] = useState('');
  const [newShortDesc, setNewShortDesc] = useState('');
  const [newProduct, setNewProduct] = useState<ProductLine>('industrial_erp');
  const [newCategory, setNewCategory] = useState<'reports' | 'integrations' | 'ai_addons' | 'bi_dashboards'>('reports');
  const [newPrice, setNewPrice] = useState(150);
  const [newMinVersion, setNewMinVersion] = useState('DMS ERP v2.4 LTS');
  const [newPackageFileName, setNewPackageFileName] = useState('');

  // Filtering Logic
  const filteredListings = listings.filter((item) => {
    const q = searchQuery.toLowerCase();
    const title = language === 'ar' ? item.titleAr : item.title;
    const desc = language === 'ar' ? item.shortDescAr : item.shortDesc;
    const matchesSearch = title.toLowerCase().includes(q) || desc.toLowerCase().includes(q);

    const matchesProduct = productFilter === 'all' || item.product === productFilter;
    const matchesPrice =
      priceFilter === 'all' ||
      (priceFilter === 'free' && item.price === 0) ||
      (priceFilter === 'paid' && item.price > 0);
    const matchesCertified = !certifiedOnly || item.author.isCertified;

    return matchesSearch && matchesProduct && matchesPrice && matchesCertified;
  });

  // Sorting
  const sortedListings = [...filteredListings].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'priceAsc') return a.price - b.price;
    return b.installsCount - a.installsCount; // popularity default
  });

  // Submit Publish Wizard
  const handleCompletePublish = (e: React.FormEvent) => {
    e.preventDefault();
    const created: MarketplaceListing = {
      id: `mod-user-${Date.now()}`,
      title: newTitle,
      titleAr: newTitle,
      shortDesc: newShortDesc,
      shortDescAr: newShortDesc,
      product: newProduct,
      category: newCategory,
      categoryAr: newCategory,
      price: newPrice,
      currency: 'USD',
      author: {
        name: user.name,
        company: user.company,
        isCertified: user.certifications.length > 0,
        tier: user.tier
      },
      rating: 5.0,
      reviewsCount: 1,
      installsCount: 0,
      compatibility: {
        minVersion: newMinVersion,
        testedOn: 'DMS Sandbox 2026.1'
      },
      status: 'in_review',
      features: ['Automated DMS Data Connector', 'Certified FastReports Engine Compatible'],
      featuresAr: ['موصل بيانات DMS التلقائي', 'متوافق مع محرك FastReports المعتمد'],
      tags: ['Custom', 'Community']
    };

    setListings([created, ...listings]);
    setPublishWizardOpen(false);
    setWizardStep(1);
    setNewTitle('');
    setNewShortDesc('');
    addToast(
      language === 'ar'
        ? 'تم إرسال الإضافة لمراجعة فريق أمان DMS بنجاح (قيد الفحص)'
        : 'Module submitted for DMS security review (In Review status)',
      'info'
    );
  };

  const handleConfirmInstall = () => {
    if (!installConfirmModalItem) return;
    setInstallConfirmModalItem(null);
    setDetailModalItem(null);
    addToast(
      language === 'ar'
        ? `تم تقديم طلب تثبيت "${language === 'ar' ? installConfirmModalItem.titleAr : installConfirmModalItem.title}". سيتواصل معك مهندس DMS بعد فحص التوافق.`
        : `Install request submitted for "${installConfirmModalItem.title}". DMS security will verify compatibility with your tenant.`,
      'success',
      'Installation Requested'
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-night-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
            {t('marketplaceTitle')}
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
            {t('marketplaceSubtitle')}
          </p>
        </div>

        <button
          onClick={() => {
            setWizardStep(1);
            setPublishWizardOpen(true);
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium text-xs shadow-sm transition-colors self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span>{t('publishListingBtn')}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-stone-400 absolute start-3 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchListings')}
              className="w-full ps-9 pe-3 py-2 text-xs rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-link"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 w-full md:w-auto text-xs">
            <span className="text-stone-500 shrink-0">{t('sort')}:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2.5 py-1.5 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-link text-xs"
            >
              <option value="popularity">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="priceAsc">Price: Low to High</option>
            </select>
          </div>
        </div>

        {/* Filter Tabs / Controls */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-stone-100 dark:border-night-800/80 text-xs">
          {/* Product Filter */}
          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-stone-100 dark:bg-night-900 border border-stone-200 dark:border-night-800">
            <button
              onClick={() => setProductFilter('all')}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                productFilter === 'all'
                  ? 'bg-white dark:bg-night-800 text-accent font-semibold shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              {t('all')}
            </button>
            <button
              onClick={() => setProductFilter('industrial_erp')}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                productFilter === 'industrial_erp'
                  ? 'bg-white dark:bg-night-800 text-accent font-semibold shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              {t('shortIndustrial')}
            </button>
            <button
              onClick={() => setProductFilter('hms')}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                productFilter === 'hms'
                  ? 'bg-white dark:bg-night-800 text-accent font-semibold shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              {t('shortHms')}
            </button>
          </div>

          {/* Pricing Model */}
          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-stone-100 dark:bg-night-900 border border-stone-200 dark:border-night-800">
            <button
              onClick={() => setPriceFilter('all')}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                priceFilter === 'all'
                  ? 'bg-white dark:bg-night-800 text-accent font-semibold shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              {t('all')}
            </button>
            <button
              onClick={() => setPriceFilter('free')}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                priceFilter === 'free'
                  ? 'bg-white dark:bg-night-800 text-accent font-semibold shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              {t('priceFree')}
            </button>
            <button
              onClick={() => setPriceFilter('paid')}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                priceFilter === 'paid'
                  ? 'bg-white dark:bg-night-800 text-accent font-semibold shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              {t('pricePaid')}
            </button>
          </div>

          {/* Certified Only Checkbox */}
          <label className="flex items-center gap-1.5 ms-auto px-2 py-1 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={certifiedOnly}
              onChange={(e) => setCertifiedOnly(e.target.checked)}
              className="rounded border-stone-300 dark:border-night-700 text-accent focus:ring-link"
            />
            <span>{t('filterCertifiedOnly')}</span>
          </label>
        </div>
      </div>

      {/* Listings Grid */}
      {sortedListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedListings.map((item) => (
            <div
              key={item.id}
              onClick={() => setDetailModalItem(item)}
              className={`group cursor-pointer p-6 rounded-xl border border-t-[3px] ${item.product === 'industrial_erp' ? 'border-t-brand-blue!' : item.product === 'hms' ? 'border-t-brand-green!' : 'border-t-stone-300 dark:border-t-night-700'} border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 hover:border-stone-300 dark:hover:border-night-700 transition-colors flex flex-col justify-between gap-5`}
            >
              <div className="space-y-3">
                {/* Header row */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[11px] font-semibold uppercase tracking-wider ${item.product === 'industrial_erp' ? 'text-tag-erp' : item.product === 'hms' ? 'text-tag-hms' : 'text-stone-500'}`}>
                    {item.product === 'industrial_erp'
                      ? t('shortIndustrial')
                      : item.product === 'hms'
                      ? t('shortHms')
                      : 'Common'}
                  </span>

                  <StatusBadge status={item.status} />
                </div>

                <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-base group-hover:text-link transition-colors line-clamp-2">
                  {language === 'ar' ? item.titleAr : item.title}
                </h3>

                <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed">
                  {language === 'ar' ? item.shortDescAr : item.shortDesc}
                </p>
              </div>

              {/* Bottom metadata */}
              <div className="pt-3 border-t border-stone-100 dark:border-night-800/80 space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-stone-500">
                  <div className="flex items-center gap-1 text-stone-700 dark:text-stone-300 font-medium">
                    <Star className="w-3.5 h-3.5 fill-brand-yellow text-brand-yellow" strokeWidth={1.5} />
                    <span>{item.rating.toFixed(1)}</span>
                    <span className="text-stone-400 font-normal">({item.reviewsCount})</span>
                  </div>

                  <span className="font-mono-code text-stone-500">
                    {item.installsCount} installs
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-stone-600 dark:text-stone-400 truncate max-w-[170px]">
                    <span className="truncate">{item.author.company}</span>
                    {item.author.isCertified && (
                      <span title="Certified Developer">
                        <CheckCircle className="w-3.5 h-3.5 text-accent shrink-0" strokeWidth={1.5} />
                      </span>
                    )}
                  </div>

                  <div className="font-bold text-sm text-stone-900 dark:text-stone-100 font-mono-code">
                    {item.price === 0 ? (
                      <span className="text-accent">{t('priceFree')}</span>
                    ) : (
                      `$${item.price}`
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center text-stone-500 text-sm border border-stone-200 dark:border-night-800 rounded-xl bg-white dark:bg-night-900">
          {t('emptyStateDesc')}
        </div>
      )}

      {/* Modal: Listing Detail */}
      {detailModalItem && (
        <Modal
          isOpen={true}
          onClose={() => setDetailModalItem(null)}
          title={language === 'ar' ? detailModalItem.titleAr : detailModalItem.title}
          maxWidth="2xl"
        >
          <div className="space-y-6 text-xs sm:text-sm">
            {/* Top metadata strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800">
              <div className="flex items-center gap-2">
                <div className="text-stone-800 dark:text-stone-200 font-medium">
                  {detailModalItem.author.name} ·{' '}
                  <span className="text-stone-500">{detailModalItem.author.company}</span>
                </div>
                {detailModalItem.author.isCertified && (
                  <span className="px-2 py-0.5 rounded bg-stone-200 dark:bg-night-800 text-stone-700 dark:text-stone-300 text-xs">
                    Certified Partner
                  </span>
                )}
              </div>

              <div className="text-base font-bold text-stone-900 dark:text-stone-100 font-mono-code">
                {detailModalItem.price === 0 ? t('priceFree') : `$${detailModalItem.price} USD`}
              </div>
            </div>

            {/* Description */}
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
              {language === 'ar' ? detailModalItem.shortDescAr : detailModalItem.shortDesc}
            </p>

            {/* Feature Bullets */}
            <div className="space-y-2">
              <h4 className="font-semibold text-stone-900 dark:text-stone-100">Included Features:</h4>
              <ul className="space-y-1.5 text-stone-600 dark:text-stone-300">
                {(language === 'ar' ? detailModalItem.featuresAr : detailModalItem.features).map(
                  (f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
                      <span>{f}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Compatibility info */}
            <div className="p-3 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 space-y-1 text-xs">
              <div className="font-semibold text-stone-800 dark:text-stone-200">{t('compatibilityVersion')}</div>
              <div className="text-stone-500 font-mono-code">
                {detailModalItem.compatibility.minVersion} · Tested on:{' '}
                {detailModalItem.compatibility.testedOn}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200 dark:border-night-800">
              <button
                type="button"
                onClick={() => setDetailModalItem(null)}
                className="px-4 py-2 rounded-lg bg-stone-100 dark:bg-night-800 hover:bg-stone-200 dark:hover:bg-night-700 text-stone-700 dark:text-stone-300 text-xs font-medium transition-colors"
              >
                {t('close')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setInstallConfirmModalItem(detailModalItem);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium text-xs shadow-sm transition-colors"
              >
                <Download className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>{t('requestInstall')}</span>
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal: Request Install Confirmation with Security Notice */}
      {installConfirmModalItem && (
        <Modal
          isOpen={true}
          onClose={() => setInstallConfirmModalItem(null)}
          title={t('requestInstall')}
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-stone-900 dark:text-stone-100">
                <ShieldCheck className="w-4 h-4 text-accent shrink-0" strokeWidth={1.5} />
                <span>DMS Security Clearance Required</span>
              </div>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                {t('installSecurityNotice')}
              </p>
            </div>

            <div className="text-stone-600 dark:text-stone-400 space-y-1">
              <div>Module: <strong className="text-stone-900 dark:text-stone-100">{installConfirmModalItem.title}</strong></div>
              <div>Estimated Deployment Window: <span className="font-mono-code font-medium text-stone-900 dark:text-stone-100">24-48 Hours</span></div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setInstallConfirmModalItem(null)}
                className="px-4 py-2 rounded-lg bg-stone-100 dark:bg-night-800 text-stone-700 dark:text-stone-300 font-medium"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleConfirmInstall}
                className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium shadow-sm transition-colors"
              >
                Confirm & Submit Request
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal: Publish a Listing 5-Step Wizard */}
      <Modal
        isOpen={publishWizardOpen}
        onClose={() => setPublishWizardOpen(false)}
        title={t('publishListingBtn')}
        maxWidth="xl"
      >
        <div className="space-y-6 text-xs">
          {/* Wizard step strip */}
          <div className="flex items-center justify-between border-b border-stone-200 dark:border-night-800 pb-3 text-[11px] text-stone-400">
            <span className={wizardStep === 1 ? 'text-accent font-bold' : ''}>{t('wizardStep1')}</span>
            <span>·</span>
            <span className={wizardStep === 2 ? 'text-accent font-bold' : ''}>{t('wizardStep2')}</span>
            <span>·</span>
            <span className={wizardStep === 3 ? 'text-accent font-bold' : ''}>{t('wizardStep3')}</span>
            <span>·</span>
            <span className={wizardStep === 4 ? 'text-accent font-bold' : ''}>{t('wizardStep4')}</span>
            <span>·</span>
            <span className={wizardStep === 5 ? 'text-accent font-bold' : ''}>{t('wizardStep5')}</span>
          </div>

          {/* Step 1: Basic Details */}
          {wizardStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">Title / Name</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Cairo Factory OEE Live Dashboard"
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-link"
                />
              </div>

              <div>
                <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">Short Description</label>
                <textarea
                  rows={3}
                  required
                  value={newShortDesc}
                  onChange={(e) => setNewShortDesc(e.target.value)}
                  placeholder="Provide an overview of the report views or integration connectors..."
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-link"
                />
              </div>

              <div>
                <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">{t('filterCategory')}</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-link"
                >
                  <option value="reports">FastReports / Report Templates</option>
                  <option value="integrations">Integrations & Connectors</option>
                  <option value="bi_dashboards">PowerBI / BI Dashboards</option>
                  <option value="ai_addons">AI Add-ons & Inference Models</option>
                </select>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  disabled={!newTitle.trim() || !newShortDesc.trim()}
                  onClick={() => setWizardStep(2)}
                  className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover disabled:opacity-50 text-white font-medium transition-colors"
                >
                  {t('next')}
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Compatibility */}
          {wizardStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">{t('filterProduct')}</label>
                <select
                  value={newProduct}
                  onChange={(e) => setNewProduct(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-link"
                >
                  <option value="industrial_erp">{t('productIndustrial')}</option>
                  <option value="hms">{t('productHms')}</option>
                  <option value="common">{t('productCommon')}</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">Minimum Tested Version</label>
                <input
                  type="text"
                  value={newMinVersion}
                  onChange={(e) => setNewMinVersion(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-link"
                />
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setWizardStep(1)}
                  className="px-4 py-2 rounded-lg bg-stone-100 dark:bg-night-800 text-stone-700 dark:text-stone-300 font-medium"
                >
                  {t('previous')}
                </button>
                <button
                  type="button"
                  onClick={() => setWizardStep(3)}
                  className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium transition-colors"
                >
                  {t('next')}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Pricing & Revenue Share */}
          {wizardStep === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">Listing Price (USD) - 0 for Free</label>
                <input
                  type="number"
                  min={0}
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-link font-mono-code"
                />
              </div>

              <div className="p-3 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 text-stone-600 dark:text-stone-400">
                Based on your current <strong>{user.tier} Partner Tier</strong>, you will receive an estimated <strong>80% net revenue share</strong> on every sale.
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setWizardStep(2)}
                  className="px-4 py-2 rounded-lg bg-stone-100 dark:bg-night-800 text-stone-700 dark:text-stone-300 font-medium"
                >
                  {t('previous')}
                </button>
                <button
                  type="button"
                  onClick={() => setWizardStep(4)}
                  className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium transition-colors"
                >
                  {t('next')}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Package Upload */}
          {wizardStep === 4 && (
            <div className="space-y-4">
              <label className="block text-stone-700 dark:text-stone-300 font-medium">Upload Package ZIP or Manifest</label>
              <div
                onClick={() => setNewPackageFileName('dms-module-bundle-v1.0.zip')}
                className="p-8 border border-dashed border-stone-300 dark:border-night-700 rounded-xl text-center hover:border-accent cursor-pointer space-y-2 bg-stone-50 dark:bg-night-900"
              >
                <Upload className="w-5 h-5 text-stone-400 mx-auto" strokeWidth={1.5} />
                <div className="text-stone-600 dark:text-stone-400">
                  {newPackageFileName ? (
                    <span className="text-accent font-mono-code font-bold">{newPackageFileName} (Ready)</span>
                  ) : (
                    <span>Click to simulate uploading package bundle (.zip / .fr3 / .pbix)</span>
                  )}
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setWizardStep(3)}
                  className="px-4 py-2 rounded-lg bg-stone-100 dark:bg-night-800 text-stone-700 dark:text-stone-300 font-medium"
                >
                  {t('previous')}
                </button>
                <button
                  type="button"
                  onClick={() => setWizardStep(5)}
                  className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium transition-colors"
                >
                  {t('next')}
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Review & Submit */}
          {wizardStep === 5 && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 space-y-2 text-stone-700 dark:text-stone-300">
                <div>Title: <strong className="text-stone-900 dark:text-stone-100">{newTitle}</strong></div>
                <div>Category: <span className="text-accent">{newCategory}</span></div>
                <div>Price: <span className="font-mono-code text-stone-900 dark:text-stone-100">${newPrice} USD</span></div>
                <div>Compatibility: <span className="font-mono-code text-stone-500">{newMinVersion}</span></div>
              </div>

              <p className="text-stone-500 text-xs">
                By submitting, you agree to DMS Partner Terms. The listing will enter the Review Queue for automated static code analysis and security approval.
              </p>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setWizardStep(4)}
                  className="px-4 py-2 rounded-lg bg-stone-100 dark:bg-night-800 text-stone-700 dark:text-stone-300 font-medium"
                >
                  {t('previous')}
                </button>
                <button
                  type="button"
                  onClick={handleCompletePublish}
                  className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium shadow-sm transition-colors"
                >
                  {t('submit')}
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};
