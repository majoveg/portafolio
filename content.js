// Bilingual content for the portfolio.
// All copy lives here so we keep components clean.
// ─────────────────────────────────────────────────────────────────────────────
// CHANGELOG v2.0
// · Sección "Trabajo seleccionado" reestructurada por PROYECTO (no por empresa)
// · 7 casos: mentoria, academia365, yoprofe, americasalud, latam, simbiotica, expoquillota
// · Narrativas enriquecidas con datos reales de investigación y proceso
// · Playground expandido con 6 tarjetas
// · Timeline actualizado con detalle de productos DL Innova
// · CASE_IMAGES: nuevas entradas para mentoria, academia365, latam, expoquillota
// ─────────────────────────────────────────────────────────────────────────────

window.CONTENT = {
  es: {
    nav: { about: "Filosofía", work: "Trabajo", process: "Proceso", contact: "Contacto" },

    hero: {
      eyebrow: "Portafolio · 2026",
      name: ["María Jose", "Vega Diaz"],
      role: "Ingeniera en Diseño de Productos",
      bio: "Diseñadora de productos digitales con cuatro años liderando estrategias para ecosistemas SaaS, B2B y B2C. Investigo antes de decidir, valido antes de construir, mido antes de celebrar.",
      sig: "Quillota, Chile · Disponible para colaborar",
      manifesto: "Pienso desde la pregunta. Construyo desde la evidencia. Entrego con suavidad."
    },

    philosophy: {
      eyebrow: "Filosofía",
      title: ["Diseño que ", { em: "respira" }, ", decisiones que se ", { em: "sostienen" }, "."],
      principles: [
        {
          name: ["La pregunta correcta ", { em: "antes" }, " que la respuesta brillante."],
          body: "Llevo cada conversación con stakeholders hacia el problema raíz, no hacia la solución que ya traen pensada. Establezco límites estratégicos para optimizar recursos."
        },
        {
          name: ["Validar es ", { em: "respetar" }, " el tiempo de las personas."],
          body: "Pruebas de usabilidad, A/B testing, investigación cualitativa y métricas en producto. Los datos son el lenguaje común entre diseño, negocio y desarrollo."
        },
        {
          name: ["Sistemas que ", { em: "cuidan" }, " a quien viene después."],
          body: "Design systems con auto-layout, variables y componentes. Documento como si me fuera mañana — porque algún día me iré, y el producto debe seguir."
        }
      ]
    },

    work: {
      eyebrow: "Trabajo seleccionado",
      title: ["Siete proyectos, ", { em: "una forma" }, " de pensar."],
      lede: "De la salud auditiva al diseño industrial. Del tamizaje clínico al pitch enterprise. Cada caso es una decisión, un método, una métrica que se movió.",
      cases: [
        {
          id: "mentoria",
          year: "2025 — presente",
          title: ["Mentor", { em: "IA" }],
          role: "Líder de Productos",
          summary: "IA que transforma el conocimiento experto en cursos e-learning para empresas.",
          context: "Producir contenido e-learning de calidad para empresas toma semanas y requiere especialistas. MentorIA nació para cambiar eso: una IA que acompaña al experto, entiende la marca del cliente y convierte el conocimiento en curso.",
          process: "Diseñé la experiencia del autor: el flujo completo desde el brief hasta el objeto de aprendizaje terminado. Creé el sistema de brand guidelines por cliente — concepto rector, arquetipo de comunicación, tono, paleta y dirección de arte — para que la IA genere contenido coherente con identidad propia. Validé con equipos de L&D de empresas reales.",
          outcome: "Cursos que antes tardaban semanas ahora se producen en días. El sistema está activo en clientes enterprise como BUPA Chile y escala con cada nuevo contrato.",
          metrics: [
            { value: "−36%", label: "Tiempo de entrega" },
            { value: "BUPA", label: "Cliente enterprise" },
            { value: "IA", label: "Motor creativo" }
          ],
          palette: { bg: "#e3e8f5", a: "#8098d0", b: "#4a5fa8" }
        },
        {
          id: "academia365",
          year: "2025 — presente",
          title: ["Ac@demia", { em: "365" }],
          role: "Líder de Productos",
          summary: "LXP corporativo con IA que transforma la capacitación obligatoria en desarrollo real de talento.",
          context: "Las empresas no necesitan un gestor de cursos — necesitan una plataforma que haga querer aprender. El problema del LMS tradicional: interfaz estática, cursos asignados, sin analítica real. Ac@demia365 compite directamente con esa inercia.",
          process: "Diseñé el sistema completo: onboarding digital para nuevos colaboradores, módulo de competencias con tracking, gamificación con insignias y tabla de clasificación, y perfiles de accesibilidad para TDAH, epilepsia y dislexia. Lideré el pitch comercial a BUPA Chile — propuesta de implementación, plan de migración de datos históricos y modelo de inversión SENCE.",
          outcome: "Una plataforma que compite con LMS globales en experiencia, con un modelo de financiamiento local que hace el cambio viable. Más de 40 funcionalidades lanzadas, clientes enterprise activos.",
          metrics: [
            { value: "+40", label: "Funcionalidades" },
            { value: "BUPA", label: "Pitch enterprise" },
            { value: "WCAG", label: "Accesibilidad" }
          ],
          palette: { bg: "#dff0f0", a: "#68b8b8", b: "#358080" }
        },
        {
          id: "yoprofe",
          year: "2024 — 2025",
          title: ["Yo", { em: "Profe" }],
          role: "Product Designer",
          summary: "Investigación de mercado y rediseño estratégico de una plataforma educativa B2C + B2B.",
          context: "Antes de diseñar una sola pantalla, investigué. 65 respuestas de encuesta, 5 entrevistas en profundidad y 39 reuniones con instituciones revelaron algo inesperado: el problema no era de UX — era de modelo de negocio y de cómo la plataforma se posicionaba ante dos audiencias muy distintas.",
          process: "Identifiqué que YoProfe servía mal a docentes e instituciones al mismo tiempo. Propuse y diseñé YoProfe+ — una suite con IA que automatiza el reclutamiento docente — con análisis de mercado (TAM: 15.614 instituciones, SOM: 100 colegios) y proyección de ingresos. Diseñé el sistema completo: flujos B2C y B2B, sistema de diseño en Figma con auto-layout y variables.",
          outcome: "Conversión de registro +10%, tiempo de desarrollo −25%, y una propuesta de producto fundamentada en datos que reposicionó la plataforma estratégicamente.",
          metrics: [
            { value: "+10%", label: "Conversión de registro" },
            { value: "−25%", label: "Tiempo de desarrollo" },
            { value: "39", label: "Reuniones con instituciones" }
          ],
          palette: { bg: "#e6dce8", a: "#c6a8d5", b: "#9a78b3" }
        },
        {
          id: "americasalud",
          year: "2023 — 2024",
          title: ["America", { em: "Salud" }],
          role: "User Experience Manager",
          summary: "CX integral para plataforma educativa, con foco en retención estudiantil.",
          context: "El producto retenía mal y nadie sabía exactamente dónde se iban los estudiantes. Había datos en planillas dispersas, sin diagnóstico claro del journey.",
          process: "Construí lógicas en Excel para gestionar grandes bases de datos, mapeé el customer journey punto por punto, ejecuté auditorías de usabilidad y propuse rediseños quirúrgicos donde la fricción era mayor.",
          outcome: "Retención estudiantil sostenida al alza, navegación más fluida, y un diagnóstico replicable para próximos cursos.",
          metrics: [
            { value: "↑", label: "Retención sostenida" },
            { value: "1:1", label: "Mapping con datos" },
            { value: "100%", label: "Cursos auditados" }
          ],
          palette: { bg: "#dce6e0", a: "#9bc2b1", b: "#5f8d7c" }
        },
        {
          id: "latam",
          year: "2024",
          title: ["Desafío UX ", { em: "LATAM" }],
          role: "UX Designer · Proceso de selección",
          summary: "Análisis heurístico y rediseño del flujo de compra de vuelos de LATAM Airlines.",
          context: "Un proceso de selección en LATAM Airlines con una tarea clara: identificar problemas en los dos primeros pasos del flujo de compra y proponer un rediseño fundamentado en evidencia. Sin acceso al equipo, sin brief adicional.",
          process: "Apliqué las heurísticas de Nielsen e identifiqué 5 problemas con 7 hipótesis asociadas. Realicé ingeniería inversa del design system existente, wireframing por bloques, diseño atómico (átomos, moléculas, organismos) y micro-interacciones. El diseño final cubre web y mobile.",
          outcome: "Un proceso UX completo documentado — del diagnóstico al prototipo. Muestra cómo pienso cuando enfrento un sistema que no diseñé desde cero.",
          metrics: [
            { value: "5", label: "Problemas identificados" },
            { value: "7", label: "Hipótesis formuladas" },
            { value: "2", label: "Plataformas rediseñadas" }
          ],
          palette: { bg: "#f0e8dc", a: "#d8b870", b: "#a07838" }
        },
        {
          id: "simbiotica",
          year: "2022 — 2023",
          title: ["Salud ", { em: "auditiva" }],
          role: "Product Manager · Product Designer",
          summary: "Tres productos de salud auditiva — Aisot, Tami y OTTO — desde la concepción hasta el mercado.",
          context: "Simbiotica AI partió de cero: sin producto, sin clientes. El foco era el sistema de salud auditivo chileno — fragmentado, con esperas largas y derivaciones innecesarias a especialistas. El desafío era diseñar soluciones que pudieran operar en distintos niveles de atención.",
          process: "Construí tres productos en paralelo: Aisot (identifica 9 patologías auditivas para asistir al médico general), Tami (tamizaje sin médico, operable por TENS y enfermeros) y OTTO (telemedicina que conecta profesionales de salud con otorrinos remotamente, con IA para guiar la grabación del oído). Docenas de entrevistas con otorrinos, médicos generales, TENS y tecnólogos médicos. Observaciones en terreno, pilotos reales, material de venta y postulación a fondos CORFO.",
          outcome: "Tres productos en mercado, financiamiento público asegurado, y un ecosistema que reduce derivaciones innecesarias y democratiza el acceso a la especialidad.",
          metrics: [
            { value: "3", label: "Productos lanzados" },
            { value: "CORFO", label: "Fondos asegurados" },
            { value: "0→1", label: "Etapa cubierta" }
          ],
          palette: { bg: "#e8dce0", a: "#c8a0a8", b: "#986070" }
        },
        {
          id: "expoquillota",
          year: "2025",
          title: ["Expo ", { em: "Quillota" }],
          role: "Diseñadora · Investigadora · Freelance",
          summary: "Galardón, comunicación y research: tres roles en tres meses para una feria provincial.",
          context: "La Municipalidad de Quillota necesitaba más que un diseñador para su feria provincial: alguien que pudiera crear el galardón oficial, comunicar los stands en redes sociales y — al cierre — entender qué vivió cada actor del evento para orientar la próxima edición.",
          process: "Diseñé el galardón desde cero: abstracción de la chirimoya local como concepto rector, construcción del relato, selección de materialidad, iteraciones, render 3D y gestión con tres proveedores hasta producción final. Luego diseñé material de comunicación para redes sociales. Al cierre, ejecuté una investigación cuantitativa post-evento con tres actores (expositores, trabajadores, público general) y presenté los resultados ante el comité municipal.",
          outcome: "Un galardón que comunica identidad territorial, un informe que orienta la próxima edición, y la evidencia de que diseñar bien empieza por escuchar.",
          metrics: [
            { value: "3", label: "Roles en un proyecto" },
            { value: "3", label: "Actores investigados" },
            { value: "1", label: "Objeto físico diseñado" }
          ],
          palette: { bg: "#eaeedc", a: "#b0c070", b: "#6a8030" }
        }
      ]
    },

    skills: {
      eyebrow: "Habilidades",
      title: ["Un ", { em: "mapa" }, ", no una lista."],
      lede: "Las herramientas son herramientas. Lo que conecta unas con otras es el método: pregunto, observo, mido, diseño, vuelvo a preguntar."
    },

    process: {
      eyebrow: "Proceso",
      title: ["Cómo ", { em: "trabajo" }, "."],
      lede: "Iteración no significa empezar de nuevo. Significa volver más informada.",
      manifesto: "No empiezo con pantallas. Empiezo con personas, problemas y datos. Mi enfoque cruza la ingeniería con la sensibilidad: hipótesis claras, iteraciones cortas, sistemas que escalan.",
      steps: ["Escuchar", "Mapear", "Hipotetizar", "Prototipar", "Medir", "Iterar"]
    },

    timeline: {
      eyebrow: "Recorrido",
      title: ["Cuatro años ", { em: "construyendo" }, "."],
      items: [
        { when: "Mayo 2025 — Presente", role: ["Líder de Productos"], co: "DL Innova", blurb: "MentorIA y Ac@demia365: IA para producción de cursos y LXP enterprise con accesibilidad WCAG." },
        { when: "Ago 2024 — Sep 2025", role: ["Product Designer"], co: "YoProfe · Spin-Off DL", blurb: "Investigación de mercado, estrategia de producto y diseño para docentes e instituciones educativas." },
        { when: "Sep 2023 — Sep 2024", role: ["UX Manager"], co: "AmericaSalud · Spin-Off DL", blurb: "Customer journey end-to-end con foco en retención estudiantil." },
        { when: "Ene 2022 — Sep 2023", role: ["PM · Product Designer"], co: "Simbiotica AI", blurb: "De cero a mercado: Aisot, Tami y OTTO — tres productos de salud auditiva y fondos CORFO." },
        { when: "2022 — 2023", role: ["Pasantía en Ingeniería Industrial"], co: "INSA Lyon, Francia", blurb: "Gestión de proyectos e investigación científica." },
        { when: "2018 — 2023", role: ["Ingeniería en Diseño de Productos"], co: "Universidad Técnica Federico Santa María", blurb: "Titulada con nota máxima · 4° lugar del ranking de generación." }
      ]
    },

    playground: {
      eyebrow: "Playground",
      title: ["Experimentos del ", { em: "margen" }, "."],
      lede: "Lo que hago cuando nadie me pide nada. Curiosidad sin brief.",
      cards: [
        { title: ["Los detalles ", { em: "importan" }], cap: "Color · Tipografía · 2025" },
        { title: [{ em: "Branding" }, " como puente"], cap: "Frutabots · Identidad · ongoing" },
        { title: ["Agentes con ", { em: "Claude" }, " + n8n"], cap: "Automation · 2024" },
        { title: ["Poster ", { em: "científico" }], cap: "Comunicación científica · 2025" },
        { title: ["UX en salas de ", { em: "urgencias" }], cap: "Investigación · Tesis · 2023" },
        { title: ["Diagramas a mano ", { em: "digital" }], cap: "Figma · ongoing" }
      ]
    },

    contact: {
      eyebrow: "Hablemos",
      title: ["Hace", { em: "mos" }, " algo."],
      lede: "Estoy abierta a roles de producto, colaboraciones y conversaciones sobre cómo entrelazar investigación, diseño e inteligencia artificial.",
      email: "mjosedvega@gmail.com",
      linkedin: "linkedin.com/in/mariajosevega-d",
      phone: "+56 9 9491 2715",
      location: "Quillota, Chile",
      cv: { label: "Descargar", em: "CV", hint: "actualizado 2026", file: "uploads/cv/CV_Product_Designer.pdf", filename: "MariaJose_Vega_CV.pdf" }
    },

    foot: { left: "© María Jose Vega Diaz · 2026", right: "Hecho con propósito" }
  },

  en: {
    nav: { about: "Philosophy", work: "Work", process: "Process", contact: "Contact" },

    hero: {
      eyebrow: "Portfolio · 2026",
      name: ["María Jose", "Vega Diaz"],
      role: "Product Design Engineer",
      bio: "Digital product designer with four years leading strategy across SaaS, B2B, and B2C ecosystems. I research before deciding, validate before building, measure before celebrating.",
      sig: "Quillota, Chile · Open to collaborate",
      manifesto: "I think from the question. I build from the evidence. I ship with softness."
    },

    philosophy: {
      eyebrow: "Philosophy",
      title: ["Design that ", { em: "breathes" }, ", decisions that ", { em: "hold" }, "."],
      lede: "I don't start with screens. I start with people, problems and data. My approach crosses engineering with sensibility: clear hypotheses, short iterations, systems that scale.",
      principles: [
        {
          name: ["The right question ", { em: "before" }, " the brilliant answer."],
          body: "I guide every stakeholder conversation toward the root problem, not the pre-baked solution. I set strategic boundaries to optimize resources."
        },
        {
          name: ["Validation is ", { em: "respect" }, " for people's time."],
          body: "Usability testing, A/B testing, qualitative research and in-product metrics. Data is the shared language between design, business, and engineering."
        },
        {
          name: ["Systems that ", { em: "care" }, " for whoever comes next."],
          body: "Design systems with auto-layout, variables and components. I document as if I were leaving tomorrow — because one day I will, and the product must continue."
        }
      ]
    },

    work: {
      eyebrow: "Selected work",
      title: ["Seven projects, ", { em: "one way" }, " of thinking."],
      lede: "From auditory health to industrial design. From clinical screening to enterprise pitch. Each case is a decision, a method, a metric that moved.",
      cases: [
        {
          id: "mentoria",
          year: "2025 — present",
          title: ["Mentor", { em: "IA" }],
          role: "Head of Products",
          summary: "AI that transforms expert knowledge into corporate e-learning courses.",
          context: "Producing quality e-learning content for companies takes weeks and requires specialists. MentorIA was built to change that: an AI that accompanies the expert, understands the client's brand, and turns knowledge into a course.",
          process: "I designed the author experience: the complete flow from brief to finished learning object. I created the brand guidelines system per client — core concept, communication archetype, tone, palette, and art direction — so the AI generates content with coherence and its own identity. Validated with real L&D teams at enterprise companies.",
          outcome: "Courses that used to take weeks are now produced in days. The system is live with enterprise clients like BUPA Chile and scales with each new contract.",
          metrics: [
            { value: "−36%", label: "Delivery time" },
            { value: "BUPA", label: "Enterprise client" },
            { value: "AI", label: "Creative engine" }
          ],
          palette: { bg: "#e3e8f5", a: "#8098d0", b: "#4a5fa8" }
        },
        {
          id: "academia365",
          year: "2025 — present",
          title: ["Ac@demia", { em: "365" }],
          role: "Head of Products",
          summary: "AI-powered corporate LXP that turns mandatory training into real talent development.",
          context: "Companies don't need a course manager — they need a platform that makes people want to learn. The traditional LMS problem: static interface, assigned courses, no real analytics. Ac@demia365 competes directly with that inertia.",
          process: "I designed the full system: digital onboarding for new staff, competency module with tracking, badge-based gamification and leaderboard, and accessibility profiles for ADHD, epilepsy, and dyslexia. I led the commercial pitch to BUPA Chile — implementation proposal, historical data migration plan, and SENCE financing model.",
          outcome: "A platform that competes with global LMS in experience, with a local financing model that makes the switch viable. Over 40 features launched, active enterprise clients.",
          metrics: [
            { value: "+40", label: "Features launched" },
            { value: "BUPA", label: "Enterprise pitch" },
            { value: "WCAG", label: "Accessibility" }
          ],
          palette: { bg: "#dff0f0", a: "#68b8b8", b: "#358080" }
        },
        {
          id: "yoprofe",
          year: "2024 — 2025",
          title: ["Yo", { em: "Profe" }],
          role: "Product Designer",
          summary: "Market research and strategic redesign of a B2C + B2B education platform.",
          context: "Before designing a single screen, I researched. 65 survey responses, 5 in-depth interviews, and 39 institutional meetings revealed something unexpected: the problem wasn't UX — it was the business model and how the platform positioned itself to two very different audiences.",
          process: "I found that YoProfe was poorly serving teachers and institutions at the same time. I proposed and designed YoProfe+ — an AI suite automating teacher recruitment — with market analysis (TAM: 15,614 institutions, SOM: 100 schools) and revenue projections. I designed the full system: B2C and B2B flows, Figma design system with auto-layout and variables.",
          outcome: "Sign-up conversion +10%, development time −25%, and a data-backed product proposal that strategically repositioned the platform.",
          metrics: [
            { value: "+10%", label: "Sign-up conversion" },
            { value: "−25%", label: "Dev time" },
            { value: "39", label: "Institutional meetings" }
          ],
          palette: { bg: "#e6dce8", a: "#c6a8d5", b: "#9a78b3" }
        },
        {
          id: "americasalud",
          year: "2023 — 2024",
          title: ["America", { em: "Salud" }],
          role: "UX Manager",
          summary: "Integral CX for an education platform, focused on student retention.",
          context: "The product was retaining poorly and nobody knew exactly where students dropped off. Data lived in scattered spreadsheets, no clear journey diagnosis.",
          process: "Built advanced Excel logic to manage large databases, mapped the customer journey point by point, ran usability audits, and proposed surgical redesigns where friction peaked.",
          outcome: "Sustained retention growth, smoother navigation, and a replicable diagnosis framework for future cohorts.",
          metrics: [
            { value: "↑", label: "Sustained retention" },
            { value: "1:1", label: "Data-mapped journey" },
            { value: "100%", label: "Audited courses" }
          ],
          palette: { bg: "#dce6e0", a: "#9bc2b1", b: "#5f8d7c" }
        },
        {
          id: "latam",
          year: "2024",
          title: ["UX Challenge ", { em: "LATAM" }],
          role: "UX Designer · Selection process",
          summary: "Heuristic analysis and redesign of LATAM Airlines' flight booking flow.",
          context: "A LATAM Airlines selection process with a clear brief: identify problems in the first two steps of the booking flow and propose an evidence-based redesign. No team access, no additional brief.",
          process: "I applied Nielsen's heuristics and identified 5 problems with 7 associated hypotheses. I reverse-engineered the existing design system, wireframed block by block, applied atomic design (atoms, molecules, organisms), and designed micro-interactions. Final design covers web and mobile.",
          outcome: "A fully documented UX process — from diagnosis to prototype. It shows how I think when facing a system I didn't design from scratch.",
          metrics: [
            { value: "5", label: "Problems identified" },
            { value: "7", label: "Hypotheses formed" },
            { value: "2", label: "Platforms redesigned" }
          ],
          palette: { bg: "#f0e8dc", a: "#d8b870", b: "#a07838" }
        },
        {
          id: "simbiotica",
          year: "2022 — 2023",
          title: ["Auditory ", { em: "health" }],
          role: "Product Manager · Product Designer",
          summary: "Three auditory health products — Aisot, Tami and OTTO — from concept to market.",
          context: "Simbiotica AI started at zero: no product, no clients. The focus was Chile's auditory health system — fragmented, with long waits and unnecessary referrals to specialists. The challenge was designing solutions that could work at different levels of care.",
          process: "I built three products in parallel: Aisot (identifies 9 auditory pathologies to assist GPs), Tami (screening without a doctor, operable by nurses and health technicians), and OTTO (telemedicine connecting health professionals with remote ENTs, with AI guiding the ear recording). Dozens of interviews with ENTs, GPs, nurses, and medical technologists. Field observations, real pilots, sales materials, and CORFO public funding application.",
          outcome: "Three products in market, public funding secured, and an ecosystem that reduces unnecessary referrals and democratizes access to specialty care.",
          metrics: [
            { value: "3", label: "Products shipped" },
            { value: "CORFO", label: "Funding won" },
            { value: "0→1", label: "Stage covered" }
          ],
          palette: { bg: "#e8dce0", a: "#c8a0a8", b: "#986070" }
        },
        {
          id: "expoquillota",
          year: "2025",
          title: ["Expo ", { em: "Quillota" }],
          role: "Designer · Researcher · Freelance",
          summary: "Award design, communications, and research: three roles in three months for a provincial fair.",
          context: "The Quillota Municipality needed more than a designer for their provincial fair: someone who could create the official award, communicate stands on social media, and — at close — understand what each event stakeholder experienced to guide the next edition.",
          process: "I designed the award from scratch: abstraction of the local chirimoya fruit as the core concept, narrative construction, material selection, iterations, 3D render, and coordination with three vendors through final production. Then I designed social media communication assets. At close, I ran a post-event quantitative study with three stakeholder groups (exhibitors, staff, public) and presented findings to the municipal committee.",
          outcome: "An award that communicates territorial identity, a report that guides the next edition, and proof that good design starts with listening.",
          metrics: [
            { value: "3", label: "Roles in one project" },
            { value: "3", label: "Stakeholders studied" },
            { value: "1", label: "Physical object designed" }
          ],
          palette: { bg: "#eaeedc", a: "#b0c070", b: "#6a8030" }
        }
      ]
    },

    skills: {
      eyebrow: "Skills",
      title: ["A ", { em: "map" }, ", not a list."],
      lede: "Tools are tools. What connects them is the method: I ask, observe, measure, design, then ask again."
    },

    process: {
      eyebrow: "Process",
      title: ["How I ", { em: "work" }, "."],
      lede: "Iteration doesn't mean starting over. It means coming back more informed.",
      manifesto: "I don't start with screens. I start with people, problems and data. My approach crosses engineering with sensibility: clear hypotheses, short iterations, systems that scale.",
      steps: ["Listen", "Map", "Hypothesize", "Prototype", "Measure", "Iterate"]
    },

    timeline: {
      eyebrow: "Path",
      title: ["Four years ", { em: "building" }, "."],
      items: [
        { when: "May 2025 — Present", role: ["Head of Products"], co: "DL Innova", blurb: "MentorIA and Ac@demia365: AI for course production and enterprise LXP with WCAG accessibility." },
        { when: "Aug 2024 — Sep 2025", role: ["Product Designer"], co: "YoProfe · DL Spin-Off", blurb: "Market research, product strategy, and design for teachers and educational institutions." },
        { when: "Sep 2023 — Sep 2024", role: ["UX Manager"], co: "AmericaSalud · DL Spin-Off", blurb: "End-to-end customer journey focused on student retention." },
        { when: "Jan 2022 — Sep 2023", role: ["PM · Product Designer"], co: "Simbiotica AI", blurb: "From zero to market: Aisot, Tami and OTTO — three auditory health products and CORFO funding." },
        { when: "2022 — 2023", role: ["Industrial Engineering Internship"], co: "INSA Lyon, France", blurb: "Project management and scientific research." },
        { when: "2018 — 2023", role: ["Product Design Engineering"], co: "Universidad Técnica Federico Santa María", blurb: "Graduated with top honors · 4th in class ranking." }
      ]
    },

    playground: {
      eyebrow: "Playground",
      title: ["Notes from the ", { em: "margins" }, "."],
      lede: "What I make when no one is asking. Curiosity without a brief.",
      cards: [
        { title: ["Details ", { em: "matter" }], cap: "Color · Type · 2025" },
        { title: [{ em: "Branding" }, " as a bridge"], cap: "Frutabots · Identity · ongoing" },
        { title: ["Agents with ", { em: "Claude" }, " + n8n"], cap: "Automation · 2024" },
        { title: ["Scientific ", { em: "poster" }], cap: "Science communication · 2025" },
        { title: ["UX in ", { em: "emergency" }, " rooms"], cap: "Research · Thesis · 2023" },
        { title: ["Diagrams by ", { em: "digital" }, " hand"], cap: "Figma · ongoing" }
      ]
    },

    contact: {
      eyebrow: "Let's talk",
      title: ["Let's make ", { em: "something" }, "."],
      lede: "I'm open to product roles, collaborations, and conversations about weaving research, design and AI together.",
      email: "mjosedvega@gmail.com",
      linkedin: "linkedin.com/in/mariajosevega-d",
      phone: "+56 9 9491 2715",
      location: "Quillota, Chile",
      cv: { label: "Download", em: "CV", hint: "updated 2026", file: "uploads/cv/CV_Product_Designer.pdf", filename: "MariaJose_Vega_CV.pdf" }
    },

    foot: { left: "© María Jose Vega Diaz · 2026", right: "Made with purpose" }
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// CASE_IMAGES — image slots per case.
// Drop files into `uploads/` matching the `src` path and the right treatment
// is applied automatically based on `kind`. While `src` is empty / missing,
// a placeholder with the slot's hint shows what to put there.
//
// `kind` values:
//   "photo"   — duotono cálido. Para fotos editoriales, retratos, workshops.
//   "ui"      — sin filtro, frame estilo browser. Para capturas de producto.
//   "diagram" — sin filtro, fondo neutro. Para journey maps, diagramas.
//   "float"   — tratamiento hero con gradiente de color de la paleta del caso.
//
// `size` values (gallery slots):
//   "lg"       — grande, ocupa columna principal
//   "md"       — mediano estándar
//   "md-wide"  — mediano pero ancho (2/3 del ancho)
//   "sm"       — pequeño cuadrado
//   "sm-fill"  — pequeño pero rellena el espacio disponible
//   "tall"     — vertical (más alto que ancho)
//   "wide"     — horizontal apaisado
//   "portrait" — vertical en proporción retrato
// ─────────────────────────────────────────────────────────────────────────────
window.CASE_IMAGES = {

  // ── 01 MENTORIA ────────────────────────────────────────────────────────────
  mentoria: {
    hero: {
      src: "uploads/mentoria/hero.jpg",
      kind: "float",
      tag: "HERO",
      hint_es: "Foto editorial: persona frente a pantalla con interfaz de MentorIA visible, duotono cálido azul-índigo",
      hint_en: "Editorial photo: person in front of screen with MentorIA interface visible, warm blue-indigo duotone",
      specs: "16:9 · 1600w+ · jpg · FOTO"
    },
    gallery: [
      {
        src: "uploads/mentoria/flujo-autor.png", size: "lg", tag: "FLUJO AUTOR",
        kind: "ui", chromeLabel: "MentorIA · Crear nuevo curso",
        hint_es: "Captura del flujo de creación de curso — pantalla principal o paso clave del proceso de autor",
        hint_en: "Course creation flow capture — main screen or key step in the author process",
        specs: "4:3 · 1400w · png · UI"
      },
      {
        src: "uploads/mentoria/brand-guidelines.jpg", size: "sm-fill", tag: "BRAND GUIDE",
        kind: "diagram",
        hint_es: "Captura del documento de brand guidelines de un cliente — paleta, arquetipo, tono visible",
        hint_en: "Client brand guidelines document capture — palette, archetype, tone visible",
        specs: "4:3 · 1200w · jpg · DIAGRAMA"
      },
      {
        src: "uploads/mentoria/bupa-pitch.png", size: "md-wide", tag: "PITCH BUPA",
        kind: "ui", chromeLabel: "Propuesta comercial · BUPA Chile · dic 2025",
        hint_es: "Slide destacado del pitch a BUPA — visual de producto, sin datos sensibles de precio",
        hint_en: "Highlighted slide from BUPA pitch — product visual only, no sensitive pricing data",
        specs: "16:9 · 1600w · png · UI",
        download: {
          href: "uploads/mentoria/caso-estudio-mentoria.pdf",
          label: "Caso de estudio — MentorIA"
        }
      }
    ]
  },

  // ── 02 ACADEMIA365 ──────────────────────────────────────────────────────────
  academia365: {
    hero: {
      src: "uploads/academia365/hero.jpg",
      kind: "float",
      tag: "HERO",
      hint_es: "Mockup editorial: laptop con Academia365 abierto sobre escritorio real, duotono cálido teal",
      hint_en: "Editorial mockup: laptop with Academia365 open on real desk, warm teal duotone",
      specs: "16:9 · 1600w+ · jpg · FOTO"
    },
    gallery: [
      {
        src: "uploads/academia365/dashboard.png", size: "lg", tag: "DASHBOARD",
        kind: "ui", chromeLabel: "academia365.cl/inicio",
        hint_es: "Dashboard principal de Academia365 — cursos recomendados, progreso y biblioteca de contenidos",
        hint_en: "Academia365 main dashboard — recommended courses, progress, and content library",
        specs: "4:3 · 1400w · png · UI"
      },
      {
        src: "uploads/academia365/accesibilidad.png", size: "sm", tag: "ACCESIBILIDAD",
        kind: "ui", chromeLabel: "Opciones de accesibilidad · Academia365",
        hint_es: "Panel de accesibilidad con perfiles TDAH, epilepsia, dislexia — captura real de la app",
        hint_en: "Accessibility panel with ADHD, epilepsy, dyslexia profiles — real app capture",
        specs: "1:1 · 1200w · png · UI"
      },
      {
        src: "uploads/academia365/onboarding.png", size: "md", tag: "ONBOARDING",
        kind: "ui", chromeLabel: "Onboarding digital · Academia365",
        hint_es: "Módulo de onboarding para nuevo colaborador — checklist de bienvenida o progreso de etapas",
        hint_en: "New employee digital onboarding — welcome checklist or stage progress screen",
        specs: "4:3 · 1200w · png · UI"
      },
      {
        src: "uploads/academia365/gamificacion.png", size: "md-wide", tag: "GAMIFICACIÓN",
        kind: "ui", chromeLabel: "Insignias y logros · Academia365",
        hint_es: "Sistema de gamificación — insignias, tabla de clasificación o perfil de logros del colaborador",
        hint_en: "Gamification system — badges, leaderboard, or employee achievement profile",
        specs: "16:9 · 1600w · png · UI",
        download: {
          href: "uploads/academia365/caso-estudio-academia365.pdf",
          label: "Caso de estudio — Ac@demia365"
        }
      }
    ]
  },

  // ── 03 YOPROFE ──────────────────────────────────────────────────────────────
  yoprofe: {
    hero: {
      src: "uploads/yoprofe/hero.png",
      kind: "float",
      tag: "HERO",
      hint_es: "Foto editorial: docente real usando YoProfe en contexto (tablet, desktop o aula), duotono cálido",
      hint_en: "Editorial photo: real teacher using YoProfe in context (tablet, desktop or classroom), warm duotone",
      specs: "16:9 · 1600w+ · jpg · FOTO"
    },
    gallery: [
      {
        src: "uploads/yoprofe/dashboard.png", size: "lg", tag: "DASHBOARD",
        kind: "ui", chromeLabel: "app.yoprofe.cl/dashboard",
        hint_es: "Dashboard del profesor — vista principal con datos creíbles, captura desde la app real o Figma @2x",
        hint_en: "Teacher dashboard — main view with believable data, captured from the real app or Figma @2x",
        specs: "4:3 · 1400w · png · UI"
      },
      {
        src: "uploads/yoprofe/research.jpg", size: "sm", tag: "RESEARCH",
        kind: "photo",
        hint_es: "Captura de datos de investigación, encuesta o entrevista con docente (screenshot de Zoom OK)",
        hint_en: "Research data capture, survey, or teacher interview (Zoom screenshot OK)",
        specs: "1:1 · 1200w · jpg · FOTO"
      },
      {
        src: "uploads/yoprofe/mobile.png", size: "tall", tag: "MOBILE",
        kind: "ui", chromeLabel: "YoProfe · iOS",
        hint_es: "Mockup mobile — flujo de registro o perfil docente paso a paso",
        hint_en: "Mobile mockup — registration flow or teacher profile step by step",
        specs: "3:4 · 900w · png · UI"
      },
      {
        src: "uploads/yoprofe/design-system.png", size: "md", tag: "SISTEMA",
        kind: "ui", chromeLabel: "Figma · YoProfe Design System",
        hint_es: "Variables y componentes del design system YoProfe en Figma — auto-layout visible",
        hint_en: "Variables and components of the YoProfe design system in Figma — auto-layout visible",
        specs: "4:3 · 1400w · png · UI"
      }
    ],
    video: {
      youtubeId: "I0b00B6ozdg",
      label_es: "Presentación / Demo",
      label_en: "Presentation / Demo"
    }
  },

  // ── 04 AMERICASALUD ─────────────────────────────────────────────────────────
  americasalud: {
    hero: {
      src: "uploads/americasalud/hero.png",
      kind: "float",
      tag: "HERO",
      hint_es: "Customer journey map a tamaño completo — export limpio de Figma/Miro, fondo crudo, sin chrome",
      hint_en: "Full-bleed customer journey map — clean Figma/Miro export, raw background, no chrome",
      specs: "16:9 · 1800w+ · png · DIAGRAMA"
    },
    gallery: [
      {
        src: "uploads/americasalud/journey.png", size: "wide", tag: "JOURNEY",
        kind: "diagram",
        hint_es: "Customer journey en detalle — touchpoints, emociones y oportunidades por etapa del estudiante",
        hint_en: "Customer journey close-up — touchpoints, emotions and opportunities per student stage",
        specs: "16:7 · 1800w · png · DIAGRAMA"
      },
      {
        src: "uploads/americasalud/before-after.png", size: "sm", tag: "BEFORE/AFTER",
        kind: "photo",
        hint_es: "Antes vs. después de una pantalla clave (split horizontal o dos frames lado a lado)",
        hint_en: "Before vs. after of a key screen (horizontal split or two side-by-side frames)",
        specs: "4:3 · 1400w · png · UI"
      },
      {
        src: "uploads/americasalud/actividad.jpg", size: "lg", tag: "ACTIVIDAD",
        kind: "diagram",
        hint_es: "Foto de la actividad interactiva diseñada para el curso de inducción AmericaSalud",
        hint_en: "Photo of the interactive activity designed for the AmericaSalud induction course",
        specs: "4:3 · 1400w · jpg · FOTO",
        download: {
          href: "uploads/americasalud/actividad-bioseguridad.html",
          label: "Abrir actividad",
          open: true
        }
      }
    ]
  },

  // ── 05 LATAM ────────────────────────────────────────────────────────────────
  latam: {
    hero: {
      src: "uploads/latam/hero.png",
      kind: "float",
      tag: "HERO",
      hint_es: "Captura del diseño final rediseñado — pantalla de selección de vuelo web, sin chrome de browser",
      hint_en: "Final redesign capture — web flight selection screen, no browser chrome",
      specs: "16:9 · 1600w+ · png · UI"
    },
    gallery: [
      {
        src: "uploads/latam/heuristica.png", size: "lg", tag: "HEURÍSTICA",
        kind: "diagram",
        hint_es: "Slide del análisis heurístico — problema identificado con captura del UI original anotado",
        hint_en: "Heuristic analysis slide — identified problem with annotated original UI capture",
        specs: "16:9 · 1600w · png · DIAGRAMA"
      },
      {
        src: "uploads/latam/wireframe.png", size: "sm-fill", tag: "WIREFRAME",
        kind: "diagram",
        hint_es: "Wireframe de la solución propuesta — bloques estructurales, sin color final",
        hint_en: "Wireframe of the proposed solution — structural blocks, no final color",
        specs: "4:3 · 1200w · png · DIAGRAMA"
      },
      {
        src: "uploads/latam/atomic.png", size: "md", tag: "ATOMIC DESIGN",
        kind: "ui", chromeLabel: "Figma · LATAM Components",
        hint_es: "Componentes diseñados con metodología atómica — átomos, moléculas y organismos visibles",
        hint_en: "Components designed with atomic methodology — atoms, molecules and organisms visible",
        specs: "4:3 · 1200w · png · UI"
      },
      {
        src: "uploads/latam/final-web.png", size: "md-wide", tag: "DISEÑO FINAL",
        kind: "ui", chromeLabel: "LATAM Airlines · Selección de vuelo (rediseño)",
        hint_es: "Pantalla final rediseñada — selección de vuelo con barra de progreso y resumen de viaje",
        hint_en: "Final redesigned screen — flight selection with progress bar and trip summary",
        specs: "16:9 · 1600w · png · UI",
        download: {
          href: "uploads/latam/desafio-ux-latam.pdf",
          label: "Ver presentación completa"
        }
      }
    ]
  },

  // ── 06 SIMBIOTICA ───────────────────────────────────────────────────────────
  simbiotica: {
    hero: {
      src: "uploads/simbiotica/hero.png",
      kind: "float",
      tag: "HERO",
      hint_es: "Composición editorial de los tres productos Aisot, Tami y OTTO — collage de pantallas o duotono",
      hint_en: "Editorial composition of Aisot, Tami and OTTO — screen collage or duotone",
      specs: "16:9 · 1600w+ · jpg · FOTO"
    },
    gallery: [
      {
        src: "uploads/simbiotica/aisot.png", size: "portrait", tag: "AISOT",
        kind: "ui", chromeLabel: "Aisot · Diagnóstico auditivo",
        hint_es: "Interfaz principal de Aisot — pantalla de análisis auditivo o resultado de diagnóstico para médico general",
        hint_en: "Aisot main interface — auditory analysis screen or diagnosis result for GP",
        specs: "9:16 · 900w · png · UI"
      },
      {
        src: "uploads/simbiotica/tami.png", size: "portrait", tag: "TAMI",
        kind: "ui", chromeLabel: "Tami · Tamizaje auditivo",
        hint_es: "Interfaz de Tami — pantalla de resultado de tamizaje para TENS (tapón, sin patología, indicio de patología)",
        hint_en: "Tami interface — screening result for health technician (wax, no pathology, pathology indication)",
        specs: "9:16 · 900w · png · UI"
      },
      {
        src: "uploads/simbiotica/otto.png", size: "portrait", tag: "OTTO",
        kind: "ui", chromeLabel: "OTTO · Telemedicina auditiva",
        hint_es: "Interfaz de OTTO — pantalla del profesional grabando el oído con guía de IA, o del otorrino revisando caso remoto",
        hint_en: "OTTO interface — professional recording ear with AI guidance, or ENT reviewing a remote case",
        specs: "9:16 · 900w · png · UI"
      },
      {
        src: "uploads/simbiotica/terreno.jpg", size: "md-wide", tag: "TERRENO",
        kind: "photo",
        hint_es: "Foto de observación en terreno o entrevista con profesional de salud — consulta, hospital u operativo",
        hint_en: "Field observation or health professional interview — clinic, hospital or health campaign setting",
        specs: "16:9 · 1400w · jpg · FOTO",
        download: {
          href: "uploads/simbiotica/UX-en-salas-de-urgencias.pdf",
          label: "UX en salas de urgencias"
        }
      }
    ]
  },

  // ── 07 EXPO QUILLOTA ────────────────────────────────────────────────────────
  expoquillota: {
    hero: {
      src: "uploads/expoquillota/hero.jpg",
      kind: "float",
      tag: "HERO",
      hint_es: "Foto del galardón físico terminado — sobre superficie neutra o en manos de alguien, duotono cálido oliva",
      hint_en: "Photo of the finished physical award — on neutral surface or held, warm olive duotone",
      specs: "16:9 · 1600w+ · jpg · FOTO"
    },
    gallery: [
      {
        src: "uploads/expoquillota/proceso-galardon.jpg", size: "lg", tag: "PROCESO",
        kind: "photo",
        hint_es: "Collage o secuencia del proceso de diseño del galardón: bocetos iniciales, iteraciones y objeto final",
        hint_en: "Design process collage or sequence: initial sketches, iterations and final object",
        specs: "4:3 · 1400w · jpg · FOTO"
      },
      {
        src: "uploads/expoquillota/render.png", size: "sm-fill", tag: "RENDER",
        kind: "ui", chromeLabel: "Render 3D · Galardón Expo Quillota 2025",
        hint_es: "Render 3D del galardón final — vista frontal o composición con contexto de la feria",
        hint_en: "3D render of the final award — front view or composition with fair context",
        specs: "1:1 · 1200w · png · UI"
      },
      {
        src: "uploads/expoquillota/rrss.jpg", size: "md", tag: "REDES",
        kind: "ui", chromeLabel: "Material RRSS · Expo Quillota 2025",
        hint_es: "Selección de piezas para redes sociales — stories, posts o grid de Instagram para stands de la feria",
        hint_en: "Social media pieces selection — stories, posts or Instagram grid for fair stands",
        specs: "1:1 · 1200w · png · UI"
      },
      {
        src: "uploads/expoquillota/investigacion.png", size: "md-wide", tag: "INVESTIGACIÓN",
        kind: "diagram",
        hint_es: "Slide o gráfico del informe post-evento — resultados por actor (expositores, trabajadores, público) o hallazgo clave",
        hint_en: "Post-event report slide or chart — results by stakeholder (exhibitors, staff, public) or key finding",
        specs: "16:9 · 1600w · png · DIAGRAMA"
      }
    ]
  }

};
