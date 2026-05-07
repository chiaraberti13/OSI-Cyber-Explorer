import { OSI_LAYERS } from '../constants';
import { useStore } from '../store';
import { motion, AnimatePresence } from 'motion/react';
import { Network, Skull, ShieldCheck, Box, ShieldAlert } from 'lucide-react';

export default function LayerDetails() {
  const { selectedLayerId, language, viewMode, setViewMode, packetHeaders, selectedProtocol, simulationState, activeAttack } = useStore();
  
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

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={viewMode === 'packet' ? 'packet-view' : (layer?.id || 'none')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-full bg-zinc-950 border border-zinc-900 rounded-xl p-6 flex flex-col gap-6"
      >
        {viewMode === 'packet' ? (
          // Packet Inspector View
          <>
            <div className="flex items-center justify-between border-b border-zinc-900 pb-5">
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

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
              {/* Layer Context Description */}
              <section className="p-4 bg-zinc-900/40 border border-zinc-900 rounded-xl">
                 <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: layer?.color }} />
                    <h3 className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Layer_Mission_Statement</h3>
                 </div>
                 <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">
                   {info?.description}
                 </p>
              </section>

              {/* Active Attack Alert */}
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
                    
                    // Priority: use fields from actual packet header, then fallback to simulated one
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
                             <span className="text-[8px] font-black text-zinc-600 bg-zinc-950 px-1 py-0.5 rounded border border-zinc-800 uppercase tracking-tighter">{h.pduName}</span>
                             <span className="text-[9px] text-zinc-500 font-mono bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800">{h.protocol}</span>
                          </div>
                        </div>
                        
                        {/* Header Fields Structure */}
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
                    <div className="text-center py-12 flex flex-col items-center gap-3 border border-dashed border-zinc-900 rounded-xl bg-zinc-900/5">
                      <div className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center">
                         <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                      </div>
                      <span className="text-[9px] text-zinc-700 font-mono uppercase tracking-widest">Awaiting_Transmission_Init</span>
                    </div>
                  )}
                </div>
              </section>

              <section className="bg-zinc-900/10 border border-zinc-900 p-4 rounded-xl">
                 <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Encapsulation logic</h4>
                 <p className="text-[10px] text-zinc-600 leading-relaxed italic">
                   Per ogni livello dello stack, viene aggiunto un "Header" specifico che contiene le istruzioni per il corrispondente livello sul destinatario. Solo l'ultimo livello fisico (L1) trasmette i segnali elettrici/ottici.
                 </p>
              </section>

              <section>
                 <h3 className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-3">Technical Specifications</h3>
                 <div className="grid grid-cols-2 gap-2">
                   {[
                     { label: 'Data Unit', value: layer?.pdu || 'Data' },
                     { label: 'MTU Limit', value: layer?.id === 3 ? '1500 Bytes' : layer?.id === 2 ? 'Variable (MTU)' : 'Unbounded' },
                     { label: 'Addressing', value: layer?.id === 2 ? 'MAC (Physical)' : layer?.id === 3 ? 'IP (Logical)' : layer?.id === 4 ? `Ports (${selectedProtocol === 'HTTP' ? '80/443' : 'ICMP Type'})` : 'Symbolic' },
                     { label: 'Transmission', value: layer?.id === 1 ? 'Signals/Bits' : 'Packet-switched' },
                     { label: 'Reliability', value: layer?.id === 4 ? 'Checkwalled' : 'Best-effort' },
                     { label: 'Flow Control', value: layer?.id <= 4 ? 'Hardware-backed' : 'Software-logic' }
                   ].map(spec => (
                     <div key={spec.label} className="p-2 border border-zinc-900 rounded-lg bg-zinc-900/20">
                       <span className="block text-[7px] text-zinc-600 uppercase tracking-tighter">{spec.label}</span>
                       <span className="text-[9px] font-mono text-zinc-400">{spec.value}</span>
                     </div>
                   ))}
                 </div>
              </section>
            </div>
          </>
        ) : (
          // Standard Theory View
          <>
            <div className="flex items-center justify-between border-b border-zinc-900 pb-5">
              <div className="flex items-center gap-3">
                 <div 
                   className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-black text-sm"
                   style={{ backgroundColor: layer?.color }}
                 >
                   {layer?.id}
                 </div>
                 <div>
                   <h2 className="text-xs font-bold text-white uppercase tracking-[0.2em]">
                     {info?.name}
                   </h2>
                   <p className="text-[10px] text-zinc-600 font-mono mt-0.5">LVL_{layer?.id}_INTEL</p>
                 </div>
              </div>
              <Network className="w-4 h-4 text-zinc-800" />
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-8">
              <section>
                <h3 className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-3">Description</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {info?.description}
                </p>
              </section>

              <section>
                <h3 className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-3">Standard Protocols</h3>
                <div className="flex flex-wrap gap-1.5">
                  {info?.protocols?.map(p => (
                    <span key={p} className="px-2 py-1 bg-zinc-900 border border-zinc-800 text-zinc-500 rounded-md text-[9px] font-mono">
                      {p}
                    </span>
                  ))}
                </div>
              </section>

              <div className="grid gap-6">
                <section>
                  <h3 className="text-[9px] font-bold text-red-500/40 uppercase tracking-widest mb-3">Vulnerabilities</h3>
                  <div className="space-y-3">
                     {info?.attacks?.map(attack => (
                       <div key={attack.name} className="p-3 bg-zinc-900/30 border border-zinc-800 rounded-lg">
                         <h4 className="font-bold text-zinc-400 text-[10px] uppercase tracking-tight mb-1">{attack.name}</h4>
                         <p className="text-[10px] text-zinc-500 leading-snug mb-2">{attack.description}</p>
                         <div className="pt-2 border-t border-zinc-800/50">
                            <span className="text-[7px] font-black text-emerald-500 uppercase tracking-tighter block mb-1">Strat_Mitigation</span>
                            <p className="text-[9px] text-emerald-500/60 leading-tight italic">{attack.mitigation_strategy}</p>
                         </div>
                       </div>
                     ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-[9px] font-bold text-emerald-500/40 uppercase tracking-widest mb-3">Mitigation</h3>
                  <div className="space-y-3">
                    {info?.defenses?.map(defense => (
                      <div key={defense.name} className="p-3 bg-zinc-900/30 border border-zinc-900 rounded-lg">
                        <h4 className="font-bold text-zinc-400 text-[10px] uppercase tracking-tight mb-1">{defense.name}</h4>
                        <p className="text-[10px] text-zinc-500 leading-snug">{defense.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
