import { useStore } from '../store';
import { Languages, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import GuideModal from './GuideModal';

export default function Header() {
  const { language, setLanguage } = useStore();
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  return (
    <header className="border-b border-zinc-900 bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white flex items-center justify-center rounded-lg shadow-xl shadow-white/5">
            <div className="w-4 h-4 border-2 border-black rotate-45" />
          </div>
          <div>
            <h1 className="font-bold text-white uppercase tracking-[0.2em] text-xs">
              OSI_LAB <span className="text-zinc-500">v2.4</span>
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
               <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest leading-none">Status: Optimized</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsGuideOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-transparent border border-zinc-800 rounded-lg text-[10px] font-bold text-zinc-500 hover:text-white hover:border-zinc-700 transition-all uppercase tracking-widest"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            {language === 'en' ? 'Quick Guide' : 'Guida Rapida'}
          </button>

          <div className="flex bg-black/50 p-0.5 rounded-lg border border-zinc-800">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 text-[9px] font-bold rounded-md transition-all ${language === 'en' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-600 hover:text-zinc-400'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('it')}
              className={`px-3 py-1 text-[9px] font-bold rounded-md transition-all ${language === 'it' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-600 hover:text-zinc-400'}`}
            >
              IT
            </button>
          </div>
        </div>
      </div>

      <GuideModal 
        isOpen={isGuideOpen} 
        onClose={() => setIsGuideOpen(false)} 
        language={language} 
      />
    </header>
  );
}
