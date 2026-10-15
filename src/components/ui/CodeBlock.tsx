import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'json', filename }) => {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg border border-stone-200 dark:border-night-800 bg-night-950 overflow-hidden text-left dir-ltr font-mono-code text-xs md:text-sm">
      <div className="flex items-center justify-between px-3.5 py-2 bg-[#0E1431] border-b border-night-800/80 text-stone-400 select-none">
        <span className="font-sans font-medium text-xs tracking-wider uppercase text-stone-400">
          {filename || language}
        </span>
        <button
          onClick={handleCopy}
          type="button"
          className="flex items-center gap-1.5 px-2 py-1 rounded text-xs font-sans text-stone-300 hover:text-white hover:bg-night-800/60 transition-colors"
          title={t('copy')}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#5CC474]" strokeWidth={1.5} />
              <span className="text-[#5CC474]">{t('copied')}</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-stone-400" strokeWidth={1.5} />
              <span>{t('copy')}</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-stone-200 leading-relaxed font-mono-code">
        <pre className="m-0 whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};
