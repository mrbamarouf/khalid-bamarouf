export type Locale = "en" | "ar";

type Direction = "ltr" | "rtl";

export type NavigationItem = {
  label: string;
  href: string;
};

export type ExpertiseItem = {
  name: string;
  short: string;
  focus: string;
  value: string;
  signals: string[];
};

export type CapabilityGroup = {
  title: string;
  intro: string;
  capabilities: string[];
};

export type ApproachStep = {
  number: string;
  title: string;
  body: string;
};

export type SystemStudy = {
  label: string;
  title: string;
  image: string;
  summary: string;
  challenge: string;
  structure: string[];
  value: string;
};

export type Principle = {
  title: string;
  body: string;
};

export type Insight = {
  title: string;
  body: string;
};

export type ContactField = {
  label: string;
  name: string;
  type: "text" | "email" | "textarea";
  placeholder: string;
};

export type ContactLink = {
  label: string;
  value: string;
  href?: string;
};

export type SiteContent = {
  locale: Locale;
  direction: Direction;
  brand: {
    name: string;
    role: string;
    logoAlt: string;
  };
  nav: NavigationItem[];
  language: {
    current: string;
    alternate: string;
    switchLabel: string;
  };
  labels: {
    expertise: string;
    capabilities: string;
    approach: string;
    studies: string;
    insights: string;
    challenge: string;
    structure: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    metrics: { label: string; value: string }[];
  };
  positioning: {
    title: string;
    lead: string;
    body: string;
    notes: string[];
  };
  expertise: {
    title: string;
    lead: string;
    items: ExpertiseItem[];
  };
  capabilities: {
    title: string;
    lead: string;
    groups: CapabilityGroup[];
  };
  approach: {
    title: string;
    lead: string;
    steps: ApproachStep[];
  };
  studies: {
    title: string;
    lead: string;
    items: SystemStudy[];
  };
  why: {
    title: string;
    lead: string;
    principles: Principle[];
  };
  insights: {
    title: string;
    lead: string;
    items: Insight[];
  };
  contact: {
    title: string;
    lead: string;
    email: string;
    subject: string;
    whatsappLabel: string;
    emailLabel: string;
    button: string;
    channels: ContactLink[];
    fields: ContactField[];
  };
  footer: {
    statement: string;
  };
};

