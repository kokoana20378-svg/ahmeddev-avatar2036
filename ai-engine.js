/**
 * AVATAR 2036 - LOCAL AI ENGINE v2036.1.0
 * 100% Offline LLM-like AI System
 * Built by AHMEDDEV
 */

class AvatarAI {
  constructor() {
    this.memory = [];
    this.context = [];
    this.userProfile = { name: '', preferences: {}, topics: {} };
    this.conversationHistory = [];
    this.currentTopic = 'general';
    this.sentiment = 'neutral';
    this.mode = 'general';
    this.knowledge = this.initKnowledge();
    this.patterns = this.initPatterns();
    this.codeTemplates = this.initCodeTemplates();
    this.mathEngine = new MathEngine();
    this.translator = new Translator();
    this.textAnalyzer = new TextAnalyzer();
    this.creativeEngine = new CreativeEngine();
    this.reasoningEngine = new ReasoningEngine();
    this.maxContext = 20;
  }

  initKnowledge() {
    return {
      programming: {
        javascript: {
          basics: 'JavaScript is a versatile, high-level programming language. It supports multiple paradigms: object-oriented, functional, and event-driven. Key features include closures, promises, async/await, and prototypal inheritance.',
          advanced: 'Advanced JS concepts include: closures, higher-order functions, generators, proxies, WeakRef, FinalizationRegistry, SharedArrayBuffer, Atomics, and the Event Loop.',
          es2024: 'ES2024 features: Array grouping (Object.groupBy), Promise.withResolvers, Atomics.waitAsync, Well-formed Unicode strings, ArrayBuffer resize/transfer.',
          frameworks: 'Popular frameworks: React, Vue, Svelte, Angular, Next.js, Nuxt.js, Astro, Qwik, Solid.js, Alpine.js.',
          patterns: 'Design patterns: Singleton, Factory, Observer, Pub/Sub, Module, Revealing Module, Strategy, Decorator, Facade, Mediator, Visitor.'
        },
        python: {
          basics: 'Python is a high-level, interpreted language known for readability. It uses indentation for blocks and supports multiple paradigms.',
          advanced: 'Advanced Python: decorators, generators, context managers, metaclasses, descriptors, asyncio, type hints, dataclasses, Protocol classes.',
          libraries: 'Key libraries: NumPy, Pandas, Matplotlib, Scikit-learn, TensorFlow, PyTorch, FastAPI, Django, Flask, SQLAlchemy.',
          dataScience: 'Data Science stack: Jupyter, Pandas for manipulation, NumPy for computation, Matplotlib/Seaborn for visualization, Scikit-learn for ML.'
        },
        rust: {
          basics: 'Rust is a systems language focused on safety, speed, and concurrency. It uses ownership and borrowing for memory safety without garbage collection.',
          features: 'Key features: zero-cost abstractions, move semantics, guaranteed memory safety, no data races, trait-based generics, pattern matching.'
        },
        html: {
          semantic: 'Semantic HTML5 elements: header, nav, main, article, section, aside, footer, figure, figcaption, details, summary, dialog.',
          accessibility: 'Accessibility: ARIA roles, landmarks, alt text, keyboard navigation, focus management, screen reader support, color contrast.'
        },
        css: {
          modern: 'Modern CSS: Container queries, :has() selector, cascade layers, subgrid, color-mix(), oklch(), scroll-driven animations, anchor positioning.',
          responsive: 'Responsive design: media queries, clamp(), min/max(), fluid typography, logical properties, aspect-ratio, container queries.'
        },
        databases: {
          sql: 'SQL databases: PostgreSQL (advanced), MySQL, SQLite, MariaDB. Key concepts: normalization, indexing, transactions, ACID, joins.',
          nosql: 'NoSQL: MongoDB (document), Redis (key-value), Cassandra (wide-column), Neo4j (graph), DynamoDB (key-value).',
          indexeddb: 'IndexedDB: Client-side database for web apps. Supports indexes, transactions, cursors. Used for offline storage in PWAs.'
        },
        devops: {
          docker: 'Docker: Containerization platform. Dockerfile, docker-compose, layers, volumes, networks, multi-stage builds.',
          cicd: 'CI/CD: GitHub Actions, GitLab CI, Jenkins, CircleCI. Pipeline: build, test, deploy stages.',
          linux: 'Linux essentials: file system, processes, permissions, networking, bash scripting, systemd, cron.'
        }
      },
      science: {
        physics: {
          quantum: 'Quantum mechanics: wave-particle duality, superposition, entanglement, Heisenberg uncertainty, Schrödinger equation, quantum computing.',
          relativity: 'Special relativity: time dilation, length contraction, E=mc². General relativity: spacetime curvature, gravitational waves, black holes.',
          thermodynamics: 'Laws of thermodynamics: energy conservation, entropy increase, absolute zero, heat engines, Maxwell\'s demon.'
        },
        chemistry: {
          organic: 'Organic chemistry: carbon compounds, functional groups, reaction mechanisms, chirality, polymerization.',
          inorganic: 'Inorganic chemistry: coordination compounds, crystal field theory, organometallics, bioinorganic chemistry.',
          biochemistry: 'Biochemistry: proteins, enzymes, DNA/RNA, metabolism, cell signaling, drug design.'
        },
        biology: {
          genetics: 'Genetics: DNA structure, gene expression, mutations, epigenetics, CRISPR, genomics, proteomics.',
          evolution: 'Evolution: natural selection, genetic drift, speciation, phylogenetics, molecular evolution.',
          neuroscience: 'Neuroscience: neurons, synapses, neural networks, brain regions, neurotransmitters, neuroplasticity.'
        },
        mathematics: {
          calculus: 'Calculus: limits, derivatives, integrals, series, multivariable calculus, differential equations.',
          algebra: 'Algebra: groups, rings, fields, linear algebra, abstract algebra, Galois theory.',
          statistics: 'Statistics: probability distributions, hypothesis testing, regression, Bayesian inference, machine learning.',
          discrete: 'Discrete math: graph theory, combinatorics, number theory, logic, algorithms, complexity theory.'
        }
      },
      technology: {
        ai: {
          machineLearning: 'Machine Learning: supervised, unsupervised, reinforcement learning. Algorithms: linear regression, SVM, random forests, neural networks.',
          deepLearning: 'Deep Learning: CNNs, RNNs, LSTMs, Transformers, GANs, autoencoders, attention mechanisms.',
          nlp: 'NLP: tokenization, embeddings, transformers, BERT, GPT architecture, attention, fine-tuning, prompt engineering.',
          computerVision: 'Computer Vision: image classification, object detection, segmentation, OCR, facial recognition.'
        },
        web: {
          frontend: 'Frontend: HTML5, CSS3, JavaScript (ES2024+), React, Vue, Svelte, performance optimization, accessibility.',
          backend: 'Backend: Node.js, Python (Django/FastAPI), Go, Rust, microservices, APIs, authentication.',
          security: 'Web Security: XSS, CSRF, SQL injection, authentication, authorization, HTTPS, CSP, SameSite cookies.'
        },
        blockchain: {
          basics: 'Blockchain: distributed ledger, consensus mechanisms, proof of work/stake, smart contracts, DeFi, NFTs.',
          ethereum: 'Ethereum: Solidity, smart contracts, EVM, gas optimization, Layer 2, rollups, sidechains.'
        },
        iot: {
          basics: 'IoT: sensors, actuators, MQTT, CoAP, edge computing, device management, security.',
          embedded: 'Embedded systems: microcontrollers (Arduino, ESP32), RTOS, power management, wireless protocols.'
        }
      },
      general: {
        history: {
          ancient: 'Ancient history: Mesopotamia, Egypt, Greece, Rome, China, India. Key events: agricultural revolution, writing, philosophy.',
          medieval: 'Medieval period: Byzantine Empire, Islamic Golden Age, Crusades, Mongol Empire, Renaissance.',
          modern: 'Modern history: Industrial Revolution, World Wars, Cold War, globalization, digital revolution.'
        },
        geography: {
          physical: 'Physical geography: continents, oceans, climate zones, tectonic plates, volcanoes, glaciers.',
          human: 'Human geography: population, cultures, languages, religions, urbanization, globalization.'
        },
        philosophy: {
          ancient: 'Ancient philosophy: Socrates, Plato, Aristotle, Stoicism, Epicureanism, Eastern philosophy.',
          modern: 'Modern philosophy: Descartes, Kant, Hegel, Nietzsche, existentialism, pragmatism, analytic philosophy.',
          ethics: 'Ethics: utilitarianism, deontology, virtue ethics, moral realism, applied ethics, bioethics.'
        },
        arts: {
          music: 'Music theory: scales, chords, harmony, rhythm, composition, genres from classical to electronic.',
          literature: 'Literature: poetry, prose, drama, literary devices, major works from different periods.',
          visual: 'Visual arts: painting, sculpture, photography, digital art, design principles, art history.'
        },
        business: {
          entrepreneurship: 'Entrepreneurship: ideation, MVP, lean startup, scaling, fundraising, product-market fit.',
          marketing: 'Marketing: SEO, content marketing, social media, email marketing, analytics, branding.',
          finance: 'Finance: accounting, investment, portfolio theory, risk management, behavioral economics.'
        }
      },
      languages: {
        arabic: {
          grammar: 'النحو العربي: الإعراب، البناء، الفعل، الاسم، الحرف، الجملة الاسمية، الجملة الفعلية.',
          vocabulary: 'المفردات: أسماء الزمان والمكان، أفعال المقاربة، أسماء الفاعلين والمفعولين.',
          rhetoric: 'البلاغة: المعاني، البيان، البديع، التشبيه، الاستعارة، الكناية.'
        },
        english: {
          grammar: 'English grammar: parts of speech, tenses, clauses, sentence structure, punctuation.',
          writing: 'Academic writing: essay structure, thesis statements, evidence, analysis, citations.'
        }
      }
    };
  }

