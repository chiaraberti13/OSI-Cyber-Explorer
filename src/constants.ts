import { LayerData } from './types';

export const OSI_LAYERS: LayerData[] = [
  {
    id: 7,
    name: 'Application',
    color: '#ef4444',
    pdu: 'Data',
    translations: {
      en: {
        name: 'Application Layer',
        description: 'The topmost layer — the interface between network services and end-user applications. It defines protocols that applications use to communicate over the network, handling everything from web browsing to email transfer.',
        protocols: ['HTTP/HTTPS', 'DNS', 'FTP', 'SMTP', 'SSH', 'SNMP'],
        keyFacts: [
          'This layer does NOT refer to the application itself (e.g., Chrome), but to the protocols it uses.',
          'DNS operates here — every domain name lookup traverses this layer before any connection starts.',
          'HTTP is stateless by design; cookies and sessions at higher layers simulate stateful behavior.'
        ],
        attacks: [
          {
            name: 'SQL Injection',
            description: 'Attacker inserts malicious SQL code into input fields that are concatenated into database queries.',
            howItWorks: '1. Attacker finds an input field that talks to a DB.\n2. Enters payload like \' OR 1=1 --\n3. Backend naively concatenates it into a query.\n4. Database executes the injected logic, leaking or corrupting data.',
            impact: 'Full database compromise, data theft, authentication bypass, data deletion.',
            mitigation_strategy: 'Use parameterized queries (prepared statements) and ORM frameworks. Never concatenate user input into SQL strings.',
            severity: 'critical'
          },
          {
            name: 'Cross-Site Scripting (XSS)',
            description: 'Attacker injects malicious JavaScript into web pages viewed by other users.',
            howItWorks: '1. Attacker submits <script>alert(document.cookie)</script> into a comment field.\n2. Server stores it without sanitization.\n3. Victim loads the page — their browser executes the script.\n4. Attacker receives cookies / session tokens.',
            impact: 'Session hijacking, credential theft, defacement, malware delivery.',
            mitigation_strategy: 'Sanitize all user-generated output. Use Content Security Policy (CSP) headers. Encode HTML entities.',
            severity: 'high'
          },
          {
            name: 'HTTP DDoS (Layer 7)',
            description: 'Attacker floods the server with seemingly legitimate HTTP requests, exhausting server resources.',
            howItWorks: '1. Attacker controls a botnet of thousands of machines.\n2. Each machine sends rapid GET/POST requests to the target.\n3. Server spends CPU/RAM handling each request.\n4. Legitimate users cannot get a response.',
            impact: 'Complete service unavailability, revenue loss, reputational damage.',
            mitigation_strategy: 'Deploy a WAF with rate limiting, CAPTCHA challenges, and behavior-based bot detection.',
            severity: 'high'
          },
          {
            name: 'DNS Spoofing / Cache Poisoning',
            description: 'Attacker corrupts a DNS resolver\'s cache to redirect users to malicious IP addresses.',
            howItWorks: '1. Attacker sends forged DNS responses to a resolver before the legitimate one arrives.\n2. Resolver caches the fake IP.\n3. Users querying that resolver get redirected to attacker\'s server.\n4. Attacker can intercept credentials or serve malware.',
            impact: 'Phishing, credential theft, malware distribution at scale.',
            mitigation_strategy: 'Deploy DNSSEC (DNS Security Extensions) to cryptographically sign DNS records.',
            severity: 'critical'
          }
        ],
        defenses: [
          {
            name: 'Web Application Firewall (WAF)',
            description: 'Filters, monitors, and blocks HTTP traffic based on a set of rules to protect web applications.',
            method: 'Inspects request payload, headers, and patterns against signature databases and behavioral rules.',
            counters: ['HTTP DDoS (Layer 7)', 'SQL Injection', 'Cross-Site Scripting (XSS)']
          },
          {
            name: 'Input Validation & Sanitization',
            description: 'Ensuring all user-supplied data is checked for type, length, format, and range before processing.',
            method: 'Allowlist validation on server side; HTML entity encoding for output; reject malformed input.',
            counters: ['SQL Injection', 'Cross-Site Scripting (XSS)']
          },
          {
            name: 'Content Security Policy (CSP)',
            description: 'HTTP response header that tells the browser which sources of content are trusted.',
            method: 'Restricts inline scripts and unauthorized third-party resource loading via strict directives.',
            counters: ['Cross-Site Scripting (XSS)']
          },
          {
            name: 'DNSSEC',
            description: 'Adds cryptographic signatures to DNS records, allowing resolvers to verify authenticity.',
            method: 'DNS responses are signed; resolvers validate the chain of trust from root to TLD to domain.',
            counters: ['DNS Spoofing / Cache Poisoning']
          }
        ]
      },
      it: {
        name: 'Livello Applicazione',
        description: 'Il livello più vicino all\'utente — l\'interfaccia tra i servizi di rete e le applicazioni. Definisce i protocolli usati dalle applicazioni per comunicare in rete, dalla navigazione web al trasferimento email.',
        protocols: ['HTTP/HTTPS', 'DNS', 'FTP', 'SMTP', 'SSH', 'SNMP'],
        keyFacts: [
          'Questo livello NON si riferisce all\'applicazione stessa (es. Chrome), ma ai protocolli che essa usa.',
          'Il DNS opera qui — ogni risoluzione di nome dominio attraversa questo livello prima di qualsiasi connessione.',
          'HTTP è senza stato per design; cookie e sessioni simulano comportamenti stateful.'
        ],
        attacks: [
          {
            name: 'SQL Injection',
            description: 'L\'attaccante inserisce codice SQL malevolo nei campi di input che vengono concatenati nelle query del database.',
            howItWorks: '1. L\'attaccante trova un campo di input collegato a un DB.\n2. Inserisce payload come \' OR 1=1 --\n3. Il backend lo concatena ingenuamente nella query.\n4. Il database esegue la logica iniettata, rivelando o corrompendo i dati.',
            impact: 'Compromissione completa del database, furto di dati, bypass dell\'autenticazione.',
            mitigation_strategy: 'Usa query parametrizzate (prepared statements) e ORM. Non concatenare mai input utente in stringhe SQL.',
            severity: 'critical'
          },
          {
            name: 'Cross-Site Scripting (XSS)',
            description: 'L\'attaccante inietta JavaScript malevolo in pagine web visualizzate da altri utenti.',
            howItWorks: '1. L\'attaccante invia <script>alert(document.cookie)</script> in un campo commento.\n2. Il server lo salva senza sanificazione.\n3. La vittima carica la pagina — il browser esegue lo script.\n4. L\'attaccante riceve cookie/token di sessione.',
            impact: 'Furto di sessione, furto di credenziali, defacement, distribuzione di malware.',
            mitigation_strategy: 'Sanifica tutto l\'output generato dagli utenti. Usa header CSP. Codifica le entità HTML.',
            severity: 'high'
          },
          {
            name: 'HTTP DDoS (Livello 7)',
            description: 'L\'attaccante inonda il server con richieste HTTP apparentemente legittime, esaurendo le risorse.',
            howItWorks: '1. L\'attaccante controlla una botnet di migliaia di macchine.\n2. Ogni macchina invia richieste GET/POST rapide al target.\n3. Il server consuma CPU/RAM per ogni richiesta.\n4. Gli utenti legittimi non ricevono risposta.',
            impact: 'Indisponibilità completa del servizio, perdita di fatturato, danni reputazionali.',
            mitigation_strategy: 'Distribuisci un WAF con rate limiting, CAPTCHA e rilevamento bot comportamentale.',
            severity: 'high'
          },
          {
            name: 'DNS Spoofing / Cache Poisoning',
            description: 'L\'attaccante corrompe la cache di un resolver DNS per reindirizzare gli utenti verso IP malevoli.',
            howItWorks: '1. L\'attaccante invia risposte DNS false al resolver prima di quelle legittime.\n2. Il resolver memorizza l\'IP falso.\n3. Gli utenti vengono reindirizzati al server dell\'attaccante.\n4. L\'attaccante intercetta credenziali o serve malware.',
            impact: 'Phishing, furto di credenziali, distribuzione di malware su larga scala.',
            mitigation_strategy: 'Distribuisci DNSSEC per firmare crittograficamente i record DNS.',
            severity: 'critical'
          }
        ],
        defenses: [
          {
            name: 'Web Application Firewall (WAF)',
            description: 'Filtra, monitora e blocca il traffico HTTP per proteggere le applicazioni web.',
            method: 'Ispeziona payload, header e pattern rispetto a database di firme e regole comportamentali.',
            counters: ['HTTP DDoS (Livello 7)', 'SQL Injection', 'Cross-Site Scripting (XSS)']
          },
          {
            name: 'Validazione & Sanificazione Input',
            description: 'Verifica che tutti i dati forniti dagli utenti rispettino tipo, lunghezza, formato e range.',
            method: 'Validazione allowlist lato server; codifica HTML per l\'output; rifiuta input malformati.',
            counters: ['SQL Injection', 'Cross-Site Scripting (XSS)']
          },
          {
            name: 'Content Security Policy (CSP)',
            description: 'Header HTTP che indica al browser quali sorgenti di contenuto sono attendibili.',
            method: 'Limita script inline e caricamenti di risorse di terze parti non autorizzate.',
            counters: ['Cross-Site Scripting (XSS)']
          },
          {
            name: 'DNSSEC',
            description: 'Aggiunge firme crittografiche ai record DNS, permettendo ai resolver di verificarne l\'autenticità.',
            method: 'Le risposte DNS sono firmate; i resolver validano la catena di fiducia dalla root al dominio.',
            counters: ['DNS Spoofing / Cache Poisoning']
          }
        ]
      }
    }
  },
  {
    id: 6,
    name: 'Presentation',
    color: '#f97316',
    pdu: 'Data',
    translations: {
      en: {
        name: 'Presentation Layer',
        description: 'Acts as the "translator" for the network — responsible for data formatting, encryption/decryption, and compression. It ensures that data sent by one system can be understood by another, regardless of internal format differences.',
        protocols: ['SSL/TLS', 'JPEG', 'MPEG', 'ASCII', 'XDR'],
        keyFacts: [
          'TLS (Transport Layer Security) is often associated with L4, but encryption/decryption logically belongs here.',
          'Character encoding (UTF-8, ASCII) is a Presentation Layer concern — mismatches cause "mojibake" (garbled text).',
          'JPEG, MP3, and video codecs operate at this layer — they transform raw data into presentable formats.'
        ],
        attacks: [
          {
            name: 'SSL Stripping',
            description: 'Attacker downgrades an HTTPS connection to HTTP, making traffic readable in plaintext.',
            howItWorks: '1. Attacker performs a MITM between client and server.\n2. Intercepts initial HTTP request and establishes HTTPS with the server.\n3. Serves the client HTTP instead of HTTPS.\n4. Client believes they are on a secure site; attacker reads everything.',
            impact: 'Credential theft, session hijacking, full traffic interception.',
            mitigation_strategy: 'Enforce HTTP Strict Transport Security (HSTS) so browsers always use HTTPS, even on first request.',
            severity: 'critical'
          },
          {
            name: 'Format String Attack',
            description: 'Exploiting vulnerabilities in how applications handle format specifiers in strings.',
            howItWorks: '1. Application uses user input directly in a printf-style function.\n2. Attacker inputs %x%x%x%n as a string.\n3. Program reads memory addresses or writes to arbitrary locations.\n4. Results in information disclosure or code execution.',
            impact: 'Memory disclosure, remote code execution, application crash.',
            mitigation_strategy: 'Never pass user-controlled data as format string arguments. Use static format strings.',
            severity: 'high'
          },
          {
            name: 'Malformed Data / Heap Overflow',
            description: 'Sending specially crafted malformed data that triggers bugs in data parsing libraries.',
            howItWorks: '1. Attacker sends a malformed JPEG, ZIP, or XML file.\n2. Vulnerable parser tries to process it.\n3. Buffer or heap overflows occur during decompression.\n4. Attacker achieves code execution on the server.',
            impact: 'Remote code execution, denial of service, memory corruption.',
            mitigation_strategy: 'Keep parsing libraries updated. Use sandboxing and memory-safe languages for parsers.',
            severity: 'high'
          }
        ],
        defenses: [
          {
            name: 'HSTS (HTTP Strict Transport Security)',
            description: 'Forces browsers to only connect via HTTPS, preventing protocol downgrade attacks.',
            method: 'Server sends Strict-Transport-Security header; browser pins HTTPS for the domain duration.',
            counters: ['SSL Stripping']
          },
          {
            name: 'TLS Certificate Pinning',
            description: 'Application hardcodes expected server certificates, rejecting unexpected ones.',
            method: 'Client stores hash of server cert; rejects connections if cert doesn\'t match.',
            counters: ['SSL Stripping']
          },
          {
            name: 'Sandboxed Parsing',
            description: 'Parsing untrusted files in an isolated process or container with restricted privileges.',
            method: 'Use OS-level sandboxing (seccomp, containers) so parser exploits cannot affect the host.',
            counters: ['Malformed Data / Heap Overflow', 'Format String Attack']
          },
          {
            name: 'Input Schema Validation',
            description: 'Validating data structures (JSON Schema, XML Schema) before passing to parsers.',
            method: 'Reject data that does not conform to expected schema before any parsing occurs.',
            counters: ['Malformed Data / Heap Overflow']
          }
        ]
      },
      it: {
        name: 'Livello Presentazione',
        description: 'Agisce come "traduttore" per la rete — responsabile della formattazione dei dati, crittografia/decrittografia e compressione. Garantisce che i dati inviati da un sistema possano essere compresi da un altro, indipendentemente dalle differenze di formato interno.',
        protocols: ['SSL/TLS', 'JPEG', 'MPEG', 'ASCII', 'XDR'],
        keyFacts: [
          'TLS è spesso associato a L4, ma la crittografia/decrittografia logicamente appartiene a questo livello.',
          'La codifica dei caratteri (UTF-8, ASCII) è una responsabilità del Livello Presentazione.',
          'JPEG, MP3 e codec video operano a questo livello — trasformano i dati grezzi in formati presentabili.'
        ],
        attacks: [
          {
            name: 'SSL Stripping',
            description: 'L\'attaccante degrada una connessione HTTPS a HTTP, rendendo il traffico leggibile in chiaro.',
            howItWorks: '1. L\'attaccante esegue un MITM tra client e server.\n2. Intercetta la richiesta HTTP iniziale e stabilisce HTTPS con il server.\n3. Serve HTTP al client invece di HTTPS.\n4. Il client crede di essere su un sito sicuro; l\'attaccante legge tutto.',
            impact: 'Furto di credenziali, hijacking di sessione, intercettazione completa del traffico.',
            mitigation_strategy: 'Applica HTTP Strict Transport Security (HSTS) affinché i browser usino sempre HTTPS.',
            severity: 'critical'
          },
          {
            name: 'Format String Attack',
            description: 'Sfruttamento di vulnerabilità nel modo in cui le applicazioni gestiscono i format specifier nelle stringhe.',
            howItWorks: '1. L\'applicazione usa input utente direttamente in una funzione tipo printf.\n2. L\'attaccante inserisce %x%x%x%n come stringa.\n3. Il programma legge indirizzi di memoria o scrive in posizioni arbitrarie.\n4. Risulta in divulgazione di informazioni o esecuzione di codice.',
            impact: 'Divulgazione di memoria, esecuzione di codice remoto, crash dell\'applicazione.',
            mitigation_strategy: 'Non passare mai dati controllati dall\'utente come argomenti di format string. Usa format string statiche.',
            severity: 'high'
          },
          {
            name: 'Dati Malformati / Heap Overflow',
            description: 'Invio di dati malformati che scatenano bug nelle librerie di parsing.',
            howItWorks: '1. L\'attaccante invia un file JPEG, ZIP o XML malformato.\n2. Il parser vulnerabile tenta di elaborarlo.\n3. Si verificano buffer o heap overflow durante la decompressione.\n4. L\'attaccante ottiene esecuzione di codice sul server.',
            impact: 'Esecuzione di codice remoto, denial of service, corruzione della memoria.',
            mitigation_strategy: 'Aggiorna le librerie di parsing. Usa sandboxing e linguaggi memory-safe per i parser.',
            severity: 'high'
          }
        ],
        defenses: [
          {
            name: 'HSTS (HTTP Strict Transport Security)',
            description: 'Forza i browser a connettersi solo via HTTPS, prevenendo attacchi di downgrade del protocollo.',
            method: 'Il server invia l\'header Strict-Transport-Security; il browser fissa HTTPS per il dominio.',
            counters: ['SSL Stripping']
          },
          {
            name: 'Certificate Pinning TLS',
            description: 'L\'applicazione inserisce nel codice i certificati server attesi, rifiutando quelli inattesi.',
            method: 'Il client memorizza l\'hash del certificato del server; rifiuta connessioni se non corrisponde.',
            counters: ['SSL Stripping']
          },
          {
            name: 'Parsing in Sandbox',
            description: 'Parsing di file non attendibili in un processo o container isolato con privilegi limitati.',
            method: 'Usa sandboxing a livello OS (seccomp, container) per isolare eventuali exploit del parser.',
            counters: ['Dati Malformati / Heap Overflow', 'Format String Attack']
          },
          {
            name: 'Validazione Schema Input',
            description: 'Validazione delle strutture dati (JSON Schema, XML Schema) prima di passarle ai parser.',
            method: 'Rifiuta dati non conformi allo schema atteso prima di qualsiasi operazione di parsing.',
            counters: ['Dati Malformati / Heap Overflow']
          }
        ]
      }
    }
  },
  {
    id: 5,
    name: 'Session',
    color: '#eab308',
    pdu: 'Data',
    translations: {
      en: {
        name: 'Session Layer',
        description: 'Establishes, manages, and terminates communication sessions between applications. It handles authentication checkpointing, and dialog control — deciding who speaks when in a two-way communication.',
        protocols: ['NetBIOS', 'RPC', 'PPTP', 'L2TP', 'SIP'],
        keyFacts: [
          'A "session" is a logical connection above the TCP connection — it can persist across multiple TCP connections.',
          'Session tokens are random identifiers assigned after login; they are the key to your authenticated state.',
          'Session fixation is possible because many apps let users choose their own session ID before login.'
        ],
        attacks: [
          {
            name: 'Session Hijacking',
            description: 'Attacker steals a valid session token to impersonate a legitimate authenticated user.',
            howItWorks: '1. User logs in; server creates session token (e.g., cookie SESSID=abc123).\n2. Attacker intercepts the token via network sniffing, XSS, or MITM.\n3. Attacker sends requests with the stolen token.\n4. Server treats attacker as the authenticated user.',
            impact: 'Full account takeover without knowing the password.',
            mitigation_strategy: 'Use HTTPS everywhere. Set HttpOnly and Secure flags on cookies. Rotate session tokens after login.',
            severity: 'critical'
          },
          {
            name: 'Cross-Site Request Forgery (CSRF)',
            description: 'Attacker tricks a logged-in user\'s browser into making unauthorized requests to a trusted site.',
            howItWorks: '1. Victim is logged into bank.com.\n2. Attacker sends a link: evil.com/transfer?to=attacker&amount=1000.\n3. Victim\'s browser automatically includes bank.com cookies.\n4. Bank processes the transfer as if initiated by the victim.',
            impact: 'Unauthorized actions (transfers, password changes) performed on behalf of the victim.',
            mitigation_strategy: 'Use CSRF tokens (unpredictable values in forms). Check Origin/Referer headers. Use SameSite cookies.',
            severity: 'high'
          },
          {
            name: 'Session Fixation',
            description: 'Attacker forces a user to use a known session ID, then hijacks it after the user authenticates.',
            howItWorks: '1. Attacker obtains a valid but unauthenticated session ID.\n2. Tricks victim into using that ID (e.g., via URL parameter).\n3. Victim logs in — server authenticates that session.\n4. Attacker uses the now-authenticated session ID.',
            impact: 'Account takeover without intercepting credentials.',
            mitigation_strategy: 'Always generate a new session ID upon successful login. Never accept session IDs from URL parameters.',
            severity: 'high'
          }
        ],
        defenses: [
          {
            name: 'Secure Session Tokens',
            description: 'Generating cryptographically random, high-entropy session identifiers.',
            method: 'Use CSPRNG to generate 128+ bit tokens. Store server-side. Expire after inactivity.',
            counters: ['Session Hijacking', 'Session Fixation']
          },
          {
            name: 'CSRF Token Protection',
            description: 'Including unique, secret, per-session tokens in all state-changing forms.',
            method: 'Server generates random token tied to session. Form submits it. Server validates before processing.',
            counters: ['Cross-Site Request Forgery (CSRF)']
          },
          {
            name: 'SameSite Cookies',
            description: 'Cookie attribute that prevents the browser from sending cookies with cross-site requests.',
            method: 'Set SameSite=Strict or SameSite=Lax on session cookies to block CSRF vectors.',
            counters: ['Cross-Site Request Forgery (CSRF)', 'Session Hijacking']
          },
          {
            name: 'Session Timeout & Invalidation',
            description: 'Automatically expiring sessions after a period of inactivity or on logout.',
            method: 'Server-side session expiry. Invalidate session ID on logout. Re-authenticate for sensitive actions.',
            counters: ['Session Hijacking']
          }
        ]
      },
      it: {
        name: 'Livello Sessione',
        description: 'Stabilisce, gestisce e termina le sessioni di comunicazione tra applicazioni. Gestisce autenticazione, checkpoint e controllo del dialogo — decidendo chi parla quando in una comunicazione bidirezionale.',
        protocols: ['NetBIOS', 'RPC', 'PPTP', 'L2TP', 'SIP'],
        keyFacts: [
          'Una "sessione" è una connessione logica sopra la connessione TCP — può persistere su più connessioni TCP.',
          'I token di sessione sono identificatori casuali assegnati dopo il login; sono la chiave del tuo stato autenticato.',
          'La session fixation è possibile perché molte app permettono agli utenti di scegliere il proprio session ID prima del login.'
        ],
        attacks: [
          {
            name: 'Session Hijacking',
            description: 'L\'attaccante ruba un token di sessione valido per impersonare un utente autenticato.',
            howItWorks: '1. L\'utente si autentica; il server crea un token (es. cookie SESSID=abc123).\n2. L\'attaccante intercetta il token via sniffing, XSS o MITM.\n3. L\'attaccante invia richieste con il token rubato.\n4. Il server tratta l\'attaccante come l\'utente autenticato.',
            impact: 'Compromissione completa dell\'account senza conoscere la password.',
            mitigation_strategy: 'Usa HTTPS ovunque. Imposta flag HttpOnly e Secure sui cookie. Rigenera i token dopo il login.',
            severity: 'critical'
          },
          {
            name: 'Cross-Site Request Forgery (CSRF)',
            description: 'L\'attaccante inganna il browser di un utente loggato per fare richieste non autorizzate a un sito fidato.',
            howItWorks: '1. La vittima è loggata su banca.com.\n2. L\'attaccante invia un link: evil.com/trasferisci?a=attaccante&importo=1000.\n3. Il browser della vittima include automaticamente i cookie di banca.com.\n4. La banca processa il trasferimento come se fosse della vittima.',
            impact: 'Azioni non autorizzate (trasferimenti, cambio password) eseguite per conto della vittima.',
            mitigation_strategy: 'Usa token CSRF. Controlla gli header Origin/Referer. Usa cookie SameSite.',
            severity: 'high'
          },
          {
            name: 'Session Fixation',
            description: 'L\'attaccante forza un utente a usare un session ID noto, poi lo hijacka dopo l\'autenticazione.',
            howItWorks: '1. L\'attaccante ottiene un session ID valido ma non autenticato.\n2. Inganna la vittima a usare quel ID (es. tramite parametro URL).\n3. La vittima si autentica — il server autentica quella sessione.\n4. L\'attaccante usa il session ID ora autenticato.',
            impact: 'Compromissione dell\'account senza intercettare le credenziali.',
            mitigation_strategy: 'Genera sempre un nuovo session ID dopo il login riuscito. Non accettare mai session ID dai parametri URL.',
            severity: 'high'
          }
        ],
        defenses: [
          {
            name: 'Token di Sessione Sicuri',
            description: 'Generazione di identificatori di sessione casuali crittograficamente, ad alta entropia.',
            method: 'Usa CSPRNG per generare token da 128+ bit. Archivia lato server. Scadono dopo inattività.',
            counters: ['Session Hijacking', 'Session Fixation']
          },
          {
            name: 'Protezione Token CSRF',
            description: 'Includere token unici e segreti per sessione in tutti i form che modificano lo stato.',
            method: 'Il server genera token casuale legato alla sessione. Il form lo invia. Il server lo valida.',
            counters: ['Cross-Site Request Forgery (CSRF)']
          },
          {
            name: 'Cookie SameSite',
            description: 'Attributo dei cookie che impedisce al browser di inviarli con richieste cross-site.',
            method: 'Imposta SameSite=Strict o SameSite=Lax sui cookie di sessione per bloccare i vettori CSRF.',
            counters: ['Cross-Site Request Forgery (CSRF)', 'Session Hijacking']
          },
          {
            name: 'Timeout & Invalidazione Sessione',
            description: 'Scadenza automatica delle sessioni dopo inattività o al logout.',
            method: 'Scadenza sessione lato server. Invalida session ID al logout. Ri-autentica per azioni sensibili.',
            counters: ['Session Hijacking']
          }
        ]
      }
    }
  },
  {
    id: 4,
    name: 'Transport',
    color: '#22c55e',
    pdu: 'Segment',
    translations: {
      en: {
        name: 'Transport Layer',
        description: 'Provides end-to-end communication between applications on different hosts. It manages segmentation, flow control, error correction, and multiplexing — ensuring complete data delivery (TCP) or prioritizing speed (UDP).',
        protocols: ['TCP', 'UDP', 'SCTP', 'DCCP'],
        keyFacts: [
          'The TCP 3-way handshake (SYN → SYN-ACK → ACK) is the basis of all reliable TCP connections.',
          'Port numbers (0–65535) allow a single IP to host thousands of simultaneous services.',
          'UDP has no handshake — a packet is fired and forgotten. This makes it ideal for DNS, video streaming, and gaming.'
        ],
        attacks: [
          {
            name: 'SYN Flood',
            description: 'Attacker sends thousands of TCP SYN packets but never completes the handshake, exhausting the server\'s connection table.',
            howItWorks: '1. Attacker sends rapid SYN packets from spoofed IPs.\n2. Server responds with SYN-ACK and waits for ACK.\n3. ACK never arrives (IP is fake).\n4. Server\'s half-open connection table fills up — legitimate connections are refused.',
            impact: 'Denial of Service — legitimate clients cannot connect.',
            mitigation_strategy: 'Enable SYN cookies on the server (Linux: net.ipv4.tcp_syncookies=1). SYN cookies avoid storing half-open connections.',
            severity: 'high'
          },
          {
            name: 'UDP Amplification DDoS',
            description: 'Attacker abuses UDP services that return large responses to small queries, amplifying attack traffic.',
            howItWorks: '1. Attacker sends small UDP requests (e.g., DNS, NTP) with victim\'s spoofed source IP.\n2. Servers send large responses to the victim.\n3. Amplification factor can be 10x–100x (NTP monlist up to 556x).\n4. Victim is flooded with traffic it never requested.',
            impact: 'Network saturation, service outage with minimal attacker bandwidth.',
            mitigation_strategy: 'Disable amplifying services (monlist). Configure BCP38 egress filtering to prevent spoofed source IPs.',
            severity: 'critical'
          },
          {
            name: 'Port Scanning',
            description: 'Systematic probing of ports on a target to discover open services and their versions.',
            howItWorks: '1. Scanner sends SYN to each port in range.\n2. Open port replies SYN-ACK; closed port replies RST.\n3. Attacker maps the attack surface.\n4. Service version fingerprinting reveals known vulnerabilities.',
            impact: 'Intelligence gathering — foundation for targeted exploits.',
            mitigation_strategy: 'Use stateful firewalls and port knocking. Disable or hide service version banners.',
            severity: 'medium'
          },
          {
            name: 'TCP Session Hijacking',
            description: 'Attacker inserts themselves into an established TCP session by predicting sequence numbers.',
            howItWorks: '1. Attacker sniffs a TCP conversation to learn SEQ/ACK numbers.\n2. Injects a packet with correct sequence number and victim\'s source IP.\n3. Server accepts it as part of the legitimate session.\n4. Attacker can inject commands or data.',
            impact: 'Unauthorized command injection into active sessions.',
            mitigation_strategy: 'Use TLS/HTTPS to encrypt and authenticate all traffic. Use modern TCP with random ISN (Initial Sequence Numbers).',
            severity: 'high'
          }
        ],
        defenses: [
          {
            name: 'SYN Cookies',
            description: 'Technique allowing the server to handle SYN floods without storing half-open connections.',
            method: 'Server encodes connection state in the sequence number cryptographically. Only restores state on valid ACK.',
            counters: ['SYN Flood']
          },
          {
            name: 'Stateful Firewall / ACLs',
            description: 'Firewall that tracks connection state and blocks packets that don\'t belong to known sessions.',
            method: 'Maintain state table. Drop packets with invalid flags. Block unauthorized port ranges.',
            counters: ['Port Scanning', 'TCP Session Hijacking']
          },
          {
            name: 'Rate Limiting',
            description: 'Limiting the number of connections or packets from a single source within a time window.',
            method: 'Drop or throttle connections exceeding threshold (e.g., iptables -m limit, fail2ban).',
            counters: ['SYN Flood', 'UDP Amplification DDoS']
          },
          {
            name: 'BCP38 Egress Filtering',
            description: 'ISP-level filtering that blocks packets with spoofed source IP addresses from leaving a network.',
            method: 'Routers verify source IP is within their assigned prefix; drop packets claiming to be from other networks.',
            counters: ['UDP Amplification DDoS', 'SYN Flood']
          }
        ]
      },
      it: {
        name: 'Livello Trasporto',
        description: 'Fornisce comunicazione end-to-end tra applicazioni su host diversi. Gestisce segmentazione, controllo del flusso, correzione degli errori e multiplexing — garantendo la consegna completa dei dati (TCP) o privilegiando la velocità (UDP).',
        protocols: ['TCP', 'UDP', 'SCTP', 'DCCP'],
        keyFacts: [
          'Il 3-way handshake TCP (SYN → SYN-ACK → ACK) è la base di tutte le connessioni TCP affidabili.',
          'I numeri di porta (0–65535) permettono a un singolo IP di ospitare migliaia di servizi simultanei.',
          'UDP non ha handshake — un pacchetto viene inviato e dimenticato. Ideale per DNS, streaming video e gaming.'
        ],
        attacks: [
          {
            name: 'SYN Flood',
            description: 'L\'attaccante invia migliaia di pacchetti TCP SYN senza mai completare l\'handshake, esaurendo la tabella delle connessioni del server.',
            howItWorks: '1. L\'attaccante invia pacchetti SYN rapidi da IP falsificati.\n2. Il server risponde con SYN-ACK e aspetta l\'ACK.\n3. L\'ACK non arriva mai (l\'IP è falso).\n4. La tabella half-open si riempie — le connessioni legittime vengono rifiutate.',
            impact: 'Denial of Service — i client legittimi non possono connettersi.',
            mitigation_strategy: 'Abilita i SYN cookie sul server (Linux: net.ipv4.tcp_syncookies=1). I SYN cookie evitano di memorizzare connessioni half-open.',
            severity: 'high'
          },
          {
            name: 'UDP Amplification DDoS',
            description: 'L\'attaccante abusa di servizi UDP che restituiscono risposte grandi a query piccole, amplificando il traffico d\'attacco.',
            howItWorks: '1. L\'attaccante invia piccole richieste UDP (DNS, NTP) con l\'IP sorgente della vittima falsificato.\n2. I server inviano risposte grandi alla vittima.\n3. Il fattore di amplificazione può essere 10x–100x.\n4. La vittima viene inondata da traffico che non ha richiesto.',
            impact: 'Saturazione della rete, interruzione del servizio con minima banda dell\'attaccante.',
            mitigation_strategy: 'Disabilita i servizi amplificatori (monlist). Configura il filtraggio BCP38 per prevenire IP sorgente falsificati.',
            severity: 'critical'
          },
          {
            name: 'Port Scanning',
            description: 'Sondaggio sistematico delle porte di un target per scoprire servizi aperti e le loro versioni.',
            howItWorks: '1. Lo scanner invia SYN a ogni porta nel range.\n2. La porta aperta risponde SYN-ACK; quella chiusa risponde RST.\n3. L\'attaccante mappa la superficie d\'attacco.\n4. Il fingerprinting della versione rivela vulnerabilità note.',
            impact: 'Raccolta di intelligence — fondamento per exploit mirati.',
            mitigation_strategy: 'Usa firewall stateful e port knocking. Disabilita o nascondi i banner di versione dei servizi.',
            severity: 'medium'
          },
          {
            name: 'TCP Session Hijacking',
            description: 'L\'attaccante si inserisce in una sessione TCP stabilita indovinando i numeri di sequenza.',
            howItWorks: '1. L\'attaccante sniffa una conversazione TCP per conoscere i numeri SEQ/ACK.\n2. Inietta un pacchetto con il numero di sequenza corretto e l\'IP sorgente della vittima.\n3. Il server lo accetta come parte della sessione legittima.\n4. L\'attaccante può iniettare comandi o dati.',
            impact: 'Iniezione di comandi non autorizzati nelle sessioni attive.',
            mitigation_strategy: 'Usa TLS/HTTPS per cifrare e autenticare tutto il traffico. Usa TCP moderno con ISN (Initial Sequence Numbers) casuali.',
            severity: 'high'
          }
        ],
        defenses: [
          {
            name: 'SYN Cookies',
            description: 'Tecnica che permette al server di gestire i SYN flood senza memorizzare connessioni half-open.',
            method: 'Il server codifica lo stato della connessione nel numero di sequenza crittograficamente. Ripristina lo stato solo su ACK valido.',
            counters: ['SYN Flood']
          },
          {
            name: 'Firewall Stateful / ACL',
            description: 'Firewall che traccia lo stato delle connessioni e blocca i pacchetti che non appartengono a sessioni note.',
            method: 'Mantieni una tabella di stato. Scarta pacchetti con flag non validi. Blocca range di porte non autorizzate.',
            counters: ['Port Scanning', 'TCP Session Hijacking']
          },
          {
            name: 'Rate Limiting',
            description: 'Limitazione del numero di connessioni o pacchetti da una singola sorgente in una finestra temporale.',
            method: 'Scarta o limita connessioni che superano la soglia (es. iptables -m limit, fail2ban).',
            counters: ['SYN Flood', 'UDP Amplification DDoS']
          },
          {
            name: 'Filtraggio Egress BCP38',
            description: 'Filtraggio a livello ISP che blocca pacchetti con IP sorgente falsificati in uscita da una rete.',
            method: 'I router verificano che l\'IP sorgente sia nel loro prefisso assegnato; scartano pacchetti con IP di altre reti.',
            counters: ['UDP Amplification DDoS', 'SYN Flood']
          }
        ]
      }
    }
  },
  {
    id: 3,
    name: 'Network',
    color: '#3b82f6',
    pdu: 'Packet',
    translations: {
      en: {
        name: 'Network Layer',
        description: 'Handles logical addressing and routing — determining the best path for data to travel across multiple networks. It operates on packets, using IP addresses to identify sources and destinations across the internet.',
        protocols: ['IPv4', 'IPv6', 'ICMP', 'IPsec', 'OSPF', 'BGP'],
        keyFacts: [
          'IP addresses are logical (software-assigned) unlike MAC addresses which are hardware-burned.',
          'TTL (Time to Live) field in IP headers prevents packets from looping forever — it decrements at each hop.',
          'BGP (Border Gateway Protocol) is the "routing protocol of the internet" — routing table poisoning can redirect global traffic.'
        ],
        attacks: [
          {
            name: 'IP Spoofing',
            description: 'Creating IP packets with a forged source IP address to impersonate another host or bypass filters.',
            howItWorks: '1. Attacker crafts raw IP packets with victim\'s IP as source.\n2. Sends to a target server or network.\n3. Server responds to the spoofed IP (victim).\n4. Used to bypass IP-based access controls or amplify DDoS attacks.',
            impact: 'Bypassing firewalls, amplifying DDoS attacks, MITM facilitation.',
            mitigation_strategy: 'Implement ingress and egress filtering (BCP38). Verify source IPs at network borders.',
            severity: 'high'
          },
          {
            name: 'ICMP Smurf Attack',
            description: 'DDoS attack that uses broadcast ICMP echo requests with the victim\'s spoofed source IP.',
            howItWorks: '1. Attacker sends ICMP echo request to a broadcast address (e.g., 192.168.1.255).\n2. Uses victim\'s IP as the source.\n3. All hosts on the network reply to the victim.\n4. A single request generates thousands of responses flooding the victim.',
            impact: 'Network saturation at victim, potential collateral impact on amplifier network.',
            mitigation_strategy: 'Configure routers to block directed broadcast packets. Disable ICMP broadcast responses.',
            severity: 'high'
          },
          {
            name: 'BGP Hijacking',
            description: 'Malicious ASes announce more specific IP prefix routes, capturing internet traffic meant for others.',
            howItWorks: '1. Attacker controls an Autonomous System (AS) connected to BGP.\n2. Announces ownership of IP blocks actually owned by others.\n3. Routers prefer more specific routes, redirecting traffic.\n4. Attacker can intercept, drop, or inspect traffic at internet scale.',
            impact: 'Global traffic interception, internet routing disruption, massive-scale MITM.',
            mitigation_strategy: 'Deploy BGPsec and RPKI (Resource Public Key Infrastructure) to cryptographically validate route origins.',
            severity: 'critical'
          },
          {
            name: 'IP Fragmentation Attack',
            description: 'Sending malformed or overlapping IP fragments to bypass security devices or crash target systems.',
            howItWorks: '1. IP allows splitting large packets into fragments.\n2. Attacker sends overlapping fragment offsets.\n3. Reassembly at destination causes buffer overflows or incorrect data reconstruction.\n4. Firewalls that don\'t reassemble fragments may pass malicious payloads.',
            impact: 'Firewall bypass, system crashes, malicious payload delivery.',
            mitigation_strategy: 'Enable stateful packet inspection that reassembles fragments before inspection. Drop malformed fragments.',
            severity: 'medium'
          }
        ],
        defenses: [
          {
            name: 'Ingress & Egress Filtering',
            description: 'Filtering packets at network borders to reject those with impossible or unauthorized source IPs.',
            method: 'Drop incoming packets claiming to be from internal IPs; drop outgoing packets from unassigned IPs.',
            counters: ['IP Spoofing', 'ICMP Smurf Attack']
          },
          {
            name: 'RPKI (Route Origin Validation)',
            description: 'Cryptographic framework to validate that BGP route announcements are authorized by IP block owners.',
            method: 'ISPs create Route Origin Authorizations (ROAs); routers validate announcements against signed ROAs.',
            counters: ['BGP Hijacking']
          },
          {
            name: 'IPsec',
            description: 'Protocol suite for authenticating and encrypting IP packets at the network layer.',
            method: 'ESP (Encapsulating Security Payload) encrypts packet contents; AH (Authentication Header) verifies integrity.',
            counters: ['IP Spoofing', 'IP Fragmentation Attack']
          },
          {
            name: 'Stateful Packet Inspection',
            description: 'Firewalls that track packet context and reassemble fragments before inspection.',
            method: 'Maintain connection state table. Reassemble IP fragments. Drop packets violating expected state.',
            counters: ['IP Fragmentation Attack', 'IP Spoofing']
          }
        ]
      },
      it: {
        name: 'Livello Rete',
        description: 'Gestisce l\'indirizzamento logico e il routing — determinando il percorso migliore per i dati attraverso reti multiple. Opera sui pacchetti, usando indirizzi IP per identificare sorgenti e destinazioni su internet.',
        protocols: ['IPv4', 'IPv6', 'ICMP', 'IPsec', 'OSPF', 'BGP'],
        keyFacts: [
          'Gli indirizzi IP sono logici (assegnati via software) a differenza degli indirizzi MAC che sono fissi nell\'hardware.',
          'Il campo TTL (Time to Live) negli header IP previene che i pacchetti girino all\'infinito — si decrementa ad ogni hop.',
          'BGP è il "protocollo di routing di internet" — un avvelenamento della tabella di routing può reindirizzare il traffico globale.'
        ],
        attacks: [
          {
            name: 'IP Spoofing',
            description: 'Creazione di pacchetti IP con indirizzo sorgente falsificato per impersonare un altro host o bypassare filtri.',
            howItWorks: '1. L\'attaccante crea pacchetti IP grezzi con l\'IP della vittima come sorgente.\n2. Li invia a un server o rete target.\n3. Il server risponde all\'IP falsificato (la vittima).\n4. Usato per bypassare controlli basati su IP o amplificare attacchi DDoS.',
            impact: 'Bypass dei firewall, amplificazione di attacchi DDoS, facilitazione MITM.',
            mitigation_strategy: 'Implementa filtraggio in entrata e uscita (BCP38). Verifica gli IP sorgente ai confini di rete.',
            severity: 'high'
          },
          {
            name: 'Attacco Smurf ICMP',
            description: 'Attacco DDoS che usa richieste echo ICMP broadcast con l\'IP sorgente della vittima falsificato.',
            howItWorks: '1. L\'attaccante invia richiesta echo ICMP all\'indirizzo broadcast (es. 192.168.1.255).\n2. Usa l\'IP della vittima come sorgente.\n3. Tutti gli host della rete rispondono alla vittima.\n4. Una singola richiesta genera migliaia di risposte che inondano la vittima.',
            impact: 'Saturazione della rete della vittima, potenziale impatto collaterale sulla rete amplificatrice.',
            mitigation_strategy: 'Configura i router per bloccare i pacchetti directed broadcast. Disabilita le risposte ICMP broadcast.',
            severity: 'high'
          },
          {
            name: 'BGP Hijacking',
            description: 'AS malevoli annunciano route con prefissi IP più specifici, catturando traffico internet destinato ad altri.',
            howItWorks: '1. L\'attaccante controlla un Autonomous System (AS) connesso a BGP.\n2. Annuncia la proprietà di blocchi IP effettivamente di altri.\n3. I router preferiscono route più specifiche, reindirizzando il traffico.\n4. L\'attaccante può intercettare, scartare o ispezionare il traffico su scala internet.',
            impact: 'Intercettazione globale del traffico, disruption del routing internet, MITM su scala massiva.',
            mitigation_strategy: 'Distribuisci BGPsec e RPKI per validare crittograficamente le origini delle route.',
            severity: 'critical'
          },
          {
            name: 'Attacco per Frammentazione IP',
            description: 'Invio di frammenti IP malformati o sovrapposti per bypassare dispositivi di sicurezza o crashare sistemi.',
            howItWorks: '1. L\'IP permette di dividere pacchetti grandi in frammenti.\n2. L\'attaccante invia offset di frammenti sovrapposti.\n3. Il riassemblaggio alla destinazione causa buffer overflow o ricostruzione dati errata.\n4. I firewall che non riassemblano i frammenti possono far passare payload malevoli.',
            impact: 'Bypass del firewall, crash di sistema, consegna di payload malevoli.',
            mitigation_strategy: 'Abilita l\'ispezione stateful che riassembla i frammenti prima dell\'ispezione. Scarta i frammenti malformati.',
            severity: 'medium'
          }
        ],
        defenses: [
          {
            name: 'Filtraggio Ingress & Egress',
            description: 'Filtraggio dei pacchetti ai confini di rete per rifiutare quelli con IP sorgente impossibili o non autorizzati.',
            method: 'Scarta i pacchetti in entrata che dichiarano di essere IP interni; scarta i pacchetti in uscita da IP non assegnati.',
            counters: ['IP Spoofing', 'Attacco Smurf ICMP']
          },
          {
            name: 'RPKI (Validazione Origine Route)',
            description: 'Framework crittografico per validare che gli annunci BGP siano autorizzati dai proprietari dei blocchi IP.',
            method: 'Gli ISP creano Route Origin Authorizations (ROA); i router validano gli annunci rispetto alle ROA firmate.',
            counters: ['BGP Hijacking']
          },
          {
            name: 'IPsec',
            description: 'Suite di protocolli per autenticare e cifrare i pacchetti IP a livello di rete.',
            method: 'ESP cifra il contenuto del pacchetto; AH (Authentication Header) verifica l\'integrità.',
            counters: ['IP Spoofing', 'Attacco per Frammentazione IP']
          },
          {
            name: 'Ispezione Stateful dei Pacchetti',
            description: 'Firewall che tracciano il contesto dei pacchetti e riassemblano i frammenti prima dell\'ispezione.',
            method: 'Mantieni una tabella di stato delle connessioni. Riassembla frammenti IP. Scarta pacchetti che violano lo stato atteso.',
            counters: ['Attacco per Frammentazione IP', 'IP Spoofing']
          }
        ]
      }
    }
  },
  {
    id: 2,
    name: 'Data Link',
    color: '#8b5cf6',
    pdu: 'Frame',
    translations: {
      en: {
        name: 'Data Link Layer',
        description: 'Provides node-to-node data transfer within the same network segment. It handles framing, physical addressing (MAC), error detection, and flow control between directly connected devices like switches and network interface cards.',
        protocols: ['Ethernet', '802.11 (Wi-Fi)', 'ARP', 'PPP', 'VLAN (802.1Q)'],
        keyFacts: [
          'MAC addresses are 48-bit hardware identifiers burned into NICs — but they can be spoofed via software.',
          'ARP has NO authentication — it trusts any reply, making it inherently vulnerable to poisoning attacks.',
          'Switches learn MAC addresses from traffic; a full table forces them to broadcast like a hub (fail-open).'
        ],
        attacks: [
          {
            name: 'ARP Poisoning / Spoofing',
            description: 'Attacker sends fake ARP replies to associate their MAC address with a legitimate IP, enabling MITM.',
            howItWorks: '1. Attacker broadcasts: "I am 192.168.1.1 and my MAC is AA:BB:CC..."\n2. Victims update their ARP cache.\n3. Traffic meant for the gateway now flows through the attacker.\n4. Attacker reads or modifies traffic, then forwards it (invisible MITM).',
            impact: 'Man-in-the-Middle, credential interception, traffic manipulation.',
            mitigation_strategy: 'Enable Dynamic ARP Inspection (DAI) on managed switches. Use static ARP entries for critical hosts.',
            severity: 'critical'
          },
          {
            name: 'MAC Flooding',
            description: 'Attacker floods a switch with frames using fake source MAC addresses, filling its CAM table.',
            howItWorks: '1. Attacker uses a tool (macof) to generate thousands of frames with random MAC addresses.\n2. Switch\'s CAM table fills to capacity.\n3. Switch fails open — starts broadcasting all frames to every port.\n4. Attacker on any port can sniff all network traffic.',
            impact: 'Full LAN traffic interception, equivalent to being a passive wiretap on the network.',
            mitigation_strategy: 'Configure port security on switches — limit the number of MAC addresses per port.',
            severity: 'high'
          },
          {
            name: 'VLAN Hopping',
            description: 'Attacker bypasses VLAN segmentation to send traffic to VLANs they shouldn\'t have access to.',
            howItWorks: '1. Switch trunk ports by default allow all VLANs.\n2. Attacker\'s port auto-negotiates trunking (DTP exploit).\n3. Attacker tags frames with target VLAN ID.\n4. Switch forwards frames into the target VLAN — segmentation bypassed.',
            impact: 'Access to network segments intended to be isolated (e.g., production, management VLANs).',
            mitigation_strategy: 'Disable DTP on access ports. Set native VLAN to an unused ID. Explicitly configure trunk ports.',
            severity: 'high'
          },
          {
            name: 'Rogue DHCP Server',
            description: 'Attacker runs an unauthorized DHCP server that provides fake network configuration to clients.',
            howItWorks: '1. Client broadcasts DHCP Discover.\n2. Attacker\'s rogue server responds first with a DHCP Offer.\n3. Attacker sets their own machine as the default gateway.\n4. All client traffic routes through attacker\'s machine.',
            impact: 'Man-in-the-Middle attack on all newly connected clients, traffic interception.',
            mitigation_strategy: 'Enable DHCP Snooping on managed switches — only allow DHCP responses from trusted uplink ports.',
            severity: 'high'
          }
        ],
        defenses: [
          {
            name: 'Dynamic ARP Inspection (DAI)',
            description: 'Switch feature that validates ARP packets against a trusted DHCP snooping binding table.',
            method: 'Intercept all ARP packets on untrusted ports. Validate IP-to-MAC mapping against DHCP bindings. Drop invalid ones.',
            counters: ['ARP Poisoning / Spoofing']
          },
          {
            name: 'Port Security',
            description: 'Switch feature that limits and locks the number of MAC addresses learned on each port.',
            method: 'Define max MACs per port. Shut down port or drop frames if limit exceeded or unknown MAC appears.',
            counters: ['MAC Flooding']
          },
          {
            name: 'DHCP Snooping',
            description: 'Switch feature that filters DHCP messages and builds a trusted binding table of IP-MAC-port mappings.',
            method: 'Mark client-facing ports as untrusted; only uplink/server ports are trusted for DHCP offers.',
            counters: ['Rogue DHCP Server', 'ARP Poisoning / Spoofing']
          },
          {
            name: 'Private VLANs & DTP Disable',
            description: 'Disabling trunk auto-negotiation and using Private VLANs to isolate hosts within the same VLAN.',
            method: 'switchport nonegotiate on all access ports. Configure PVLANs to restrict intra-VLAN communication.',
            counters: ['VLAN Hopping']
          }
        ]
      },
      it: {
        name: 'Livello Collegamento Dati',
        description: 'Fornisce il trasferimento dati nodo-a-nodo all\'interno dello stesso segmento di rete. Gestisce il framing, l\'indirizzamento fisico (MAC), il rilevamento errori e il controllo del flusso tra dispositivi direttamente connessi come switch e schede di rete.',
        protocols: ['Ethernet', '802.11 (Wi-Fi)', 'ARP', 'PPP', 'VLAN (802.1Q)'],
        keyFacts: [
          'Gli indirizzi MAC sono identificatori hardware a 48 bit impressi nelle NIC — ma possono essere falsificati via software.',
          'ARP NON ha autenticazione — si fida di qualsiasi risposta, rendendolo intrinsecamente vulnerabile agli attacchi di poisoning.',
          'Gli switch imparano gli indirizzi MAC dal traffico; una tabella piena li forza a trasmettere come un hub (fail-open).'
        ],
        attacks: [
          {
            name: 'ARP Poisoning / Spoofing',
            description: 'L\'attaccante invia risposte ARP false per associare il proprio MAC a un IP legittimo, abilitando il MITM.',
            howItWorks: '1. L\'attaccante trasmette: "Sono 192.168.1.1 e il mio MAC è AA:BB:CC..."\n2. Le vittime aggiornano la loro cache ARP.\n3. Il traffico destinato al gateway ora fluisce attraverso l\'attaccante.\n4. L\'attaccante legge o modifica il traffico, poi lo re-invia (MITM invisibile).',
            impact: 'Man-in-the-Middle, intercettazione credenziali, manipolazione del traffico.',
            mitigation_strategy: 'Abilita il Dynamic ARP Inspection (DAI) sugli switch gestiti. Usa voci ARP statiche per host critici.',
            severity: 'critical'
          },
          {
            name: 'MAC Flooding',
            description: 'L\'attaccante inonda uno switch con frame usando indirizzi MAC sorgente falsi, riempiendo la sua tabella CAM.',
            howItWorks: '1. L\'attaccante usa uno strumento (macof) per generare migliaia di frame con MAC casuali.\n2. La tabella CAM dello switch si riempie.\n3. Lo switch va in fail-open — inizia a trasmettere tutti i frame su ogni porta.\n4. L\'attaccante su qualsiasi porta può sniffare tutto il traffico di rete.',
            impact: 'Intercettazione completa del traffico LAN, equivalente a un wiretap passivo sulla rete.',
            mitigation_strategy: 'Configura la port security sugli switch — limita il numero di indirizzi MAC per porta.',
            severity: 'high'
          },
          {
            name: 'VLAN Hopping',
            description: 'L\'attaccante bypassa la segmentazione VLAN per inviare traffico a VLAN a cui non dovrebbe avere accesso.',
            howItWorks: '1. Le porte trunk degli switch consentono di default tutte le VLAN.\n2. La porta dell\'attaccante negozia automaticamente il trunking (exploit DTP).\n3. L\'attaccante marca i frame con l\'ID della VLAN target.\n4. Lo switch forwarda i frame nella VLAN target — segmentazione bypassata.',
            impact: 'Accesso a segmenti di rete isolati (es. VLAN di produzione, gestione).',
            mitigation_strategy: 'Disabilita DTP sulle porte di accesso. Imposta la native VLAN su un ID inutilizzato. Configura esplicitamente le porte trunk.',
            severity: 'high'
          },
          {
            name: 'Server DHCP Rogue',
            description: 'L\'attaccante esegue un server DHCP non autorizzato che fornisce configurazioni di rete false ai client.',
            howItWorks: '1. Il client trasmette DHCP Discover.\n2. Il server rogue dell\'attaccante risponde per primo con un DHCP Offer.\n3. L\'attaccante imposta la propria macchina come gateway predefinito.\n4. Tutto il traffico del client viene instradato attraverso la macchina dell\'attaccante.',
            impact: 'Attacco Man-in-the-Middle su tutti i client appena connessi, intercettazione traffico.',
            mitigation_strategy: 'Abilita il DHCP Snooping sugli switch gestiti — consenti risposte DHCP solo dalle porte uplink attendibili.',
            severity: 'high'
          }
        ],
        defenses: [
          {
            name: 'Dynamic ARP Inspection (DAI)',
            description: 'Funzione dello switch che valida i pacchetti ARP rispetto a una tabella di binding DHCP snooping affidabile.',
            method: 'Intercetta tutti i pacchetti ARP sulle porte non attendibili. Valida la mappatura IP-MAC rispetto ai binding DHCP. Scarta quelli non validi.',
            counters: ['ARP Poisoning / Spoofing']
          },
          {
            name: 'Port Security',
            description: 'Funzione dello switch che limita e blocca il numero di indirizzi MAC appresi su ogni porta.',
            method: 'Definisci il numero massimo di MAC per porta. Spegni la porta o scarta frame se il limite viene superato.',
            counters: ['MAC Flooding']
          },
          {
            name: 'DHCP Snooping',
            description: 'Funzione dello switch che filtra i messaggi DHCP e costruisce una tabella di binding affidabile IP-MAC-porta.',
            method: 'Marca le porte lato client come non attendibili; solo le porte uplink/server sono attendibili per le offerte DHCP.',
            counters: ['Server DHCP Rogue', 'ARP Poisoning / Spoofing']
          },
          {
            name: 'Private VLAN & Disable DTP',
            description: 'Disabilitazione dell\'auto-negoziazione trunk e uso di Private VLAN per isolare host nella stessa VLAN.',
            method: 'switchport nonegotiate su tutte le porte di accesso. Configura PVLAN per limitare la comunicazione intra-VLAN.',
            counters: ['VLAN Hopping']
          }
        ]
      }
    }
  },
  {
    id: 1,
    name: 'Physical',
    color: '#ec4899',
    pdu: 'Bits',
    translations: {
      en: {
        name: 'Physical Layer',
        description: 'The foundation of all networking — responsible for transmitting raw bit streams over physical media. It defines electrical, optical, and radio signal specifications, cable types, connectors, and the physical topology of networks.',
        protocols: ['DSL', 'USB', 'Ethernet (Copper/Fiber)', 'Wi-Fi (Radio)', 'Bluetooth'],
        keyFacts: [
          'At this layer, data is just voltage levels, light pulses, or radio waves — pure physics, no logic.',
          'Fiber optic cables are inherently harder to tap than copper cables — light doesn\'t radiate like electrical signals.',
          'Physical layer attacks often require physical proximity, but they are the hardest to detect remotely.'
        ],
        attacks: [
          {
            name: 'Wiretapping',
            description: 'Physically splicing into copper network cables to passively intercept electrical signals.',
            howItWorks: '1. Attacker gains physical access to cabling (e.g., patch panel, in-wall wiring).\n2. Splices a tap device onto the wire.\n3. Electrical signals are duplicated and captured.\n4. Attacker can replay traffic analysis from a remote location.',
            impact: 'Passive traffic interception, credential harvesting, long-term surveillance.',
            mitigation_strategy: 'Use fiber optic cables (harder to tap). Encrypt all traffic. Implement physical cable protection (conduits, tamper-evident seals).',
            severity: 'high'
          },
          {
            name: 'Signal Jamming',
            description: 'Transmitting radio frequency interference to disrupt wireless communications.',
            howItWorks: '1. Attacker uses a radio transmitter on the target frequency (Wi-Fi, cellular).\n2. Noise overwhelms legitimate signals.\n3. Wireless clients cannot communicate with access points.\n4. Results in a localized denial of service affecting the physical area.',
            impact: 'Wireless network unavailability, IoT device disruption, communication blackout.',
            mitigation_strategy: 'Use spread-spectrum technologies (FHSS, DSSS) that are inherently resistant to narrow-band jamming.',
            severity: 'high'
          },
          {
            name: 'Hardware Implant',
            description: 'Installing a rogue hardware device (keylogger, network tap, rogue AP) directly on target equipment.',
            howItWorks: '1. Attacker gains physical access to a server room, desktop, or network device.\n2. Installs a tiny device on a USB port, PCI slot, or in-line on a cable.\n3. Device captures keystrokes, network traffic, or provides a backdoor channel.\n4. Data is exfiltrated via Wi-Fi, cellular, or retrieved later physically.',
            impact: 'Long-term persistent access, undetectable by network-based security tools.',
            mitigation_strategy: 'Strict physical access control (badge + biometrics + video). Regular hardware audits. Tamper-evident seals.',
            severity: 'critical'
          },
          {
            name: 'Cable / Power Disruption',
            description: 'Physically cutting network cables or disrupting power to cause denial of service.',
            howItWorks: '1. Attacker locates critical infrastructure cabling (fiber trunks, power feeds).\n2. Cuts or disconnects cables, or disrupts UPS/power systems.\n3. Network segments go dark immediately.\n4. Recovery requires physical repair and may take hours.',
            impact: 'Immediate network outage, data center disruption, loss of availability.',
            mitigation_strategy: 'Redundant physical paths (diverse routing). Buried / armored cables. Uninterruptible power supplies.',
            severity: 'high'
          }
        ],
        defenses: [
          {
            name: 'Physical Access Control',
            description: 'Restricting who can physically enter areas with network equipment.',
            method: 'Multi-factor physical authentication (badge + PIN + biometrics). Mantrap entries. Security cameras with 24/7 monitoring.',
            counters: ['Wiretapping', 'Hardware Implant', 'Cable / Power Disruption']
          },
          {
            name: 'Fiber Optic Cabling',
            description: 'Using fiber instead of copper for sensitive links — light signals don\'t radiate and are harder to tap.',
            method: 'Light-based transmission requires physical splicing and causes signal loss when tapped — making taps detectable.',
            counters: ['Wiretapping']
          },
          {
            name: 'Tamper-Evident Seals & Hardware Audits',
            description: 'Physical seals that reveal if hardware has been opened or tampered with.',
            method: 'Apply tamper-evident labels to hardware. Periodically audit for unexpected devices or modifications.',
            counters: ['Hardware Implant']
          },
          {
            name: 'Redundant Infrastructure',
            description: 'Deploying redundant physical paths, power supplies, and geographic diversity.',
            method: 'Dual fiber paths via diverse routes. Multiple ISP connections. N+1 UPS. Geographically distributed data centers.',
            counters: ['Cable / Power Disruption', 'Signal Jamming']
          }
        ]
      },
      it: {
        name: 'Livello Fisico',
        description: 'La fondamenta di tutta la rete — responsabile della trasmissione di flussi di bit grezzi su supporti fisici. Definisce le specifiche dei segnali elettrici, ottici e radio, i tipi di cavo, i connettori e la topologia fisica delle reti.',
        protocols: ['DSL', 'USB', 'Ethernet (Rame/Fibra)', 'Wi-Fi (Radio)', 'Bluetooth'],
        keyFacts: [
          'A questo livello, i dati sono solo livelli di tensione, impulsi luminosi o onde radio — fisica pura, nessuna logica.',
          'I cavi in fibra ottica sono intrinsecamente più difficili da intercettare rispetto al rame — la luce non irradia come i segnali elettrici.',
          'Gli attacchi al livello fisico richiedono spesso vicinanza fisica, ma sono i più difficili da rilevare remotamente.'
        ],
        attacks: [
          {
            name: 'Intercettazione Fisica (Wiretapping)',
            description: 'Splicing fisico nei cavi di rete in rame per intercettare passivamente i segnali elettrici.',
            howItWorks: '1. L\'attaccante ottiene accesso fisico ai cavi (es. patch panel, cablaggio a parete).\n2. Installa un dispositivo di intercettazione sul cavo.\n3. I segnali elettrici vengono duplicati e catturati.\n4. L\'attaccante può analizzare il traffico da una posizione remota.',
            impact: 'Intercettazione passiva del traffico, raccolta credenziali, sorveglianza a lungo termine.',
            mitigation_strategy: 'Usa cavi in fibra ottica (più difficili da intercettare). Cifra tutto il traffico. Implementa protezione fisica dei cavi.',
            severity: 'high'
          },
          {
            name: 'Signal Jamming',
            description: 'Trasmissione di interferenze radio per disturbare le comunicazioni wireless.',
            howItWorks: '1. L\'attaccante usa un trasmettitore radio sulla frequenza target (Wi-Fi, cellulare).\n2. Il rumore sopraffà i segnali legittimi.\n3. I client wireless non possono comunicare con i punti di accesso.\n4. Risulta in un denial of service localizzato che colpisce l\'area fisica.',
            impact: 'Indisponibilità della rete wireless, disruzione dispositivi IoT, blackout comunicazioni.',
            mitigation_strategy: 'Usa tecnologie spread-spectrum (FHSS, DSSS) intrinsecamente resistenti al jamming a banda stretta.',
            severity: 'high'
          },
          {
            name: 'Impianto Hardware',
            description: 'Installazione di un dispositivo hardware rogue (keylogger, network tap, AP rogue) direttamente sull\'attrezzatura target.',
            howItWorks: '1. L\'attaccante ottiene accesso fisico a una sala server, desktop o dispositivo di rete.\n2. Installa un piccolo dispositivo su una porta USB, slot PCI o in-line su un cavo.\n3. Il dispositivo cattura keystroke, traffico di rete o fornisce un canale backdoor.\n4. I dati vengono esfiltrati via Wi-Fi, cellulare o recuperati fisicamente in seguito.',
            impact: 'Accesso persistente a lungo termine, non rilevabile dagli strumenti di sicurezza basati sulla rete.',
            mitigation_strategy: 'Rigoroso controllo accessi fisici (badge + biometria + video). Audit hardware regolari. Sigilli anti-manomissione.',
            severity: 'critical'
          },
          {
            name: 'Taglio Cavi / Interruzione Alimentazione',
            description: 'Taglio fisico dei cavi di rete o interruzione dell\'alimentazione per causare denial of service.',
            howItWorks: '1. L\'attaccante individua i cavi dell\'infrastruttura critica (trunk fibra, alimentazioni).\n2. Taglia o scollega i cavi, o interrompe i sistemi UPS/alimentazione.\n3. I segmenti di rete vanno offline immediatamente.\n4. Il ripristino richiede riparazione fisica e può richiedere ore.',
            impact: 'Interruzione immediata della rete, disruption del data center, perdita di disponibilità.',
            mitigation_strategy: 'Percorsi fisici ridondanti (routing diversificato). Cavi interrati/blindati. Gruppi di continuità.',
            severity: 'high'
          }
        ],
        defenses: [
          {
            name: 'Controllo Accessi Fisici',
            description: 'Limitazione di chi può accedere fisicamente alle aree con attrezzature di rete.',
            method: 'Autenticazione fisica multi-fattore (badge + PIN + biometria). Ingressi mantrap. Telecamere di sicurezza con monitoraggio 24/7.',
            counters: ['Intercettazione Fisica (Wiretapping)', 'Impianto Hardware', 'Taglio Cavi / Interruzione Alimentazione']
          },
          {
            name: 'Cablaggio in Fibra Ottica',
            description: 'Uso della fibra invece del rame per link sensibili — i segnali luminosi non irradiano e sono più difficili da intercettare.',
            method: 'La trasmissione basata sulla luce richiede splicing fisico e causa perdita di segnale quando viene intercettata — rendendo i tap rilevabili.',
            counters: ['Intercettazione Fisica (Wiretapping)']
          },
          {
            name: 'Sigilli Anti-Manomissione & Audit Hardware',
            description: 'Sigilli fisici che rivelano se l\'hardware è stato aperto o manomesso.',
            method: 'Applica etichette anti-manomissione all\'hardware. Esegui audit periodici per dispositivi o modifiche inaspettate.',
            counters: ['Impianto Hardware']
          },
          {
            name: 'Infrastruttura Ridondante',
            description: 'Distribuzione di percorsi fisici ridondanti, alimentatori e diversità geografica.',
            method: 'Doppi percorsi fibra via route diverse. Connessioni ISP multiple. UPS N+1. Data center geograficamente distribuiti.',
            counters: ['Taglio Cavi / Interruzione Alimentazione', 'Signal Jamming']
          }
        ]
      }
    }
  }
];