export const siteContent: Record<Locale, SiteContent> = {
  en: {
    locale: "en",
    direction: "ltr",
    brand: {
      name: "Khalid Bamarouf",
      role: "Systems Architect and Technical Consultant",
      logoAlt: "Khalid Bamarouf gold monogram",
    },
    nav: [
      { label: "Expertise", href: "#expertise" },
      { label: "Capabilities", href: "#capabilities" },
      { label: "Studies", href: "#studies" },
      { label: "Contact", href: "#contact" },
    ],
    language: {
      current: "EN",
      alternate: "AR",
      switchLabel: "Switch language",
    },
    labels: {
      expertise: "Expertise",
      capabilities: "Capability System",
      approach: "Approach",
      studies: "Exhibition",
      insights: "Insights",
      challenge: "Challenge",
      structure: "Structure",
    },
    hero: {
      eyebrow: "Systems architecture for serious technical decisions",
      title: "Complex systems. Clearly engineered.",
      lead:
        "Enterprise architecture, backend platforms, automation, AI operating layers, cloud infrastructure, and integration work shaped for organizations where failure is expensive.",
      primaryCta: "Start a conversation",
      secondaryCta: "Explore expertise",
      metrics: [
        { label: "Discipline", value: "Architecture to execution" },
        { label: "Focus", value: "Critical systems and operations" },
        { label: "Mode", value: "Advisory, design, and build" },
      ],
    },
    positioning: {
      title: "A technical partner for systems that carry real business weight.",
      lead:
        "Khalid works where business intent, engineering depth, and operating reality meet.",
      body:
        "The work begins by making the invisible structure visible: dependencies, flows, risks, interfaces, ownership, governance, and the decisions that will either strengthen a system or trap it.",
      notes: [
        "Clarifies complex technical landscapes for decision-makers.",
        "Designs architecture that can be operated, measured, and evolved.",
        "Connects strategy to backend engineering, automation, cloud, data, and AI.",
      ],
    },
    expertise: {
      title: "Expertise with structural consequence.",
      lead:
        "Each discipline is treated as part of one operating system, not as a decorative service line.",
      items: [
        {
          name: "Enterprise Architecture",
          short: "Decision systems, platform maps, and technical operating models.",
          focus:
            "Turns business goals into architecture, domains, integration boundaries, governance, and investment sequence.",
          value:
            "Leaders see what should be built, what should be removed, and which decisions must be protected.",
          signals: ["Domain boundaries", "Capability maps", "Platform strategy"],
        },
        {
          name: "Backend Engineering",
          short: "Reliable services, APIs, data flows, and operational foundations.",
          focus:
            "Shapes services around ownership, data integrity, latency, resilience, observability, and future change.",
          value:
            "Teams gain systems that are easier to reason about, scale, secure, and maintain.",
          signals: ["Service design", "API contracts", "Observability"],
        },
        {
          name: "Automation and Operations",
          short: "Workflow automation, controls, telemetry, and process intelligence.",
          focus:
            "Identifies repeated operational pressure and designs automation with clear human control and audit trails.",
          value:
            "Operations become faster and calmer without losing accountability or judgment.",
          signals: ["Workflow logic", "Control points", "Operational telemetry"],
        },
        {
          name: "AI-Enabled Systems",
          short: "Model placement, orchestration, data readiness, and governance.",
          focus:
            "Places AI inside useful workflows with retrieval, permissions, evaluation, escalation, and measurable outcomes.",
          value:
            "AI becomes an accountable system capability instead of an isolated experiment.",
          signals: ["Model orchestration", "Evaluation loops", "Human escalation"],
        },
        {
          name: "Cloud, APIs, and Integration",
          short: "Infrastructure patterns, integration design, and platform connectivity.",
          focus:
            "Connects platforms through deliberate contracts, secure infrastructure, deployment paths, and lifecycle controls.",
          value:
            "The organization gains a cleaner technical spine for products, teams, and data movement.",
          signals: ["Cloud foundations", "Integration patterns", "Security posture"],
        },
      ],
    },
    capabilities: {
      title: "Capabilities built for difficult systems.",
      lead:
        "The offering is not a menu of disconnected tasks. It is a way to bring clarity, architecture, and execution into one disciplined engagement.",
      groups: [
        {
          title: "Architecture and Strategy",
          intro: "For organizations deciding what the system must become.",
          capabilities: [
            "Enterprise architecture assessment",
            "Digital operating model design",
            "Platform and capability roadmaps",
            "Technical decision frameworks",
          ],
        },
        {
          title: "Engineering and Integration",
          intro: "For teams that need the architecture to survive implementation.",
          capabilities: [
            "Backend service architecture",
            "API and integration design",
            "Cloud infrastructure planning",
            "Data movement and system boundaries",
          ],
        },
        {
          title: "Automation and AI Infrastructure",
          intro: "For operations that need intelligence, control, and scale.",
          capabilities: [
            "Workflow automation architecture",
            "AI operating platform design",
            "Evaluation and governance loops",
            "Monitoring, escalation, and control design",
          ],
        },
      ],
    },
    approach: {
      title: "A measured path from ambiguity to architecture.",
      lead:
        "The method is calm because the systems are demanding. Each phase reduces risk, sharpens decisions, and moves the work closer to operation.",
      steps: [
        {
          number: "01",
          title: "Discover",
          body:
            "Expose goals, constraints, risks, dependencies, existing systems, and the real operating pressure behind the request.",
        },
        {
          number: "02",
          title: "Architect",
          body:
            "Define the target structure, domains, interfaces, information flows, controls, and the decisions that need executive alignment.",
        },
        {
          number: "03",
          title: "Engineer",
          body:
            "Convert architecture into services, platforms, automations, data paths, and measurable technical behavior.",
        },
        {
          number: "04",
          title: "Integrate",
          body:
            "Connect systems through stable contracts, secure operations, observability, and change paths that teams can sustain.",
        },
        {
          number: "05",
          title: "Evolve",
          body:
            "Measure the system in use, tune decisions, strengthen controls, and prepare the next layer of capability.",
        },
      ],
    },
    studies: {
      title: "Selected system studies.",
      lead:
        "Conceptual studies show how Khalid frames difficult technical work when client details are confidential.",
      items: [
        {
          label: "Integration Architecture",
          title: "Enterprise Integration Architecture",
          image: "/images/integration-cabling.jpg",
          summary:
            "A target architecture for connecting fragmented business platforms through governed APIs, events, data boundaries, and operational ownership.",
          challenge:
            "A growing organization depends on multiple systems that move at different speeds, with weak visibility into data ownership and integration risk.",
          structure: [
            "Capability map tied to business domains",
            "API and event boundaries with ownership rules",
            "Integration governance, monitoring, and release control",
          ],
          value:
            "A technical foundation that makes cross-platform work more predictable for leadership and delivery teams.",
        },
        {
          label: "Operations and Automation",
          title: "Intelligent Operations and Automation",
          image: "/images/automation-control-panel.jpg",
          summary:
            "A workflow architecture for reducing repeated manual work while preserving human control, exception handling, and auditability.",
          challenge:
            "Operational teams spend attention on repeated decisions, handoffs, and checks that hide risk and slow the business.",
          structure: [
            "Workflow inventory with control and exception points",
            "Automation patterns connected to telemetry",
            "Human review loops for sensitive decisions",
          ],
          value:
            "A calmer operating rhythm where automation removes repetition without removing responsibility.",
        },
        {
          label: "AI Operating Platform",
          title: "AI-Enabled Operating Platform",
          image: "/images/compute-cooling.jpg",
          summary:
            "A governed AI layer that connects models, knowledge sources, permissions, evaluation, and escalation into useful business workflows.",
          challenge:
            "The organization wants AI capability, but the useful work depends on data quality, access control, evaluation, and integration with existing systems.",
          structure: [
            "Retrieval, permissions, and model routing",
            "Evaluation harnesses and performance review",
            "Escalation paths connected to human teams",
          ],
          value:
            "AI becomes part of the operating platform, with accountability, measurement, and room to improve.",
        },
      ],
    },
    why: {
      title: "Why serious clients bring Khalid in.",
      lead:
        "The value is not only writing code or drawing architecture. It is knowing which structure matters before money and time harden around the wrong one.",
      principles: [
        {
          title: "Business clarity first",
          body:
            "Technical choices are tied to business pressure, operational reality, and leadership decisions.",
        },
        {
          title: "Architecture that can run",
          body:
            "Every diagram is judged by whether teams can build it, operate it, secure it, and change it.",
        },
        {
          title: "Confidential work handled with care",
          body:
            "Sensitive systems can be discussed through patterns, abstractions, and decision logic without exposing private details.",
        },
        {
          title: "Calm execution",
          body:
            "The work favors clear sequencing, visible tradeoffs, and fewer surprises during implementation.",
        },
      ],
    },
    insights: {
      title: "Operating notes.",
      lead:
        "Short positions on the decisions that shape durable systems.",
      items: [
        {
          title: "Architecture is a business instrument",
          body:
            "The architecture should reveal investment sequence, operating risk, ownership, and the cost of delay.",
        },
        {
          title: "AI needs a control room",
          body:
            "Useful AI systems depend on permissions, evaluation, human escalation, and a place in the workflow.",
        },
        {
          title: "Integration is where strategy becomes real",
          body:
            "Every interface exposes a decision about data, responsibility, timing, and trust.",
        },
      ],
    },
    contact: {
      title: "Bring the hard system into focus.",
      lead:
        "For architecture reviews, platform decisions, integration strategy, automation programs, or AI operating layers, start with the problem that is becoming too important to leave unclear.",
      email: "hello@khalidbamarouf.com",
      subject: "Project inquiry for Khalid Bamarouf",
      whatsappLabel: "WhatsApp",
      emailLabel: "Email",
      button: "Send project inquiry",
      channels: [
        {
          label: "Email",
          value: "hello@khalidbamarouf.com",
          href: "mailto:hello@khalidbamarouf.com",
        },
        {
          label: "Direct contact",
          value: "Architecture and systems inquiry",
          href: "mailto:hello@khalidbamarouf.com?subject=Systems%20architecture%20inquiry",
        },
        {
          label: "Location",
          value: "Saudi Arabia, available for remote engagements",
        },
      ],
      fields: [
        {
          label: "Name",
          name: "name",
          type: "text",
          placeholder: "Your name",
        },
        {
          label: "Email",
          name: "email",
          type: "email",
          placeholder: "you@company.com",
        },
        {
          label: "System challenge",
          name: "challenge",
          type: "textarea",
          placeholder: "What system, platform, integration, automation, or AI decision needs clarity?",
        },
        {
          label: "What must be true six months from now?",
          name: "outcome",
          type: "textarea",
          placeholder: "Describe the operational or business outcome that matters.",
        },
      ],
    },
    footer: {
      statement: "Systems architecture, backend engineering, automation, AI, cloud, APIs, and integration.",
    },
  },
  ar: {
    locale: "ar",
    direction: "rtl",
    brand: {
      name: "Khalid Bamarouf",
      role: "معماري أنظمة ومستشار تقني",
      logoAlt: "شعار Khalid Bamarouf الذهبي",
    },
    nav: [
      { label: "الخبرات", href: "#expertise" },
      { label: "القدرات", href: "#capabilities" },
      { label: "الدراسات", href: "#studies" },
      { label: "التواصل", href: "#contact" },
    ],
    language: {
      current: "AR",
      alternate: "EN",
      switchLabel: "تغيير اللغة",
    },
    labels: {
      expertise: "الخبرات",
      capabilities: "نظام القدرات",
      approach: "المنهج",
      studies: "المعرض",
      insights: "الرؤى",
      challenge: "التحدي",
      structure: "البنية",
    },
    hero: {
      eyebrow: "معمارية أنظمة للقرارات التقنية الحساسة",
      title: "أنظمة معقدة. بهندسة واضحة.",
      lead:
        "معمارية مؤسسية، منصات خلفية، أتمتة، طبقات تشغيل مدعومة بالذكاء الاصطناعي، بنية سحابية، وتكامل أنظمة للمؤسسات التي تكون فيها الأعطال مكلفة.",
      primaryCta: "ابدأ المحادثة",
      secondaryCta: "استكشف الخبرات",
      metrics: [
        { label: "الانضباط", value: "من المعمارية إلى التنفيذ" },
        { label: "التركيز", value: "أنظمة وعمليات حرجة" },
        { label: "نمط العمل", value: "استشارة وتصميم وبناء" },
      ],
    },
    positioning: {
      title: "شريك تقني للأنظمة التي تحمل وزنا تجاريا حقيقيا.",
      lead:
        "يعمل Khalid Bamarouf عند نقطة التقاء نية الأعمال، وعمق الهندسة، وواقع التشغيل.",
      body:
        "تبدأ المهمة بجعل البنية غير المرئية واضحة: الاعتماديات، التدفقات، المخاطر، الواجهات، الملكية، الحوكمة، والقرارات التي تقوي النظام أو تقيده.",
      notes: [
        "يوضح المشهد التقني المعقد لصناع القرار.",
        "يصمم معمارية يمكن تشغيلها وقياسها وتطويرها.",
        "يربط الاستراتيجية بالهندسة الخلفية، والأتمتة، والسحابة، والبيانات، والذكاء الاصطناعي.",
      ],
    },
    expertise: {
      title: "خبرات لها أثر بنيوي.",
      lead:
        "كل تخصص يعامل كجزء من نظام تشغيل واحد، وليس كخدمة منفصلة.",
      items: [
        {
          name: "المعمارية المؤسسية",
          short: "أنظمة قرار، خرائط منصات، ونماذج تشغيل تقنية.",
          focus:
            "تحول أهداف الأعمال إلى معمارية، ونطاقات، وحدود تكامل، وحوكمة، وتسلسل استثمار.",
          value:
            "يرى القادة ما يجب بناؤه، وما يجب إزالته، والقرارات التي يجب حمايتها.",
          signals: ["حدود النطاقات", "خرائط القدرات", "استراتيجية المنصات"],
        },
        {
          name: "الهندسة الخلفية",
          short: "خدمات موثوقة، واجهات، تدفقات بيانات، وأسس تشغيلية.",
          focus:
            "تشكل الخدمات حول الملكية، وسلامة البيانات، والزمن، والمرونة، والمراقبة، وقابلية التغيير.",
          value:
            "تحصل الفرق على أنظمة أسهل في الفهم، والتوسع، والتأمين، والصيانة.",
          signals: ["تصميم الخدمات", "عقود الواجهات", "المراقبة"],
        },
        {
          name: "الأتمتة والعمليات",
          short: "أتمتة مسارات العمل، ضوابط، قياس، وذكاء تشغيلي.",
          focus:
            "تحدد الضغط التشغيلي المتكرر وتصمم أتمتة مع تحكم بشري واضح ومسارات تدقيق.",
          value:
            "تصبح العمليات أسرع وأكثر هدوءا من دون فقدان المسؤولية أو الحكم.",
          signals: ["منطق العمل", "نقاط التحكم", "قياس تشغيلي"],
        },
        {
          name: "أنظمة مدعومة بالذكاء الاصطناعي",
          short: "موضع النماذج، التنسيق، جاهزية البيانات، والحوكمة.",
          focus:
            "تضع الذكاء الاصطناعي داخل مسارات عمل نافعة مع استرجاع، صلاحيات، تقييم، وتصعيد قابل للقياس.",
          value:
            "يصبح الذكاء الاصطناعي قدرة نظامية مسؤولة بدلا من تجربة منعزلة.",
          signals: ["تنسيق النماذج", "دوائر التقييم", "التصعيد البشري"],
        },
        {
          name: "السحابة والواجهات والتكامل",
          short: "أنماط بنية، تصميم تكامل، وربط منصات.",
          focus:
            "يربط المنصات بعقود واضحة، وبنية آمنة، ومسارات نشر، وضوابط دورة حياة.",
          value:
            "تحصل المؤسسة على عمود تقني أوضح للمنتجات والفرق وحركة البيانات.",
          signals: ["أسس سحابية", "أنماط تكامل", "وضع أمني"],
        },
      ],
    },
    capabilities: {
      title: "قدرات مصممة للأنظمة الصعبة.",
      lead:
        "العرض ليس قائمة مهام منفصلة. إنه أسلوب يجمع الوضوح، والمعمارية، والتنفيذ في مهمة واحدة منضبطة.",
      groups: [
        {
          title: "المعمارية والاستراتيجية",
          intro: "للمؤسسات التي تقرر ما يجب أن يصبح عليه النظام.",
          capabilities: [
            "تقييم المعمارية المؤسسية",
            "تصميم نموذج التشغيل الرقمي",
            "خرائط المنصات والقدرات",
            "أطر القرار التقني",
          ],
        },
        {
          title: "الهندسة والتكامل",
          intro: "للفرق التي تحتاج أن تنجو المعمارية داخل التنفيذ.",
          capabilities: [
            "معمارية الخدمات الخلفية",
            "تصميم الواجهات والتكامل",
            "تخطيط البنية السحابية",
            "حركة البيانات وحدود الأنظمة",
          ],
        },
        {
          title: "الأتمتة وبنية الذكاء الاصطناعي",
          intro: "للعمليات التي تحتاج ذكاء وتحكما وقدرة على التوسع.",
          capabilities: [
            "معمارية أتمتة مسارات العمل",
            "تصميم منصة تشغيل ذكاء اصطناعي",
            "دوائر التقييم والحوكمة",
            "تصميم المراقبة والتصعيد والتحكم",
          ],
        },
      ],
    },
    approach: {
      title: "مسار موزون من الغموض إلى المعمارية.",
      lead:
        "المنهج هادئ لأن الأنظمة متطلبة. كل مرحلة تقلل المخاطر، وتصقل القرارات، وتدفع العمل نحو التشغيل.",
      steps: [
        {
          number: "01",
          title: "اكتشاف",
          body:
            "كشف الأهداف، والقيود، والمخاطر، والاعتماديات، والأنظمة الحالية، والضغط التشغيلي الحقيقي خلف الطلب.",
        },
        {
          number: "02",
          title: "تصميم معماري",
          body:
            "تعريف البنية المستهدفة، والنطاقات، والواجهات، وتدفقات المعلومات، والضوابط، والقرارات التي تحتاج توافقا تنفيذيا.",
        },
        {
          number: "03",
          title: "هندسة",
          body:
            "تحويل المعمارية إلى خدمات، ومنصات، وأتمتة، ومسارات بيانات، وسلوك تقني قابل للقياس.",
        },
        {
          number: "04",
          title: "تكامل",
          body:
            "ربط الأنظمة عبر عقود مستقرة، وعمليات آمنة، ومراقبة، ومسارات تغيير تستطيع الفرق تحملها.",
        },
        {
          number: "05",
          title: "تطوير",
          body:
            "قياس النظام أثناء الاستخدام، وضبط القرارات، وتقوية الضوابط، وتجهيز طبقة القدرة التالية.",
        },
      ],
    },
    studies: {
      title: "دراسات أنظمة مختارة.",
      lead:
        "توضح الدراسات المفاهيمية كيف يؤطر Khalid Bamarouf الأعمال التقنية الصعبة عندما تكون تفاصيل العملاء سرية.",
      items: [
        {
          label: "معمارية التكامل",
          title: "معمارية تكامل مؤسسية",
          image: "/images/integration-cabling.jpg",
          summary:
            "معمارية مستهدفة لربط منصات أعمال متفرقة عبر واجهات وأحداث وحدود بيانات وملكية تشغيلية محكومة.",
          challenge:
            "مؤسسة نامية تعتمد على أنظمة متعددة تتحرك بسرعات مختلفة، مع ضعف في رؤية ملكية البيانات ومخاطر التكامل.",
          structure: [
            "خريطة قدرات مرتبطة بنطاقات الأعمال",
            "حدود واجهات وأحداث مع قواعد ملكية",
            "حوكمة تكامل ومراقبة وتحكم بالإصدارات",
          ],
          value:
            "أساس تقني يجعل العمل بين المنصات أكثر قابلية للتوقع لدى القيادة وفرق التسليم.",
        },
        {
          label: "العمليات والأتمتة",
          title: "عمليات ذكية وأتمتة",
          image: "/images/automation-control-panel.jpg",
          summary:
            "معمارية مسار عمل تقلل العمل اليدوي المتكرر مع الحفاظ على التحكم البشري، ومعالجة الاستثناءات، وقابلية التدقيق.",
          challenge:
            "تقضي فرق التشغيل انتباهها في قرارات وتسليمات وفحوص متكررة تخفي المخاطر وتبطئ الأعمال.",
          structure: [
            "جرد مسارات العمل مع نقاط التحكم والاستثناء",
            "أنماط أتمتة متصلة بالقياس",
            "دوائر مراجعة بشرية للقرارات الحساسة",
          ],
          value:
            "إيقاع تشغيلي أكثر هدوءا حيث تزيل الأتمتة التكرار من دون إزالة المسؤولية.",
        },
        {
          label: "منصة تشغيل ذكاء اصطناعي",
          title: "منصة تشغيل مدعومة بالذكاء الاصطناعي",
          image: "/images/compute-cooling.jpg",
          summary:
            "طبقة ذكاء اصطناعي محكومة تربط النماذج، ومصادر المعرفة، والصلاحيات، والتقييم، والتصعيد داخل مسارات عمل نافعة.",
          challenge:
            "تريد المؤسسة قدرة ذكاء اصطناعي، لكن العمل المفيد يعتمد على جودة البيانات، والتحكم بالوصول، والتقييم، والتكامل مع الأنظمة الحالية.",
          structure: [
            "استرجاع وصلاحيات وتوجيه نماذج",
            "أدوات تقييم ومراجعة أداء",
            "مسارات تصعيد مرتبطة بفرق بشرية",
          ],
          value:
            "يصبح الذكاء الاصطناعي جزءا من منصة التشغيل، مع مسؤولية وقياس ومساحة للتحسن.",
        },
      ],
    },
    why: {
      title: "لماذا يستعين العملاء الجادون بـ Khalid Bamarouf.",
      lead:
        "القيمة ليست في كتابة الكود أو رسم المعمارية فقط. بل في معرفة البنية المهمة قبل أن يتجمد المال والوقت حول خيار خاطئ.",
      principles: [
        {
          title: "وضوح الأعمال أولا",
          body:
            "الخيارات التقنية مرتبطة بضغط الأعمال، وواقع التشغيل، وقرارات القيادة.",
        },
        {
          title: "معمارية قابلة للتشغيل",
          body:
            "كل رسم يحاكم بقدرة الفرق على بنائه وتشغيله وتأمينه وتغييره.",
        },
        {
          title: "تعامل دقيق مع الأعمال السرية",
          body:
            "يمكن مناقشة الأنظمة الحساسة عبر الأنماط، والتجريدات، ومنطق القرار من دون كشف التفاصيل الخاصة.",
        },
        {
          title: "تنفيذ هادئ",
          body:
            "يفضل العمل التسلسل الواضح، والمفاضلات المرئية، ومفاجآت أقل أثناء التنفيذ.",
        },
      ],
    },
    insights: {
      title: "ملاحظات تشغيلية.",
      lead:
        "مواقف قصيرة حول القرارات التي تشكل الأنظمة المتينة.",
      items: [
        {
          title: "المعمارية أداة أعمال",
          body:
            "يجب أن تكشف المعمارية تسلسل الاستثمار، ومخاطر التشغيل، والملكية، وتكلفة التأخير.",
        },
        {
          title: "الذكاء الاصطناعي يحتاج غرفة تحكم",
          body:
            "تعتمد أنظمة الذكاء الاصطناعي النافعة على الصلاحيات، والتقييم، والتصعيد البشري، ومكان داخل مسار العمل.",
        },
        {
          title: "التكامل هو المكان الذي تصبح فيه الاستراتيجية واقعا",
          body:
            "كل واجهة تكشف قرارا عن البيانات، والمسؤولية، والتوقيت، والثقة.",
        },
      ],
    },
    contact: {
      title: "اجعل النظام الصعب واضحا.",
      lead:
        "لمراجعات المعمارية، وقرارات المنصات، واستراتيجية التكامل، وبرامج الأتمتة، أو طبقات تشغيل الذكاء الاصطناعي، ابدأ بالمشكلة التي أصبحت أهم من أن تبقى غامضة.",
      email: "hello@khalidbamarouf.com",
      subject: "استفسار مشروع لـ Khalid Bamarouf",
      whatsappLabel: "واتساب",
      emailLabel: "البريد الإلكتروني",
      button: "إرسال استفسار مشروع",
      channels: [
        {
          label: "البريد",
          value: "hello@khalidbamarouf.com",
          href: "mailto:hello@khalidbamarouf.com",
        },
        {
          label: "تواصل مباشر",
          value: "استفسار معمارية وأنظمة",
          href: "mailto:hello@khalidbamarouf.com?subject=Systems%20architecture%20inquiry",
        },
        {
          label: "الموقع",
          value: "المملكة العربية السعودية، متاح لمهام عن بعد",
        },
      ],
      fields: [
        {
          label: "الاسم",
          name: "name",
          type: "text",
          placeholder: "اسمك",
        },
        {
          label: "البريد الإلكتروني",
          name: "email",
          type: "email",
          placeholder: "you@company.com",
        },
        {
          label: "تحدي النظام",
          name: "challenge",
          type: "textarea",
          placeholder: "ما النظام أو المنصة أو التكامل أو الأتمتة أو قرار الذكاء الاصطناعي الذي يحتاج وضوحا؟",
        },
        {
          label: "ما الذي يجب أن يكون صحيحا بعد ستة أشهر؟",
          name: "outcome",
          type: "textarea",
          placeholder: "صف النتيجة التشغيلية أو التجارية المهمة.",
        },
      ],
    },
    footer: {
      statement: "معمارية أنظمة، هندسة خلفية، أتمتة، ذكاء اصطناعي، سحابة، واجهات، وتكامل.",
    },
  },
};