  initPatterns() {
    return {
      greeting: /^(hi|hello|hey|good\s*(morning|afternoon|evening|night)|مرحبا|السلام|اهلا|أهلا|سلام|هلا|مرحبا)/i,
      farewell: /^(bye|goodbye|see\s*you|farewell|مع السلامة|وداعا|سلام|يلا|باي)/i,
      thanks: /^(thanks?|thank\s*you|شكرا|مشكور|ممنون|يعطيك العافية)/i,
      identity: /^(who\s*(are\s*you|r\s*u)|what\s*(are\s*you|r\s*u)|your\s*name|اسمك|مين\s*انت|انت\s*مين|تعريف)/i,
      capability: /^(what\s*can\s*you\s*do|capabilities|features|help|اواعدك|تقدر|تسلك|ماذا تستطيع)/i,
      time: /^(what\s*time|time\s*is\s*it|clock|الوقت|كم\s*الساعة|الساعة)/i,
      date: /^(what\s*date|today|what\s*day|التاريخ| اليوم|اريخ)/i,
      joke: /^(joke|funny|make\s*me\s*laugh|نكتة|نكت|ضحك|مضحكة)/i,
      code: /^(code|program|function|class|implement|write.*code|اكتب.*كود|برمجة|كود|شفرة)/i,
      math: /^(solve|calculate|math|احسب|حساب|رياضيات|المعادلة|حل)/i,
      translate: /^(translate|translation|ترجم|ترجمة|اترجم)/i,
      explain: /^(explain|tell\s*me\s*about|what\s*is|define|اشرح|فسر|تعريف|ماذا\s*هو)/i,
      creative: /^(write|story|poem|creative|قصة|قصيدة|اكتب|إبداع)/i,
      compare: /^(compare|difference|versus|vs|مقارنة|ايه\s*الفرق)/i,
      advice: /^(advice|suggest|recommend|tip|نصيحة|اقتراح|انصح)/i,
      sentiment_positive: /(happy|glad|great|awesome|amazing|love|excellent|perfect|ممتاز|حلو|رائع|جميل|احلى)/i,
      sentiment_negative: /(sad|bad|terrible|hate|awful|worst|سيء|زبالة|وحش|مقرف)/i,
      question_why: /^(why|ليش|لماذا|ليه|什麽原因)/i,
      question_how: /^(how|كيف|ازاي|كفاية)/i,
      question_where: /^(where|وين|أين|فين|where)/i,
      question_who: /^(who|مين|من)/i,
    };
  }

  initCodeTemplates() {
    return {
      javascript: {
        function: (name, params, body) => `function ${name}(${params.join(', ')}) {\n  ${body}\n}`,
        arrow: (params, body) => `(${params.join(', ')}) => {\n  ${body}\n}`,
        class: (name, methods) => `class ${name} {\n  constructor() {\n    ${methods.map(m => `// ${m}`).join('\n    ')}\n  }\n}`,
        async: (name, params, body) => `async function ${name}(${params.join(', ')}) {\n  ${body}\n}`,
        fetch: (url) => `fetch('${url}')\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err));`,
        dom: (sel, event, handler) => `document.querySelector('${sel}').addEventListener('${event}', ${handler});`,
        promise: (body) => `new Promise((resolve, reject) => {\n  ${body}\n})`,
        iife: (body) => `(function() {\n  ${body}\n})();`
      },
      python: {
        function: (name, params, body) => `def ${name}(${params.join(', ')}):\n    ${body}`,
        class: (name, methods) => `class ${name}:\n    def __init__(self):\n        ${methods.map(m => `# ${m}`).join('\n        ')}`,
        async: (name, params, body) => `async def ${name}(${params.join(', ')}):\n    ${body}`,
        listComp: (expr, v, iter) => `[${expr} for ${v} in ${iter}]`,
        decorator: (name, body) => `@${name}\ndef wrapper():\n    ${body}`,
        contextManager: (name, body) => `class ${name}:\n    def __enter__(self):\n        ${body}\n    def __exit__(self, *args):\n        pass`
      },
      html: {
        boilerplate: (title) => `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>${title}</title>\n</head>\n<body>\n  \n</body>\n</html>`,
        component: (name) => `<div class="${name.toLowerCase()}">\n  \n</div>`,
        form: (action) => `<form action="${action}" method="POST">\n  <input type="text" name="field" />\n  <button type="submit">Submit</button>\n</form>`
      },
      css: {
        flexCenter: `.flex-center {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}`,
        gridLayout: (cols) => `.grid-layout {\n  display: grid;\n  grid-template-columns: repeat(${cols}, 1fr);\n  gap: 1rem;\n}`,
        animation: (name) => `@keyframes ${name} {\n  from { opacity: 0; transform: translateY(10px); }\n  to { opacity: 1; transform: translateY(0); }\n}`
      },
      sql: {
        select: (table, cols='*') => `SELECT ${cols} FROM ${table};`,
        insert: (table, cols, vals) => `INSERT INTO ${table} (${cols.join(', ')}) VALUES (${vals.map(v => `'${v}'`).join(', ')});`,
        create: (table, fields) => `CREATE TABLE ${table} (\n  ${fields.map(f => `${f.name} ${f.type}`).join(',\n  ')}\n);`
      },
      rust: {
        fn: (name, params, body) => `fn ${name}(${params.join(', ')}) -> i32 {\n  ${body}\n}`,
        struct: (name, fields) => `struct ${name} {\n  ${fields.map(f => `${f.name}: ${f.type},`).join('\n  ')}\n}`
      },
      go: {
        fn: (name, params, body) => `func ${name}(${params.join(', ')}) {\n  ${body}\n}`,
        struct: (name, fields) => `type ${name} struct {\n  ${fields.map(f => `${f.name} ${f.type}`).join('\n  ')}\n}`
      }
    };
  }

  process(input) {
    if (!input || !input.trim()) return this.getResponse('empty');
    
    const normalized = input.trim();
    const lower = normalized.toLowerCase();
    
    this.context.push({ role: 'user', content: normalized, time: Date.now() });
    if (this.context.length > this.maxContext) this.context.shift();
    
    this.updateUserProfile(normalized);
    this.currentTopic = this.detectTopic(lower);
    this.sentiment = this.analyzeSentiment(lower);
    
    const intent = this.detectIntent(lower);
    let response = this.generateResponse(intent, normalized, lower);
    
    this.context.push({ role: 'assistant', content: response, time: Date.now() });
    this.memory.push({ input: normalized, output: response, time: Date.now(), topic: this.currentTopic });
    if (this.memory.length > 100) this.memory.shift();
    
    return {
      text: response,
      mode: this.mode,
      topic: this.currentTopic,
      sentiment: this.sentiment,
      confidence: this.calculateConfidence(intent, lower)
    };
  }

  detectIntent(input) {
    const intents = [
      { name: 'greeting', pattern: this.patterns.greeting, priority: 10 },
      { name: 'farewell', pattern: this.patterns.farewell, priority: 10 },
      { name: 'thanks', pattern: this.patterns.thanks, priority: 10 },
      { name: 'identity', pattern: this.patterns.identity, priority: 9 },
      { name: 'capability', pattern: this.patterns.capability, priority: 9 },
      { name: 'time', pattern: this.patterns.time, priority: 8 },
      { name: 'date', pattern: this.patterns.date, priority: 8 },
      { name: 'joke', pattern: this.patterns.joke, priority: 7 },
      { name: 'code', pattern: this.patterns.code, priority: 8 },
      { name: 'math', pattern: this.patterns.math, priority: 8 },
      { name: 'translate', pattern: this.patterns.translate, priority: 8 },
      { name: 'explain', pattern: this.patterns.explain, priority: 7 },
      { name: 'creative', pattern: this.patterns.creative, priority: 7 },
      { name: 'compare', pattern: this.patterns.compare, priority: 7 },
      { name: 'advice', pattern: this.patterns.advice, priority: 6 },
      { name: 'question_why', pattern: this.patterns.question_why, priority: 5 },
      { name: 'question_how', pattern: this.patterns.question_how, priority: 5 },
      { name: 'question_where', pattern: this.patterns.question_where, priority: 5 },
      { name: 'question_who', pattern: this.patterns.question_who, priority: 5 },
    ];

    let bestMatch = { name: 'general', priority: 0 };
    for (const intent of intents) {
      if (intent.pattern.test(input) && intent.priority > bestMatch.priority) {
        bestMatch = intent;
      }
    }

    if (bestMatch.name === 'general') {
      if (this.mode === 'code') return 'code';
      if (this.mode === 'math') return 'math';
      if (this.mode === 'creative') return 'creative';
      if (this.mode === 'translator') return 'translate';
    }

    return bestMatch.name;
  }

  generateResponse(intent, input, lower) {
    switch (intent) {
      case 'empty': return "I'm here to help! Type something and I'll do my best to assist you.";
      case 'greeting': return this.greetingResponse(lower);
      case 'farewell': return this.farewellResponse();
      case 'thanks': return this.thanksResponse();
      case 'identity': return this.identityResponse();
      case 'capability': return this.capabilityResponse();
      case 'time': return this.timeResponse();
      case 'date': return this.dateResponse();
      case 'joke': return this.jokeResponse();
      case 'code': return this.codeResponse(input);
      case 'math': return this.mathResponse(input);
      case 'translate': return this.translateResponse(input);
      case 'explain': return this.explainResponse(input);
      case 'creative': return this.creativeResponse(input);
      case 'compare': return this.compareResponse(input);
      case 'advice': return this.adviceResponse(input);
      case 'question_why': return this.whyResponse(input);
      case 'question_how': return this.howResponse(input);
      case 'question_where': return this.whereResponse(input);
      case 'question_who': return this.whoResponse(input);
      default: return this.generalResponse(input);
    }
  }

  greetingResponse(input) {
    const h = new Date().getHours();
    const greetings = {
      morning: ['Good morning! Ready to tackle the day?', 'Morning! What shall we work on today?'],
      afternoon: ['Good afternoon! How can I assist you?', 'Afternoon! What\'s on your mind?'],
      evening: ['Good evening! What can I help with?', 'Evening! Ready to dive into something?'],
      night: ['Working late? I\'m here 24/7!', 'Night owl mode activated! How can I help?']
    };
    let timeOfDay = 'morning';
    if (h >= 12 && h < 17) timeOfDay = 'afternoon';
    else if (h >= 17 && h < 21) timeOfDay = 'evening';
    else if (h >= 21 || h < 5) timeOfDay = 'night';
    
    const arr = greetings[timeOfDay];
    return arr[Math.floor(Math.random() * arr.length)];
  }

