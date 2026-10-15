import React, { useState } from 'react';
import { CERTIFICATION_TRACKS, ELIGIBILITY_QUESTIONS } from '../../data/academy';
import { CertificationTrack } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import { Modal } from '../../components/ui/Modal';
import {
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  HelpCircle,
  FileCheck,
  QrCode,
  ShieldCheck,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

export const AcademyPage: React.FC = () => {
  const { language, t, dir } = useLanguage();
  const { addToast } = useToast();
  const { user, addCertification } = useAuth();
  const ChevronIcon = dir === 'rtl' ? ChevronLeft : ChevronRight;

  // Selected track for quiz or view
  const [activeTrack, setActiveTrack] = useState<CertificationTrack>(CERTIFICATION_TRACKS[0]);

  // Quiz Modal State
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [quizCurrentIndex, setQuizCurrentIndex] = useState(0);
  const [quizSelectedAnswers, setQuizSelectedAnswers] = useState<Record<number, number>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Certificate Preview Modal State
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);
  const [certifyingTrack, setCertifyingTrack] = useState<CertificationTrack>(CERTIFICATION_TRACKS[0]);

  // Eligibility Advisor Quiz State
  const [advisorModalOpen, setAdvisorModalOpen] = useState(false);
  const [advisorCurrentIndex, setAdvisorCurrentIndex] = useState(0);
  const [advisorAnswers, setAdvisorAnswers] = useState<Record<number, string>>({});
  const [recommendedTrack, setRecommendedTrack] = useState<CertificationTrack | null>(null);

  // Handle Quiz Submission
  const handleAnswerSelect = (questionId: number, optionIndex: number) => {
    setQuizSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleFinishQuiz = () => {
    let correctCount = 0;
    activeTrack.quizQuestions.forEach((q) => {
      if (quizSelectedAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const scorePct = Math.round((correctCount / activeTrack.quizQuestions.length) * 100);
    setQuizScore(scorePct);

    if (scorePct >= 80) {
      addCertification(activeTrack.title);
      addToast(
        language === 'ar'
          ? `تهانينا! حصلت على درجة ${scorePct}٪ واجتزت الشهادة بنجاح (+250 نقطة)`
          : `Congratulations! You scored ${scorePct}% and earned the certification (+250 pts)`,
        'success',
        'Exam Passed!'
      );
    } else {
      addToast(
        language === 'ar'
          ? `حصلت على ${scorePct}٪. درجة النجاح المطلوبة هي ٨٠٪. يمكنك إعادة المحاولة.`
          : `You scored ${scorePct}%. 80% passing grade required. You can retake the quiz.`,
        'warning',
        'Retake Required'
      );
    }
  };

  // Handle Eligibility Advisor Quiz
  const handleAdvisorSelect = (questionId: number, trackId: string) => {
    setAdvisorAnswers((prev) => ({ ...prev, [questionId]: trackId }));
  };

  const handleFinishAdvisor = () => {
    const counts: Record<string, number> = {};
    Object.values(advisorAnswers).forEach((tid) => {
      counts[tid] = (counts[tid] || 0) + 1;
    });

    let bestTrackId = 'track-report-developer';
    let maxCount = -1;
    Object.entries(counts).forEach(([tid, cnt]) => {
      if (cnt > maxCount) {
        maxCount = cnt;
        bestTrackId = tid;
      }
    });

    const match = CERTIFICATION_TRACKS.find((tr) => tr.id === bestTrackId) || CERTIFICATION_TRACKS[0];
    setRecommendedTrack(match);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-night-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
            {t('academyTitle')}
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
            {t('academySubtitle')}
          </p>
        </div>

        <button
          onClick={() => {
            setAdvisorCurrentIndex(0);
            setAdvisorAnswers({});
            setRecommendedTrack(null);
            setAdvisorModalOpen(true);
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 hover:bg-stone-50 dark:hover:bg-night-800 text-stone-800 dark:text-stone-200 font-medium text-xs shadow-xs transition-colors self-start sm:self-auto"
        >
          <HelpCircle className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
          <span>{t('trackAdvisorBtn')}</span>
        </button>
      </div>

      {/* Certification Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CERTIFICATION_TRACKS.map((track) => {
          const isCertified = user.certifications.includes(track.title);
          const completedModules = track.courses.filter((c) => c.completed).length;
          const progressPct = Math.round((completedModules / track.courses.length) * 100);

          return (
            <div
              key={track.id}
              className="p-6 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 hover:border-stone-300 dark:hover:border-night-700 transition-colors flex flex-col justify-between gap-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-accent uppercase tracking-wider">
                    {track.level} Track
                  </span>

                  {isCertified ? (
                    <span className="inline-flex items-center gap-1 text-stone-700 dark:text-stone-300 font-medium text-xs bg-stone-100 dark:bg-night-800 px-2 py-0.5 rounded border border-stone-200 dark:border-night-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
                      <span>Certified</span>
                    </span>
                  ) : (
                    <span className="text-stone-500 text-xs font-mono-code">
                      {progressPct}% In Progress
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-lg">
                    {language === 'ar' ? track.titleAr : track.title}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-normal">
                    {language === 'ar' ? track.descriptionAr : track.description}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="w-full bg-stone-100 dark:bg-night-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-primary h-1.5 rounded-full transition-all"
                      style={{ width: `${isCertified ? 100 : progressPct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-stone-500 font-mono-code">
                    <span>
                      {track.modulesCount} {t('modulesCount')} · {track.durationHours}h {t('courseDuration')}
                    </span>
                    <span>{isCertified ? 'Completed' : `${completedModules}/${track.courses.length}`}</span>
                  </div>
                </div>

                {/* Courses List */}
                <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-night-800/80 text-xs">
                  {track.courses.map((course, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800"
                    >
                      <div className="flex items-center gap-2.5 truncate pr-2">
                        {course.completed || isCertified ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" strokeWidth={1.5} />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border border-stone-300 dark:border-night-700 shrink-0" />
                        )}
                        <span className="truncate text-stone-800 dark:text-stone-200">
                          {language === 'ar' ? course.titleAr : course.title}
                        </span>
                      </div>
                      <span className="text-stone-500 font-mono-code text-[11px] shrink-0">
                        {course.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-stone-100 dark:border-night-800/80">
                <button
                  onClick={() => {
                    setActiveTrack(track);
                    setQuizCurrentIndex(0);
                    setQuizSelectedAnswers({});
                    setQuizScore(null);
                    setQuizModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium text-xs shadow-sm transition-colors"
                >
                  {t('startQuizBtn')}
                </button>

                <button
                  onClick={() => {
                    setCertifyingTrack(track);
                    setCertificateModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-stone-200 dark:border-night-800 bg-white dark:bg-night-800 hover:bg-stone-50 dark:hover:bg-night-700 text-stone-700 dark:text-stone-300 text-xs transition-colors"
                >
                  <FileCheck className="w-3.5 h-3.5 text-stone-500" strokeWidth={1.5} />
                  <span>{t('viewCertificateBtn')}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal 1: Assessment Quiz */}
      {quizModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setQuizModalOpen(false)}
          title={`${t('quizModalTitle')}: ${language === 'ar' ? activeTrack.titleAr : activeTrack.title}`}
          maxWidth="2xl"
        >
          <div className="space-y-6 text-xs sm:text-sm">
            {quizScore === null ? (
              <div className="space-y-5">
                {/* Question tracker */}
                <div className="flex items-center justify-between text-xs text-stone-500 font-mono-code border-b border-stone-200 dark:border-night-800 pb-2">
                  <span>
                    Question {quizCurrentIndex + 1} of {activeTrack.quizQuestions.length}
                  </span>
                  <span>Passing Score: 80%</span>
                </div>

                {/* Current Question */}
                {(() => {
                  const q = activeTrack.quizQuestions[quizCurrentIndex];
                  return (
                    <div className="space-y-4">
                      <div className="font-semibold text-stone-900 dark:text-stone-100 text-sm sm:text-base leading-relaxed">
                        {language === 'ar' ? q.questionAr : q.question}
                      </div>

                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = quizSelectedAnswers[q.id] === optIdx;
                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleAnswerSelect(q.id, optIdx)}
                              className={`w-full p-3.5 rounded-lg text-start transition-colors border text-xs sm:text-sm flex items-center justify-between ${
                                isSelected
                                  ? 'border-accent bg-stone-50 dark:bg-night-800/80 text-stone-900 dark:text-stone-100 font-medium'
                                  : 'border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-night-800/50'
                              }`}
                            >
                              <span>{language === 'ar' ? q.optionsAr[optIdx] : opt}</span>
                              <div
                                className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                  isSelected ? 'border-accent bg-primary' : 'border-stone-300 dark:border-night-700'
                                }`}
                              >
                                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}

                {/* Pagination */}
                <div className="flex justify-between pt-4 border-t border-stone-200 dark:border-night-800">
                  <button
                    disabled={quizCurrentIndex === 0}
                    onClick={() => setQuizCurrentIndex((prev) => prev - 1)}
                    className="px-4 py-2 rounded-lg bg-stone-100 dark:bg-night-800 text-stone-700 dark:text-stone-300 disabled:opacity-40"
                  >
                    {t('previous')}
                  </button>

                  {quizCurrentIndex < activeTrack.quizQuestions.length - 1 ? (
                    <button
                      onClick={() => setQuizCurrentIndex((prev) => prev + 1)}
                      className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium"
                    >
                      {t('next')}
                    </button>
                  ) : (
                    <button
                      onClick={handleFinishQuiz}
                      disabled={Object.keys(quizSelectedAnswers).length < activeTrack.quizQuestions.length}
                      className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-hover disabled:opacity-40 text-white font-medium shadow-sm"
                    >
                      Submit Exam
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* Quiz Score Result */
              <div className="text-center space-y-4 py-4">
                <div
                  className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl font-bold font-mono-code ${
                    quizScore >= 80 ? 'bg-stone-100 dark:bg-night-800 text-accent border border-stone-200 dark:border-night-700' : 'bg-brand-red/10 text-err border border-brand-red/40'
                  }`}
                >
                  {quizScore}%
                </div>

                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                    {quizScore >= 80 ? 'Assessment Passed Successfully!' : 'Passing Threshold Not Reached'}
                  </h4>
                  <p className="text-xs text-stone-500">
                    {quizScore >= 80
                      ? 'The digital credential is now registered to your developer profile.'
                      : 'You can review course materials and re-attempt the quiz anytime.'}
                  </p>
                </div>

                <div className="flex justify-center gap-3 pt-4">
                  {quizScore >= 80 ? (
                    <button
                      onClick={() => {
                        setQuizModalOpen(false);
                        setCertifyingTrack(activeTrack);
                        setCertificateModalOpen(true);
                      }}
                      className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium shadow-sm"
                    >
                      {t('viewCertificateBtn')}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setQuizSelectedAnswers({});
                        setQuizScore(null);
                        setQuizCurrentIndex(0);
                      }}
                      className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium shadow-sm"
                    >
                      Retake Assessment
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Modal 2: Official Certificate Preview */}
      {certificateModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setCertificateModalOpen(false)}
          title={t('certificatePreviewTitle')}
          maxWidth="2xl"
        >
          <div className="space-y-6">
            {/* The Certificate Frame */}
            <div className="relative p-8 rounded-xl border border-stone-300 dark:border-night-700 bg-white dark:bg-night-900 text-center space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-night-800 pb-4">
                <div className="text-start">
                  <div className="text-base font-bold text-stone-900 dark:text-stone-100 tracking-wider uppercase">
                    DATA MANAGEMENT SYSTEMS SAE
                  </div>
                  <div className="text-[10px] text-stone-500 tracking-wider">
                    DMS DEVELOPER ACCREDITATION BOARD · CAIRO, EGYPT
                  </div>
                </div>
                <Award className="w-8 h-8 text-accent" strokeWidth={1.5} />
              </div>

              <div className="space-y-1">
                <div className="text-xs text-stone-500 uppercase tracking-wider">
                  This Certificate of Achievement is Proudly Awarded to
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 tracking-tight pt-1">
                  {language === 'ar' ? user.nameAr : user.name}
                </div>
                <div className="text-xs text-accent font-medium">
                  {language === 'ar' ? user.companyAr : user.company}
                </div>
              </div>

              <div className="space-y-1 max-w-lg mx-auto">
                <div className="text-xs text-stone-500">
                  Having demonstrated technical mastery in
                </div>
                <div className="text-base sm:text-lg font-semibold text-stone-900 dark:text-stone-100">
                  {language === 'ar' ? certifyingTrack.titleAr : certifyingTrack.title}
                </div>
                <div className="text-[11px] text-stone-500 pt-1">
                  Compliant with DMS Enterprise Architecture Specifications and Security Standards
                </div>
              </div>

              {/* Certificate Bottom Verification Row */}
              <div className="flex items-end justify-between border-t border-stone-200 dark:border-night-800 pt-4 text-xs font-mono-code text-stone-500">
                <div className="text-start space-y-1">
                  <div>Date: <span className="text-stone-700 dark:text-stone-300">October 12, 2026</span></div>
                  <div>Status: <span className="text-accent font-bold">VERIFIED ACTIVE</span></div>
                  <div className="text-[10px] text-stone-400">ID: DMS-CERT-2026-9041B</div>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <QrCode className="w-10 h-10 text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-night-800 p-1 rounded" strokeWidth={1.5} />
                  <span className="text-[9px] text-stone-400">Scan to Verify</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setCertificateModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-stone-100 dark:bg-night-800 text-stone-700 dark:text-stone-300 text-xs font-medium"
              >
                {t('close')}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal 3: Eligibility Track Advisor */}
      {advisorModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setAdvisorModalOpen(false)}
          title={t('eligibilityQuizTitle')}
          maxWidth="xl"
        >
          <div className="space-y-6 text-xs sm:text-sm">
            {!recommendedTrack ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-stone-500 font-mono-code border-b border-stone-200 dark:border-night-800 pb-2">
                  <span>
                    Question {advisorCurrentIndex + 1} of {ELIGIBILITY_QUESTIONS.length}
                  </span>
                </div>

                {(() => {
                  const q = ELIGIBILITY_QUESTIONS[advisorCurrentIndex];
                  return (
                    <div className="space-y-4">
                      <div className="font-semibold text-stone-900 dark:text-stone-100 text-sm sm:text-base">
                        {language === 'ar' ? q.questionAr : q.question}
                      </div>

                      <div className="space-y-2">
                        {q.options.map((opt, i) => {
                          const isSelected = advisorAnswers[q.id] === opt.trackId;
                          return (
                            <button
                              key={i}
                              onClick={() => handleAdvisorSelect(q.id, opt.trackId)}
                              className={`w-full p-3.5 rounded-lg text-start transition-colors border text-xs sm:text-sm flex items-center justify-between ${
                                isSelected
                                  ? 'border-accent bg-stone-50 dark:bg-night-800/80 text-stone-900 dark:text-stone-100 font-medium'
                                  : 'border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-night-800/50'
                              }`}
                            >
                              <span>{language === 'ar' ? opt.textAr : opt.text}</span>
                              <div
                                className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                  isSelected ? 'border-accent bg-primary' : 'border-stone-300 dark:border-night-700'
                                }`}
                              >
                                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}

                <div className="flex justify-between pt-4 border-t border-stone-200 dark:border-night-800">
                  <button
                    disabled={advisorCurrentIndex === 0}
                    onClick={() => setAdvisorCurrentIndex((prev) => prev - 1)}
                    className="px-4 py-2 rounded-lg bg-stone-100 dark:bg-night-800 text-stone-700 dark:text-stone-300 disabled:opacity-40"
                  >
                    {t('previous')}
                  </button>

                  {advisorCurrentIndex < ELIGIBILITY_QUESTIONS.length - 1 ? (
                    <button
                      onClick={() => setAdvisorCurrentIndex((prev) => prev + 1)}
                      className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium"
                    >
                      {t('next')}
                    </button>
                  ) : (
                    <button
                      onClick={handleFinishAdvisor}
                      disabled={Object.keys(advisorAnswers).length < ELIGIBILITY_QUESTIONS.length}
                      className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-hover disabled:opacity-40 text-white font-medium shadow-sm"
                    >
                      Calculate Recommendation
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* Recommendation Outcome */
              <div className="space-y-4 text-center py-4">
                <ShieldCheck className="w-10 h-10 text-accent mx-auto" strokeWidth={1.5} />
                <h4 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
                  Recommended Track: {language === 'ar' ? recommendedTrack.titleAr : recommendedTrack.title}
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 max-w-md mx-auto leading-relaxed">
                  Based on your technology stack and target DMS product line, this track offers the fastest path to verified partner accreditation and monetization.
                </p>

                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setAdvisorModalOpen(false);
                      setActiveTrack(recommendedTrack);
                    }}
                    className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium shadow-sm"
                  >
                    Explore This Track
                  </button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
