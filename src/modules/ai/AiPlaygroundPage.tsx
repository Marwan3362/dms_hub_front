import React, { useState } from 'react';
import { AI_MODELS } from '../../data/aiModels';
import { AiModelItem } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { SyntheticBadge } from '../../components/ui/SyntheticBadge';
import {
  Cpu,
  Play,
  RotateCcw,
  Zap,
  CheckCircle,
  Clock
} from 'lucide-react';

export const AiPlaygroundPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { addToast } = useToast();

  const [selectedModel, setSelectedModel] = useState<AiModelItem>(AI_MODELS[0]);
  const [inputJsonText, setInputJsonText] = useState<string>(
    JSON.stringify(AI_MODELS[0].sampleInput, null, 2)
  );
  const [isRunning, setIsRunning] = useState(false);
  const [outputResult, setOutputResult] = useState<AiModelItem['sampleOutput'] | null>(
    AI_MODELS[0].sampleOutput
  );
  const [dailyQuotaRemaining, setDailyQuotaRemaining] = useState(85);
  const [lastLatencyMs, setLastLatencyMs] = useState(AI_MODELS[0].latencyMs);

  const handleSelectModel = (model: AiModelItem) => {
    setSelectedModel(model);
    setInputJsonText(JSON.stringify(model.sampleInput, null, 2));
    setOutputResult(model.sampleOutput);
    setLastLatencyMs(model.latencyMs);
  };

  const handleResetPayload = () => {
    setInputJsonText(JSON.stringify(selectedModel.sampleInput, null, 2));
    addToast(language === 'ar' ? 'تمت استعادة النموذج الافتراضي' : 'Default payload restored', 'info');
  };

  const handleRunInference = () => {
    try {
      JSON.parse(inputJsonText); // validate JSON syntax
    } catch (e) {
      addToast(
        language === 'ar' ? 'صيغة JSON غير صحيحة، يرجى التحقق' : 'Invalid JSON format in payload editor',
        'error'
      );
      return;
    }

    if (dailyQuotaRemaining <= 0) {
      addToast('Daily testing quota exhausted', 'error');
      return;
    }

    setIsRunning(true);
    const delay = Math.floor(Math.random() * 50) + (selectedModel.latencyMs - 20);

    setTimeout(() => {
      setIsRunning(false);
      setOutputResult(selectedModel.sampleOutput);
      setLastLatencyMs(delay);
      setDailyQuotaRemaining((prev) => Math.max(0, prev - 1));
      addToast(
        language === 'ar'
          ? `تم تنفيذ الاستدلال بنجاح (${delay}ms)`
          : `Model inference completed (${delay}ms)`,
        'success'
      );
    }, delay);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-night-800 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
              {t('aiHubTitle')}
            </h1>
            <SyntheticBadge size="sm" />
          </div>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
            {t('aiHubSubtitle')}
          </p>
        </div>

        {/* Daily Quota Counter */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-night-800 border border-stone-200 dark:border-night-700 text-xs text-stone-600 dark:text-stone-400">
          <Zap className="w-3.5 h-3.5 text-stone-500" strokeWidth={1.5} />
          <span>{t('aiDailyQuota')}:</span>
          <strong className="font-mono-code font-bold text-stone-900 dark:text-stone-100">
            {dailyQuotaRemaining} / 100
          </strong>
        </div>
      </div>

      {/* Model Selection Catalog Cards */}
      <div className="space-y-3">
        <div className="text-xs font-semibold text-stone-700 dark:text-stone-300">
          {t('selectModel')}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {AI_MODELS.map((model) => {
            const isSelected = selectedModel.id === model.id;
            return (
              <button
                key={model.id}
                onClick={() => handleSelectModel(model)}
                className={`p-4 rounded-xl text-start transition-colors border border-t-[3px] ${model.product === 'industrial_erp' ? 'border-t-brand-blue!' : 'border-t-brand-green!'} flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'border-accent bg-stone-50 dark:bg-night-800/80 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 text-stone-600 dark:text-stone-400 hover:border-stone-300 dark:hover:border-night-700 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                <div className="space-y-1.5 w-full">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[11px] font-semibold uppercase tracking-wider ${model.product === 'industrial_erp' ? 'text-tag-erp' : 'text-tag-hms'}`}>
                      {model.product === 'industrial_erp' ? t('shortIndustrial') : t('shortHms')}
                    </span>
                    <span className="text-[11px] font-mono-code text-stone-400">
                      {model.version}
                    </span>
                  </div>
                  <h4 className="font-semibold text-xs sm:text-sm text-stone-900 dark:text-stone-100 line-clamp-2">
                    {language === 'ar' ? model.nameAr : model.name}
                  </h4>
                </div>

                <div className="flex items-center justify-between text-[11px] text-stone-500 pt-2 border-t border-stone-100 dark:border-night-800/80 w-full font-mono-code">
                  <span>Acc: {model.accuracy}</span>
                  <span>~{model.latencyMs}ms</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Inference Playground Console: 2-column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Payload Editor */}
        <div className="lg:col-span-6 p-6 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-base">
              {t('aiInputPayload')}
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handleResetPayload}
                className="p-1.5 rounded-lg border border-stone-200 dark:border-night-700 hover:bg-stone-100 dark:hover:bg-night-800 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
                title="Reset to default payload"
              >
                <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
              <button
                onClick={handleRunInference}
                disabled={isRunning}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-hover disabled:opacity-50 text-white font-medium text-xs shadow-sm transition-colors"
              >
                <Play className="w-3 h-3 fill-current" strokeWidth={1.5} />
                <span>{isRunning ? t('running') : t('aiRunBtn')}</span>
              </button>
            </div>
          </div>

          <p className="text-xs text-stone-500">
            {language === 'ar' ? selectedModel.descriptionAr : selectedModel.description}
          </p>

          <textarea
            rows={12}
            value={inputJsonText}
            onChange={(e) => setInputJsonText(e.target.value)}
            className="w-full p-4 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 text-stone-900 dark:text-stone-100 font-mono-code text-xs leading-relaxed focus:outline-none focus:border-link dir-ltr"
            spellCheck={false}
          />
        </div>

        {/* Right Column: Inference Output & Confidence Visualization */}
        <div className="lg:col-span-6 p-6 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-night-800/80 pb-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-accent" strokeWidth={1.5} />
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-base">
                {t('aiOutputTitle')}
              </h3>
            </div>
            <div className="text-xs font-mono-code text-stone-500 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-stone-400" strokeWidth={1.5} />
              <span>
                Latency: <strong className="text-accent">{lastLatencyMs}ms</strong>
              </span>
            </div>
          </div>

          {outputResult ? (
            <div className="space-y-6">
              {/* Top Prediction Card */}
              <div className="p-4 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 space-y-1">
                <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                  Top Classification Result
                </span>
                <div className="text-sm sm:text-base font-bold text-accent font-mono-code">
                  {language === 'ar' ? outputResult.predictionAr : outputResult.prediction}
                </div>
              </div>

              {/* Confidence Distribution Bars */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                  {t('aiConfidenceBars')}
                </div>
                <div className="space-y-2.5">
                  {outputResult.confidenceScores.map((scoreItem) => (
                    <div key={scoreItem.label} className="space-y-1 text-xs">
                      <div className="flex justify-between text-stone-700 dark:text-stone-300 font-medium">
                        <span>{language === 'ar' ? scoreItem.labelAr : scoreItem.label}</span>
                        <span className="font-mono-code text-stone-900 dark:text-stone-100 font-bold">
                          {scoreItem.score.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-stone-100 dark:bg-night-800 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${scoreItem.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Model Automated Recommendations */}
              <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-night-800/80">
                <div className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                  {t('aiRecommendations')}
                </div>
                <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-400">
                  {(language === 'ar'
                    ? outputResult.recommendationsAr
                    : outputResult.recommendations
                  ).map((rec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-stone-400 text-xs border border-stone-200 dark:border-night-800 rounded-lg">
              Click "{t('aiRunBtn')}" to view model classification.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
