import { useStore } from '../store';

export default function Header() {
  const { 
    language, 
    setLanguage
  } = useStore();

  return (
    <header className="border-b border-slate-100 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 flex items-center justify-center rounded-lg shadow-sm animate-pulse">
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
