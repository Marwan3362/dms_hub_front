import React, { useState } from 'react';
import { FORUM_QUESTIONS } from '../../data/forum';
import { ForumQuestion, ProductLine } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import { Modal } from '../../components/ui/Modal';
import { CodeBlock } from '../../components/ui/CodeBlock';
import {
  MessageSquare,
  ThumbsUp,
  CheckCircle,
  ShieldCheck,
  Search,
  Plus,
  ArrowRight,
  ArrowLeft,
  Send,
  Check
} from 'lucide-react';

export const ForumPage: React.FC = () => {
  const { language, t, dir } = useLanguage();
  const { addToast } = useToast();
  const { user, addPoints } = useAuth();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const [questions, setQuestions] = useState<ForumQuestion[]>(FORUM_QUESTIONS);
  const [selectedQuestion, setSelectedQuestion] = useState<ForumQuestion | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Ask Question Modal
  const [askModalOpen, setAskModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newProduct, setNewProduct] = useState<ProductLine>('industrial_erp');
  const [newSnippet, setNewSnippet] = useState('');
  const [newTagInput, setNewTagInput] = useState('REST, ERP');

  // Post Answer Input State
  const [newAnswerText, setNewAnswerText] = useState('');

  // Filtering
  const filteredQuestions = questions.filter((q) => {
    const query = searchQuery.toLowerCase();
    const title = language === 'ar' ? q.titleAr : q.title;
    const content = language === 'ar' ? q.contentAr : q.content;
    const matchesSearch = title.toLowerCase().includes(query) || content.toLowerCase().includes(query);
    const matchesTag = selectedTag === 'all' || q.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  // Upvote Question
  const handleUpvoteQuestion = (qId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setQuestions((prev) =>
      prev.map((q) => (q.id === qId ? { ...q, votes: q.votes + 1 } : q))
    );
    if (selectedQuestion && selectedQuestion.id === qId) {
      setSelectedQuestion((prev) => (prev ? { ...prev, votes: prev.votes + 1 } : null));
    }
    addToast(language === 'ar' ? 'تم التصويت للسؤال' : 'Upvote recorded', 'info');
  };

  // Upvote Answer
  const handleUpvoteAnswer = (ansId: string) => {
    if (!selectedQuestion) return;
    const updatedAnswers = selectedQuestion.answers.map((a) =>
      a.id === ansId ? { ...a, votes: a.votes + 1 } : a
    );
    const updatedQuestion = { ...selectedQuestion, answers: updatedAnswers };
    setSelectedQuestion(updatedQuestion);
    setQuestions((prev) => prev.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q)));
    addToast(language === 'ar' ? 'تم التصويت للإجابة' : 'Answer upvoted', 'info');
  };

  // Post New Answer
  const handlePostAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnswerText.trim() || !selectedQuestion) return;

    const newAns = {
      id: `ans-usr-${Date.now()}`,
      author: {
        name: user.name,
        role: user.role === 'admin' ? 'DMS Core Staff' : 'Certified Developer',
        isDmsStaff: user.role === 'admin'
      },
      content: newAnswerText,
      contentAr: newAnswerText,
      votes: 1,
      isAccepted: false,
      createdAt: 'Just now'
    };

    const updated = {
      ...selectedQuestion,
      answersCount: selectedQuestion.answersCount + 1,
      answers: [...selectedQuestion.answers, newAns]
    };

    setSelectedQuestion(updated);
    setQuestions((prev) => prev.map((q) => (q.id === updated.id ? updated : q)));
    setNewAnswerText('');
    addPoints(15);
    addToast(
      language === 'ar' ? 'تم نشر إجابتك بنجاح (+15 نقطة)' : 'Answer posted successfully (+15 pts)',
      'success'
    );
  };

  // Submit New Question
  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const created: ForumQuestion = {
      id: `q-usr-${Date.now()}`,
      title: newTitle,
      titleAr: newTitle,
      content: newContent,
      contentAr: newContent,
      codeSnippet: newSnippet.trim() ? newSnippet : undefined,
      author: {
        name: user.name,
        role: user.company,
        tier: user.tier
      },
      product: newProduct,
      tags: newTagInput.split(',').map((s) => s.trim()).filter(Boolean),
      votes: 1,
      views: 3,
      answersCount: 0,
      isSolved: false,
      createdAt: 'Just now',
      answers: []
    };

    setQuestions([created, ...questions]);
    setAskModalOpen(false);
    setNewTitle('');
    setNewContent('');
    setNewSnippet('');
    addPoints(10);
    addToast(
      language === 'ar' ? 'تم طرح السؤال في المنتدى بنجاح (+10 نقاط)' : 'Question posted to community forum (+10 pts)',
      'success'
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-night-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
            {t('forumTitle')}
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
            {t('forumSubtitle')}
          </p>
        </div>

        <button
          onClick={() => setAskModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium text-xs shadow-sm transition-colors self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span>{t('askQuestionBtn')}</span>
        </button>
      </div>

      {/* Main View: List or Single Question Detail */}
      {!selectedQuestion ? (
        <div className="space-y-6">
          {/* Search & Tags Filter Bar */}
          <div className="p-4 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-stone-400 absolute start-3 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search forum questions, keywords, or error codes..."
                className="w-full ps-9 pe-3 py-2 text-xs rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-link"
              />
            </div>

            {/* Filter Tags */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {['all', 'OPC-UA', 'FHIR', 'e-Invoicing', 'Rate-Limiting'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-2.5 py-1 rounded-md text-xs transition-colors ${
                    selectedTag === tag
                      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-medium'
                      : 'bg-stone-100 dark:bg-night-800 border border-stone-200 dark:border-night-700 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                  }`}
                >
                  {tag === 'all' ? t('all') : tag}
                </button>
              ))}
            </div>
          </div>

          {/* Question List Cards */}
          <div className="space-y-3">
            {filteredQuestions.map((q) => (
              <div
                key={q.id}
                onClick={() => setSelectedQuestion(q)}
                className="group cursor-pointer p-5 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 hover:border-stone-300 dark:hover:border-night-700 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Left: Votes + Content */}
                <div className="flex items-start gap-4">
                  {/* Upvote Pill */}
                  <button
                    onClick={(e) => handleUpvoteQuestion(q.id, e)}
                    className="p-2 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 hover:border-stone-300 dark:hover:border-night-700 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 flex flex-col items-center justify-center min-w-[48px] shrink-0 transition-colors"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span className="font-mono-code font-bold text-xs mt-0.5">{q.votes}</span>
                  </button>

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-sm sm:text-base group-hover:text-link transition-colors">
                        {language === 'ar' ? q.titleAr : q.title}
                      </h3>
                      {q.isSolved && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-stone-100 dark:bg-night-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-night-700">
                          <CheckCircle className="w-3 h-3 text-accent" strokeWidth={1.5} />
                          <span>Solved</span>
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                      {language === 'ar' ? q.contentAr : q.content}
                    </p>

                    {/* Metadata tags */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                      {q.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded bg-stone-100 dark:bg-night-800 text-stone-600 dark:text-stone-400 text-[10px]"
                        >
                          #{tag}
                        </span>
                      ))}
                      <span className="text-stone-300 dark:text-stone-700">·</span>
                      <span className="text-stone-500 text-[11px]">
                        {q.author.name} ({q.author.role})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Answer Count badge */}
                <div className="flex items-center gap-3 self-end sm:self-auto shrink-0 text-xs">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-50 dark:bg-night-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-night-800">
                    <MessageSquare className="w-3.5 h-3.5 text-stone-500" strokeWidth={1.5} />
                    <span className="font-mono-code font-bold text-stone-800 dark:text-stone-200">{q.answersCount}</span>
                    <span>{t('answersCount')}</span>
                  </div>
                  <ArrowIcon className="w-4 h-4 text-stone-400 group-hover:text-stone-700 dark:group-hover:text-stone-200 transition-colors" strokeWidth={1.5} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Single Question Detail View */
        <div className="space-y-6">
          <button
            onClick={() => setSelectedQuestion(null)}
            className="text-xs font-medium text-link hover:underline inline-flex items-center gap-1"
          >
            <ArrowIcon className="w-3.5 h-3.5 rotate-180" strokeWidth={1.5} />
            <span>{t('back')}</span>
          </button>

          {/* Question Card */}
          <div className="p-6 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 dark:border-night-800/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-600 dark:text-stone-400">
                  Asked by <strong className="text-stone-900 dark:text-stone-100">{selectedQuestion.author.name}</strong> ({selectedQuestion.author.role})
                </span>
                <span className="text-stone-300 dark:text-stone-700">·</span>
                <span className="text-xs text-stone-400 font-mono-code">{selectedQuestion.createdAt}</span>
              </div>

              <button
                onClick={(e) => handleUpvoteQuestion(selectedQuestion.id, e)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 text-stone-700 dark:text-stone-300 hover:text-link text-xs transition-colors"
              >
                <ThumbsUp className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span className="font-mono-code font-bold">{selectedQuestion.votes}</span>
                <span>{t('votesCount')}</span>
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
              {language === 'ar' ? selectedQuestion.titleAr : selectedQuestion.title}
            </h2>

            <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line font-normal">
              {language === 'ar' ? selectedQuestion.contentAr : selectedQuestion.content}
            </p>

            {selectedQuestion.codeSnippet && (
              <div className="space-y-1">
                <CodeBlock code={selectedQuestion.codeSnippet} language="typescript" filename="Snippet.ts" />
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
              {selectedQuestion.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded bg-stone-100 dark:bg-night-800 text-stone-600 dark:text-stone-400 text-xs">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Answers Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-base">
              {selectedQuestion.answers.length} {t('answersCount')}
            </h3>

            {selectedQuestion.answers.map((answer) => (
              <div
                key={answer.id}
                className="p-6 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-4"
              >
                {/* Author row */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 dark:border-night-800/80 pb-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-semibold text-stone-900 dark:text-stone-100">{answer.author.name}</span>
                    <span className="text-stone-500">({answer.author.role})</span>

                    {/* DMS Staff Official Badge */}
                    {answer.author.isDmsStaff && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-stone-100 dark:bg-night-800 text-accent border border-stone-200 dark:border-night-700 font-semibold text-[10px]">
                        <ShieldCheck className="w-3 h-3" strokeWidth={1.5} />
                        <span>{t('dmsStaffBadge')}</span>
                      </span>
                    )}

                    {/* Accepted Answer Badge */}
                    {answer.isAccepted && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-stone-100 dark:bg-night-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-night-700 font-semibold text-[10px]">
                        <Check className="w-3 h-3 text-accent" strokeWidth={1.5} />
                        <span>{t('acceptedAnswerBadge')}</span>
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleUpvoteAnswer(answer.id)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 text-xs transition-colors"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span className="font-mono-code font-bold">{answer.votes}</span>
                  </button>
                </div>

                <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line font-normal">
                  {language === 'ar' ? answer.contentAr : answer.content}
                </p>
              </div>
            ))}

            {/* Post Answer Form */}
            <form onSubmit={handlePostAnswer} className="p-6 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-4">
              <h4 className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                Submit Your Answer
              </h4>
              <textarea
                rows={4}
                required
                value={newAnswerText}
                onChange={(e) => setNewAnswerText(e.target.value)}
                placeholder={t('postAnswerPlaceholder')}
                className="w-full p-3 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 text-stone-900 dark:text-stone-100 text-xs focus:outline-none focus:border-link"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium text-xs shadow-sm transition-colors"
                >
                  <Send className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>{t('submitAnswerBtn')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Ask a Question */}
      {askModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setAskModalOpen(false)}
          title={t('askQuestionBtn')}
          maxWidth="2xl"
        >
          <form onSubmit={handleAskQuestion} className="space-y-4 text-xs">
            <div>
              <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">Question Title</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g., How to parse HL7 DICOM metadata in HMS v2.4?"
                className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-link"
              />
            </div>

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
              <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">Detailed Explanation</label>
              <textarea
                rows={4}
                required
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Explain the background, error messages, and what you have attempted..."
                className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-link"
              />
            </div>

            <div>
              <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">Code Snippet (Optional)</label>
              <textarea
                rows={3}
                value={newSnippet}
                onChange={(e) => setNewSnippet(e.target.value)}
                placeholder="// Paste code snippet here..."
                className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 text-stone-900 dark:text-stone-100 font-mono-code dir-ltr focus:outline-none focus:border-link"
              />
            </div>

            <div>
              <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">Tags (Comma-separated)</label>
              <input
                type="text"
                value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-link"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setAskModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-stone-100 dark:bg-night-800 text-stone-700 dark:text-stone-300 font-medium"
              >
                {t('cancel')}
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium shadow-sm transition-colors"
              >
                Post Question (+10 pts)
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
