import { useEffect, useRef } from 'react';
import { useStore } from '../store';
import { motion, AnimatePresence } from 'motion/react';

export default function Terminal() {
  const { logs, clearLogs, language } = useStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const labels = {
    en: { clear: 'Clear', terminal: 'System Logs' },
    it: { clear: 'Pulisci', terminal: 'Log di Sistema' }
  }[language];

  return (
    <div className="bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden flex flex-col h-full font-mono text-[10px] shadow-2xl">
      <div className="bg-zinc-900/30 px-3 py-2.5 flex justify-between items-center border-b border-zinc-900">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5 opacity-30">
            <div className="w-2 h-2 rounded-full bg-zinc-700" />
            <div className="w-2 h-2 rounded-full bg-zinc-700" />
            <div className="w-2 h-2 rounded-full bg-zinc-700" />
          </div>
          <span className="text-zinc-500 uppercase tracking-[0.2em] font-bold">
            {labels.terminal}
          </span>
        </div>
        <button 
          onClick={clearLogs}
          className="text-zinc-600 hover:text-zinc-400 transition-colors uppercase tracking-widest font-bold"
        >
          {labels.clear}
        </button>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-5 space-y-1.5 custom-scrollbar bg-black/20"
      >
        <AnimatePresence initial={false}>
          {logs.map((log, i) => (
            <motion.div
              key={`${log.timestamp}-${i}`}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-3 leading-relaxed"
            >
              <span className="text-zinc-700 shrink-0 font-bold opacity-50">[{log.timestamp}]</span>
              <span className={`
                ${log.type === 'info' ? 'text-zinc-400' : ''}
                ${log.type === 'warning' ? 'text-yellow-500/80' : ''}
                ${log.type === 'danger' ? 'text-red-500/80 font-bold' : ''}
                ${log.type === 'success' ? 'text-emerald-500/80 font-bold' : ''}
                break-words
              `}>
                {log.message}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
