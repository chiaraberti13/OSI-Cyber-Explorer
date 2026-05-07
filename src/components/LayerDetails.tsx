import { OSI_LAYERS } from '../constants';
import { useStore } from '../store';
import { motion, AnimatePresence } from 'motion/react';
import { Network, Box, ShieldAlert, BookOpenText } from 'lucide-react';

const inferAttackType = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('ddos') || n.includes('flood') || n.includes('smurf') || n.includes('jamming')) return 'DoS';
  if (n.includes('spoof') || n.includes('hijack') || n.includes('poison')) return 'Spoofing / Hijacking';
  if (n.includes('inject')) return 'Injection';
  if (n.includes('scan')) return 'Reconnaissance';
  return 'Exploitation';
};

const inferDefenseType = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('firewall') || n.includes('waf') || n.includes('filter')) return 'Preventive';
  if (n.includes('inspection') || n.includes('monitor') || n.includes('validation')) return 'Detective';
  return 'Corrective / Hardening';
};

export default function LayerDetails() {
  const { selectedLayerId, language, viewMode, setViewMode, packetHeaders, selectedProtocol, simulationState, activeAttack } = useStore();
  const layer = OSI_LAYERS.find(l => l.id === selectedLayerId);

  if (!layer && viewMode === 'theory') {
    return <div className="h-full flex flex-col items-center justify-center text-zinc-600 border-2 border-dashed border-zinc-800 rounded-2xl p-8 text-center uppercase tracking-widest text-xs"><Network className="w-12 h-12 mb-4 opacity-20" />{language === 'en' ? 'Select a layer to inspect' : 'Seleziona un livello da ispezionare'}</div>;
  }

  const info = layer?.translations[language];
  const learningSteps = language === 'it'
    ? ['1) Identifica protocollo e PDU del livello.', '2) Associa il rischio principale (attacco).', '3) Collega il controllo difensivo più efficace.', '4) Verifica l\'impatto operativo su disponibilità/integrità/riservatezza.']
    : ['1) Identify layer protocol and PDU.', '2) Map the primary threat.', '3) Link the most effective defense control.', '4) Validate operational impact on CIA triad.'];

  return <AnimatePresence mode="wait"><motion.div key={viewMode === 'packet' ? 'packet-view' : (layer?.id || 'none')} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full bg-zinc-950 border border-zinc-900 rounded-xl p-6 flex flex-col gap-6">
    {viewMode === 'packet' ? (
      <>
        <div className="flex items-center justify-between border-b border-zinc-900 pb-5"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white"><Box className="w-5 h-5 text-black" /></div><div><h2 className="text-xs font-bold text-white uppercase tracking-[0.2em]">Packet_Inspect</h2><p className="text-[10px] text-emerald-500 font-mono mt-0.5">PROTO_{selectedProtocol}_ACTIVE</p></div></div><button onClick={() => setViewMode('theory')} className="text-[9px] font-bold text-zinc-500 hover:text-white uppercase tracking-widest px-2 py-1 bg-zinc-900 rounded border border-zinc-800">Close</button></div>
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
          {simulationState === 'interrupted' && <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-start gap-4"><div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 animate-pulse"><ShieldAlert className="w-4 h-4 text-white" /></div><div><h4 className="text-[10px] font-black text-red-500 uppercase tracking-widest">Security_Violation_Detected</h4><p className="text-[10px] text-red-400/70 font-mono mt-1 italic">{activeAttack === 'mitm' ? 'Man-in-the-Middle detected at Data Link / Network bridge.' : activeAttack === 'dos' ? 'Resource exhaustion detected. Network stack saturated.' : 'Identity spoofing detected in L3 source headers.'}</p></div></motion.div>}
          <section><h3 className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-3">Protocol Header Breakdown</h3><div className="space-y-4">{[...packetHeaders].reverse().map((h, idx) => { const l = OSI_LAYERS.find(layer => layer.id === h.layer); const headerFields = (h.fields && h.fields.length > 0) ? h.fields : [{ key: 'Field', value: 'N/A' }]; return <div key={`${h.layer}-${idx}`} className="p-3 rounded-lg border border-zinc-900 bg-zinc-900/30 group"><div className="flex justify-between items-center mb-3"><span className="text-[10px] font-black uppercase" style={{ color: l?.color }}>L{h.layer} {l?.translations[language].name}</span><span className="text-[8px] font-black text-zinc-600 bg-zinc-950 px-1 py-0.5 rounded border border-zinc-800 uppercase tracking-tighter">{h.pduName}</span></div><div className="grid grid-cols-3 gap-2 mb-3">{headerFields.map(f => <div key={f.key} className="p-1.5 border rounded-md bg-black/40 border-zinc-900"><span className="text-[6px] text-zinc-700 uppercase leading-none">{f.key}</span><span className="text-[8px] font-mono truncate block text-zinc-500">{f.value}</span></div>)}</div><p className="text-[9px] text-zinc-500 font-mono leading-relaxed">{h.details}</p></div>;})}</div></section>
        </div>
      </>
    ) : (
      <>
        <div className="flex items-center justify-between border-b border-zinc-900 pb-5"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-black text-sm" style={{ backgroundColor: layer?.color }}>{layer?.id}</div><div><h2 className="text-xs font-bold text-white uppercase tracking-[0.2em]">{info?.name}</h2><p className="text-[10px] text-zinc-600 font-mono mt-0.5">LVL_{layer?.id}_INTEL</p></div></div><Network className="w-4 h-4 text-zinc-800" /></div>
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
          <section className="p-3 rounded-lg border border-blue-900/40 bg-blue-950/10"><div className="flex items-center gap-2 mb-2"><BookOpenText className="w-4 h-4 text-blue-400" /><h3 className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">{language === 'it' ? 'Percorso didattico' : 'Learning path'}</h3></div><ul className="space-y-1">{learningSteps.map(step => <li key={step} className="text-[10px] text-zinc-400">{step}</li>)}</ul></section>
          <section><h3 className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-3">Description</h3><p className="text-xs text-zinc-400 leading-relaxed">{info?.description}</p></section>
          <section><h3 className="text-[9px] font-bold text-red-500/60 uppercase tracking-widest mb-3">Attacks by type</h3><div className="space-y-3">{info?.attacks?.map((attack) => <div key={attack.name} className="p-3 bg-zinc-900/30 border border-zinc-800 rounded-lg"><div className="flex items-center justify-between gap-2"><h4 className="font-bold text-zinc-300 text-[10px] uppercase tracking-tight">{attack.name}</h4><span className="text-[8px] px-2 py-0.5 rounded border border-red-500/40 text-red-300">{attack.type || inferAttackType(attack.name)}</span></div><p className="text-[10px] text-zinc-500 mt-1">{attack.description}</p><p className="text-[9px] text-amber-300/80 mt-1">Impact: {attack.impact}</p><p className="text-[9px] text-emerald-300/80 mt-1">Defense focus: {attack.mitigation_strategy}</p></div>)}</div></section>
          <section><h3 className="text-[9px] font-bold text-emerald-500/60 uppercase tracking-widest mb-3">Defenses by type</h3><div className="space-y-3">{info?.defenses?.map((defense) => <div key={defense.name} className="p-3 bg-zinc-900/30 border border-zinc-800 rounded-lg"><div className="flex items-center justify-between gap-2"><h4 className="font-bold text-zinc-300 text-[10px] uppercase tracking-tight">{defense.name}</h4><span className="text-[8px] px-2 py-0.5 rounded border border-emerald-500/40 text-emerald-300">{defense.type || inferDefenseType(defense.name)}</span></div><p className="text-[10px] text-zinc-500 mt-1">{defense.description}</p><p className="text-[9px] text-zinc-400 mt-1">Method: {defense.method}</p></div>)}</div></section>
        </div>
      </>
    )}
  </motion.div></AnimatePresence>;
}
