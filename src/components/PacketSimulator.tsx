import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { motion, AnimatePresence } from 'motion/react';
import { OSI_LAYERS } from '../constants';
import { Box, ArrowDown, ArrowUp, Zap, Skull, ShieldCheck, Play, RotateCcw, Info, Pause } from 'lucide-react';

export default function PacketSimulator() {
  const { 
    language, 
    simulationState, 
    setSimulationState, 
    addLog, 
    packetHeaders, 
    addPacketHeader, 
    clearPacketHeaders,
    currentStep,
    setCurrentStep,
    activeAttack,
    setActiveAttack,
    defenseEnabled,
    setDefenseEnabled,
    isPaused,
    setIsPaused,
    selectedProtocol,
    setViewMode,
    setSelectedLayerId
  } = useStore();

  const labels = {
    en: {
      start: 'Start Simulation',
      reset: 'Reset',
      pause: 'Pause',
      resume: 'Resume',
      encap: 'Encapsulation (TX)',
      decap: 'Decapsulation (RX)',
      idle: 'System Idle',
      interrupted: 'Connection Interrupted',
      headers: 'Packet Inspector',
      attack: 'Inject Attack',
      defense: 'Enable Defense',
      none: 'None'
    },
    it: {
      start: 'Avvia Simulazione',
      reset: 'Reset',
      pause: 'Pausa',
      resume: 'Riprendi',
      encap: 'Incapsulamento (TX)',
      decap: 'Decapsulamento (RX)',
      idle: 'Sistema Idle',
      interrupted: 'Connessione Interrotta',
      headers: 'Ispettore Pacchetto',
      attack: 'Inietta Attacco',
      defense: 'Attiva Difesa',
      none: 'Nessuno'
    }
  }[language];

  const handleStart = async () => {
    if (simulationState !== 'idle') return;
    
    clearPacketHeaders();
    setIsPaused(false);
    setSimulationState('encapsulating');
    setCurrentStep(7);
    
    if (selectedProtocol === 'HTTP') {
      addLog(language === 'en' ? 'HTTP Request: Initiating TCP 3-way handshake...' : 'Richiesta HTTP: Avvio handshake TCP a 3 vie...', 'info');
    } else {
      addLog(language === 'en' ? 'ICMP Echo Request: Preparing ping packet...' : 'ICMP Echo Request: Preparazione pacchetto ping...', 'info');
    }
    
    addLog(language === 'en' ? 'Starting packet encapsulation...' : 'Inizio incapsulamento pacchetto...', 'info');
  };

  const handleReset = () => {
    setSimulationState('idle');
    setIsPaused(false);
    setCurrentStep(7);
    clearPacketHeaders();
    setActiveAttack('none');
    addLog(language === 'en' ? 'Simulation reset.' : 'Simulazione resettata.', 'warning');
  };

  const getPduName = (layerId: number) => {
    if (layerId >= 5) return 'Data';
    if (layerId === 4) return selectedProtocol === 'HTTP' ? 'Segment' : 'Datagram';
    if (layerId === 3) return 'Packet';
    if (layerId === 2) return 'Frame';
    if (layerId === 1) return 'Bits';
    return 'Data';
  };

  const getHeaderForLayer = (layerId: number) => {
    const layer = OSI_LAYERS.find(l => l.id === layerId);
    if (!layer) return 'Data';
    // Use specific protocol for L3/L4 based on selection
    if (selectedProtocol === 'HTTP') {
      if (layerId === 4) return 'TCP';
      if (layerId === 3) return 'IP';
    } else if (selectedProtocol === 'PING') {
      if (layerId === 4) return 'UDP';
      if (layerId === 3) return 'ICMP';
    }
    return layer.translations[language].protocols?.[0] || 'Header';
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (simulationState === 'encapsulating' && !isPaused) {
      interval = setInterval(() => {
        if (currentStep > 1) {
          const headerName = getHeaderForLayer(currentStep);
          const pduName = getPduName(currentStep);
          
          let details = `L${currentStep} Header Added`;
          let fields: { key: string; value: string }[] = [];

          if (selectedProtocol === 'HTTP') {
            if (currentStep === 7) {
              details = 'GET /index.html HTTP/1.1';
              fields = [
                { key: 'Method', value: 'GET' },
                { key: 'Path', value: '/index.html' },
                { key: 'Host', value: 'ais.dev' },
                { key: 'Agent', value: 'Mozilla/5.0' }
              ];
            } else if (currentStep === 6) {
              details = 'Encoding: gzip | Charset: UTF-8';
              fields = [
                { key: 'Encoding', value: 'gzip' },
                { key: 'Charset', value: 'UTF-8' },
                { key: 'Crypto', value: 'TLSv1.3' }
              ];
            } else if (currentStep === 5) {
              details = 'SessionID: 4f8s9... Status: Authenticated';
              fields = [
                { key: 'SessionID', value: 'SESS_4F8S9A' },
                { key: 'Status', value: 'Authenticated' },
                { key: 'Persistence', value: 'Keep-Alive' }
              ];
            } else if (currentStep === 4) {
              details = 'TCP: SYN, Seq=120, Port=80';
              fields = [
                { key: 'SrcPort', value: '54321' },
                { key: 'DstPort', value: '80' },
                { key: 'SeqNo', value: '120485' },
                { key: 'Flags', value: 'SYN' }
              ];
            } else if (currentStep === 3) {
              details = 'IPv4: 192.168.1.10 -> 104.22.3.14';
              fields = [
                { key: 'SrcIP', value: '192.168.1.10' },
                { key: 'DstIP', value: '104.22.3.14' },
                { key: 'TTL', value: '64' },
                { key: 'Proto', value: '0x06 (TCP)' }
              ];
            } else if (currentStep === 2) {
              details = 'MAC: 00:0C:29... -> 00:50:56...';
              fields = [
                { key: 'SrcMAC', value: '00:0C:29:C0:00:08' },
                { key: 'DstMAC', value: '00:50:56:C0:00:01' },
                { key: 'VLAN', value: '10' }
              ];
            }
          } else {
            if (currentStep === 7) {
              details = 'ICMP Echo Request: Data payload';
              fields = [
                { key: 'Type', value: '8 (Echo Request)' },
                { key: 'Code', value: '0' },
                { key: 'Payload', value: '32 Bytes' }
              ];
            } else if (currentStep === 4) {
              details = 'UDP: Checksum 0xAC3F';
              fields = [
                { key: 'SrcPort', value: '32768' },
                { key: 'DstPort', value: '7' },
                { key: 'Length', value: '40' }
              ];
            } else if (currentStep === 3) {
              details = 'ICMP Over IP: Type 8, Code 0';
              fields = [
                { key: 'SrcIP', value: '192.168.1.5' },
                { key: 'DstIP', value: '8.8.8.8' },
                { key: 'TTL', value: '128' }
              ];
            } else if (currentStep === 2) {
              details = 'Ethernet II: IPv4 Payload';
              fields = [
                { key: 'SrcMAC', value: 'B4:2E:99:A1:C2:E0' },
                { key: 'DstMAC', value: 'E4:F4:C6:D1:B2:A1' },
                { key: 'Type', value: '0x0800' }
              ];
            }
          }

          addPacketHeader({
            layer: currentStep,
            protocol: headerName,
            details: details,
            pduName: pduName,
            fields: fields
          });
          addLog(`L${currentStep} encapsulated (${headerName})`, 'success');
          setSelectedLayerId(currentStep);
          setCurrentStep(currentStep - 1);
        } else {
          addLog(language === 'en' ? 'Transmitting via Physical Media...' : 'Trasmissione via Media Fisico...', 'info');
          
          if (activeAttack !== 'none' && !defenseEnabled) {
            setSimulationState('interrupted');
            addLog(language === 'en' ? `CRITICAL: ${activeAttack.toUpperCase()} attack successful! Connection dropped.` : `CRITICO: Attacco ${activeAttack.toUpperCase()} riuscito! Connessione interrotta.`, 'danger');
          } else {
             if (activeAttack !== 'none' && defenseEnabled) {
               addLog(language === 'en' ? `Defense mitigated ${activeAttack.toUpperCase()} attack.` : `La difesa ha mitigato l'attacco ${activeAttack.toUpperCase()}.`, 'success');
             }
             setSimulationState('decapsulating');
             addLog(language === 'en' ? 'Packet reaching destination. Starting decapsulation...' : 'Il pacchetto raggiunge il destinatario. Inizio decapsulamento...', 'info');
          }
        }
      }, 1000);
    } else if (simulationState === 'decapsulating' && !isPaused) {
      interval = setInterval(() => {
        if (currentStep < 7) {
          const nextStep = currentStep + 1;
          const pduName = getPduName(nextStep);
          addLog(`L${currentStep} decapsulated (${pduName})`, 'success');
          setSelectedLayerId(nextStep);
          setCurrentStep(nextStep);
        } else {
          addLog(language === 'en' ? 'Data successfully delivered to Application Layer.' : 'Dati consegnati con successo al Livello Applicazione.', 'success');
          setSimulationState('idle');
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [simulationState, currentStep, activeAttack, defenseEnabled, isPaused, selectedProtocol, language]);

  return (
    <div className="bg-zinc-900 border border-zinc-900 rounded-xl flex flex-col gap-0 overflow-hidden shadow-2xl">
      {/* Simulation Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-zinc-900 bg-black/20">
        <div className="flex items-center gap-3">
          {simulationState === 'idle' ? (
            <button
              onClick={handleStart}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold text-[11px] transition-all active:scale-95 uppercase tracking-wider"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              {labels.start}
            </button>
          ) : (
            <button
              onClick={() => setIsPaused(!isPaused)}
              disabled={simulationState === 'interrupted'}
              className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 text-white px-4 py-2 rounded-lg font-bold text-[11px] transition-all border border-zinc-700 uppercase tracking-wider"
            >
              {isPaused ? <Play className="w-3.5 h-3.5 fill-white" /> : <Pause className="w-3.5 h-3.5 fill-white" />}
              {isPaused ? labels.resume : labels.pause}
            </button>
          )}

          <button
            onClick={handleReset}
            className="flex items-center justify-center w-9 h-9 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-500 hover:text-white rounded-lg transition-all border border-zinc-800 group"
          >
            <RotateCcw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-6">
           {/* Protocol Selection */}
           <div className="flex items-center gap-3">
             <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Protocol</span>
             <div className="flex bg-black p-0.5 rounded-lg border border-zinc-800">
                <button 
                  onClick={() => useStore.getState().setSelectedProtocol('HTTP')}
                  className={`px-3 py-1.5 text-[9px] font-bold rounded-md transition-all ${selectedProtocol === 'HTTP' ? 'bg-zinc-800 text-white' : 'text-zinc-600 hover:text-zinc-400'}`}
                >HTTP</button>
                <button 
                  onClick={() => useStore.getState().setSelectedProtocol('PING')}
                  className={`px-3 py-1.5 text-[9px] font-bold rounded-md transition-all ${selectedProtocol === 'PING' ? 'bg-zinc-800 text-white' : 'text-zinc-600 hover:text-zinc-400'}`}
                >PING</button>
             </div>
           </div>

           <div className="flex items-center gap-4">
             <div className="flex items-center gap-3">
               <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">{labels.attack}</span>
               <select 
                 value={activeAttack}
                 onChange={(e) => setActiveAttack(e.target.value as any)}
                 className="bg-zinc-950 text-red-500/70 text-[9px] font-bold border border-red-900/20 rounded-lg px-2 py-1.5 outline-none cursor-pointer hover:border-red-500/40 transition-all font-mono"
               >
                 <option value="none">{labels.none.toUpperCase()}</option>
                 <option value="mitm">MITM</option>
                 <option value="dos">DDOS</option>
                 <option value="spoofing">SPOOFING</option>
               </select>
             </div>
             
             <button
               onClick={() => setDefenseEnabled(!defenseEnabled)}
               className={`text-[9px] font-bold border rounded-lg px-3 py-1.5 transition-all ${defenseEnabled ? 'bg-emerald-500/5 text-emerald-500 border-emerald-500/20' : 'bg-zinc-950 text-zinc-600 border-zinc-800'}`}
             >
               {defenseEnabled ? 'SHIELD_ON' : 'DEFS_OFF'}
             </button>
           </div>
        </div>
      </div>

      {/* Simple Status & Logic Controls */}
      <div className="bg-zinc-950/20 rounded-xl border border-zinc-900 p-4 space-y-4">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-2">
             <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor] transition-colors ${simulationState !== 'idle' ? 'bg-emerald-500 text-emerald-500' : 'bg-zinc-800 text-transparent'}`} />
             <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Logic_Processor</span>
           </div>
           <div className="flex items-center gap-6">
             <div className="flex items-center gap-1.5 transition-opacity duration-300" style={{ opacity: simulationState === 'encapsulating' ? 1 : 0.3 }}>
               <span className="w-1 h-1 bg-emerald-500 rounded-full animate-ping" />
               <span className="text-[8px] font-mono text-zinc-600">[TX_EN]</span>
             </div>
             <div className="flex items-center gap-1.5 transition-opacity duration-300" style={{ opacity: simulationState === 'decapsulating' ? 1 : 0.3 }}>
               <span className="w-1 h-1 bg-blue-500 rounded-full animate-ping" />
               <span className="text-[8px] font-mono text-zinc-600">[RX_DE]</span>
             </div>
           </div>
        </div>

        <div className="bg-black/40 border border-zinc-900 p-3 rounded-lg flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[8px] text-zinc-600 uppercase tracking-tighter">Current Transformer</span>
            <span className="text-[10px] font-mono text-emerald-500">
               {simulationState === 'encapsulating' && 'PACKET_FORMATION_v1'}
               {simulationState === 'decapsulating' && 'PACKET_STRIPPING_v1'}
               {simulationState === 'idle' && 'WAITING_FOR_DATA'}
               {simulationState === 'interrupted' && 'FLOW_COMPROMISED'}
            </span>
          </div>
          {simulationState !== 'idle' && (
            <div className="px-3 py-1 bg-zinc-900 border border-white/5 rounded text-[10px] font-black text-white uppercase italic">
              {packetHeaders[packetHeaders.length - 1]?.pduName || 'DATA'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
