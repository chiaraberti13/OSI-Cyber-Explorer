import { useStore } from '../store';
import { Languages, HelpCircle, BookOpen, GraduationCap, Trophy } from 'lucide-react';
import { motion } from 'motion/react';

export default function Header() {
  const { 
    language, 
    setLanguage, 
    isGlossaryOpen, 
    setIsGlossaryOpen, 
    isGuideOpen, 
    setIsGuideOpen,
    isQuizOpen,
    setIsQuizOpen,
    quizScore
  } = useStore();

  return (
    <header className="border-b border-slate-100 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 flex items-center justify-center rounded-lg shadow-sm">
            <div className="w-4 h-4 border-2 border-white rotate-45" />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 uppercase tracking-[0.2em] text-xs">
              OSI_LAB <span className="text-slate-400">v2.5</span>
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
               <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none">Status: Optimized</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {quizScore > 0 && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full">
              <Trophy className="w-3 h-3 text-amber-500" />
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-tight">
                {quizScore >= 4 ? (language === 'en' ? 'Expert' : 'Esperto') : (language === 'en' ? 'Technician' : 'Tecnico')}
              </span>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsQuizOpen(true)}
              className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-[10px] font-bold transition-all uppercase tracking-widest ${
                isQuizOpen 
                  ? 'bg-indigo-600 border-indigo-700 text-white' 
                  : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              {language === 'en' ? 'Academy' : 'Accademia'}
            </button>

            <button
              onClick={() => setIsGuideOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all uppercase tracking-widest"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              {language === 'en' ? 'Guide' : 'Guida'}
            </button>

            <button
              onClick={() => setIsGlossaryOpen(true)}
              className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-[10px] font-bold transition-all uppercase tracking-widest ${
                isGlossaryOpen 
                  ? 'bg-blue-600 border-blue-700 text-white' 
                  : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              {language === 'en' ? 'Glossary' : 'Glossario'}
            </button>
          </div>

          <div className="flex bg-slate-50 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 text-[9px] font-bold rounded-md transition-all ${language === 'en' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('it')}
              className={`px-3 py-1 text-[9px] font-bold rounded-md transition-all ${language === 'it' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              IT
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
