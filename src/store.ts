import { create } from 'zustand';
import { Language, LogEntry, SimulationState, AttackType, PacketHeader } from './types';

interface AppState {
  language: Language;
  setLanguage: (lang: Language) => void;
  
  selectedLayerId: number;
  setSelectedLayerId: (id: number) => void;

  viewMode: 'theory' | 'packet';
  setViewMode: (mode: 'theory' | 'packet') => void;
  
  simulationState: SimulationState;
  setSimulationState: (state: SimulationState) => void;
  
  activeAttack: AttackType;
  setActiveAttack: (attack: AttackType) => void;
  
  defenseEnabled: boolean;
  setDefenseEnabled: (enabled: boolean) => void;
  
  logs: LogEntry[];
  addLog: (message: string, type?: LogEntry['type']) => void;
  clearLogs: () => void;
  
  packetHeaders: PacketHeader[];
  addPacketHeader: (header: PacketHeader) => void;
  clearPacketHeaders: () => void;
  
  currentStep: number;
  setCurrentStep: (step: number) => void;
  
  selectedProtocol: 'HTTP' | 'PING';
  setSelectedProtocol: (protocol: 'HTTP' | 'PING') => void;

  detailTab: 'overview' | 'attacks' | 'defenses';
  setDetailTab: (tab: 'overview' | 'attacks' | 'defenses') => void;
  
  isPaused: boolean;
  setIsPaused: (isPaused: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  language: 'en',
  setLanguage: (language) => set({ language }),
  
  selectedLayerId: 7,
  setSelectedLayerId: (selectedLayerId) => set({ selectedLayerId, viewMode: 'theory' }),

  viewMode: 'theory',
  setViewMode: (viewMode) => set({ viewMode }),
  
  simulationState: 'idle',
  setSimulationState: (simulationState) => set({ simulationState }),
  
  activeAttack: 'none',
  setActiveAttack: (activeAttack) => set({ activeAttack }),
  
  defenseEnabled: false,
  setDefenseEnabled: (defenseEnabled) => set({ defenseEnabled }),
  
  logs: [],
  addLog: (message, type = 'info') => set((state) => ({
    logs: [
      ...state.logs,
      { timestamp: new Date().toLocaleTimeString(), message, type }
    ].slice(-50) // Keep last 50 logs
  })),
  clearLogs: () => set({ logs: [] }),
  
  packetHeaders: [],
  addPacketHeader: (header) => set((state) => ({
    packetHeaders: [...state.packetHeaders, header]
  })),
  clearPacketHeaders: () => set({ packetHeaders: [] }),
  
  currentStep: 7,
  setCurrentStep: (currentStep) => set({ currentStep }),

  selectedProtocol: 'HTTP',
  setSelectedProtocol: (selectedProtocol) => set({ selectedProtocol }),

  isPaused: false,
  setIsPaused: (isPaused) => set({ isPaused }),

  detailTab: 'overview',
  setDetailTab: (detailTab) => set({ detailTab }),
}));
