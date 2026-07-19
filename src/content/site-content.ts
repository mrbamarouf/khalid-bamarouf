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
  studio: {
    url: string;
    label: string;
    ariaLabel: string;
    footerSignature: string;
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
      role: "AI Automation Engineer & Builder",
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
    studio: {
      url: "https://bamaroufstudio.com",
      label: "BAMAROUF STUDIO",
      ariaLabel: "Visit BAMAROUF STUDIO",
      footerSignature: "AN INDEPENDENT WORLD OF BAMAROUF STUDIO",
    },
    labels: {
      expertise: "What I Do",
      capabilities: "Capabilities",
      approach: "Approach",
      studies: "System Study",
      insights: "Operating Notes",
      challenge: "Challenge",
      structure: "Structure",
    },
    hero: {
      eyebrow: "Khalid Bamarouf",
      title: "AI Automation Engineer & Builder",
      lead:
        "AI automations that solve the problems you have right now and make things run better. I build custom AI apps and automations shaped around how you actually work. From fixing a broken daily workflow to shipping a full product powered by AI, the goal is simple: your current issues, solved by AI, in a way that fits your preferences.",
      primaryCta: "Start a conversation",
      secondaryCta: "See what I build",
      metrics: [],
    },
    positioning: {
      title: "AI automations built around the way you actually work",
      lead:
        "I'm an AI automation engineer. My focus is simple: take the problems you're dealing with right now, solve them with AI, and make the rest of your work run better.",
      body:
        "I build custom AI apps and automations shaped around how you actually operate. Not a generic bot or a standard template that only partly fits. If you have a repetitive task, a slow handoff, or tooling that doesn't match the way you work, that's where I start: with the real issue, not a feature list.",
      notes: [
        "From there I design and build the automation or app, wire it into the tools you already use, and keep it running reliably so it improves over time. Everything is customized to your preferences: your stack, your workflow, and the outcomes you care about.",
        "The point of AI here isn't novelty. It's removing friction. If an automation needs more babysitting than the manual process it replaced, it's wrong. The win is a system that fits how you work and quietly makes things better.",
      ],
    },
    expertise: {
      title: "What I do",
      lead:
        "AI Automation is the core service. The supporting technical capabilities give each automation a reliable place to live.",
      items: [
        {
          name: "AI Automation",
          short:
            "Workflow automation, AI agents, and intelligent operations tailored to your needs.",
          focus: "CORE SERVICE",
          value:
            "Workflow automation, AI agents, and intelligent operations tailored to your needs.",
          signals: ["Custom AI apps", "AI agents", "Intelligent operations"],
        },
        {
          name: "Enterprise Architecture",
          short:
            "Structuring systems and decisions so automation has a solid home.",
          focus: "Supporting capability",
          value:
            "Structuring systems and decisions so automation has a solid home.",
          signals: ["System structure", "Decision clarity", "Operating model"],
        },
        {
          name: "Backend Engineering",
          short:
            "Reliable services, APIs, and data flows that power the automation.",
          focus: "Supporting capability",
          value:
            "Reliable services, APIs, and data flows that power the automation.",
          signals: ["Services", "APIs", "Data flows"],
        },
        {
          name: "Automation & Operations",
          short: "Controls, telemetry, and process intelligence.",
          focus: "Supporting capability",
          value: "Controls, telemetry, and process intelligence.",
          signals: ["Controls", "Telemetry", "Process intelligence"],
        },
        {
          name: "Cloud, APIs & Integration",
          short: "Infrastructure and connectivity that tie it all together.",
          focus: "Supporting capability",
          value: "Infrastructure and connectivity that tie it all together.",
          signals: ["Cloud", "APIs", "Integration"],
        },
      ],
    },
    capabilities: {
      title: "Capabilities shaped for AI automation",
      lead:
        "The work connects custom AI apps, reliable engineering, and technical strategy so the automation fits the client's actual workflow.",
      groups: [
        {
          title: "AI Apps & Automations",
          intro: "Build",
          capabilities: [
            "Custom AI assistants and agents",
            "Workflow automation",
            "AI operating platforms and evaluation loops",
            "Monitoring, escalation and control",
          ],
        },
        {
          title: "Engineering & Integration",
          intro: "Make it real",
          capabilities: [
            "Backend service architecture",
            "API and integration design",
            "Cloud infrastructure planning",
            "Data movement and system boundaries",
          ],
        },
        {
          title: "Strategy & Architecture",
          intro: "Keep it sane",
          capabilities: [
            "Problem framing and solution design",
            "Platform and capability roadmaps",
            "Technical decision frameworks",
            "Governance for AI systems",
          ],
        },
      ],
    },
    approach: {
      title: "From current issue to working AI automation",
      lead:
        "The process keeps the problem, the workflow, the tools, and the controls visible from the first conversation through ongoing improvement.",
      steps: [
        {
          number: "01",
          title: "Discover",
          body:
            "Find the real issue: the goal, the constraint, the pain, and what \"better\" looks like for you.",
        },
        {
          number: "02",
          title: "Architect",
          body:
            "Design the automation: what AI does, where it plugs in, what stays human, and the controls around it.",
        },
        {
          number: "03",
          title: "Build",
          body:
            "Engineer the app or automation: services, models, data paths, and measurable behavior.",
        },
        {
          number: "04",
          title: "Integrate",
          body:
            "Connect it to your tools through stable contracts, secure ops, and observability your team can trust.",
        },
        {
          number: "05",
          title: "Evolve",
          body:
            "Run it, measure it, tune it, and grow the next layer of capability.",
        },
      ],
    },
    studies: {
      title: "Intelligent Operations & Automation",
      lead:
        "An anonymized system study showing how AI automation can reduce manual handoffs across disconnected tools.",
      items: [
        {
          label: "Anonymized system study",
          title: "Intelligent Operations & Automation",
          image: "/images/automation-control-panel.jpg",
          summary:
            "A team was losing hours to repetitive, manual handoffs across disconnected tools, with no visibility into where work stalled.",
          challenge:
            "A team was losing hours to repetitive, manual handoffs across disconnected tools, with no visibility into where work stalled.",
          structure: [
            "Mapped the actual workflow and friction points.",
            "Designed an AI automation handling repetitive steps and routing exceptions to humans.",
            "Integrated into the existing stack with monitoring and control.",
          ],
          value:
            "Less manual work, fewer stalls, an automation shaped to how the team already operates.",
        },
      ],
    },
    why: {
      title: "Why work with me",
      lead:
        "Serious clients need AI automation that begins with the real problem and keeps working after it ships.",
      principles: [
        {
          title: "Problem first",
          body: "We start from your current issue, not a feature list.",
        },
        {
          title: "Built for you",
          body:
            "Every automation is customized to your tools and preferences.",
        },
        {
          title: "Ships and runs",
          body:
            "Judged by whether it works in real life, day after day.",
        },
        {
          title: "Calm execution",
          body: "Clear steps, visible tradeoffs, fewer surprises.",
        },
      ],
    },
    insights: {
      title: "Operating notes",
      lead:
        "The principles behind AI automation that fits the work instead of creating more friction.",
      items: [
        {
          title: "AI should remove friction, not add it",
          body:
            "If the automation needs more babysitting than the manual process, it's wrong.",
        },
        {
          title: "Customization is the point",
          body:
            "The best automation fits how you work, not the other way around.",
        },
        {
          title: "AI needs a control room",
          body:
            "Permissions, evaluation, human escalation, and a real place in the workflow.",
        },
        {
          title: "Integration is where intent becomes real",
          body:
            "Every connection is a decision about data, responsibility, and trust.",
        },
      ],
    },
    contact: {
      title: "Start a conversation",
      lead:
        "Bring the workflow, handoff, tool, or product problem that needs to run better. The conversation starts with what is happening now and what AI should solve.",
      email: "kbamarouf@gmail.com",
      subject: "AI automation conversation with Khalid Bamarouf",
      whatsappLabel: "WhatsApp",
      emailLabel: "Email",
      button: "Start a conversation",
      channels: [
        {
          label: "WhatsApp",
          value: "+966596969687",
          href: "https://wa.me/966596969687",
        },
        {
          label: "Email",
          value: "kbamarouf@gmail.com",
          href: "mailto:kbamarouf@gmail.com",
        },
      ],
      fields: [],
    },
    footer: {
      statement:
        "AI automation, custom AI apps, agents, backend engineering, cloud, APIs, and integration.",
    },
  },
  ar: {
    locale: "ar",
    direction: "rtl",
    brand: {
      name: "Khalid Bamarouf",
      role: "مهندس أتمتة بالذكاء الاصطناعي وبانٍ للحلول",
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
    studio: {
      url: "https://bamaroufstudio.com",
      label: "بامعروف استديو",
      ariaLabel: "زيارة بامعروف استديو",
      footerSignature: "عالم مستقل ضمن بامعروف استديو",
    },
    labels: {
      expertise: "ما أقدمه",
      capabilities: "القدرات",
      approach: "المنهج",
      studies: "دراسة نظام",
      insights: "ملاحظات تشغيلية",
      challenge: "التحدي",
      structure: "البنية",
    },
    hero: {
      eyebrow: "Khalid Bamarouf",
      title: "مهندس أتمتة بالذكاء الاصطناعي وبانٍ للحلول",
      lead:
        "أتمتة بالذكاء الاصطناعي تحل المشكلات التي تواجهها الآن وتجعل العمل يسير بصورة أفضل. أبني تطبيقات وأتمتات ذكاء اصطناعي مخصصة حسب طريقة عملك الفعلية. من إصلاح مسار يومي متعطل إلى إطلاق منتج كامل مدعوم بالذكاء الاصطناعي، الهدف بسيط: مشكلاتك الحالية محلولة بالذكاء الاصطناعي، بطريقة تناسب تفضيلاتك.",
      primaryCta: "ابدأ المحادثة",
      secondaryCta: "شاهد ما أبنيه",
      metrics: [],
    },
    positioning: {
      title: "أتمتة بالذكاء الاصطناعي مبنية حول طريقة عملك الفعلية",
      lead:
        "أنا مهندس أتمتة بالذكاء الاصطناعي. تركيزي بسيط: أخذ المشكلات التي تتعامل معها الآن، وحلها بالذكاء الاصطناعي، ثم جعل بقية عملك تسير بصورة أفضل.",
      body:
        "أبني تطبيقات وأتمتات ذكاء اصطناعي مخصصة حول الطريقة التي تعمل بها فعليا. ليست روبوتا عاما، ولا قالبا جاهزا يناسب نصف احتياجك. إذا كانت لديك مهمة متكررة، أو تسليم بطيء، أو أدوات لا تطابق طريقة عملك، فهنا أبدأ: من المشكلة الحقيقية، لا من قائمة مزايا.",
      notes: [
        "بعد ذلك أصمم وأبني الأتمتة أو التطبيق، وأربطه بالأدوات التي تستخدمها بالفعل، وأبقيه يعمل بثبات حتى يتحسن مع الوقت. كل شيء مخصص لتفضيلاتك: تقنياتك، ومسار عملك، والنتائج التي تهمك.",
        "قيمة الذكاء الاصطناعي هنا ليست في الجدة، بل في إزالة الاحتكاك. إذا كانت الأتمتة تحتاج متابعة أكثر من العملية اليدوية التي استبدلتها، فهي خاطئة. المكسب هو نظام يناسب طريقة عملك ويجعل الأمور أفضل بهدوء.",
      ],
    },
    expertise: {
      title: "ما أقدمه",
      lead:
        "أتمتة الذكاء الاصطناعي هي الخدمة الأساسية. أما القدرات التقنية الداعمة فتمنح كل أتمتة مكانا موثوقا تعيش فيه.",
      items: [
        {
          name: "أتمتة الذكاء الاصطناعي",
          short:
            "أتمتة مسارات العمل، ووكلاء الذكاء الاصطناعي، وعمليات ذكية مخصصة لاحتياجك.",
          focus: "الخدمة الأساسية",
          value:
            "أتمتة مسارات العمل، ووكلاء الذكاء الاصطناعي، وعمليات ذكية مخصصة لاحتياجك.",
          signals: ["تطبيقات ذكاء اصطناعي مخصصة", "وكلاء ذكاء اصطناعي", "عمليات ذكية"],
        },
        {
          name: "المعمارية المؤسسية",
          short: "تنظيم الأنظمة والقرارات حتى تجد الأتمتة بيتا صلبا.",
          focus: "قدرة داعمة",
          value: "تنظيم الأنظمة والقرارات حتى تجد الأتمتة بيتا صلبا.",
          signals: ["بنية النظام", "وضوح القرار", "نموذج التشغيل"],
        },
        {
          name: "الهندسة الخلفية",
          short:
            "خدمات موثوقة، وواجهات برمجية، وتدفقات بيانات تشغل الأتمتة.",
          focus: "قدرة داعمة",
          value:
            "خدمات موثوقة، وواجهات برمجية، وتدفقات بيانات تشغل الأتمتة.",
          signals: ["الخدمات", "الواجهات البرمجية", "تدفقات البيانات"],
        },
        {
          name: "الأتمتة والعمليات",
          short: "ضوابط، وقياس، وذكاء للعمليات.",
          focus: "قدرة داعمة",
          value: "ضوابط، وقياس، وذكاء للعمليات.",
          signals: ["الضوابط", "القياس", "ذكاء العمليات"],
        },
        {
          name: "السحابة والواجهات والتكامل",
          short: "بنية تحتية واتصال يربطان كل شيء معا.",
          focus: "قدرة داعمة",
          value: "بنية تحتية واتصال يربطان كل شيء معا.",
          signals: ["السحابة", "الواجهات البرمجية", "التكامل"],
        },
      ],
    },
    capabilities: {
      title: "قدرات مصممة لأتمتة الذكاء الاصطناعي",
      lead:
        "يربط العمل بين تطبيقات الذكاء الاصطناعي المخصصة، والهندسة الموثوقة، والاستراتيجية التقنية حتى تناسب الأتمتة مسار العمل الفعلي لدى العميل.",
      groups: [
        {
          title: "تطبيقات وأتمتات الذكاء الاصطناعي",
          intro: "بناء",
          capabilities: [
            "مساعدون ووكلاء ذكاء اصطناعي مخصصون",
            "أتمتة مسارات العمل",
            "منصات تشغيل ذكاء اصطناعي وحلقات تقييم",
            "مراقبة وتصعيد وتحكم",
          ],
        },
        {
          title: "الهندسة والتكامل",
          intro: "جعلها حقيقية",
          capabilities: [
            "معمارية خدمات خلفية",
            "تصميم الواجهات والتكامل",
            "تخطيط البنية السحابية",
            "حركة البيانات وحدود الأنظمة",
          ],
        },
        {
          title: "الاستراتيجية والمعمارية",
          intro: "إبقاؤها منضبطة",
          capabilities: [
            "تأطير المشكلة وتصميم الحل",
            "خرائط طريق المنصات والقدرات",
            "أطر القرار التقني",
            "حوكمة أنظمة الذكاء الاصطناعي",
          ],
        },
      ],
    },
    approach: {
      title: "من المشكلة الحالية إلى أتمتة ذكاء اصطناعي تعمل",
      lead:
        "يحافظ المنهج على وضوح المشكلة، ومسار العمل، والأدوات، والضوابط من أول محادثة حتى التحسين المستمر.",
      steps: [
        {
          number: "01",
          title: "اكتشاف",
          body:
            "العثور على المشكلة الحقيقية: الهدف، والقيد، والألم، وما يعنيه أن تصبح الأمور أفضل بالنسبة لك.",
        },
        {
          number: "02",
          title: "تصميم",
          body:
            "تصميم الأتمتة: ما الذي يفعله الذكاء الاصطناعي، وأين يتصل، وما الذي يبقى بشريا، وما الضوابط المحيطة به.",
        },
        {
          number: "03",
          title: "بناء",
          body:
            "هندسة التطبيق أو الأتمتة: الخدمات، والنماذج، ومسارات البيانات، والسلوك القابل للقياس.",
        },
        {
          number: "04",
          title: "تكامل",
          body:
            "ربطه بأدواتك من خلال عقود مستقرة، وتشغيل آمن، ومراقبة يمكن لفريقك الوثوق بها.",
        },
        {
          number: "05",
          title: "تطوير",
          body:
            "تشغيله، وقياسه، وضبطه، وتنمية طبقة القدرة التالية.",
        },
      ],
    },
    studies: {
      title: "عمليات ذكية وأتمتة",
      lead:
        "دراسة نظام مجهولة الهوية توضح كيف يمكن لأتمتة الذكاء الاصطناعي تقليل التسليمات اليدوية بين أدوات منفصلة.",
      items: [
        {
          label: "دراسة نظام مجهولة الهوية",
          title: "عمليات ذكية وأتمتة",
          image: "/images/automation-control-panel.jpg",
          summary:
            "كان فريق يفقد ساعات بسبب تسليمات يدوية متكررة عبر أدوات منفصلة، من دون رؤية واضحة لمواضع تعطل العمل.",
          challenge:
            "كان فريق يفقد ساعات بسبب تسليمات يدوية متكررة عبر أدوات منفصلة، من دون رؤية واضحة لمواضع تعطل العمل.",
          structure: [
            "رسم مسار العمل الفعلي ونقاط الاحتكاك.",
            "تصميم أتمتة ذكاء اصطناعي تتولى الخطوات المتكررة وتوجه الاستثناءات إلى البشر.",
            "دمجها في الأدوات الحالية مع المراقبة والتحكم.",
          ],
          value:
            "عمل يدوي أقل، وتعطلات أقل، وأتمتة مصممة حسب الطريقة التي يعمل بها الفريق بالفعل.",
        },
      ],
    },
    why: {
      title: "لماذا تعمل معي",
      lead:
        "العملاء الجادون يحتاجون أتمتة ذكاء اصطناعي تبدأ من المشكلة الحقيقية وتبقى عاملة بعد إطلاقها.",
      principles: [
        {
          title: "المشكلة أولا",
          body: "نبدأ من مشكلتك الحالية، لا من قائمة مزايا.",
        },
        {
          title: "مصممة لك",
          body: "كل أتمتة مخصصة لأدواتك وتفضيلاتك.",
        },
        {
          title: "تطلق وتعمل",
          body: "تُحكم بقيمتها عندما تعمل في الواقع، يوما بعد يوم.",
        },
        {
          title: "تنفيذ هادئ",
          body: "خطوات واضحة، ومفاضلات مرئية، ومفاجآت أقل.",
        },
      ],
    },
    insights: {
      title: "ملاحظات تشغيلية",
      lead:
        "المبادئ التي تجعل أتمتة الذكاء الاصطناعي مناسبة للعمل بدلا من إضافة احتكاك جديد.",
      items: [
        {
          title: "يجب أن يزيل الذكاء الاصطناعي الاحتكاك، لا أن يضيفه",
          body:
            "إذا كانت الأتمتة تحتاج متابعة أكثر من العملية اليدوية، فهي خاطئة.",
        },
        {
          title: "التخصيص هو الفكرة",
          body:
            "أفضل أتمتة تناسب طريقة عملك، لا العكس.",
        },
        {
          title: "الذكاء الاصطناعي يحتاج غرفة تحكم",
          body:
            "صلاحيات، وتقييم، وتصعيد بشري، ومكان حقيقي داخل مسار العمل.",
        },
        {
          title: "التكامل هو المكان الذي تصبح فيه النية واقعا",
          body:
            "كل اتصال هو قرار حول البيانات، والمسؤولية، والثقة.",
        },
      ],
    },
    contact: {
      title: "ابدأ المحادثة",
      lead:
        "اجلب مشكلة مسار العمل، أو التسليم، أو الأداة، أو المنتج التي تحتاج أن تعمل بصورة أفضل. تبدأ المحادثة مما يحدث الآن وما يجب أن يحله الذكاء الاصطناعي.",
      email: "kbamarouf@gmail.com",
      subject: "محادثة أتمتة ذكاء اصطناعي مع Khalid Bamarouf",
      whatsappLabel: "واتساب",
      emailLabel: "البريد الإلكتروني",
      button: "ابدأ المحادثة",
      channels: [
        {
          label: "واتساب",
          value: "+966596969687",
          href: "https://wa.me/966596969687",
        },
        {
          label: "البريد الإلكتروني",
          value: "kbamarouf@gmail.com",
          href: "mailto:kbamarouf@gmail.com",
        },
      ],
      fields: [],
    },
    footer: {
      statement:
        "أتمتة بالذكاء الاصطناعي، تطبيقات ذكاء اصطناعي مخصصة، وكلاء، هندسة خلفية، سحابة، واجهات، وتكامل.",
    },
  },
};
