"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { MotionConfig, motion, useScroll, useTransform } from "framer-motion";
import {
  contactConfig,
  getMailtoHref,
  getWhatsAppHref,
} from "@/content/contact-config";
import {
  siteContent,
  type CapabilityGroup,
  type ExpertiseItem,
  type Locale,
  type SystemStudy,
} from "@/content/site-content";
import styles from "./desktop-experience.module.css";

const logoPath = "/brand/khalid-bamarouf-logo-transparent.png";
const studioHeaderMarkPath = "/brand/bamarouf-studio-header.png";
const studioFooterMarkPath = "/brand/bamarouf-studio-footer.png";
const brandName = "Khalid Bamarouf";
type TextDirection = "ltr" | "rtl";
type RevealAxis = "x" | "y";

const revealTransition = {
  duration: 0.9,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

const heroLeadOpeners: Record<Locale, string> = {
  en: "AI automations that solve the problems you have right now and make things run better.",
  ar: "أتمتة بالذكاء الاصطناعي تحل المشكلات التي تواجهها الآن وتجعل العمل يسير بصورة أفضل.",
};

const problemMapLanguage: Record<Locale, string[]> = {
  en: ["Issue", "Workflow", "Tools", "Controls", "Automation"],
  ar: ["المشكلة", "مسار العمل", "الأدوات", "الضوابط", "الأتمتة"],
};

const systemLanguage = {
  en: {
    primaryStatus: "READY",
    agent: "AI Agent",
    workflow: "Workflow",
    automation: "Automation",
    observability: "Observability",
    api: "API Layer",
    running: "Running",
    active: "Active",
    connected: "Connected",
    evaluating: "Evaluating",
    completed: "Completed",
    escalated: "Escalated",
    process: "Process data",
    insight: "Generate insight",
    action: "Take action",
    route: "Route exceptions",
  },
  ar: {
    primaryStatus: "جاهز",
    agent: "وكيل ذكاء اصطناعي",
    workflow: "مسار العمل",
    automation: "الأتمتة",
    observability: "المراقبة",
    api: "طبقة الواجهات",
    running: "يعمل",
    active: "نشط",
    connected: "متصل",
    evaluating: "تقييم",
    completed: "مكتمل",
    escalated: "تصعيد",
    process: "معالجة البيانات",
    insight: "توليد الرؤية",
    action: "تنفيذ الإجراء",
    route: "توجيه الاستثناءات",
  },
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getReveal(
  distance = 40,
  direction: TextDirection = "ltr",
  axis: RevealAxis = "y",
  delay = 0,
) {
  const signedDistance = direction === "rtl" ? -distance : distance;
  const initial =
    axis === "x"
      ? { x: signedDistance, opacity: 0.001, filter: "blur(12px)" }
      : { y: distance, opacity: 0.001, filter: "blur(12px)" };
  const whileInView =
    axis === "x"
      ? { x: 0, opacity: 1, filter: "blur(0px)" }
      : { y: 0, opacity: 1, filter: "blur(0px)" };

  return {
    initial,
    whileInView,
    viewport: { once: true, amount: 0.18 },
    transition: { ...revealTransition, delay },
  };
}

function oppositeDirection(direction: TextDirection) {
  return direction === "rtl" ? "ltr" : "rtl";
}

function localizeNumerals(value: string, locale: Locale) {
  if (locale !== "ar") {
    return value;
  }

  return value.replace(/\d/g, (digit) => arabicDigits[Number(digit)] ?? digit);
}

function formatIndex(index: number, locale: Locale) {
  return localizeNumerals(String(index + 1).padStart(2, "0"), locale);
}

function renderCopy(text: string): ReactNode {
  const parts = text.split(brandName);

  if (parts.length === 1) {
    return text;
  }

  return parts.flatMap((part, index) => {
    if (index === parts.length - 1) {
      return [part];
    }

    return [
      part,
      <span className="brand-name" dir="ltr" key={`${text}-${index}`}>
        {brandName}
      </span>,
    ];
  });
}

function getHeroNarrative(locale: Locale, lead: string) {
  const opener = heroLeadOpeners[locale];

  if (lead.startsWith(opener)) {
    return {
      headline: opener,
      support: lead.slice(opener.length).trim(),
    };
  }

  const [fallbackHeadline, ...rest] = lead.split(". ");

  return {
    headline: fallbackHeadline,
    support: rest.join(". "),
  };
}

function SectionIntro({
  eyebrow,
  id,
  lead,
  title,
  direction,
}: {
  eyebrow: string;
  id: string;
  lead: string;
  title: string;
  direction: TextDirection;
}) {
  return (
    <motion.div
      className={styles.sectionIntro}
      {...getReveal(36, direction, "x")}
    >
      <p className={styles.kicker}>{eyebrow}</p>
      <h2 id={id}>{renderCopy(title)}</h2>
      <p>{renderCopy(lead)}</p>
    </motion.div>
  );
}

function SystemAtmosphere() {
  const fragments = [
    "agent.evaluate()",
    "workflow.route",
    "api.contract",
    "telemetry.ready",
    "human.escalation",
    "control.room",
    "automation.run",
    "integration.live",
  ];

  return (
    <div className={styles.atmosphere} aria-hidden="true">
      <div className={styles.atmosphereGrid} />
      <div className={styles.codeField}>
        {fragments.map((fragment, index) => (
          <span key={fragment} style={{ "--i": index } as React.CSSProperties}>
            {fragment}
          </span>
        ))}
      </div>
      <div className={styles.depthLight} />
    </div>
  );
}

function SystemPanel({
  className,
  lines,
  state,
  title,
}: {
  className?: string;
  lines: string[];
  state: string;
  title: string;
}) {
  return (
    <div className={cx(styles.systemPanel, className)}>
      <div className={styles.panelHeader}>
        <strong>{title}</strong>
        <span>{state}</span>
      </div>
      <div className={styles.panelRows}>
        {lines.map((line) => (
          <span key={line}>
            <i />
            {line}
          </span>
        ))}
      </div>
    </div>
  );
}

function HeroSystem({ locale }: { locale: Locale }) {
  const language = systemLanguage[locale];

  return (
    <motion.div
      aria-hidden="true"
      className={styles.heroSystem}
      initial={{ opacity: 0.001, scale: 0.97, filter: "blur(16px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ ...revealTransition, delay: 0.22 }}
    >
      <svg className={styles.systemMap} viewBox="0 0 900 600">
        <path className={styles.systemMapBase} d="M450 292C322 188 246 163 110 160" />
        <path className={styles.systemMapBase} d="M450 292C618 184 710 145 820 150" />
        <path className={styles.systemMapBase} d="M450 320C294 340 220 380 118 438" />
        <path className={styles.systemMapBase} d="M450 320C610 342 708 394 815 450" />
        <path className={styles.systemMapPulse} d="M450 292C322 188 246 163 110 160" />
        <path className={styles.systemMapPulse} d="M450 292C618 184 710 145 820 150" />
        <path className={styles.systemMapPulse} d="M450 320C294 340 220 380 118 438" />
        <path className={styles.systemMapPulse} d="M450 320C610 342 708 394 815 450" />
        <circle cx="450" cy="304" r="84" />
        <circle cx="450" cy="304" r="138" />
      </svg>

      <div className={styles.systemCore}>
        <span className={styles.coreHalo} />
        <Image alt="" height={126} priority src={logoPath} width={126} />
        <strong>{language.primaryStatus}</strong>
      </div>

      <SystemPanel
        className={styles.panelAgent}
        lines={[language.process, language.insight, language.action]}
        state={language.running}
        title={language.agent}
      />
      <SystemPanel
        className={styles.panelWorkflow}
        lines={[language.connected, language.escalated, language.completed]}
        state={language.active}
        title={language.workflow}
      />
      <SystemPanel
        className={styles.panelAutomation}
        lines={[language.process, language.route, language.action]}
        state={language.active}
        title={language.automation}
      />
      <SystemPanel
        className={styles.panelObservation}
        lines={[language.evaluating, language.connected, language.completed]}
        state={language.connected}
        title={language.observability}
      />
      <div className={styles.apiPlate}>
        <span>{language.api}</span>
        <i />
        <i />
        <i />
      </div>
    </motion.div>
  );
}

function ServiceBoard({
  activeIndex,
  items,
  locale,
  setActiveIndex,
}: {
  activeIndex: number;
  items: ExpertiseItem[];
  locale: Locale;
  setActiveIndex: (index: number) => void;
}) {
  const activeItem = items[activeIndex];

  return (
    <motion.div className={styles.serviceBoard} {...getReveal(34)}>
      <div className={styles.serviceGrid} role="tablist" aria-label="Expertise">
        {items.map((item, index) => (
          <button
            aria-controls="service-detail-panel"
            aria-selected={activeIndex === index}
            className={cx(styles.serviceNode, activeIndex === index && styles.serviceNodeActive)}
            key={item.name}
            onClick={() => setActiveIndex(index)}
            role="tab"
            type="button"
          >
            <span className={styles.serviceIndex}>{formatIndex(index, locale)}</span>
            <span className={styles.serviceGlyph}>{index === 0 ? "AI" : `0${index}`}</span>
            <strong>{item.name}</strong>
            <small>{item.short}</small>
          </button>
        ))}
      </div>

      <motion.article
        animate={{ opacity: 1, y: 0 }}
        className={styles.serviceDetail}
        id="service-detail-panel"
        initial={{ opacity: 0.001, y: 20 }}
        key={activeItem.name}
        role="tabpanel"
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div>
          <span className={styles.kicker}>{activeItem.focus}</span>
          <h3>{activeItem.name}</h3>
          <p>{activeItem.value}</p>
        </div>
        <ul className={styles.signalList}>
          {activeItem.signals.map((signal) => (
            <li key={signal}>{signal}</li>
          ))}
        </ul>
        <div className={styles.detailTrace} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </motion.article>
    </motion.div>
  );
}

function CapabilityPanel({
  group,
  index,
  locale,
}: {
  group: CapabilityGroup;
  index: number;
  locale: Locale;
}) {
  return (
    <article className={styles.capabilityPanel}>
      <div className={styles.capabilityHead}>
        <span>{formatIndex(index, locale)}</span>
        <div>
          <p>{group.intro}</p>
          <h3>{group.title}</h3>
        </div>
      </div>
      <ul className={styles.capabilityList}>
        {group.capabilities.map((capability) => (
          <li key={capability}>{capability}</li>
        ))}
      </ul>
    </article>
  );
}

function StudyDetail({
  direction,
  labels,
  locale,
  study,
}: {
  direction: TextDirection;
  labels: { challenge: string; structure: string };
  locale: Locale;
  study: SystemStudy;
}) {
  const outcomeLabel = locale === "ar" ? "النتيجة" : "Outcome";

  return (
    <motion.article
      className={styles.studyDetail}
      {...getReveal(38, oppositeDirection(direction), "x")}
    >
      <div className={styles.studyDetailIntro}>
        <span className={styles.kicker}>{study.label}</span>
        <h3>{study.title}</h3>
        <p>{study.summary}</p>
      </div>

      <div className={styles.studyInformation}>
        <div>
          <span>{labels.challenge}</span>
          <p>{study.challenge}</p>
        </div>
        <div>
          <span>{labels.structure}</span>
          <ul className={styles.structureList}>
            {study.structure.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <span>{outcomeLabel}</span>
          <p>{study.value}</p>
        </div>
      </div>
    </motion.article>
  );
}

export function DesktopExperience({ locale = "en" }: { locale?: Locale }) {
  const [activeExpertise, setActiveExpertise] = useState(0);
  const { scrollYProgress } = useScroll();
  const content = siteContent[locale];
  const heroNarrative = getHeroNarrative(locale, content.hero.lead);
  const heroCopyY = useTransform(scrollYProgress, [0, 0.2], [0, 56]);
  const heroVisualY = useTransform(scrollYProgress, [0, 0.24], [0, 92]);
  const direction = content.direction;
  const study = content.studies.items[0];

  return (
    <MotionConfig reducedMotion="user">
      <main
        className={cx(
          "experience-shell",
          direction === "rtl" && "is-rtl",
          styles.shell,
        )}
        data-locale={content.locale}
        dir={direction}
        id="top"
        lang={content.locale}
      >
        <SystemAtmosphere />

        <header className={styles.header}>
          <div className={styles.headerInner}>
            <a className={styles.brandLockup} href="#top" aria-label={`${content.brand.name} home`}>
              <Image alt="" height={70} priority src={logoPath} width={70} />
              <span>
                <strong className="brand-name" dir="ltr">
                  {content.brand.name}
                </strong>
                <small>{content.brand.role}</small>
              </span>
            </a>

            <nav className={styles.navigation} aria-label="Primary navigation">
              {content.nav.map((item) => (
                <a href={item.href} key={item.href}>
                  {item.label}
                </a>
              ))}
              <a
                aria-label={content.studio.ariaLabel}
                className={styles.studioNavLink}
                href={content.studio.url}
                title={content.studio.ariaLabel}
              >
                <Image alt="" height={26} src={studioHeaderMarkPath} width={26} />
              </a>
            </nav>

            <div className={styles.headerActions}>
              <Link
                aria-label={content.language.switchLabel}
                className={styles.languageSwitch}
                href={locale === "ar" ? "/" : "/ar"}
                hrefLang={locale === "ar" ? "en" : "ar"}
              >
                <span>{content.language.current}</span>
                <i />
                <span>{content.language.alternate}</span>
              </Link>
            </div>
          </div>
        </header>

        <section className={cx(styles.hero, styles.chapter)} aria-labelledby="hero-title">
          <div className={styles.heroBackdrop} aria-hidden="true">
            <Image
              alt=""
              fill
              fetchPriority="high"
              loading="eager"
              sizes="100vw"
              src="/images/ai-operations-headquarters.webp"
            />
          </div>
          <div className={styles.heroLayout}>
            <motion.div
              animate={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
              className={styles.heroCopy}
              initial={{
                opacity: 0.001,
                x: direction === "rtl" ? -36 : 36,
                y: 24,
                filter: "blur(12px)",
              }}
              style={{ y: heroCopyY }}
              transition={revealTransition}
            >
              <p className={styles.kicker}>{content.hero.title}</p>
              <h1 id="hero-title">{renderCopy(heroNarrative.headline)}</h1>
              <p className={styles.heroLead}>{renderCopy(heroNarrative.support)}</p>
              <div className={styles.heroActions}>
                <a className={styles.primaryButton} href="#contact">
                  {content.hero.primaryCta}
                  <span aria-hidden="true">↗</span>
                </a>
                <a className={styles.secondaryButton} href="#expertise">
                  {content.hero.secondaryCta}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </motion.div>

            <motion.div className={styles.heroVisual} style={{ y: heroVisualY }}>
              <HeroSystem locale={locale} />
            </motion.div>
          </div>
        </section>

        <section className={cx(styles.expertise, styles.chapter)} id="expertise" aria-labelledby="expertise-title">
          <div className={styles.sectionFrame}>
            <SectionIntro
              direction={direction}
              eyebrow={content.labels.expertise}
              id="expertise-title"
              lead={content.expertise.lead}
              title={content.expertise.title}
            />
            <ServiceBoard
              activeIndex={activeExpertise}
              items={content.expertise.items}
              locale={locale}
              setActiveIndex={setActiveExpertise}
            />
          </div>
        </section>

        <section className={cx(styles.about, styles.chapter)} id="about" aria-labelledby="about-title">
          <div className={styles.aboutGrid}>
            <motion.div
              className={styles.aboutCopy}
              {...getReveal(42, direction, "x")}
            >
              <p className={styles.kicker}>{content.brand.role}</p>
              <h2 id="about-title">{renderCopy(content.positioning.title)}</h2>
              <p className={styles.aboutLead}>{renderCopy(content.positioning.lead)}</p>
              <p>{renderCopy(content.positioning.body)}</p>
              <div className={styles.aboutNotes}>
                {content.positioning.notes.map((note) => (
                  <p key={note}>{renderCopy(note)}</p>
                ))}
              </div>
            </motion.div>

            <motion.div
              aria-hidden="true"
              className={styles.aboutVisual}
              {...getReveal(42, oppositeDirection(direction), "x", 0.08)}
            >
              <div className={styles.problemMap}>
                {problemMapLanguage[locale].map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
              <Image
                alt=""
                fill
                sizes="(min-width: 1200px) 42vw, 44vw"
                src="/images/integration-cabling.jpg"
              />
            </motion.div>
          </div>
        </section>

        <section className={cx(styles.capabilities, styles.chapter)} id="capabilities" aria-labelledby="capabilities-title">
          <div className={styles.sectionFrame}>
            <SectionIntro
              direction={direction}
              eyebrow={content.labels.capabilities}
              id="capabilities-title"
              lead={content.capabilities.lead}
              title={content.capabilities.title}
            />
            <motion.div className={styles.capabilityDeck} {...getReveal(34)}>
              {content.capabilities.groups.map((group, index) => (
                <CapabilityPanel
                  group={group}
                  index={index}
                  key={group.title}
                  locale={locale}
                />
              ))}
            </motion.div>
          </div>
        </section>

        <section className={cx(styles.approach, styles.chapter)} id="approach" aria-labelledby="approach-title">
          <div className={styles.approachBackdrop} aria-hidden="true">
            <Image alt="" fill sizes="100vw" src="/images/compute-cooling.jpg" />
          </div>
          <div className={styles.sectionFrame}>
            <SectionIntro
              direction={direction}
              eyebrow={content.labels.approach}
              id="approach-title"
              lead={content.approach.lead}
              title={content.approach.title}
            />
            <motion.div className={styles.operatingPath} {...getReveal(34)}>
              <svg aria-hidden="true" className={styles.pathRail} viewBox="0 0 1180 180">
                <path className={styles.pathBase} d="M60 90H1120" />
                <path className={styles.pathPulse} d="M60 90C180 22 260 158 380 90S580 22 700 90S930 156 1120 52" />
              </svg>
              <div className={styles.stepGrid}>
                {content.approach.steps.map((step) => (
                  <article className={styles.stepCard} key={step.number}>
                    <span>{localizeNumerals(step.number, locale)}</span>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                    <i aria-hidden="true" />
                  </article>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className={cx(styles.studies, styles.chapter)} id="studies" aria-labelledby="studies-title">
          <div className={styles.studyTop}>
            <SectionIntro
              direction={direction}
              eyebrow={content.labels.studies}
              id="studies-title"
              lead={content.studies.lead}
              title={content.studies.title}
            />
            <motion.div
              className={styles.studyMedia}
              {...getReveal(38, oppositeDirection(direction), "x", 0.08)}
            >
              <Image alt="" fill sizes="(min-width: 1200px) 44vw, 44vw" src={study.image} />
              <div className={styles.studyMediaOverlay} aria-hidden="true" />
            </motion.div>
          </div>
          <StudyDetail
            direction={direction}
            labels={{
              challenge: content.labels.challenge,
              structure: content.labels.structure,
            }}
            locale={locale}
            study={study}
          />
        </section>

        <section className={cx(styles.why, styles.chapter)} id="why" aria-labelledby="why-title">
          <div className={styles.whyGrid}>
            <motion.div className={styles.whyIntro} {...getReveal(40, direction, "x")}>
              <p className={styles.kicker}>{content.why.lead}</p>
              <h2 id="why-title">{renderCopy(content.why.title)}</h2>
            </motion.div>
            <motion.div
              className={styles.ruleStack}
              {...getReveal(40, oppositeDirection(direction), "x", 0.08)}
            >
              {content.why.principles.map((principle, index) => (
                <article className={styles.ruleItem} key={principle.title}>
                  <span>{formatIndex(index, locale)}</span>
                  <div>
                    <h3>{renderCopy(principle.title)}</h3>
                    <p>{renderCopy(principle.body)}</p>
                  </div>
                </article>
              ))}
            </motion.div>
          </div>
        </section>

        <section className={cx(styles.insights, styles.chapter)} id="insights" aria-labelledby="insights-title">
          <div className={styles.sectionFrame}>
            <SectionIntro
              direction={direction}
              eyebrow={content.labels.insights}
              id="insights-title"
              lead={content.insights.lead}
              title={content.insights.title}
            />
            <motion.div className={styles.notesGrid} {...getReveal(34)}>
              {content.insights.items.map((insight, index) => (
                <article className={styles.noteItem} key={insight.title}>
                  <span>{formatIndex(index, locale)}</span>
                  <h3>{renderCopy(insight.title)}</h3>
                  <p>{renderCopy(insight.body)}</p>
                </article>
              ))}
            </motion.div>
          </div>
        </section>

        <section className={cx(styles.contact, styles.chapter)} id="contact" aria-labelledby="contact-title">
          <div className={styles.contactImage} aria-hidden="true">
            <Image alt="" fill sizes="100vw" src="/images/ai-operations-headquarters.webp" />
          </div>
          <div className={styles.contactShell}>
            <motion.div
              className={styles.contactStatement}
              {...getReveal(44, direction, "x")}
            >
              <Image alt="" height={104} src={logoPath} width={104} />
              <p className={styles.kicker}>{content.hero.title}</p>
              <h2 id="contact-title">{renderCopy(content.contact.title)}</h2>
              <p>{renderCopy(content.contact.lead)}</p>
            </motion.div>

            <motion.div
              className={styles.contactChannels}
              {...getReveal(44, oppositeDirection(direction), "x", 0.08)}
            >
              <a href={getWhatsAppHref()} rel="noreferrer" target="_blank">
                <span>{content.contact.whatsappLabel}</span>
                <strong dir="ltr">{contactConfig.whatsapp.display}</strong>
              </a>
              <a href={getMailtoHref(content.contact.subject)}>
                <span>{content.contact.emailLabel}</span>
                <strong dir="ltr">{contactConfig.email.address}</strong>
              </a>
            </motion.div>
          </div>
        </section>

        <footer className={styles.footer}>
          <a className={styles.footerBrand} href="#top">
            <Image alt="" height={58} src={logoPath} width={58} />
            <span className="brand-name" dir="ltr">
              {content.brand.name}
            </span>
          </a>
          <div className={styles.footerCopy}>
            <p>{content.footer.statement}</p>
            <a
              aria-label={content.studio.ariaLabel}
              className={styles.footerStudioSignature}
              href={content.studio.url}
            >
              <Image alt="" height={26} src={studioFooterMarkPath} width={26} />
              <span>{content.studio.footerSignature}</span>
            </a>
          </div>
          <nav aria-label="Footer navigation">
            {content.nav.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </footer>
      </main>
    </MotionConfig>
  );
}