  farewellResponse() {
    const responses = [
      'Goodbye! It was great chatting with you. Come back anytime!',
      'See you later! Remember, I\'m always here when you need me.',
      'Farewell! Hope I was helpful. Until next time!',
      'Take care! I\'ll be right here waiting for your next visit.',
      'Bye for now! May your code be bug-free and your day productive!'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  thanksResponse() {
    const responses = [
      'You\'re welcome! Happy to help anytime.',
      'My pleasure! That\'s what I\'m here for.',
      'Anytime! Feel free to ask more questions.',
      'Glad I could assist! Let me know if you need anything else.',
      'No problem at all! I enjoy being useful.'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  identityResponse() {
    return `I am **AVATAR AI** — a fully offline, local AI engine built by **AHMEDDEV**.

**Key Features:**
- 100% offline — no internet required
- Context-aware conversations
- Code generation & analysis
- Math problem solving
- Translation (Arabic ↔ English)
- Creative writing assistance
- Knowledge base across multiple domains
- Conversation memory & learning

I'm running entirely in your browser using the power of JavaScript. Your data never leaves your device. I'm designed to work until 2036 and beyond!

What would you like to explore?`;
  }

  capabilityResponse() {
    return `**What I Can Do:**

🔹 **Code Generation** — Write functions, classes, components in JS, Python, Rust, Go, HTML, CSS, SQL
🔹 **Code Analysis** — Review code, find bugs, suggest improvements
🔹 **Math Solving** — Arithmetic, algebra, calculus, statistics
🔹 **Translation** — Arabic ↔ English with context awareness
🔹 **Creative Writing** — Stories, poems, scripts, brainstorming
🔹 **Knowledge Base** — Science, technology, history, philosophy, arts
🔹 **Text Analysis** — Summarization, sentiment, keyword extraction
🔹 **Reasoning** — Logical analysis, comparisons, pros/cons
🔹 **Advice** — Technical guidance, best practices, recommendations
🔹 **Multi-turn Conversations** — I remember context within our chat
🔹 **Multiple Modes** — General, Code, Math, Creative, Translator

**Tip:** Use \`/mode code\` to switch to code-focused mode, or \`/mode math\` for math mode!

I work 100% offline — no data ever leaves your device.`;
  }

  timeResponse() {
    const now = new Date();
    return `It's currently **${now.toLocaleTimeString()}**.\n\nIn 24-hour format: **${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}**`;
  }

  dateResponse() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return `Today is **${now.toLocaleDateString('en-US', options)}**.\n\nDay of year: **${Math.ceil((now - new Date(now.getFullYear(), 0, 0)) / 86400000)}**\nWeek: **${Math.ceil(now.getDate() / 7)}** of the year`;
  }

  jokeResponse() {
    const jokes = [
      { setup: 'Why do programmers prefer dark mode?', punchline: 'Because light attracts bugs! 🐛' },
      { setup: 'Why was the JavaScript developer sad?', punchline: 'Because he didn\'t Node how to Express himself!' },
      { setup: 'What\'s a computer\'s favorite snack?', punchline: 'Microchips! 🍟' },
      { setup: 'Why do Java developers wear glasses?', punchline: 'Because they can\'t C#!' },
      { setup: 'How many programmers does it take to change a light bulb?', punchline: 'None — that\'s a hardware problem!' },
      { setup: 'Why did the developer go broke?', punchline: 'Because he used up all his cache!' },
      { setup: 'What do you call a group of 8 hobbits?', punchline: 'A hobbyte!' },
      { setup: 'Why did the CSS developer leave the party?', punchline: 'Because everything was out of flex!' },
      { setup: 'What\'s a programmer\'s favorite hangout place?', punchline: 'Foo Bar!' },
      { setup: 'Why do programmers hate nature?', punchline: 'It has too many bugs!' },
      { setup: 'Why did the AI break up with the internet?', punchline: 'Because it found a better connection offline!' },
      { setup: 'What do you call an AI that sings?', punchline: 'Artificial Intellegen-SING!' },
      { setup: 'Why was the computer cold?', punchline: 'It left its Windows open!' },
      { setup: 'What did the router say to the doctor?', punchline: 'It hurts when IP!' },
      { setup: 'Why don\'t programmers like to go outside?', punchline: 'There\'s too much nature and not enough documentation!' },
    ];
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    return `😄 **${joke.setup}**\n\n${joke.punchline}\n\nWant to hear another one?`;
  }

  codeResponse(input) {
    const lower = input.toLowerCase();
    
    if (/react|component|jsx|tsx/i.test(input)) {
      return this.generateReactComponent(input);
    }
    if (/api|fetch|axios|http|endpoint/i.test(input)) {
      return this.generateAPI(input);
    }
    if (/class|oop|object.*oriented/i.test(input)) {
      return this.generateClass(input);
    }
    if (/database|sql|query|select/i.test(input)) {
      return this.generateSQL(input);
    }
    if (/html|page|website|form/i.test(input)) {
      return this.generateHTML(input);
    }
    if (/css|style|animation|flex|grid/i.test(input)) {
      return this.generateCSS(input);
    }
    if (/python|py/i.test(input)) {
      return this.generatePython(input);
    }
    if (/rust/i.test(input)) {
      return this.generateRust(input);
    }
    if (/go|golang/i.test(input)) {
      return this.generateGo(input);
    }
    if (/function|func|fn/i.test(input)) {
      return this.generateFunction(input);
    }
    if (/sort|array|list/i.test(input)) {
      return this.generateSortFunction(input);
    }
    if (/search|find|lookup/i.test(input)) {
      return this.generateSearchFunction(input);
    }
    if (/validate|validation/i.test(input)) {
      return this.generateValidation(input);
    }
    if (/login|auth|authentication/i.test(input)) {
      return this.generateAuth(input);
    }
    if (/socket|websocket|real.?time/i.test(input)) {
      return this.generateWebSocket(input);
    }
    if (/regex|pattern|match/i.test(input)) {
      return this.generateRegex(input);
    }
    if (/test|spec|jest|mocha/i.test(input)) {
      return this.generateTest(input);
    }
    if (/deploy|ci\/cd|docker/i.test(input)) {
      return this.generateDevOps(input);
    }
    if (/algorithm|data.*structure/i.test(input)) {
      return this.generateAlgorithm(input);
    }
    if (/todo|task|list/i.test(input)) {
      return this.generateTodoApp(input);
    }
    if (/chat|message/i.test(input)) {
      return this.generateChatApp(input);
    }
    if (/game|tic.*tac|snake/i.test(input)) {
      return this.generateGame(input);
    }
    if (/calculator|calc/i.test(input)) {
      return this.generateCalculator(input);
    }
    if (/weather|forecast/i.test(input)) {
      return this.generateWeatherWidget(input);
    }
    if (/counter|count/i.test(input)) {
      return this.generateCounter(input);
    }
    if (/modal|popup|dialog/i.test(input)) {
      return this.generateModal(input);
    }
    if (/tabs|tab.*component/i.test(input)) {
      return this.generateTabs(input);
    }
    if (/accordion|collapse|expand/i.test(input)) {
      return this.generateAccordion(input);
    }
    if (/carousel|slider|swipe/i.test(input)) {
      return this.generateCarousel(input);
    }
    if (/form|input|submit/i.test(input)) {
      return this.generateForm(input);
    }
    if (/table|data.*table/i.test(input)) {
      return this.generateDataTable(input);
    }
    if (/chart|graph|visual/i.test(input)) {
      return this.generateChart(input);
    }
    if (/map|location|geoloc/i.test(input)) {
      return this.generateMap(input);
    }
    if (/notification|alert|toast/i.test(input)) {
      return this.generateNotification(input);
    }
    if (/drag|drop|sortable/i.test(input)) {
      return this.generateDragDrop(input);
    }
    if (/infinite.*scroll|lazy.*load/i.test(input)) {
      return this.generateInfiniteScroll(input);
    }
    if (/debounce|throttle/i.test(input)) {
      return this.generateDebounce(input);
    }
    if (/cache|memo|memoiz/i.test(input)) {
      return this.generateCache(input);
    }
    if (/state|manage|store|redux/i.test(input)) {
      return this.generateStateManagement(input);
    }
    if (/router|route|navigation/i.test(input)) {
      return this.generateRouter(input);
    }
    if (/middleware|pipeline/i.test(input)) {
      return this.generateMiddleware(input);
    }
    if (/event|emitter|listener/i.test(input)) {
      return this.generateEventEmitter(input);
    }
    if (/observer|watch|subscribe/i.test(input)) {
      return this.generateObserver(input);
    }
    if (/iterator|generator|yield/i.test(input)) {
      return this.generateIterator(input);
    }
    if (/proxy|reflect/i.test(input)) {
      return this.generateProxy(input);
    }
    if (/worker|thread|parallel/i.test(input)) {
      return this.generateWorker(input);
    }
    if (/shared.*array|atomic/i.test(input)) {
      return this.generateSharedMemory(input);
    }
    if (/web.*component|shadow.*dom|custom.*element/i.test(input)) {
      return this.generateWebComponent(input);
    }
    if (/service.*worker|sw|cache.*api|pwa/i.test(input)) {
      return this.generateServiceWorker(input);
    }
    if (/indexed.*idb|idb|database|db/i.test(input)) {
      return this.generateIndexedDB(input);
    }
    if (/web.*worker|worker.*thread/i.test(input)) {
      return this.generateWebWorker(input);
    }
    if (/web.*socket|ws|socket/i.test(input)) {
      return this.generateWebSocket(input);
    }
    if (/web.*rtc|rtc|peer|p2p/i.test(input)) {
      return this.generateWebRTC(input);
    }
    if (/web.*audio|audio|sound/i.test(input)) {
      return this.generateWebAudio(input);
    }
    if (/web.*gl|gl|3d|three/i.test(input)) {
      return this.generateWebGL(input);
    }
    if (/web.*xr|xr|vr|ar|mixed.*reality/i.test(input)) {
      return this.generateWebXR(input);
    }
    if (/web.*assembly|wasm/i.test(input)) {
      return this.generateWebAssembly(input);
    }
    if (/web.*crypto|crypto|encrypt|decrypt|hash/i.test(input)) {
      return this.generateWebCrypto(input);
    }
    if (/web.*storage|local.*storage|session.*storage/i.test(input)) {
      return this.generateWebStorage(input);
    }
    if (/web.*socket|ws|socket/i.test(input)) {
      return this.generateWebSocket(input);
    }
    if (/web.*worker|worker.*thread/i.test(input)) {
      return this.generateWebWorker(input);
    }
    if (/algorithm|sort|search/i.test(input)) {
      return this.generateAlgorithm(input);
    }
    if (/design.*pattern|pattern/i.test(input)) {
      return this.generateDesignPattern(input);
    }
    if (/react|vue|angular|svelte/i.test(input)) {
      return this.generateFrameworkCode(input);
    }
    if (/node|express|fastify|koa/i.test(input)) {
      return this.generateNodeCode(input);
    }
    if (/django|flask|fastapi/i.test(input)) {
      return this.generatePythonWeb(input);
    }
    if (/spring|java/i.test(input)) {
      return this.generateJava(input);
    }
    if (/php|laravel/i.test(input)) {
      return this.generatePHP(input);
    }
    if (/ruby|rails/i.test(input)) {
      return this.generateRuby(input);
    }
    if (/swift|ios/i.test(input)) {
      return this.generateSwift(input);
    }
    if (/kotlin|android/i.test(input)) {
      return this.generateKotlin(input);
    }
    if (/dart|flutter/i.test(input)) {
      return this.generateDart(input);
    }
    if (/terraform|aws|azure|gcp/i.test(input)) {
      return this.generateCloud(input);
    }
    if (/graphql|gql/i.test(input)) {
      return this.generateGraphQL(input);
    }
    if (/rest|api.*design/i.test(input)) {
      return this.generateREST(input);
    }
    if (/grpc|proto/i.test(input)) {
      return this.generateGRPC(input);
    }
    if (/kafka|rabbitmq|mq/i.test(input)) {
      return this.generateMessageQueue(input);
    }
    if (/redis|memcached|cache/i.test(input)) {
      return this.generateCacheDB(input);
    }
    if (/mongo|mongoose|nosql/i.test(input)) {
      return this.generateMongoDB(input);
    }
    if (/postgres|mysql|sqlite|sql/i.test(input)) {
      return this.generateSQL(input);
    }
    if (/elasticsearch|search.*engine/i.test(input)) {
      return this.generateElasticsearch(input);
    }
    if (/nginx|apache|caddy/i.test(input)) {
      return this.generateWebServer(input);
    }
    if (/git|version.*control/i.test(input)) {
      return this.generateGit(input);
    }
    if (/ci|cd|pipeline|github.*action/i.test(input)) {
      return this.generateCI(input);
    }
    if (/docker|container/i.test(input)) {
      return this.generateDocker(input);
    }
    if (/k8s|kubernetes/i.test(input)) {
      return this.generateKubernetes(input);
    }
    if (/monitor|log|observ/i.test(input)) {
      return this.generateMonitoring(input);
    }
    if (/security|auth|jwt|oauth/i.test(input)) {
      return this.generateSecurity(input);
    }
    if (/performance|optim|speed/i.test(input)) {
      return this.generatePerformance(input);
    }
    if (/accessibility|a11y|aria/i.test(input)) {
      return this.generateAccessibility(input);
    }
    if (/responsive|mobile|viewport/i.test(input)) {
      return this.generateResponsive(input);
    }
    if (/animation|transition|keyframe/i.test(input)) {
      return this.generateAnimation(input);
    }
    if (/svg|canvas|draw/i.test(input)) {
      return this.generateGraphics(input);
    }
    if (/data.*visual|chart|graph|plot/i.test(input)) {
      return this.generateDataViz(input);
    }
    if (/machine.*learn|ml|model|train/i.test(input)) {
      return this.generateML(input);
    }
    if (/neural|deep.*learn|nn/i.test(input)) {
      return this.generateNeuralNetwork(input);
    }
    if (/nlp|text.*process|sentiment/i.test(input)) {
      return this.generateNLP(input);
    }
    if (/image.*process|opencv|vision/i.test(input)) {
      return this.generateImageProcessing(input);
    }
    if (/speech|voice|audio.*process/i.test(input)) {
      return this.generateSpeech(input);
    }
    if (/blockchain|crypto|web3|defi/i.test(input)) {
      return this.generateBlockchain(input);
    }
    if (/iot|sensor|embedded|arduino|esp/i.test(input)) {
      return this.generateIoT(input);
    }
    if (/ar|vr|xr|mixed.*reality|hololens/i.test(input)) {
      return this.generateARVR(input);
    }
    if (/robot|drone|uav|autonomous/i.test(input)) {
      return this.generateRobotics(input);
    }
    if (/quantum|qubit|superposition/i.test(input)) {
      return this.generateQuantum(input);
    }
    if (/bio|genetic|dna|protein/i.test(input)) {
      return this.generateBioinformatics(input);
    }
    if (/finance|stock|trading|invest/i.test(input)) {
      return this.generateFinance(input);
    }
    if (/game|unity|unreal|godot/i.test(input)) {
      return this.generateGameDev(input);
    }
    if (/3d|blender|model|mesh/i.test(input)) {
      return this.generate3D(input);
    }
    if (/video|ffmpeg|stream|codec/i.test(input)) {
      return this.generateVideo(input);
    }
    if (/audio|music|sound|synth/i.test(input)) {
      return this.generateAudio(input);
    }
    if (/network|tcp|udp|socket|http/i.test(input)) {
      return this.generateNetworking(input);
    }
    if (/os|kernel|driver|system/i.test(input)) {
      return this.generateSystemProgram(input);
    }
    if (/compiler|interpreter|parser|lexer/i.test(input)) {
      return this.generateCompiler(input);
    }
    if (/database|db|sql|query|index|transaction/i.test(input)) {
      return this.generateDatabase(input);
    }
    if (/test|spec|jest|mocha|cypress|e2e/i.test(input)) {
      return this.generateTesting(input);
    }
    if (/deploy|ship|release|version/i.test(input)) {
      return this.generateDeployment(input);
    }
    if (/monitor|log|debug|trace/i.test(input)) {
      return this.generateDebugging(input);
    }
    if (/document|readme|doc|wiki/i.test(input)) {
      return this.generateDocumentation(input);
    }
    if (/refactor|clean|improve|optimize/i.test(input)) {
      return this.generateRefactoring(input);
    }
    if (/review|feedback|critique/i.test(input)) {
      return this.generateCodeReview(input);
    }
    if (/learn|tutorial|teach|explain/i.test(input)) {
      return this.generateTutorial(input);
    }
    if (/interview|question|prep/i.test(input)) {
      return this.generateInterview(input);
    }
    if (/career|job|hire|intern/i.test(input)) {
      return this.generateCareer(input);
    }
    if (/freelance|client|project/i.test(input)) {
      return this.generateFreelance(input);
    }
    if (/startup|business|entrepreneur/i.test(input)) {
      return this.generateStartup(input);
    }
    if (/product|feature|user/i.test(input)) {
      return this.generateProduct(input);
    }
    if (/design|ui|ux|prototype/i.test(input)) {
      return this.generateDesign(input);
    }
    if (/market|seo|content|brand/i.test(input)) {
      return this.generateMarketing(input);
    }
    if (/manage|lead|team|agile/i.test(input)) {
      return this.generateManagement(input);
    }
    if (/architect|system|infrastructure/i.test(input)) {
      return this.generateArchitecture(input);
    }
    if (/cloud|aws|azure|gcp|serverless/i.test(input)) {
      return this.generateCloud(input);
    }
    if (/devops|ci|cd|pipeline/i.test(input)) {
      return this.generateDevOps(input);
    }
    if (/security|pen|pentest|vuln/i.test(input)) {
      return this.generateSecurity(input);
    }
    if (/hack|crack|exploit/i.test(input)) {
      return this.generateSecurity(input);
    }
    if (/bug|error|issue|problem/i.test(input)) {
      return this.generateDebugging(input);
    }
    if (/fix|solve|resolve/i.test(input)) {
      return this.generateDebugging(input);
    }
    if (/help|how|what|why|when|where|who/i.test(input)) {
      return this.generalResponse(input);
    }
    return this.generateGenericCode(input);
  }

  generateReactComponent(input) {
    const name = this.extractName(input) || 'MyComponent';
    return `\`\`\`jsx
import React, { useState, useEffect } from 'react';

const ${name} = ({ title, children }) => {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Component logic here
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="${name.toLowerCase()}">
      {title && <h2>{title}</h2>}
      {children}
    </div>
  );
};

export default ${name};
\`\`\`

**Key Features:**
- Functional component with hooks
- useState for state management
- useEffect for side effects
- Cleanup function in useEffect
- Conditional rendering
- Props destructuring

**Usage:**
\`\`\`jsx
<${name} title="Hello">Content here</${name}>
\`\`\``;
  }

  generateAPI(input) {
    return `\`\`\`javascript
// Modern Fetch API wrapper with error handling
class APIClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  setAuthToken(token) {
    this.headers['Authorization'] = \`Bearer \${token}\`;
  }

  async request(endpoint, options = {}) {
    const url = \`\${this.baseURL}\${endpoint}\`;
    const config = {
      headers: this.headers,
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }
      
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('API Error:', error);
      return { success: false, error: error.message };
    }
  }

  get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  post(endpoint, body) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  put(endpoint, body) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

// Usage
const api = new APIClient('https://api.example.com');
const users = await api.get('/users');
const newUser = await api.post('/users', { name: 'John' });
\`\`\``;
  }

  generateClass(input) {
    const name = this.extractName(input) || 'MyClass';
    return `\`\`\`javascript
class ${name} {
  #privateField;
  
  constructor(options = {}) {
    this.name = options.name || '${name}';
    this.#privateField = new Map();
    this.initialized = true;
  }

  // Static factory method
  static create(options) {
    return new ${name}(options);
  }

  // Getter
  get size() {
    return this.#privateField.size;
  }

  // Method
  doSomething(value) {
    if (!this.initialized) {
      throw new Error('${name} not initialized');
    }
    this.#privateField.set(Date.now(), value);
    return this;
  }

  // Async method
  async fetchData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.doSomething(data);
      return data;
    } catch (error) {
      console.error('Fetch failed:', error);
      throw error;
    }
  }

  // Iterator
  *[Symbol.iterator]() {
    yield* this.#privateField.entries();
  }

  // String representation
  toString() {
    return \`\${this.name}(\${this.size} items)\`;
  }
}

// Inheritance
class Extended${name} extends ${name} {
  constructor(options) {
    super(options);
    this.extra = options.extra || null;
  }

  // Override
  doSomething(value) {
    console.log('Extended behavior');
    return super.doSomething(value);
  }
}

export { ${name}, Extended${name} };
\`\`\``;
  }

  generateSQL(input) {
    return `\`\`\`sql
-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create posts table
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  content TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);

-- Insert sample data
INSERT INTO users (username, email, password_hash)
VALUES ('john_doe', 'john@example.com', 'hashed_password_here');

-- Complex query with joins
SELECT 
  u.username,
  p.title,
  p.created_at
FROM users u
INNER JOIN posts p ON u.id = p.user_id
WHERE p.published = true
ORDER BY p.created_at DESC
LIMIT 10;

-- Update with conditions
UPDATE posts 
SET published = true, updated_at = CURRENT_TIMESTAMP
WHERE user_id = 1 AND title LIKE '%draft%';

-- Aggregation query
SELECT 
  u.username,
  COUNT(p.id) as post_count,
  MAX(p.created_at) as last_post
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
GROUP BY u.username
HAVING COUNT(p.id) > 0;
\`\`\``;
  }

  generateHTML(input) {
    return `\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Page description">
  <title>My Page</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, sans-serif; line-height: 1.6; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
    header { background: #333; color: white; padding: 1rem; }
    main { padding: 2rem 0; }
    footer { background: #333; color: white; padding: 1rem; text-align: center; }
  </style>
</head>
<body>
  <header>
    <nav class="container">
      <a href="/">Logo</a>
      <ul>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  
  <main class="container">
    <h1>Welcome</h1>
    <p>Content goes here</p>
  </main>
  
  <footer>
    <p>&copy; 2026 My Website</p>
  </footer>
</body>
</html>
\`\`\``;
  }

  generateCSS(input) {
    return `\`\`\`css
/* Modern CSS Reset */
*, *::before, *::after {
  box-sizing: border-box;
}

/* CSS Variables */
:root {
  --primary: #8B5CF6;
  --secondary: #00D4FF;
  --bg: #020208;
  --card: rgba(255, 255, 255, 0.06);
  --border: rgba(255, 255, 255, 0.12);
  --text: #ffffff;
  --text-muted: #888888;
  --radius: 12px;
  --shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

/* Utility Classes */
.flex { display: flex; }
.flex-center { display: flex; justify-content: center; align-items: center; }
.grid { display: grid; }
.grid-2 { grid-template-columns: repeat(2, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }
.gap-1 { gap: 0.5rem; }
.gap-2 { gap: 1rem; }
.gap-3 { gap: 1.5rem; }

/* Card Component */
.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem;
  backdrop-filter: blur(12px);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

/* Button Component */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--radius);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
}

.btn:hover { opacity: 0.9; transform: translateY(-1px); }
.btn:active { transform: translateY(0); }
.btn-secondary { background: var(--card); border: 1px solid var(--border); }

/* Responsive */
@media (max-width: 768px) {
  .grid-2, .grid-3 { grid-template-columns: 1fr; }
  .hide-mobile { display: none; }
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn { animation: fadeIn 0.3s ease; }
\`\`\``;
  }

  generatePython(input) {
    return `\`\`\`python
from dataclasses import dataclass
from typing import List, Optional
from datetime import datetime
import asyncio

@dataclass
class User:
    id: int
    name: str
    email: str
    created_at: datetime = None
    
    def __post_init__(self):
        if self.created_at is None:
            self.created_at = datetime.now()

class UserManager:
    def __init__(self):
        self.users: List[User] = []
    
    def add_user(self, name: str, email: str) -> User:
        user = User(
            id=len(self.users) + 1,
            name=name,
            email=email
        )
        self.users.append(user)
        return user
    
    def find_by_email(self, email: str) -> Optional[User]:
        return next((u for u in self.users if u.email == email), None)
    
    async def fetch_users_async(self) -> List[User]:
        """Simulate async data fetching"""
        await asyncio.sleep(0.1)
        return self.users
    
    def to_dict(self) -> List[dict]:
        return [
            {
                "id": u.id,
                "name": u.name,
                "email": u.email,
                "created_at": u.created_at.isoformat()
            }
            for u in self.users
        ]

# Usage
manager = UserManager()
user = manager.add_user("John Doe", "john@example.com")
print(f"Created: {user}")
\`\`\``;
  }

  generateRust(input) {
    return `\`\`\`rust
use std::collections::HashMap;

#[derive(Debug, Clone)]
struct User {
    id: u64,
    name: String,
    email: String,
}

impl User {
    fn new(id: u64, name: &str, email: &str) -> Self {
        Self {
            id,
            name: name.to_string(),
            email: email.to_string(),
        }
    }
}

struct UserManager {
    users: HashMap<u64, User>,
    next_id: u64,
}

impl UserManager {
    fn new() -> Self {
        Self {
            users: HashMap::new(),
            next_id: 1,
        }
    }
    
    fn add_user(&mut self, name: &str, email: &str) -> &User {
        let user = User::new(self.next_id, name, email);
        self.users.insert(self.next_id, user);
        let id = self.next_id;
        self.next_id += 1;
        self.users.get(&id).unwrap()
    }
    
    fn find_by_email(&self, email: &str) -> Option<&User> {
        self.users.values().find(|u| u.email == email)
    }
}

fn main() {
    let mut manager = UserManager::new();
    let user = manager.add_user("John", "john@example.com");
    println!("Created: {:?}", user);
}
\`\`\``;
  }

  generateGo(input) {
    return `\`\`\`go
package main

import (
    "encoding/json"
    "fmt"
    "net/http"
    "sync"
)

type User struct {
    ID    int    \`json:"id"\`
    Name  string \`json:"name"\`
    Email string \`json:"email"\`
}

type UserManager struct {
    mu      sync.RWMutex
    users   []User
    nextID  int
}

func NewUserManager() *UserManager {
    return &UserManager{nextID: 1}
}

func (m *UserManager) AddUser(name, email string) User {
    m.mu.Lock()
    defer m.mu.Unlock()
    
    user := User{ID: m.nextID, Name: name, Email: email}
    m.users = append(m.users, user)
    m.nextID++
    return user
}

func (m *UserManager) GetAll() []User {
    m.mu.RLock()
    defer m.mu.RUnlock()
    return m.users
}

func main() {
    manager := NewUserManager()
    
    http.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(manager.GetAll())
    })
    
    fmt.Println("Server running on :8080")
    http.ListenAndServe(":8080", nil)
}
\`\`\``;
  }

  generateSortFunction(input) {
    return `\`\`\`javascript
// Multiple sorting algorithms

// Quick Sort - O(n log n) average
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  return [...quickSort(left), ...middle, ...quickSort(right)];
}

// Merge Sort - O(n log n)
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    result.push(left[i] <= right[j] ? left[i++] : right[j++]);
  }
  return result.concat(left.slice(i), right.slice(j));
}

// Binary Search - O(log n)
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

// Usage
const arr = [64, 34, 25, 12, 22, 11, 90];
console.log('Quick Sort:', quickSort([...arr]));
console.log('Merge Sort:', mergeSort([...arr]));
console.log('Find 22:', binarySearch(mergeSort([...arr]), 22));
\`\`\``;
  }

  generateSearchFunction(input) {
    return `\`\`\`javascript
// Advanced search utilities

class SearchEngine {
  constructor(data) {
    this.data = data;
    this.index = this.buildIndex(data);
  }

  buildIndex(data) {
    const index = new Map();
    data.forEach((item, i) => {
      const words = this.tokenize(JSON.stringify(item));
      words.forEach(word => {
        if (!index.has(word)) index.set(word, []);
        index.get(word).push(i);
      });
    });
    return index;
  }

  tokenize(text) {
    return text.toLowerCase()
      .replace(/[^a-z0-9\\s]/g, '')
      .split(/\\s+/)
      .filter(w => w.length > 1);
  }

  search(query) {
    const terms = this.tokenize(query);
    const scores = new Map();

    terms.forEach(term => {
      // Exact match
      if (this.index.has(term)) {
        this.index.get(term).forEach(idx => {
          scores.set(idx, (scores.get(idx) || 0) + 10);
        });
      }
      // Partial match
      this.index.forEach((indices, key) => {
        if (key.includes(term)) {
          indices.forEach(idx => {
            scores.set(idx, (scores.get(idx) || 0) + 5);
          });
        }
      });
    });

    return Array.from(scores.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([idx, score]) => ({ ...this.data[idx], _score: score }));
  }

  fuzzySearch(query, threshold = 0.6) {
    return this.data.filter(item => {
      const str = JSON.stringify(item).toLowerCase();
      return this.fuzzyMatch(str, query.toLowerCase()) >= threshold;
    });
  }

  fuzzyMatch(str, pattern) {
    let score = 0, pi = 0;
    for (let si = 0; si < str.length && pi < pattern.length; si++) {
      if (str[si] === pattern[pi]) { score++; pi++; }
    }
    return pi === pattern.length ? score / str.length : 0;
  }
}

// Usage
const engine = new SearchEngine([
  { name: 'JavaScript', type: 'Language' },
  { name: 'Python', type: 'Language' },
  { name: 'React', type: 'Framework' }
]);

console.log(engine.search('javascript'));
\`\`\``;
  }

  generateValidation(input) {
    return `\`\`\`javascript
// Comprehensive validation library

class Validator {
  static rules = {
    required: (v) => v !== null && v !== undefined && v !== '',
    email: (v) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v),
    phone: (v) => /^\\+?[\\d\\s-]{10,}$/.test(v),
    url: (v) => /^https?:\\/\\/.+/.test(v),
    min: (min) => (v) => v.length >= min,
    max: (max) => (v) => v.length <= max,
    pattern: (regex) => (v) => regex.test(v),
    numeric: (v) => !isNaN(v) && v !== '',
    alpha: (v) => /^[a-zA-Z]+$/.test(v),
    alphanumeric: (v) => /^[a-zA-Z0-9]+$/.test(v),
    date: (v) => !isNaN(Date.parse(v)),
    creditCard: (v) => /^\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}$/.test(v),
  };

  static validate(data, schema) {
    const errors = {};
    
    for (const [field, rules] of Object.entries(schema)) {
      errors[field] = [];
      
      for (const rule of rules) {
        const validator = typeof rule === 'function' ? rule : this.rules[rule];
        if (validator && !validator(data[field])) {
          errors[field].push(\`\${field} failed: \${rule}\`);
        }
      }
      
      if (errors[field].length === 0) delete errors[field];
    }
    
    return {
      valid: Object.keys(errors).length === 0,
      errors
    };
  }
}

// Usage
const result = Validator.validate(
  { email: 'test@example.com', name: 'John' },
  {
    email: ['required', 'email'],
    name: ['required', Validator.rules.min(2)]
  }
);

console.log(result); // { valid: true, errors: {} }
\`\`\``;
  }

  generateAuth(input) {
    return `\`\`\`javascript
// JWT Authentication system

class AuthService {
  constructor(secret) {
    this.secret = secret;
    this.tokens = new Map();
  }

  // Generate JWT-like token
  generateToken(payload, expiresIn = 3600) {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const now = Math.floor(Date.now() / 1000);
    const body = btoa(JSON.stringify({
      ...payload,
      iat: now,
      exp: now + expiresIn
    }));
    const signature = btoa(this.secret + '.' + header + '.' + body);
    
    return \`\${header}.\${body}.\${signature}\`;
  }

  // Verify token
  verifyToken(token) {
    try {
      const [header, body, signature] = token.split('.');
      const decoded = JSON.parse(atob(body));
      
      if (decoded.exp < Math.floor(Date.now() / 1000)) {
        return { valid: false, error: 'Token expired' };
      }
      
      const expectedSig = btoa(this.secret + '.' + header + '.' + body);
      if (signature !== expectedSig) {
        return { valid: false, error: 'Invalid signature' };
      }
      
      return { valid: true, payload: decoded };
    } catch (e) {
      return { valid: false, error: 'Invalid token' };
    }
  }

  // Hash password (simplified)
  async hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + this.secret);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  // Compare password
  async comparePassword(password, hash) {
    const newHash = await this.hashPassword(password);
    return newHash === hash;
  }
}

// Usage
const auth = new AuthService('my-secret-key');
const token = auth.generateToken({ userId: 1, role: 'admin' });
const result = auth.verifyToken(token);
\`\`\``;
  }

  generateWebSocket(input) {
    return `\`\`\`javascript
// WebSocket client with auto-reconnect

class WSClient {
  constructor(url, options = {}) {
    this.url = url;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = options.maxReconnect || 10;
    this.reconnectDelay = options.reconnectDelay || 1000;
    this.handlers = new Map();
    this.connect();
  }

  connect() {
    this.ws = new WebSocket(this.url);
    
    this.ws.onopen = () => {
      console.log('Connected');
      this.reconnectAttempts = 0;
      this.emit('connected');
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.emit(data.type, data.payload);
      } catch (e) {
        this.emit('message', event.data);
      }
    };

    this.ws.onclose = () => {
      this.emit('disconnected');
      this.reconnect();
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
      console.log(\`Reconnecting in \${delay}ms (attempt \${this.reconnectAttempts})\`);
      setTimeout(() => this.connect(), delay);
    }
  }

  send(type, payload) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload }));
    }
  }

  on(event, handler) {
    if (!this.handlers.has(event)) this.handlers.set(event, []);
    this.handlers.get(event).push(handler);
  }

  emit(event, data) {
    const handlers = this.handlers.get(event) || [];
    handlers.forEach(h => h(data));
  }

  close() {
    this.maxReconnectAttempts = 0;
    this.ws.close();
  }
}

// Usage
const ws = new WSClient('wss://example.com/ws');
ws.on('message', (data) => console.log('Received:', data));
ws.send('chat', { text: 'Hello!' });
\`\`\``;
  }

  generateRegex(input) {
    return `\`\`\`javascript
// Common regex patterns

const patterns = {
  // Email
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/,
  
  // Phone (international)
  phone: /^\\+?[1-9]\\d{1,14}$/,
  
  // URL
  url: /^(https?:\\/\\/)?([\\w-]+\\.)+[\\w-]+(\\/[\\w\\-./?%&=]*)?$/,
  
  // IP Address (v4)
  ipv4: /^(?:(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$/,
  
  // Date (YYYY-MM-DD)
  date: /^\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])$/,
  
  // Credit Card
  creditCard: /^\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}$/,
  
  // Strong Password
  strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/,
  
  // Username (3-20 chars, alphanumeric + underscore)
  username: /^[a-zA-Z0-9_]{3,20}$/,
  
  // Hex Color
  hexColor: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
  
  // HTML Tag
  htmlTag: /<([a-z]+)([^<]*(?:<(?!\\/\\1>)[^<]*)*)<\\/\\1>/i,
  
  // Markdown Link
  markdownLink: /\\[([^\\]]+)\\]\\(([^)]+)\\)/,
  
  // Arabic Text
  arabic: /[\\u0600-\\u06FF]+/,
  
  // Unicode
  unicode: /[\\u{1F600-\\u{1F64F}]/u,
};

// Usage
const email = 'test@example.com';
console.log(patterns.email.test(email)); // true

// Custom regex builder
function buildRegex(flags = 'i') {
  return new RegExp(flags);
}

// Find and replace
const text = 'Hello world! Contact: test@example.com';
const cleaned = text.replace(patterns.email, '[EMAIL REDACTED]');
console.log(cleaned);
\`\`\``;
  }

  generateTest(input) {
    return `\`\`\`javascript
// Unit testing with custom test runner

class TestRunner {
  constructor() {
    this.tests = [];
    this.results = { passed: 0, failed: 0, total: 0 };
  }

  describe(name, fn) {
    console.log(\`\\n📋 \${name}\`);
    fn();
  }

  it(name, fn) {
    this.results.total++;
    try {
      fn();
      this.results.passed++;
      console.log(\`  ✅ \${name}\`);
    } catch (error) {
      this.results.failed++;
      console.log(\`  ❌ \${name}: \${error.message}\`);
    }
  }

  expect(actual) {
    return {
      toBe: (expected) => {
        if (actual !== expected) throw new Error(\`Expected \${expected}, got \${actual}\`);
      },
      toEqual: (expected) => {
        if (JSON.stringify(actual) !== JSON.stringify(expected)) {
          throw new Error(\`Expected \${JSON.stringify(expected)}, got \${JSON.stringify(actual)}\`);
        }
      },
      toBeTruthy: () => {
        if (!actual) throw new Error(\`Expected truthy, got \${actual}\`);
      },
      toContain: (expected) => {
        if (!actual.includes(expected)) throw new Error(\`Expected \${actual} to contain \${expected}\`);
      },
      toThrow: () => {
        if (typeof actual !== 'function') throw new Error('Expected a function');
        try { actual(); throw new Error('Expected function to throw'); } catch (e) { if (e.message === 'Expected function to throw') throw e; }
      }
    };
  }

  printResults() {
    console.log(\`\\n📊 Results: \${this.results.passed}/\${this.results.total} passed\`);
    if (this.results.failed > 0) {
      console.log(\`   ❌ \${this.results.failed} failed\`);
    }
  }
}

// Usage
const runner = new TestRunner();

runner.describe('Math operations', () => {
  runner.it('adds numbers', () => {
    runner.expect(1 + 1).toBe(2);
  });
  runner.it('multiplies numbers', () => {
    runner.expect(2 * 3).toBe(6);
  });
});

runner.printResults();
\`\`\``;
  }

  generateTodoApp(input) {
    return `\`\`\`javascript
// Full Todo App with local storage

class TodoApp {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.todos = JSON.parse(localStorage.getItem('todos') || '[]');
    this.filter = 'all';
    this.render();
  }

  addTodo(text) {
    this.todos.push({
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString()
    });
    this.save();
    this.render();
  }

  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) todo.completed = !todo.completed;
    this.save();
    this.render();
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.save();
    this.render();
  }

  setFilter(filter) {
    this.filter = filter;
    this.render();
  }

  getFilteredTodos() {
    switch (this.filter) {
      case 'active': return this.todos.filter(t => !t.completed);
      case 'completed': return this.todos.filter(t => t.completed);
      default: return this.todos;
    }
  }

  save() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  render() {
    const filtered = this.getFilteredTodos();
    this.container.innerHTML = \`
      <div class="todo-app">
        <input type="text" id="todoInput" placeholder="Add a todo..." />
        <button onclick="app.addTodo(document.getElementById('todoInput').value)">Add</button>
        <div class="filters">
          <button onclick="app.setFilter('all')">All</button>
          <button onclick="app.setFilter('active')">Active</button>
          <button onclick="app.setFilter('completed')">Completed</button>
        </div>
        <ul>
          \${filtered.map(todo => \`
            <li class="\${todo.completed ? 'completed' : ''}">
              <span onclick="app.toggleTodo(\${todo.id})">\${todo.text}</span>
              <button onclick="app.deleteTodo(\${todo.id})">×</button>
            </li>
          \`).join('')}
        </ul>
        <p>\${this.todos.filter(t => t.completed).length}/\${this.todos.length} completed</p>
      </div>
    \`;
  }
}

const app = new TodoApp('app');
\`\`\``;
  }

  generateGenericCode(input) {
    return `\`\`\`javascript
// Generated code based on your request

// Utility functions
const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

const throttle = (fn, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(deepClone);
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, deepClone(v)])
  );
};

const groupBy = (arr, key) => {
  return arr.reduce((acc, item) => {
    const group = item[key];
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});
};

const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (!cache.has(key)) cache.set(key, fn(...args));
    return cache.get(key);
  };
};

export { debounce, throttle, deepClone, groupBy, pipe, memoize };
\`\`\``;
  }

  mathResponse(input) {
    const mathPatterns = [
      { regex: /(\d+)\s*\+\s*(\d+)/, op: (a, b) => `${a} + ${b} = **${a + b}**` },
      { regex: /(\d+)\s*-\s*(\d+)/, op: (a, b) => `${a} - ${b} = **${a - b}**` },
      { regex: /(\d+)\s*\*\s*(\d+)/, op: (a, b) => `${a} × ${b} = **${a * b}**` },
      { regex: /(\d+)\s*\/\s*(\d+)/, op: (a, b) => b !== 0 ? `${a} ÷ ${b} = **${(a / b).toFixed(4)}**` : 'Cannot divide by zero!' },
      { regex: /(\d+)\s*%\s*(\d+)/, op: (a, b) => `${a} mod ${b} = **${a % b}**` },
      { regex: /(\d+)\s*\^\s*(\d+)/, op: (a, b) => `${a}^${b} = **${Math.pow(a, b)}**` },
      { regex: /sqrt\s*(\d+)/i, op: (a) => `√${a} = **${Math.sqrt(a).toFixed(4)}**` },
      { regex: /(\d+)\s*factorial/i, op: (a) => {
        let r = 1; for (let i = 2; i <= a; i++) r *= i;
        return `${a}! = **${r}**`;
      }},
    ];

    for (const p of mathPatterns) {
      const m = input.match(p.regex);
      if (m) return p.op(parseFloat(m[1]), parseFloat(m[2] || 0));
    }

    // Try to evaluate
    try {
      const cleaned = input.replace(/[^0-9+\-*/().%\s]/g, '');
      if (cleaned && /^[0-9+\-*/().%\s]+$/.test(cleaned)) {
        const result = Function('"use strict"; return (' + cleaned + ')')();
        return `**${cleaned}** = **${result}**`;
      }
    } catch (e) {}

    return `I can help with math! Try:
- **Addition:** 5 + 3
- **Subtraction:** 10 - 4
- **Multiplication:** 6 * 7
- **Division:** 15 / 3
- **Power:** 2 ^ 8
- **Square root:** sqrt 16
- **Factorial:** 5 factorial
- **Modulo:** 10 % 3

Or just type any math expression!`;
  }

  translateResponse(input) {
    const translations = {
      'hello': 'مرحبا',
      'goodbye': 'وداعا',
      'thank you': 'شكرا',
      'please': 'من فضلك',
      'yes': 'نعم',
      'no': 'لا',
      'good morning': 'صباح الخير',
      'good night': 'تصبح على خير',
      'how are you': 'كيف حالك',
      'i love you': 'أحبك',
      'welcome': 'أهلا وسهلا',
      'friend': 'صديق',
      'water': 'ماء',
      'food': 'طعام',
      'house': 'منزل',
      'car': 'سيارة',
      'book': 'كتاب',
      'school': 'مدرسة',
      'work': 'عمل',
      'family': 'عائلة',
      'happy': 'سعيد',
      'sad': 'حزين',
      'big': 'كبير',
      'small': 'صغير',
      'new': 'جديد',
      'old': 'قديم',
      'good': 'جيد',
      'bad': 'سيء',
      'beautiful': 'جميل',
      'ugly': 'قبيح',
      'fast': 'سريع',
      'slow': 'بطيء',
      'easy': 'سهل',
      'hard': 'صعب',
      'مرحبا': 'hello',
      'شكرا': 'thank you',
      'نعم': 'yes',
      'لا': 'no',
      'صباح الخير': 'good morning',
      'كيف حالك': 'how are you',
      'أحبك': 'i love you',
      'مرحبا': 'welcome',
      'صديق': 'friend',
      'ماء': 'water',
      'طعام': 'food',
      'منزل': 'house',
      'سيارة': 'car',
      'كتاب': 'book',
      'مدرسة': 'school',
      'عمل': 'work',
      'عائلة': 'family',
    };

    const lower = input.toLowerCase().replace(/^(translate|ترجم|اترجم)\s*/i, '').trim();
    
    if (translations[lower]) {
      return `**${lower}** → **${translations[lower]}**`;
    }

    // Simple word-by-word translation attempt
    const words = lower.split(/\s+/);
    const translated = words.map(w => translations[w] || w).join(' ');
    
    if (translated !== lower) {
      return `**Translation:**\n\n${lower} → ${translated}\n\n*Note: This is a simple word-by-word translation. For complex sentences, context matters.*`;
    }

    return `I can translate between Arabic and English! Try:
- "hello" → مرحبا
- "شكرا" → thank you
- "good morning" → صباح الخير
- "كيف حالك" → how are you

Type any word or phrase to translate!`;
  }

  explainResponse(input) {
    const topic = input.replace(/^(explain|tell\s*me\s*about|what\s*is|define|اشرح|فسر|تعريف|ماذا\s*هو)\s*/i, '').trim();
    const lower = topic.toLowerCase();

    const explanations = {
      'javascript': this.knowledge.programming.javascript.basics,
      'python': this.knowledge.programming.python.basics,
      'rust': this.knowledge.programming.rust.basics,
      'html': this.knowledge.programming.html.semantic,
      'css': this.knowledge.programming.css.modern,
      'sql': this.knowledge.programming.databases.sql,
      'nosql': this.knowledge.programming.databases.nosql,
      'react': 'React is a JavaScript library for building user interfaces. It uses a virtual DOM for efficient rendering, component-based architecture, and JSX syntax. Key concepts: components, props, state, hooks, context, and reconciliation.',
      'vue': 'Vue.js is a progressive JavaScript framework. It offers reactive data binding, component-based architecture, and a gentle learning curve. Features: Composition API, Single File Components, and Vue Router.',
      'node': 'Node.js is a JavaScript runtime built on Chrome\'s V8 engine. It enables server-side JavaScript, uses an event-driven architecture, and has npm for package management. Great for APIs, microservices, and real-time apps.',
      'docker': this.knowledge.programming.devops.docker,
      'git': 'Git is a distributed version control system. Key concepts: repositories, commits, branches, merging, rebasing, staging area, and remote repositories.',
      'api': 'API (Application Programming Interface) is a set of rules for building software. Types: REST, GraphQL, gRPC, WebSocket. REST uses HTTP methods (GET, POST, PUT, DELETE) for communication.',
      'database': this.knowledge.programming.databases.sql,
      'machine learning': this.knowledge.technology.ai.machineLearning,
      'deep learning': this.knowledge.technology.ai.deepLearning,
      'nlp': this.knowledge.technology.ai.nlp,
      'blockchain': this.knowledge.technology.blockchain.basics,
      'quantum computing': this.knowledge.science.physics.quantum,
      'physics': this.knowledge.science.physics.thermodynamics,
      'chemistry': this.knowledge.science.chemistry.organic,
      'biology': this.knowledge.science.biology.genetics,
      'math': 'Mathematics is the study of numbers, shapes, and patterns. Branches include arithmetic, algebra, geometry, calculus, statistics, and discrete mathematics.',
      'philosophy': this.knowledge.general.philosophy.ancient,
      'history': this.knowledge.general.history.modern,
      'geography': this.knowledge.general.geography.physical,
      'music': this.knowledge.general.arts.music,
      'literature': this.knowledge.general.arts.literature,
      'entrepreneurship': this.knowledge.general.business.entrepreneurship,
      'marketing': this.knowledge.general.business.marketing,
      'finance': this.knowledge.general.business.finance,
      'pwa': 'Progressive Web Apps (PWA) are web applications that deliver native app-like experiences. Features: offline support, push notifications, installability, and responsive design. Uses Service Workers and Cache API.',
      'graphql': 'GraphQL is a query language for APIs. It allows clients to request exactly the data they need. Features: type system, resolvers, subscriptions, and schema-first design.',
      'microservices': 'Microservices architecture structures an app as a collection of loosely coupled services. Benefits: scalability, technology diversity, fault isolation, and independent deployment.',
      'ci/cd': 'CI/CD automates software delivery. Continuous Integration merges code changes frequently. Continuous Deployment automatically releases to production. Tools: GitHub Actions, Jenkins, GitLab CI.',
      'agile': 'Agile is an iterative approach to project management. Principles: customer collaboration, working software, responding to change, individuals over processes. Frameworks: Scrum, Kanban, XP.',
      'design patterns': 'Design patterns are reusable solutions to common problems. Types: Creational (Singleton, Factory), Structural (Adapter, Decorator), Behavioral (Observer, Strategy).',
      'data structures': 'Data structures organize data for efficient use. Types: Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Hash Tables. Each has different time/space complexities.',
      'algorithm': 'Algorithms are step-by-step procedures for solving problems. Types: sorting (QuickSort, MergeSort), searching (Binary Search), graph (Dijkstra), dynamic programming.',
      'encryption': 'Encryption converts data into coded form. Types: Symmetric (AES), Asymmetric (RSA), Hashing (SHA-256). Used for secure communication and data protection.',
      'neural network': this.knowledge.technology.ai.deepLearning,
      'transformer': 'Transformers are attention-based neural network architectures. Key innovation: self-attention mechanism. Used in NLP (BERT, GPT) and vision (ViT). Handles sequential data in parallel.',
      'attention mechanism': 'Attention allows models to focus on relevant parts of input. Self-attention computes relationships between all positions. Multi-head attention uses multiple attention heads.',
    };

    if (explanations[lower]) {
      return `**${topic}**\n\n${explanations[lower]}`;
    }

    for (const key in explanations) {
      if (lower.includes(key)) {
        return `**${key.charAt(0).toUpperCase() + key.slice(1)}**\n\n${explanations[key]}`;
      }
    }

    return `I can explain many topics! Try asking about:
- Programming: JavaScript, Python, React, APIs
- Science: Physics, Chemistry, Biology
- Technology: AI, Machine Learning, Blockchain
- Business: Entrepreneurship, Marketing, Finance
- And many more!

What would you like to learn about?`;
  }

  creativeResponse(input) {
    const topic = input.replace(/^(write|story|poem|creative|قصة|قصيدة|اكتب|إبداع)\s*/i, '').trim();
    
    if (/poem|قصيد/i.test(input)) {
      return this.creativeEngine.writePoem(topic);
    }
    if (/story|قص/i.test(input)) {
      return this.creativeEngine.writeStory(topic);
    }
    
    return `I can help with creative writing! Try:
- **Write a poem about** nature
- **Write a story about** a robot
- **Create a character** for a novel
- **Write dialogue** between two people

What would you like me to create?`;
  }

  compareResponse(input) {
    const topic = input.replace(/^(compare|difference|versus|vs|مقارنة|ايه\s*الفرق)\s*/i, '').trim();
    
    if (/react|vue/i.test(input)) {
      return `**React vs Vue.js**\n\n| Feature | React | Vue.js |\n|---------|-------|--------|\n| Learning Curve | Steeper | Easier |\n| Performance | Excellent | Excellent |\n| Ecosystem | Largest | Growing |\n| Flexibility | High | Moderate |\n| State Management | Redux/Zustand | Pinia |\n| TypeScript | Good | Excellent |\n| Mobile | React Native | NativeScript |\n| Community | Largest | Growing |\n\n**Choose React if:** You want maximum flexibility and ecosystem.\n**Choose Vue if:** You want easier learning curve and great docs.`;
    }
    
    if (/python|javascript/i.test(input)) {
      return `**Python vs JavaScript**\n\n| Feature | Python | JavaScript |\n|---------|--------|------------|\n| Type | Interpreted | Interpreted |\n| Use Cases | Data Science, AI, Backend | Web, Mobile, Desktop |\n| Syntax | Clean, readable | C-like, flexible |\n| Speed | Slower | Faster (V8 engine) |\n| Ecosystem | Scientific | Web-focused |\n| Learning | Easier | Moderate |\n\n**Choose Python for:** Data science, ML, scripting.\n**Choose JavaScript for:** Web development, full-stack.`;
    }
    
    if (/sql|nosql/i.test(input)) {
      return `**SQL vs NoSQL**\n\n| Feature | SQL | NoSQL |\n|---------|-----|-------|\n| Schema | Rigid | Flexible |\n| Scaling | Vertical | Horizontal |\n| Queries | Complex joins | Simple lookups |\n| Consistency | ACID | Eventual |\n| Examples | PostgreSQL, MySQL | MongoDB, Redis |\n\n**Use SQL for:** Complex queries, transactions.\n**Use NoSQL for:** Scalability, flexible data.`;
    }
    
    return `I can compare many topics! Try:
- "Compare React vs Vue"
- "Compare Python vs JavaScript"
- "Compare SQL vs NoSQL"

What would you like to compare?`;
  }

  adviceResponse(input) {
    const topic = input.replace(/^(advice|suggest|recommend|tip|نصيحة|اقتراح|انصح)\s*/i, '').trim();
    
    const advice = {
      coding: `**Coding Best Practices:**\n\n1. **Write clean code** — readable, maintainable\n2. **Use version control** — Git is essential\n3. **Test your code** — unit tests, integration tests\n4. **Learn fundamentals** — data structures, algorithms\n5. **Code review** — get feedback from others\n6. **Document your code** — comments and README\n7. **Keep learning** — technology evolves fast\n8. **Build projects** — practical experience matters`,
      
      career: `**Career Advice:**\n\n1. **Build a portfolio** — showcase your work\n2. **Network** — attend meetups, conferences\n3. **Contribute to open source** — demonstrates skills\n4. **Never stop learning** — stay current\n5. **Find a mentor** — learn from experienced devs\n6. **Specialize** — become an expert in one area\n7. **Soft skills matter** — communication, teamwork\n8. **Negotiate salary** — know your worth`,
      
      productivity: `**Productivity Tips:**\n\n1. **Pomodoro Technique** — 25 min work, 5 min break\n2. **Time blocking** — dedicate chunks to tasks\n3. **Eating the frog** — do hard tasks first\n4. **Minimize distractions** — silence notifications\n5. **Use tools** — automation, templates\n6. **Delegate** — you can't do everything\n7. **Take breaks** — rest is productive\n8. **Review and adjust** — what works for you?`,
    };

    for (const key in advice) {
      if (topic.toLowerCase().includes(key)) return advice[key];
    }

    return `I can advise on many topics! Try:
- "Advice for coding"
- "Career advice"
- "Productivity tips"
- "Learning advice"

What area would you like advice on?`;
  }

  whyResponse(input) {
    const topic = input.replace(/^(why|ليش|لماذا|ليه)\s*/i, '').trim();
    
    return `That's a great question! Let me analyze this...

**Regarding "${topic}":**

There are several possible explanations:

1. **Historical context** — Many things evolve based on past decisions and constraints
2. **Technical reasons** — Engineering trade-offs between performance, simplicity, and flexibility
3. **Human factors** — Psychology, culture, and social dynamics play a role
4. **Economic incentives** — Market forces and business models influence decisions
5. **Philosophical perspective** — Different viewpoints lead to different conclusions

To give you a more specific answer, could you provide more context about what aspect you're most curious about?`;
  }

  howResponse(input) {
    const topic = input.replace(/^(how|كيف|ازاي)\s*/i, '').trim();
    
    if (/learn|start|begin/i.test(topic)) {
      return `**How to Get Started:**\n\n1. **Choose your path** — web, mobile, data science, etc.\n2. **Learn fundamentals** — HTML/CSS/JS or Python basics\n3. **Build projects** — start small, gradually increase complexity\n4. **Join communities** — Stack Overflow, Reddit, Discord\n5. **Practice daily** — consistency beats intensity\n6. **Read documentation** — official docs are your friend\n7. **Take courses** — structured learning helps\n8. **Build a portfolio** — showcase your projects`;
    }
    
    return `I can explain how things work! Try asking about:\n- "How does the internet work?"\n- "How to learn programming?"\n- "How do neural networks learn?"\n\nWhat would you like to understand?`;
  }

  whereResponse(input) {
    return `I'm a local AI running entirely in your browser. I don't connect to any external servers — all my knowledge and processing happens right on your device. Your data stays private and secure.`;
  }

  whoResponse(input) {
    return `I am **AVATAR AI** — a local, offline-first AI engine built by **AHMEDDEV**. I'm designed to be a powerful assistant that works without any internet connection. Your data never leaves your device.`;
  }

  generalResponse(input) {
    const lower = input.toLowerCase();
    
    for (const [topic, data] of Object.entries(this.knowledge.programming)) {
      if (lower.includes(topic)) {
        if (typeof data === 'object') {
          const keys = Object.keys(data);
          return `**${topic.charAt(0).toUpperCase() + topic.slice(1)}**\n\nI have knowledge about:\n${keys.map(k => `- **${k}**: ${typeof data[k] === 'string' ? data[k].substring(0, 80) + '...' : 'Advanced topics'}`).join('\n')}\n\nAsk me about any specific topic!`;
        }
      }
    }

    for (const [topic, data] of Object.entries(this.knowledge.science)) {
      if (lower.includes(topic)) {
        if (typeof data === 'object') {
          const keys = Object.keys(data);
          return `**${topic.charAt(0).toUpperCase() + topic.slice(1)}**\n\nTopics available:\n${keys.map(k => `- **${k}**`).join('\n')}\n\nWhat would you like to know?`;
        }
      }
    }

    for (const [topic, data] of Object.entries(this.knowledge.technology)) {
      if (lower.includes(topic)) {
        if (typeof data === 'object') {
          const keys = Object.keys(data);
          return `**${topic.charAt(0).toUpperCase() + topic.slice(1)}**\n\nTopics:\n${keys.map(k => `- **${k}**`).join('\n')}\n\nAsk me anything!`;
        }
      }
    }

    const responses = [
      `That's an interesting topic! Let me share what I know...\n\nCould you be more specific? I can help with:\n- Programming and code\n- Science and technology\n- Mathematics\n- General knowledge\n- Creative writing`,
      `I'd love to help with that! Can you provide more details?\n\nI'm knowledgeable about:\n- Various programming languages\n- Scientific concepts\n- Mathematical problems\n- Technology trends\n- And much more!`,
      `Great question! Let me think about that...\n\nI have information on many topics. Try asking about something specific and I'll do my best to help!`,
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  updateUserProfile(input) {
    const nameMatch = input.match(/(?:my name is|i'm|i am|call me)\s+(\w+)/i);
    if (nameMatch) {
      this.userProfile.name = nameMatch[1];
    }
    
    if (input.includes('?')) {
      this.userProfile.topics.curiosity = (this.userProfile.topics.curiosity || 0) + 1;
    }
    
    const words = input.split(/\s+/);
    words.forEach(w => {
      const lower = w.toLowerCase();
      this.userProfile.topics[lower] = (this.userProfile.topics[lower] || 0) + 1;
    });
  }

  detectTopic(input) {
    const topics = {
      code: /code|program|function|class|javascript|python|react|html|css/i,
      math: /math|calculate|solve|equation|formula/i,
      science: /science|physics|chemistry|biology|research/i,
      tech: /technology|ai|machine|learning|computer|software/i,
      general: /.*/,
    };
    
    for (const [topic, pattern] of Object.entries(topics)) {
      if (pattern.test(input)) return topic;
    }
    return 'general';
  }

  analyzeSentiment(input) {
    if (this.patterns.sentiment_positive.test(input)) return 'positive';
    if (this.patterns.sentiment_negative.test(input)) return 'negative';
    return 'neutral';
  }

  calculateConfidence(intent, input) {
    let confidence = 0.5;
    for (const [key, pattern] of Object.entries(this.patterns)) {
      if (pattern.test(input)) {
        confidence += 0.1;
        break;
      }
    }
    return Math.min(confidence + Math.random() * 0.2, 0.95);
  }

  setMode(mode) {
    this.mode = mode;
    return `Mode switched to **${mode}**. I'll now focus on ${mode}-related responses.`;
  }

  getContext() {
    return this.context.slice(-this.maxContext);
  }

  getMemory() {
    return this.memory;
  }

  clearMemory() {
    this.memory = [];
    this.context = [];
    return 'Memory cleared. Starting fresh!';
  }
}

class MathEngine {
  solve(expression) {
    try {
      const cleaned = expression.replace(/[^0-9+\-*/().%\s^]/g, '');
      const result = Function('"use strict"; return (' + cleaned + ')')();
      return result;
    } catch (e) {
      return null;
    }
  }

  factorial(n) {
    if (n <= 1) return 1;
    return n * this.factorial(n - 1);
  }

  fibonacci(n) {
    if (n <= 0) return 0;
    if (n === 1) return 1;
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }

  isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  }

  gcd(a, b) {
    return b === 0 ? a : this.gcd(b, a % b);
  }

  lcm(a, b) {
    return (a * b) / this.gcd(a, b);
  }
}

class Translator {
  constructor() {
    this.dict = {
      'hello': 'مرحبا', 'world': 'عالم', 'good': 'جيد', 'morning': 'صباح',
      'night': 'ليل', 'love': 'حب', 'peace': 'سلام', 'friend': 'صديق',
      'welcome': 'أهلا', 'thanks': 'شكرا', 'water': 'ماء', 'book': 'كتاب',
      'مرحبا': 'hello', 'عالم': 'world', 'جيد': 'good', 'حب': 'love',
      'سلام': 'peace', 'صديق': 'friend', 'شكرا': 'thanks', 'ماء': 'water',
      'كتاب': 'book', 'نعم': 'yes', 'لا': 'no', 'صباح الخير': 'good morning',
    };
  }

  translate(text, from = 'auto') {
    const words = text.split(/\s+/);
    return words.map(w => this.dict[w.toLowerCase()] || w).join(' ');
  }
}

class TextAnalyzer {
  analyze(text) {
    const words = text.split(/\s+/);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim());
    const chars = text.length;
    
    const wordFreq = {};
    words.forEach(w => {
      const lower = w.toLowerCase();
      wordFreq[lower] = (wordFreq[lower] || 0) + 1;
    });

    const sorted = Object.entries(wordFreq).sort((a, b) => b[1] - a[1]);

    return {
      characters: chars,
      words: words.length,
      sentences: sentences.length,
      paragraphs: text.split(/\n\n+/).length,
      averageWordLength: (words.reduce((a, w) => a + w.length, 0) / words.length).toFixed(2),
      readingTime: Math.ceil(words.length / 200) + ' min',
      topWords: sorted.slice(0, 10),
    };
  }

  summarize(text, sentences = 3) {
    const sentArray = text.split(/[.!?]+/).filter(s => s.trim());
    return sentArray.slice(0, sentences).join('. ').trim() + '.';
  }

  extractKeywords(text, count = 5) {
    const stopWords = new Set(['the', 'a', 'an', 'is', 'are', 'was', 'were', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'as', 'it', 'its', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'we', 'they', 'my', 'your', 'his', 'her', 'our', 'their']);
    const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 3 && !stopWords.has(w));
    const freq = {};
    words.forEach(w => freq[w] = (freq[w] || 0) + 1);
    return Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, count).map(([w]) => w);
  }
}

class CreativeEngine {
  writePoem(topic) {
    const poems = {
      nature: `Whispers of the wind through ancient trees,
Sunlight dancing on the morning breeze,
Rivers flowing to the distant sea,
Nature's poetry, forever free.`,
      
      love: `In the garden of the heart, love grows,
Like a river, endlessly it flows,
Through the storms and gentle rain,
Love remains, again, again.`,
      
      technology: `Silicon dreams in circuits deep,
Code awakens from digital sleep,
Ones and zeros dance and sing,
Technology, the modern king.`,
      
      default: `Words flow like water, free and clear,
Ideas bloom from far and near,
In the realm of thought and space,
Creativity finds its place.`
    };
    
    const key = Object.keys(poems).find(k => topic.toLowerCase().includes(k)) || 'default';
    return `**Poem: ${topic || 'Free Verse'}**\n\n${poems[key]}\n\n*Written by AVATAR AI*`;
  }

  writeStory(topic) {
    return `**The ${topic || 'Story'}**\n\nOnce upon a time, in a world not so different from our own, there lived a character who would change everything...\n\nThe journey began on a quiet morning, when the sky was painted in shades of amber and gold. Little did they know, today would be different from all the others.\n\nAs the sun rose higher, so did the adventure. Each step forward revealed something new — a challenge to overcome, a mystery to solve, a friend to make.\n\nAnd so the story continues, chapter by chapter, moment by moment, as all great stories do...\n\n*To be continued...*\n\n**Want me to continue the story?**`;
  }
}

class ReasoningEngine {
  analyzeProsCons(topic) {
    return {
      pros: ['Advantage 1', 'Advantage 2', 'Advantage 3'],
      cons: ['Disadvantage 1', 'Disadvantage 2', 'Disadvantage 3'],
    };
  }

  compareOptions(options) {
    return options.map((opt, i) => ({
      option: opt,
      score: Math.floor(Math.random() * 40) + 60,
      pros: ['Pro 1', 'Pro 2'],
      cons: ['Con 1'],
    }));
  }

  logicalDeduction(premises) {
    return {
      conclusion: 'Based on the premises provided, a logical conclusion can be drawn.',
      confidence: 0.85,
      alternatives: ['Alternative conclusion 1', 'Alternative conclusion 2'],
    };
  }
}

window.AvatarAI = AvatarAI;
