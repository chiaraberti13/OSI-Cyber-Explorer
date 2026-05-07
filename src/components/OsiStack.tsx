import { OSI_LAYERS } from '../constants';
import { useStore } from '../store';
import { motion } from 'motion/react';
import { ShieldCheck, ShieldAlert, Cpu, ArrowDown, Skull } from 'lucide-react';

export default function OsiStack() {
  const { 
    selectedLayerId, 
    setSelectedLayerId, 
    language, 
    currentStep, 
    simulationState,
    activeAttack
  } = useStore();

  return (
    <div className="flex flex-col gap-1 w-full p-2 bg-zinc-950/40 rounded-xl border border-zinc-800 shadow-2xl">
     <div className="px-5 py-3 mb-2 border-b border-zinc-900">
         <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
               <Cpu className="w-3 h-3 text-emerald-500" />
               <span className="text-[10px] font-black text-white uppercase tracking-widest">Main_Pila_Logic</span>
            </div>
            <span className="text-[8px] font-mono text-zinc-700 animate-pulse">CORE_v1.3</span>
         </div>
         
         <div className="flex items-center gap-4 px-2 py-1.5 bg-black/40 rounded border border-zinc-900">
            <div className="flex items-center gap-1.5">
               <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
               <span className="text-[7px] font-bold text-zinc-500 uppercase">PDU_Lifecycle</span>
            </div>
            <div className="flex items-center gap-2 opacity-50">
               {['Data', 'Seg', 'Pack', 'Frame', 'Bit'].map((p, i) => (
                 <div key={p} className="flex items-center gap-1">
                   <span className="text-[6px] font-mono text-zinc-600">{p}</span>
                   {i < 4 && <ArrowDown className="w-1.5 h-1.5 text-zinc-800" />}
                 </div>
               ))}
            </div>
         </div>
      </div>
      {OSI_LAYERS.map((layer) => {
        const isSelected = selectedLayerId === layer.id;
        const isActive = (simulationState === 'encapsulating' || simulationState === 'decapsulating') && currentStep === layer.id;
        const isTargeted = simulationState === 'interrupted' && (
          (activeAttack === 'mitm' && (layer.id === 2 || layer.id === 3)) ||
          (activeAttack === 'dos' && (layer.id === 7 || layer.id === 4)) ||
          (activeAttack === 'spoofing' && layer.id === 3)
        );
        const layerInfo = layer.translations[language];

        return (
          <motion.button
            key={layer.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedLayerId(layer.id)}
            className={`
              relative flex items-center justify-between px-5 py-4 rounded-lg border transition-all text-left overflow-hidden group
              ${isSelected ? 'bg-zinc-900 border-zinc-700 text-white shadow-xl translate-x-1' : 'bg-transparent border-transparent text-zinc-500 hover:bg-zinc-900/40 hover:text-zinc-400'}
              ${isActive ? 'ring-2 ring-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : ''}
              ${isTargeted ? 'bg-red-500/10 border-red-500/50 text-red-500' : ''}
            `}
          >
            {/* Active Scanning Effect */}
            {isActive && (
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent skew-x-[-20deg] pointer-events-none"
              />
            )}

            {/* Background ID */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 text-5xl font-black opacity-[0.02] group-hover:opacity-[0.04] transition-opacity pointer-events-none">
              0{layer.id}
            </div>

            <div className="flex items-center gap-5 relative z-10">
              <div className="flex flex-col items-center">
                <span className={`text-[10px] font-mono font-bold leading-none ${isSelected ? 'text-zinc-400' : isTargeted ? 'text-red-400' : 'text-zinc-700'}`}>
                  {layer.id}
                </span>
                <div className={`w-px h-3 my-1 transition-colors ${isSelected ? 'bg-zinc-700' : isTargeted ? 'bg-red-900' : 'bg-zinc-800'}`} />
              </div>
              
              <div>
                <h3 className={`font-bold text-[11px] uppercase tracking-[0.2em] mb-1 ${isTargeted ? 'text-red-500' : isActive ? 'text-emerald-400' : ''}`}>
                  {layerInfo.name}
                </h3>
                <div className="flex items-center gap-3">
                  <span className={`text-[8px] font-black tracking-widest px-1.5 py-0.5 rounded border transition-colors ${isActive ? 'bg-emerald-500 text-black border-emerald-400' : isTargeted ? 'bg-red-500 text-white border-red-400' : 'bg-zinc-950 text-zinc-500 border-zinc-800'}`}>
                    {layer.pdu}
                  </span>
                  <span className={`text-[8px] font-mono tracking-widest transition-colors ${isActive ? 'text-emerald-500/70' : 'text-zinc-700'}`}>
                    {layerInfo.protocols?.[0] || 'N/A'}
                  </span>
                  {isActive && (
                    <div className="flex items-center gap-1.5 ml-2">
                      <motion.div 
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-1 h-1 bg-emerald-500 rounded-full" 
                      />
                      <span className="text-[7px] text-emerald-500 font-black uppercase tracking-tighter">Transforming...</span>
                    </div>
                  )}
                  {isTargeted && (
                    <div className="flex items-center gap-1.5">
                      <Skull className="w-2.5 h-2.5 text-red-500" />
                      <span className="text-[7px] text-red-500 font-black uppercase tracking-tighter">Compromised</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 relative z-10">
              <div className="flex flex-col items-end opacity-20 group-hover:opacity-40 transition-opacity">
                 <div className="flex gap-0.5">
                    {[1, 2, 3].map(bit => (
                      <div key={bit} className={`w-0.5 h-2 rounded-full ${isSelected ? 'bg-zinc-400' : isTargeted ? 'bg-red-400' : 'bg-zinc-700'}`} />
                    ))}
                 </div>
              </div>
              <div 
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${isSelected ? 'shadow-[0_0_15px_currentColor] scale-110' : 'scale-90 opacity-30 shadow-none'} ${isTargeted ? 'bg-red-600 shadow-[0_0_15px_#ef4444]' : ''}`} 
                style={{ backgroundColor: isTargeted ? undefined : layer.color, color: isTargeted ? undefined : layer.color }} 
              />
            </div>

            {/* Selection indicator line */}
            {isSelected && (
              <motion.div 
                layoutId="active-bar"
                className="absolute left-0 top-2 bottom-2 w-1 bg-white rounded-r-full"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            {isTargeted && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 shadow-[0_0_10px_#ef4444]" />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
