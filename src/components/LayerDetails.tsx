import { useState, Fragment } from 'react';
import { OSI_LAYERS } from '../constants';
import { useStore } from '../store';
import { Attack, Defense, Severity } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Network, Box, ShieldAlert, ShieldCheck, Skull, Zap, ChevronDown, ChevronUp, Lightbulb, BookOpen } from 'lucide-react';

const severityConfig: Record<Severity, { label: string; color: string; bg: string; border: string }> = {
  low:      { label: 'LOW',      color: '#6b7280', bg: 'bg-zinc-900/60',  border: 'border-zinc-700' },
  medium:   { label: 'MEDIUM',   color: '#eab308', bg: 'bg-yellow-500/5', border: 'border-yellow-500/20' },
  high:     { label: 'HIGH',     color: '#f97316', bg: 'bg-orange-500/5', border: 'border-orange-500/20' },
  critical: { label: 'CRITICAL', color: '#ef4444', bg: 'bg-red-500/5',    border: 'border-red-500/20' },
};

function AttackCard({ attack }: { attack: Attack }) {
  const [expanded, setExpanded] = useState(false);
  const sev = severityConfig[attack.severity];

  return (
    <motion.div
      layout
      className={`rounded-xl border ${sev.border} ${sev.bg} overflow-hidden`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start gap-3 p-4 text-left group"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-[9px] font-black px-1.5 py-0.5 rounded border" style={{ color: sev.color, borderColor: sev.color + '50', backgroundColor: sev.color + '15' }}>
              {sev.label}
            </span>
            <h4 className="text-[11px] font-bold text-zinc-200 uppercase tracking-tight">{attack.name}</h4>
          </div>
          <p className="text-[10px] text-zinc-500 leading-snug">{attack.description}</p>
        </div>
        <div className="flex-shrink-0 mt-0.5 text-zinc-600 group-hover:text-zinc-400 transition-colors">
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3 border-t border-zinc-800/50 pt-3">
              {/* How it works */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Zap className="w-3 h-3 text-orange-400" />
                  <span className="text-[8px] font-black text-orange-400 uppercase tracking-widest">Come funziona / How it works</span>
                </div>
                <div className="bg-black/40 rounded-lg border border-zinc-900 p-3">
                  <pre className="text-[9px] text-zinc-400 leading-relaxed whitespace-pre-wrap font-mono">{attack.howItWorks}</pre>
                </div>
              </div>

              {/* Impact */}
              <div>
                <span className="text-[8px] font-black text-red-400/70 uppercase tracking-widest block mb-1">Impatto / Impact</span>
                <p className="text-[10px] text-red-300/70 leading-snug">{attack.impact}</p>
              </div>

              {/* Mitigation */}
              <div className="pt-2 border-t border-zinc-800/40">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <ShieldCheck className="w-3 h-3 text-emerald-500/70" />
                  <span className="text-[8px] font-black text-emerald-500/70 uppercase tracking-widest">Mitigazione</span>
                </div>
                <p className="text-[10px] text-emerald-400/60 leading-snug italic">{attack.mitigation_strategy}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function DefenseCard({ defense }: { defense: Defense }) {
  return (
    <div className="p-4 bg-emerald-500/5 border border-emerald-500/15 rounded-xl space-y-2">
      <div className="flex items-start gap-2">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500/80 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <h4 className="text-[11px] font-bold text-zinc-200 uppercase tracking-tight mb-1">{defense.name}</h4>
          <p className="text-[10px] text-zinc-500 leading-snug mb-2">{defense.description}</p>
          <div className="bg-black/30 rounded-lg border border-zinc-900 p-2">
            <span className="text-[7px] font-black text-zinc-600 uppercase tracking-widest block mb-1">Metodo / Method</span>
            <p className="text-[9px] text-zinc-400 font-mono leading-relaxed">{defense.method}</p>
          </div>
          {defense.counters && defense.counters.length > 0 && (
            <div className="mt-2">
              <span className="text-[7px] font-black text-emerald-500/60 uppercase tracking-widest block mb-1.5">Contrastare / Counters</span>
              <div className="flex flex-wrap gap-1">
                {defense.counters.map(c => (
                  <span key={c} className="text-[8px] px-1.5 py-0.5 bg-red-500/10 border border-red-500/20 text-red-400/70 rounded font-mono">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LayerDetails() {
  const { selectedLayerId, language, viewMode, setViewMode, packetHeaders, selectedProtocol, simulationState, activeAttack, detailTab, setDetailTab } = useStore();

  const layer = OSI_LAYERS.find(l => l.id === selectedLayerId);

  if (!layer && viewMode === 'theory') {
    return (
      <div className="h-full flex flex-col items-center justify-center text-zinc-600 border-2 border-dashed border-zinc-800 rounded-2xl p-8 text-center uppercase tracking-widest text-xs">
        <Network className="w-12 h-12 mb-4 opacity-20" />
        {language === 'en' ? 'Select a layer to inspect' : 'Seleziona un livello da ispezionare'}
      </div>
    );
  }

  const info = layer?.translations[language];
  const attackCount = info?.attacks?.length ?? 0;
  const defenseCount = info?.defenses?.length ?? 0;

  const tabs = [
    { id: 'overview' as const, label: language === 'en' ? 'Overview' : 'Panoramica', icon: BookOpen },
    { id: 'attacks' as const, label: language === 'en' ? 'Attacks' : 'Attacchi', icon: Skull, count: attackCount },
    { id: 'defenses' as const, label: language === 'en' ? 'Defenses' : 'Difese', icon: ShieldCheck, count: defenseCount },
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={viewMode === 'packet' ? 'packet-view' : (layer?.id || 'none')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-full bg-zinc-950 border border-zinc-900 rounded-xl flex flex-col overflow-hidden"
      >
        {viewMode === 'packet' ? (
          <>
            <div className="flex items-center justify-between border-b border-zinc-900 p-5">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white">
                   <Box className="w-5 h-5 text-black" />
                 </div>
                 <div>
                   <h2 className="text-xs font-bold text-white uppercase tracking-[0.2em]">Packet_Inspect</h2>
                   <p className="text-[10px] text-emerald-500 font-mono mt-0.5">PROTO_{selectedProtocol}_ACTIVE</p>
                 </div>
              </div>
              <button
                onClick={() => setViewMode('theory')}
                className="text-[9px] font-bold text-zinc-500 hover:text-white uppercase tracking-widest px-2 py-1 bg-zinc-900 rounded border border-zinc-800"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar space-y-6">
              <section className="p-4 bg-zinc-900/40 border border-zinc-900 rounded-xl">
                 <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: layer?.color }} />
                    <h3 className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Layer_Mission</h3>
                 </div>
                 <p className="text-[11px] text-zinc-500 leading-relaxed">{info?.description}</p>
              </section>

              {simulationState === 'interrupted' && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-start gap-4"
                >
                   <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 animate-pulse">
                      <ShieldAlert className="w-4 h-4 text-white" />
                   </div>
                   <div>
                      <h4 className="text-[10px] font-black text-red-500 uppercase tracking-widest">Security_Violation_Detected</h4>
                      <p className="text-[10px] text-red-400/70 font-mono mt-1 italic">
                        {activeAttack === 'mitm' ? 'Man-in-the-Middle detected at Data Link / Network bridge.' :
                         activeAttack === 'dos' ? 'Resource exhaustion detected. Network stack saturated.' :
                         activeAttack === 'replay' ? 'Replay attack: old session tokens being reused.' :
                         activeAttack === 'eavesdropping' ? 'Passive sniffing detected on physical medium.' :
                         'Identity spoofing detected in L3 source headers.'}
                      </p>
                   </div>
                </motion.div>
              )}

              <section>
                 <h3 className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-3">Runtime Payload</h3>
                 <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800 font-mono text-[10px] text-zinc-400 break-all leading-relaxed">
                   {"{ \"msg\": \"NetLab_Simulator\", \"proto\": \"" + selectedProtocol + "\", \"bytes\": 1500, \"payload\": \"Secure\" }"}
                 </div>
              </section>

              <section>
                <h3 className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-3">Protocol Header Breakdown</h3>
                <div className="space-y-4">
                  {[...packetHeaders].reverse().map((h, idx) => {
                    const l = OSI_LAYERS.find(layer => layer.id === h.layer);
                    const headerFields = (h.fields && h.fields.length > 0)
                      ? h.fields
                      : ({
                        7: [{ key: 'Method', value: 'GET' }, { key: 'Path', value: '/api/v1' }, { key: 'Agent', value: 'Lab_Core' }],
                        6: [{ key: 'Encoding', value: 'Base64' }, { key: 'Crypto', value: 'TLSv1.3' }, { key: 'Type', value: 'JSON' }],
                        5: [{ key: 'SID', value: 'SESS_9821' }, { key: 'Auth', value: 'Verified' }, { key: 'Sync', value: 'ACK' }],
                        4: [{ key: 'SrcPort', value: '54321' }, { key: 'DstPort', value: selectedProtocol === 'HTTP' ? '80' : '7' }, { key: 'Seq', value: '1024' }],
                        3: [{ key: 'SrcIP', value: '192.168.1.10' }, { key: 'DstIP', value: '8.8.8.8' }, { key: 'TTL', value: '64' }],
                        2: [{ key: 'SrcMAC', value: '00:0C:29:...' }, { key: 'DstMAC', value: '00:50:56:...' }, { key: 'Type', value: '0x0800' }],
                        1: [{ key: 'Signal', value: '0/1' }, { key: 'Media', value: 'Ethernet' }, { key: 'Clock', value: '1Gbps' }],
                      }[h.layer as keyof typeof headerFields] || []);

                    return (
                      <div key={`${h.layer}-${idx}`} className="p-3 rounded-lg border border-zinc-900 bg-zinc-900/30 group">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-[10px] font-black uppercase flex items-center gap-2" style={{ color: l?.color }}>
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: l?.color }} />
                            L{h.layer} {l?.translations[language].name}
                          </span>
                          <div className="flex items-center gap-2">
                             <span className="text-[8px] font-black text-zinc-600 bg-zinc-950 px-1 py-0.5 rounded border border-zinc-800 uppercase">{h.pduName}</span>
                             <span className="text-[9px] text-zinc-500 font-mono bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800">{h.protocol}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mb-3">
                           {headerFields.map(f => (
                             <div key={f.key} className={`p-1.5 border rounded-md transition-colors ${simulationState !== 'idle' && h.layer === selectedLayerId ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-black/40 border-zinc-900'}`}>
                                <div className="flex items-center justify-between mb-1">
                                   <span className="text-[6px] text-zinc-700 uppercase leading-none">{f.key}</span>
                                   {simulationState !== 'idle' && h.layer === selectedLayerId && (
                                     <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                                   )}
                                </div>
                                <span className={`text-[8px] font-mono truncate block ${simulationState !== 'idle' && h.layer === selectedLayerId ? 'text-emerald-400' : 'text-zinc-500'}`}>{f.value}</span>
                             </div>
                           ))}
                        </div>
                        <p className="text-[9px] text-zinc-500 font-mono leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                          {h.details}
                        </p>
                      </div>
                    );
                  })}
                  {packetHeaders.length === 0 && (
                    <div className="text-center py-12 flex flex-col items-center gap-3 border border-dashed border-zinc-900 rounded-xl">
                      <span className="text-[9px] text-zinc-700 font-mono uppercase tracking-widest">Awaiting_Transmission_Init</span>
                    </div>
                  )}
                </div>
              </section>

              <section className="bg-zinc-900/10 border border-zinc-900 p-4 rounded-xl">
                 <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Encapsulation Logic</h4>
                 <p className="text-[10px] text-zinc-600 leading-relaxed italic">
                   {language === 'it'
                     ? 'Per ogni livello dello stack, viene aggiunto un header specifico che contiene le istruzioni per il livello corrispondente sul destinatario. Solo il livello fisico (L1) trasmette segnali elettrici/ottici.'
                     : 'For each stack layer, a specific header is added containing instructions for the matching layer at the destination. Only the physical layer (L1) transmits electrical/optical signals.'}
                 </p>
              </section>
            </div>
          </>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-900 p-5 flex-shrink-0">
              <div className="flex items-center gap-3">
                 <div
                   className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-black text-sm"
                   style={{ backgroundColor: layer?.color }}
                 >
                   {layer?.id}
                 </div>
                 <div>
                   <h2 className="text-xs font-bold text-white uppercase tracking-[0.2em]">{info?.name}</h2>
                   <p className="text-[10px] text-zinc-600 font-mono mt-0.5">PDU: {layer?.pdu} · LVL_{layer?.id}</p>
                 </div>
              </div>
              <Network className="w-4 h-4 text-zinc-800" />
            </div>

            {/* Tab Bar */}
            <div className="flex border-b border-zinc-900 flex-shrink-0 px-2 pt-2 gap-1">
              {tabs.map(tab => {
                const Icon = tab.icon;
                const isActive = detailTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setDetailTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg text-[9px] font-bold uppercase tracking-widest transition-all border-b-2 ${
                      isActive
                        ? tab.id === 'attacks'
                          ? 'border-red-500 text-red-400 bg-red-500/5'
                          : tab.id === 'defenses'
                          ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
                          : 'border-white text-white bg-zinc-900/50'
                        : 'border-transparent text-zinc-600 hover:text-zinc-400'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    {tab.label}
                    {tab.count !== undefined && (
                      <span className={`ml-0.5 px-1 py-0.5 rounded text-[7px] font-black ${
                        isActive && tab.id === 'attacks' ? 'bg-red-500/20 text-red-400' :
                        isActive && tab.id === 'defenses' ? 'bg-emerald-500/20 text-emerald-400' :
                        'bg-zinc-800 text-zinc-500'
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <AnimatePresence mode="wait">
                {detailTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="p-5 space-y-6"
                  >
                    <section>
                      <h3 className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-3">
                        {language === 'it' ? 'Descrizione' : 'Description'}
                      </h3>
                      <p className="text-xs text-zinc-400 leading-relaxed">{info?.description}</p>
                    </section>

                    {info?.keyFacts && info.keyFacts.length > 0 && (
                      <section>
                        <div className="flex items-center gap-2 mb-3">
                          <Lightbulb className="w-3.5 h-3.5 text-yellow-400/70" />
                          <h3 className="text-[9px] font-bold text-yellow-400/70 uppercase tracking-widest">
                            {language === 'it' ? 'Fatti Chiave' : 'Key Facts'}
                          </h3>
                        </div>
                        <div className="space-y-2">
                          {info.keyFacts.map((fact, i) => (
                            <div key={i} className="flex gap-3 p-3 bg-yellow-500/5 border border-yellow-500/10 rounded-lg">
                              <span className="text-[8px] font-black text-yellow-500/40 mt-0.5 flex-shrink-0">0{i + 1}</span>
                              <p className="text-[10px] text-zinc-400 leading-relaxed">{fact}</p>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    <section>
                      <h3 className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-3">
                        {language === 'it' ? 'Protocolli Standard' : 'Standard Protocols'}
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {info?.protocols?.map(p => (
                          <span key={p} className="px-2 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-md text-[9px] font-mono">
                            {p}
                          </span>
                        ))}
                      </div>
                    </section>

                    <section>
                      <h3 className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-3">
                        {language === 'it' ? 'Statistiche di Sicurezza' : 'Security Stats'}
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-3 bg-red-500/5 border border-red-500/15 rounded-lg text-center">
                          <span className="block text-2xl font-black text-red-400">{attackCount}</span>
                          <span className="text-[8px] text-zinc-600 uppercase tracking-widest">
                            {language === 'it' ? 'Attacchi Noti' : 'Known Attacks'}
                          </span>
                        </div>
                        <div className="p-3 bg-emerald-500/5 border border-emerald-500/15 rounded-lg text-center">
                          <span className="block text-2xl font-black text-emerald-400">{defenseCount}</span>
                          <span className="text-[8px] text-zinc-600 uppercase tracking-widest">
                            {language === 'it' ? 'Contromisure' : 'Countermeasures'}
                          </span>
                        </div>
                      </div>
                      {/* Severity breakdown */}
                      {info?.attacks && (
                        <div className="mt-3 flex gap-2 flex-wrap">
                          {(['critical', 'high', 'medium', 'low'] as Severity[]).map(sev => {
                            const count = info.attacks!.filter(a => a.severity === sev).length;
                            if (count === 0) return null;
                            const cfg = severityConfig[sev];
                            return (
                              <div key={sev} className={`flex items-center gap-1.5 px-2 py-1 rounded-md border ${cfg.border} ${cfg.bg}`}>
                                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.color }} />
                                <span className="text-[8px] font-bold" style={{ color: cfg.color }}>{count}× {cfg.label}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </section>
                  </motion.div>
                )}

                {detailTab === 'attacks' && (
                  <motion.div
                    key="attacks"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="p-5 space-y-3"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Skull className="w-3.5 h-3.5 text-red-400/60" />
                      <p className="text-[9px] text-zinc-600">
                        {language === 'it'
                          ? 'Clicca su un attacco per vedere come funziona passo per passo.'
                          : 'Click an attack to see how it works step by step.'}
                      </p>
                    </div>
                    {info?.attacks?.map(attack => (
                      <Fragment key={attack.name}>
                        <AttackCard attack={attack} />
                      </Fragment>
                    ))}
                    {(!info?.attacks || info.attacks.length === 0) && (
                      <div className="text-center py-8 text-zinc-700 text-[10px]">
                        {language === 'it' ? 'Nessun attacco documentato.' : 'No attacks documented.'}
                      </div>
                    )}
                  </motion.div>
                )}

                {detailTab === 'defenses' && (
                  <motion.div
                    key="defenses"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="p-5 space-y-3"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400/60" />
                      <p className="text-[9px] text-zinc-600">
                        {language === 'it'
                          ? 'Ogni difesa indica quali attacchi è in grado di contrastare.'
                          : 'Each defense shows which attacks it counters.'}
                      </p>
                    </div>
                    {info?.defenses?.map(defense => (
                      <Fragment key={defense.name}>
                        <DefenseCard defense={defense} />
                      </Fragment>
                    ))}
                    {(!info?.defenses || info.defenses.length === 0) && (
                      <div className="text-center py-8 text-zinc-700 text-[10px]">
                        {language === 'it' ? 'Nessuna difesa documentata.' : 'No defenses documented.'}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
