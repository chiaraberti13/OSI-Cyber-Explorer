import { LayerData } from './types';

export const OSI_LAYERS: LayerData[] = [
  {
    id: 7,
    name: 'Application',
    color: '#ef4444', // Red-500
    pdu: 'Data',
    translations: {
      en: {
        name: 'Application Layer',
        description: 'Closest to the end user. It interacts with software applications that implement a communicating component.',
        protocols: ['HTTP', 'DNS', 'FTP', 'SMTP', 'SSH'],
        attacks: [
          { name: 'SQL Injection', description: 'Malicious SQL statements are inserted into entry fields for execution.', impact: 'Data theft, unauthorized access.', mitigation_strategy: 'Use parameterized queries and robust input validation.' },
          { name: 'DDoS (Layer 7)', description: 'Overwhelming the server with high-level requests.', impact: 'Service unavailability.', mitigation_strategy: 'Deploy WAF with rate limiting and behavior analysis.' }
        ],
        defenses: [
          { name: 'WAF', description: 'Web Application Firewall to filter HTTP traffic.', method: 'Signature-based blocking.' },
          { name: 'Input Validation', description: 'Cleaning user data before processing.', method: 'Sanitization.' }
        ]
      },
      it: {
        name: 'Livello Applicazione',
        description: 'Il più vicino all\'utente finale. Interagisce con le applicazioni software che implementano un componente di comunicazione.',
        protocols: ['HTTP', 'DNS', 'FTP', 'SMTP', 'SSH'],
        attacks: [
          { name: 'SQL Injection', description: 'Istruzioni SQL dannose vengono inserite nei campi di input per l\'esecuzione.', impact: 'Furto di dati, accesso non autorizzato.', mitigation_strategy: 'Usa query parametrizzate e una solida validazione dell\'input.' },
          { name: 'DDoS (Layer 7)', description: 'Sovraccarico del server con richieste di alto livello.', impact: 'Indisponibilità del servizio.', mitigation_strategy: 'Distribuisci un WAF con limitazione della velocità e analisi del comportamento.' }
        ],
        defenses: [
          { name: 'WAF', description: 'Web Application Firewall per filtrare il traffico HTTP.', method: 'Blocco basato su firme.' },
          { name: 'Validazione Input', description: 'Pulizia dei dati utente prima dell\'elaborazione.', method: 'Sanificazione.' }
        ]
      }
    }
  },
  {
    id: 6,
    name: 'Presentation',
    color: '#f97316', // Orange-500
    pdu: 'Data',
    translations: {
      en: {
        name: 'Presentation Layer',
        description: 'Ensures that data is in a usable format and is where data encryption occurs.',
        protocols: ['SSL/TLS', 'JPEG', 'GIF', 'MPEG'],
        attacks: [
          { name: 'Encoding/Compression Attacks', description: 'Exploiting vulnerabilities in data parsing or decompression.', impact: 'Remote code execution.', mitigation_strategy: 'Update libraries and enforce strict data type checks.' }
        ],
        defenses: [
          { name: 'Secure Libraries', description: 'Using patched and verified parsing libraries.', method: 'Regular updates.' }
        ]
      },
      it: {
        name: 'Livello Presentazione',
        description: 'Garantisce che i dati siano in un formato utilizzabile ed è dove avviene la crittografia dei dati.',
        protocols: ['SSL/TLS', 'JPEG', 'GIF', 'MPEG'],
        attacks: [
          { name: 'Attacchi di Encoding', description: 'Sfruttamento di vulnerabilità nell\'analisi dei dati o decompressione.', impact: 'Esecuzione di codice remoto.', mitigation_strategy: 'Aggiorna le librerie e applica controlli rigorosi sui tipi di dati.' }
        ],
        defenses: [
          { name: 'Librerie Sicure', description: 'Utilizzo di librerie di analisi patchate e verificate.', method: 'Aggiornamenti regolari.' }
        ]
      }
    }
  },
  {
    id: 5,
    name: 'Session',
    color: '#eab308', // Yellow-500
    pdu: 'Data',
    translations: {
      en: {
        name: 'Session Layer',
        description: 'Maintains connections and is responsible for controlling ports and sessions.',
        protocols: ['NetBIOS', 'RPC', 'L2TP', 'PPTP'],
        attacks: [
          { name: 'Session Hijacking', description: 'Unauthorized taking over of a user session.', impact: 'Impersonation.', mitigation_strategy: 'Use HTTPS and secure, HTTP-only session cookies.' }
        ],
        defenses: [
          { name: 'Session Tokens', description: 'Using encrypted, high-entropy tokens.', method: 'Timeouts and rotation.' }
        ]
      },
      it: {
        name: 'Livello Sessione',
        description: 'Mantiene le connessioni ed è responsabile del controllo di porte e sessioni.',
        protocols: ['NetBIOS', 'RPC', 'L2TP', 'PPTP'],
        attacks: [
          { name: 'Session Hijacking', description: 'Presa di possesso non autorizzata di una sessione utente.', impact: 'Impersonificazione.', mitigation_strategy: 'Usa HTTPS e cookie di sessione sicuri e solo HTTP.' }
        ],
        defenses: [
          { name: 'Token di Sessione', description: 'Utilizzo di token crittografati ad alta entropia.', method: 'Timeout e rotazione.' }
        ]
      }
    }
  },
  {
    id: 4,
    name: 'Transport',
    color: '#22c55e', // Green-500
    pdu: 'Segment',
    translations: {
      en: {
        name: 'Transport Layer',
        description: 'Transmits data using transmission protocols including TCP and UDP.',
        protocols: ['TCP', 'UDP', 'SCTP'],
        attacks: [
          { name: 'SYN Flood', description: 'Attempting to consume server resources by sending SYN requests.', impact: 'Denial of Service.', mitigation_strategy: 'Enable SYN cookies and configure TCP timeouts.' },
          { name: 'Port Scanning', description: 'Probing a server for open ports.', impact: 'Information gathering.', mitigation_strategy: 'Implement port knocking and hide service versions.' }
        ],
        defenses: [
          { name: 'SYN Cookies', description: 'Technique to resist SYN floods.', method: 'Stateless handshakes.' },
          { name: 'Firewall Filtering', description: 'Blocking unauthorized port access.', method: 'ACL rules.' }
        ]
      },
      it: {
        name: 'Livello Trasporto',
        description: 'Trasmette i dati utilizzando protocolli di trasmissione tra cui TCP e UDP.',
        protocols: ['TCP', 'UDP', 'SCTP'],
        attacks: [
          { name: 'SYN Flood', description: 'Tentativo di consumare risorse del server inviando richieste SYN.', impact: 'Denial of Service.', mitigation_strategy: 'Abilita i SYN cookie e configura i timeout TCP.' },
          { name: 'Port Scanning', description: 'Sondaggio di un server alla ricerca di porte aperte.', impact: 'Raccolta informazioni.', mitigation_strategy: 'Implementa il port knocking e nascondi le versioni dei servizi.' }
        ],
        defenses: [
          { name: 'SYN Cookies', description: 'Tecnica per resistere ai SYN flood.', method: 'Handshake senza stato.' },
          { name: 'Filtro Firewall', description: 'Blocco dell\'accesso non autorizzato alle porte.', method: 'Regole ACL.' }
        ]
      }
    }
  },
  {
    id: 3,
    name: 'Network',
    color: '#3b82f6', // Blue-500
    pdu: 'Packet',
    translations: {
      en: {
        name: 'Network Layer',
        description: 'Responsible for packet forwarding including routing through intermediate routers.',
        protocols: ['IP', 'ICMP', 'IPsec', 'IGMP'],
        attacks: [
          { name: 'IP Spoofing', description: 'Creation of IP packets with a false source IP address.', impact: 'Bypassing firewalls.', mitigation_strategy: 'Implement ingress and egress filtering on routers.' },
          { name: 'ICMP Smurf', description: 'DDoS attack using broadcast ICMP echo requests.', impact: 'Network saturation.', mitigation_strategy: 'Configure routers not to respond to broadcast ICMP.' }
        ],
        defenses: [
          { name: 'Ingress Filtering', description: 'Verifying source IP of incoming packets.', method: 'Packet inspection.' },
          { name: 'Anti-Spoofing', description: 'Dropping packets from internal network claiming to be external.', method: 'Reverse path forwarding.' }
        ]
      },
      it: {
        name: 'Livello Rete',
        description: 'Responsabile dell\'inoltro dei pacchetti, compreso il routing attraverso router intermedi.',
        protocols: ['IP', 'ICMP', 'IPsec', 'IGMP'],
        attacks: [
          { name: 'IP Spoofing', description: 'Creazione di pacchetti IP con un indirizzo IP sorgente falso.', impact: 'Evadere il firewall.', mitigation_strategy: 'Implementa il filtraggio in entrata e in uscita sui router.' },
          { name: 'ICMP Smurf', description: 'Attacco DDoS che utilizza richieste broadcast ICMP echo.', impact: 'Saturazione della rete.', mitigation_strategy: 'Configura i router per non rispondere alle richieste broadcast ICMP.' }
        ],
        defenses: [
          { name: 'Ingress Filtering', description: 'Verifica dell\'IP sorgente dei pacchetti in entrata.', method: 'Ispezione pacchetti.' },
          { name: 'Anti-Spoofing', description: 'Scarto di pacchetti provenienti dall\'interno che dichiarano di essere esterni.', method: 'Reverse path forwarding.' }
        ]
      }
    }
  },
  {
    id: 2,
    name: 'Data Link',
    color: '#8b5cf6', // Violet-500
    pdu: 'Frame',
    translations: {
      en: {
        name: 'Data Link Layer',
        description: 'Provides node-to-node data transfer—a link between two directly connected nodes.',
        protocols: ['Ethernet', '802.11 (Wi-Fi)', 'ARP', 'PPP'],
        attacks: [
          { name: 'MAC Flooding', description: 'Overwhelming a switch address table.', impact: 'Switch becomes a hub (sniffing).', mitigation_strategy: 'Enable port security with MAC address limits.' },
          { name: 'ARP Poisoning', description: 'Sending fake ARP messages onto a LAN.', impact: 'Man-in-the-Middle.', mitigation_strategy: 'Deploy Dynamic ARP Inspection and static ARP entries.' }
        ],
        defenses: [
          { name: 'Port Security', description: 'Restricting MAC addresses on a port.', method: 'Static MAC binding.' },
          { name: 'DAI', description: 'Dynamic ARP Inspection.', method: 'Validating ARP packets.' }
        ]
      },
      it: {
        name: 'Livello Collegamento Dati',
        description: 'Fornisce il trasferimento di dati da nodo a nodo: un collegamento tra due nodi direttamente connessi.',
        protocols: ['Ethernet', '802.11 (Wi-Fi)', 'ARP', 'PPP'],
        attacks: [
          { name: 'MAC Flooding', description: 'Sovraccarico della tabella degli indirizzi di uno switch.', impact: 'Lo switch diventa un hub.', mitigation_strategy: 'Abilita la sicurezza delle porte con limiti agli indirizzi MAC.' },
          { name: 'ARP Poisoning', description: 'Invio di messaggi ARP falsi su una LAN.', impact: 'Man-in-the-Middle.', mitigation_strategy: 'Distribuisci Dynamic ARP Inspection e voci ARP statiche.' }
        ],
        defenses: [
          { name: 'Port Security', description: 'Restrizione degli indirizzi MAC su una porta.', method: 'Binding MAC statico.' },
          { name: 'DAI', description: 'Dynamic ARP Inspection.', method: 'Validazione pacchetti ARP.' }
        ]
      }
    }
  },
  {
    id: 1,
    name: 'Physical',
    color: '#ec4899', // Pink-500
    pdu: 'Bits',
    translations: {
      en: {
        name: 'Physical Layer',
        description: 'Responsible for the actual physical connection between the devices.',
        protocols: ['DSL', 'USB', 'Ethernet (Physical)', 'Fiber Optics'],
        attacks: [
          { name: 'Wiretapping', description: 'Physically splicing into a cable to intercept data.', impact: 'Data interception.', mitigation_strategy: 'Use encryption and physical cable protection (conduits).' },
          { name: 'Signal Jamming', description: 'Disrupting wireless communications with noise.', impact: 'Denial of Service.', mitigation_strategy: 'Use spread-spectrum technology and directional antennas.' }
        ],
        defenses: [
          { name: 'Physical Security', description: 'Locked server rooms and conduit protection.', method: 'Physical access control.' },
          { name: 'Faraday Cage', description: 'Shielding from electromagnetic interference.', method: 'RF shielding.' }
        ]
      },
      it: {
        name: 'Livello Fisico',
        description: 'Responsabile della connessione fisica effettiva tra i dispositivi.',
        protocols: ['DSL', 'USB', 'Ethernet (Physical)', 'Fibre Ottiche'],
        attacks: [
          { name: 'Intercettazione Fisica', description: 'Giunzione fisica in un cavo per intercettare i dati.', impact: 'Intercettazione dati.', mitigation_strategy: 'Usa crittografia e protezione fisica dei cavi (condotti).' },
          { name: 'Signal Jamming', description: 'Interruzione delle comunicazioni wireless con rumore.', impact: 'Denial of Service.', mitigation_strategy: 'Usa tecnologia spread-spectrum e antenne direzionali.' }
        ],
        defenses: [
          { name: 'Sicurezza Fisica', description: 'Locali server chiusi e protezione dei condotti.', method: 'Controllo accessi fisici.' },
          { name: 'Gabbia di Faraday', description: 'Schermatura dalle interferenze elettromagnetiche.', method: 'Schermatura RF.' }
        ]
      }
    }
  }
];
