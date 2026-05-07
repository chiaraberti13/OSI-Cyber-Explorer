export type Language = 'it' | 'en';

export interface Translation {
  name: string;
  description: string;
  attacks?: { name: string; description: string; impact: string; mitigation_strategy: string }[];
  defenses?: { name: string; description: string; method: string }[];
  protocols?: string[];
}

export interface LayerData {
  id: number;
  name: string;
  color: string;
  pdu: string;
  translations: {
    it: Translation;
    en: Translation;
  };
}

export interface PacketHeader {
  layer: number;
  protocol: string;
  details: string;
  pduName: string;
  fields?: { key: string; value: string }[];
}

export interface LogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'warning' | 'danger' | 'success';
}

export type SimulationState = 'idle' | 'encapsulating' | 'decapsulating' | 'interrupted';
export type AttackType = 'mitm' | 'dos' | 'injection' | 'spoofing' | 'none';
