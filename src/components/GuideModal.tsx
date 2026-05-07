import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, Play, Shield, MousePointer2 } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'it' | 'en';
}

export default function GuideModal({ isOpen, onClose, language }: GuideModalProps) {
  const content = {
    en: {
      title: 'How to use the Lab',
      steps: [
        { icon: MousePointer2, title: 'Explore Layers', desc: 'Click the OSI layers on the left to see theory, protocols, and vulnerabilities on the right.' },
        { icon: Play, title: 'Simulate Traffic', desc: 'Choose a protocol (HTTP/PING) and start. Watch headers being added (Encapsulation) and removed (Decapsulation).' },
        { icon: Shield, title: 'Cybersecurity Test', desc: 'Inject attacks like MitM or Spoofing. Toggle Defense to see how mitigation works in real-time.' },
      ],
      close: 'Got it!'
    },
    it: {
      title: 'Come usare il Laboratorio',
      steps: [
        { icon: MousePointer2, title: 'Esplora i Livelli', desc: 'Clicca i livelli OSI a sinistra per vedere teoria, protocolli e vulnerabilità sulla destra.' },
        { icon: Play, title: 'Simula Traffico', desc: 'Scegli un protocollo (HTTP/PING) e avvia. Osserva gli Header che vengono aggiunti e rimossi.' },
        { icon: Shield, title: 'Test Cybersecurity', desc: 'Inietta attacchi come MitM o Spoofing. Attiva la Difesa per vedere la mitigazione in tempo reale.' },
      ],
      close: 'Ho capito!'
    }
  }[language];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-lg w-full shadow-2xl"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-zinc-500 hover:text-white">
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="w-8 h-8 text-emerald-500" />
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">{content.title}</h2>
            </div>

            <div className="space-y-6">
              {content.steps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-700">
                    <step.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm uppercase">{step.title}</h3>
                    <p className="text-zinc-400 text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={onClose}
              className="w-full mt-10 bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-emerald-500/20 uppercase tracking-widest text-sm"
            >
              {content.close}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
