"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import {
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  siteContent,
  type ExpertiseItem,
  type Locale,
  type SiteContent,
  type SystemStudy,
} from "@/content/site-content";

const logoPath = "/brand/khalid-bamarouf-logo-transparent.png";

const revealTransition = {
  duration: 1,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

function getReveal(distance = 56) {
  return {
    initial: { y: distance, opacity: 0.001, filter: "blur(12px)" },
    whileInView: { y: 0, opacity: 1, filter: "blur(0px)" },
    viewport: { once: true, amount: 0.22 },
    transition: revealTransition,
  };
}

function getFormValue(formData: FormData, name: string) {
  const value = formData.get(name);

  return typeof value === "string" ? value.trim() : "";
}

function buildInquiryBody(formData: FormData, content: SiteContent) {
  const lines = content.contact.fields.map((field) => {
    const value = getFormValue(formData, field.name);
    return `${field.label}: ${value || "-"}`;
  });

  return lines.join("\n\n");
}

function SystemLineDiagram({ activeIndex }: { activeIndex: number }) {
  const reduceMotion = useReducedMotion();
  const activeCode = `KB.${String(activeIndex + 1).padStart(2, "0")}`;

  return (
    <svg className="system-line-diagram" viewBox="0 0 600 260" aria-hidden="true">
      <defs>
        <linearGradient id="system-line-gold" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(215, 185, 124, 0.9)" />
          <stop offset="100%" stopColor="rgba(142, 157, 136, 0.34)" />
        </linearGradient>
      </defs>
      <path className="diagram-grid" d="M40 44H560M40 126H560M40 208H560" />
      <path className="diagram-grid" d="M110 22V236M250 22V236M390 22V236M510 22V236" />
      <text className="diagram-signature" x="44" y="34">
        {activeCode}
      </text>
      <text className="diagram-signature diagram-signature--right" x="556" y="236">
        SYS MAP
      </text>
      <motion.path
        key={`primary-${activeIndex}`}
        className="diagram-route diagram-route--primary"
        d="M68 196C136 74 222 74 292 136S438 219 532 54"
        initial={reduceMotion ? false : { pathLength: 0, opacity: 0.2 }}
        animate={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <motion.path
        key={`secondary-${activeIndex}`}
        className="diagram-route diagram-route--secondary"
        d="M82 72C166 145 258 204 350 116S472 84 536 158"
        initial={reduceMotion ? false : { pathLength: 0, opacity: 0.2 }}
        animate={reduceMotion ? undefined : { pathLength: 1, opacity: 0.65 }}
        transition={{ duration: 1.2, delay: 0.12, ease: "easeOut" }}
      />
      {[68, 182, 292, 414, 532].map((x, index) => (
        <motion.circle
          key={`${x}-${activeIndex}`}
          cx={x}
          cy={[196, 88, 136, 214, 54][index]}
          r={index === activeIndex % 5 ? 9 : 5}
          initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
          animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.2 + index * 0.05 }}
        />
      ))}
    </svg>
  );
}

function HeroCalibration() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className="hero-calibration"
      initial={reduceMotion ? false : { opacity: 0.001, clipPath: "inset(0 100% 0 0)" }}
      animate={reduceMotion ? undefined : { opacity: 1, clipPath: "inset(0 0% 0 0)" }}
      transition={{ duration: 1.1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="hero-calibration__readout">
        <span>KB-SYS-01</span>
        <span>Δ 27.32</span>
        <span>R 04</span>
      </div>
      <svg viewBox="0 0 520 420">
        <path className="calibration-grid" d="M26 46H494M26 146H494M26 246H494M26 346H494" />
        <path className="calibration-grid" d="M74 26V390M194 26V390M314 26V390M434 26V390" />
        <motion.path
          className="calibration-mark"
          d="M96 332L262 86L424 332M160 240H356M262 86V384"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={reduceMotion ? undefined : { pathLength: 1 }}
          transition={{ duration: 1.35, delay: 0.35, ease: "easeOut" }}
        />
        <motion.circle
          className="calibration-node"
          cx="262"
          cy="86"
          r="7"
          initial={reduceMotion ? false : { scale: 0 }}
          animate={reduceMotion ? undefined : { scale: 1 }}
          transition={{ duration: 0.4, delay: 1 }}
        />
        <motion.circle
          className="calibration-node"
          cx="160"
          cy="240"
          r="4"
          initial={reduceMotion ? false : { scale: 0 }}
          animate={reduceMotion ? undefined : { scale: 1 }}
          transition={{ duration: 0.4, delay: 1.08 }}
        />
        <motion.circle
          className="calibration-node"
          cx="356"
          cy="240"
          r="4"
          initial={reduceMotion ? false : { scale: 0 }}
          animate={reduceMotion ? undefined : { scale: 1 }}
          transition={{ duration: 0.4, delay: 1.16 }}
        />
      </svg>
    </motion.div>
  );
}

function DecisionMap() {
  return (
    <motion.div className="decision-map" {...getReveal(26)} aria-hidden="true">
      <svg viewBox="0 0 520 320">
        <path className="decision-map__grid" d="M36 52H486M36 160H486M36 268H486" />
        <path className="decision-map__grid" d="M96 34V286M260 34V286M424 34V286" />
        <path className="decision-map__route" d="M94 238C146 88 234 90 260 160S374 270 426 82" />
        <path className="decision-map__route decision-map__route--soft" d="M96 82C158 162 212 214 260 160S348 100 424 238" />
        {[
          ["BUS", 94, 238],
          ["ARCH", 260, 160],
          ["OPS", 426, 82],
          ["AI", 424, 238],
          ["API", 96, 82],
        ].map(([label, x, y]) => (
          <g key={label}>
            <circle cx={x} cy={y} r="13" />
            <text x={x} y={Number(y) + 34}>
              {label}
            </text>
          </g>
        ))}
      </svg>
      <div className="decision-map__plate">
        <span>KB/DR-04</span>
        <strong>05 / 14 / 03</strong>
      </div>
    </motion.div>
  );
}

function CapabilityTopology() {
  const nodes = [
    { code: "EA", x: 260, y: 56 },
    { code: "BE", x: 426, y: 140 },
    { code: "OPS", x: 374, y: 286 },
    { code: "AI", x: 146, y: 286 },
    { code: "API", x: 94, y: 140 },
  ];

  return (
    <motion.div className="capability-topology" {...getReveal(32)} aria-hidden="true">
      <svg viewBox="0 0 520 340">
        <path className="topology-ring" d="M260 56L426 140L374 286H146L94 140Z" />
        <path className="topology-axis" d="M260 56V286M94 140H426M146 286L426 140M374 286L94 140" />
        <circle className="topology-core" cx="260" cy="188" r="34" />
        <text className="topology-core-text" x="260" y="193">
          KB
        </text>
        {nodes.map((node) => (
          <g key={node.code} className="topology-node">
            <circle cx={node.x} cy={node.y} r="21" />
            <text x={node.x} y={node.y + 5}>
              {node.code}
            </text>
          </g>
        ))}
      </svg>
      <div>
        <span>KB-TOPOLOGY</span>
        <strong>05 DOM / 14 IF / 03 CTRL</strong>
      </div>
    </motion.div>
  );
}

function ApproachBlueprint({ steps }: { steps: { number: string; title: string }[] }) {
  return (
    <motion.div className="approach-blueprint" {...getReveal(28)} aria-hidden="true">
      <svg viewBox="0 0 960 170">
        <path className="approach-blueprint__rail" d="M70 92H890" />
        <path className="approach-blueprint__measure" d="M70 58V128M275 58V128M480 58V128M685 58V128M890 58V128" />
        <path className="approach-blueprint__trace" d="M70 92C174 24 250 160 340 92S454 24 552 92S710 164 890 58" />
        {steps.map((step, index) => {
          const x = 70 + index * 205;
          return (
            <g key={step.number}>
              <circle cx={x} cy="92" r="10" />
              <text x={x} y="38">
                {step.number}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="approach-blueprint__labels">
        {steps.map((step) => (
          <span key={step.number}>{step.title}</span>
        ))}
      </div>
    </motion.div>
  );
}

function StudyFlowMap({ activeIndex }: { activeIndex: number }) {
  const variants = [
    ["SRC", "API", "EVT", "OPS"],
    ["REQ", "CTRL", "AUTO", "AUD"],
    ["DATA", "RAG", "EVAL", "HUM"],
  ];
  const labels = variants[activeIndex] ?? variants[0];

  return (
    <div className="study-flow-map" aria-hidden="true">
      <svg viewBox="0 0 420 180">
        <path className="study-flow-map__grid" d="M38 52H382M38 128H382" />
        <path className="study-flow-map__grid" d="M72 28V154M180 28V154M288 28V154" />
        <path className="study-flow-map__route" d="M58 92H158C186 92 176 54 212 54H362" />
        <path className="study-flow-map__route study-flow-map__route--soft" d="M58 126H188C214 126 218 92 244 92H362" />
        {labels.map((label, index) => {
          const x = 58 + index * 102;
          const y = index % 2 === 0 ? 92 : 54;
          return (
            <g key={label}>
              <circle cx={x} cy={y} r="16" />
              <text x={x} y={y + 5}>
                {label}
              </text>
            </g>
          );
        })}
      </svg>
      <span>KB-FLOW/{String(activeIndex + 1).padStart(2, "0")}</span>
    </div>
  );
}

function OperatingCompass() {
  return (
    <motion.div className="operating-compass" {...getReveal(34)} aria-hidden="true">
      <svg viewBox="0 0 360 360">
        <circle className="operating-compass__ring" cx="180" cy="180" r="138" />
        <circle className="operating-compass__ring operating-compass__ring--inner" cx="180" cy="180" r="78" />
        <path className="operating-compass__axis" d="M180 42V318M42 180H318M82 82L278 278M278 82L82 278" />
        <path className="operating-compass__needle" d="M180 64L208 180L180 296L152 180Z" />
        <text x="180" y="28">
          KB/RUN
        </text>
        <text x="180" y="184">
          04
        </text>
        <text x="180" y="346">
          CTRL
        </text>
      </svg>
    </motion.div>
  );
}

function InsightAnnotation({ index }: { index: number }) {
  return (
    <div className="insight-annotation" aria-hidden="true">
      <span>KB.{String(index + 1).padStart(2, "0")}</span>
      <i />
      <i />
      <i />
    </div>
  );
}

function ContactSignal() {
  return (
    <motion.div className="contact-signal" {...getReveal(28)} aria-hidden="true">
      <svg viewBox="0 0 420 180">
        <path className="contact-signal__axis" d="M48 90H372M210 30V150" />
        <path className="contact-signal__pulse" d="M48 90C98 18 146 162 210 90S306 18 372 90" />
        <circle cx="48" cy="90" r="8" />
        <circle cx="210" cy="90" r="14" />
        <circle cx="372" cy="90" r="8" />
        <text x="48" y="128">REQ</text>
        <text x="210" y="128">ARCH</text>
        <text x="372" y="128">RUN</text>
      </svg>
      <span>KB-SIGNAL / OPEN</span>
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  lead,
  tone,
}: {
  eyebrow?: string;
  title: string;
  lead: string;
  tone?: "quiet" | "technical" | "editorial";
}) {
  return (
    <motion.div
      className={`section-heading ${tone ? `section-heading--${tone}` : ""}`}
      {...getReveal(44)}
    >
      {eyebrow ? <p className="section-heading__eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      <p>{lead}</p>
    </motion.div>
  );
}

function ExpertiseBoard({
  items,
  activeIndex,
  setActiveIndex,
}: {
  items: ExpertiseItem[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}) {
  const activeItem = items[activeIndex];

  return (
    <motion.div className="expertise-board" {...getReveal(40)}>
      <div className="expertise-board__index" role="tablist" aria-label="Expertise areas">
        {items.map((item, index) => (
          <button
            aria-controls="expertise-panel"
            aria-selected={activeIndex === index}
            className="expertise-index-item"
            key={item.name}
            onClick={() => setActiveIndex(index)}
            role="tab"
            type="button"
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{item.name}</strong>
            <small>{item.short}</small>
          </button>
        ))}
      </div>

      <motion.article
        animate={{ opacity: 1, y: 0 }}
        className="expertise-panel"
        id="expertise-panel"
        initial={{ opacity: 0.001, y: 18 }}
        key={activeItem.name}
        role="tabpanel"
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="expertise-panel__copy">
          <span>{activeItem.name}</span>
          <h3>{activeItem.focus}</h3>
          <p>{activeItem.value}</p>
          <div className="signal-row">
            {activeItem.signals.map((signal) => (
              <small key={signal}>{signal}</small>
            ))}
          </div>
        </div>
        <SystemLineDiagram activeIndex={activeIndex} />
      </motion.article>
    </motion.div>
  );
}

function StudyExhibition({
  studies,
  activeIndex,
  setActiveIndex,
  labels,
}: {
  studies: SystemStudy[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  labels: { challenge: string; structure: string };
}) {
  const activeStudy = studies[activeIndex];

  return (
    <motion.div className="study-exhibition" {...getReveal(42)}>
      <div className="study-stage">
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="study-stage__image"
          initial={{ opacity: 0.001, scale: 1.04 }}
          key={activeStudy.image}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Image
            alt=""
            fill
            sizes="(min-width: 1200px) 54vw, 100vw"
            src={activeStudy.image}
          />
        </motion.div>
        <div className="study-stage__shade" aria-hidden="true" />
        <StudyFlowMap activeIndex={activeIndex} />
        <div className="study-stage__caption">
          <span>{activeStudy.label}</span>
          <h3>{activeStudy.title}</h3>
        </div>
      </div>

      <div className="study-controls" role="tablist" aria-label="System studies">
        {studies.map((study, index) => (
          <button
            aria-controls="study-panel"
            aria-selected={activeIndex === index}
            className="study-control"
            key={study.title}
            onClick={() => setActiveIndex(index)}
            role="tab"
            type="button"
          >
            <span>{study.label}</span>
            <strong>{study.title}</strong>
          </button>
        ))}
      </div>

      <motion.article
        animate={{ opacity: 1, y: 0 }}
        className="study-panel"
        id="study-panel"
        initial={{ opacity: 0.001, y: 20 }}
        key={activeStudy.title}
        role="tabpanel"
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <p className="study-panel__summary">{activeStudy.summary}</p>
        <div className="study-panel__split">
          <div>
            <span>{labels.challenge}</span>
            <p>{activeStudy.challenge}</p>
          </div>
          <div>
            <span>{labels.structure}</span>
            <ul>
              {activeStudy.structure.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="study-panel__value">{activeStudy.value}</p>
      </motion.article>
    </motion.div>
  );
}

export function DesktopExperience() {
  const [locale, setLocale] = useState<Locale>("en");
  const [activeExpertise, setActiveExpertise] = useState(0);
  const [activeStudy, setActiveStudy] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const content = siteContent[locale];
  const heroImageY = useTransform(scrollYProgress, [0, 0.22], [0, 110]);
  const heroCopyY = useTransform(scrollYProgress, [0, 0.18], [0, 68]);
  const heroMarkY = useTransform(scrollYProgress, [0, 0.22], [0, -86]);

  function handleLanguageSwitch() {
    setLocale((current) => (current === "en" ? "ar" : "en"));
  }

  function handleInquirySubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = buildInquiryBody(formData, content);
    const mailto = `mailto:${content.contact.email}?subject=${encodeURIComponent(
      content.contact.subject,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  }

  return (
    <MotionConfig reducedMotion="user">
      <main
        className={`experience-shell ${content.direction === "rtl" ? "is-rtl" : ""}`}
        dir={content.direction}
        id="top"
      >
        <div className="ambient-grid" aria-hidden="true" />
        <header className="topbar">
          <a className="brand-lockup" href="#top" aria-label={`${content.brand.name} home`}>
            <Image
              alt=""
              height={48}
              priority
              src={logoPath}
              width={48}
            />
            <span>
              <strong>{content.brand.name}</strong>
              <small>{content.brand.role}</small>
            </span>
          </a>

          <nav className="topbar__nav" aria-label="Primary navigation">
            {content.nav.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <button
            aria-label={content.language.switchLabel}
            className="language-switch"
            onClick={handleLanguageSwitch}
            type="button"
          >
            <span>{content.language.current}</span>
            <span>{content.language.alternate}</span>
          </button>
        </header>

        <section className="hero" aria-labelledby="hero-title">
          <motion.div
            className="hero__image"
            style={reduceMotion ? undefined : { y: heroImageY }}
          >
            <Image
              alt=""
              fetchPriority="high"
              fill
              loading="eager"
              sizes="100vw"
              src="/images/enterprise-data-center.jpg"
            />
          </motion.div>
          <div className="hero__shadow" aria-hidden="true" />
          <div className="hero__architectural-mask" aria-hidden="true" />
          <motion.div
            className="hero__logo"
            style={reduceMotion ? undefined : { y: heroMarkY }}
          >
            <Image
              alt={content.brand.logoAlt}
              height={640}
              priority
              src={logoPath}
              width={640}
            />
          </motion.div>
          <HeroCalibration />

          <motion.div
            className="hero__content"
            initial={reduceMotion ? false : { opacity: 0.001, y: 54, filter: "blur(12px)" }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={revealTransition}
            style={reduceMotion ? undefined : { y: heroCopyY }}
          >
            <p className="hero__eyebrow">{content.hero.eyebrow}</p>
            <h1 id="hero-title">{content.hero.title}</h1>
            <p className="hero__lead">{content.hero.lead}</p>
            <div className="hero__actions">
              <a className="button button--primary" href="#contact">
                {content.hero.primaryCta}
              </a>
              <a className="button button--secondary" href="#expertise">
                {content.hero.secondaryCta}
              </a>
            </div>
          </motion.div>

          <motion.div
            className="hero__metrics"
            initial={reduceMotion ? false : { opacity: 0.001, y: 34 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ ...revealTransition, delay: 0.25 }}
          >
            {content.hero.metrics.map((metric) => (
              <div key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
              </div>
            ))}
          </motion.div>
        </section>

        <section className="positioning chapter" id="positioning" aria-labelledby="positioning-title">
          <motion.div className="positioning__statement" {...getReveal(50)}>
            <p>{content.brand.role}</p>
            <h2 id="positioning-title">{content.positioning.title}</h2>
          </motion.div>
          <motion.div className="positioning__body" {...getReveal(42)}>
            <p className="positioning__lead">{content.positioning.lead}</p>
            <p>{content.positioning.body}</p>
            <ul>
              {content.positioning.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </motion.div>
          <DecisionMap />
          <motion.div className="positioning__image" {...getReveal(36)}>
            <Image
              alt=""
              fill
              sizes="(min-width: 1200px) 32vw, 100vw"
              src="/images/architectural-hallway.jpg"
            />
          </motion.div>
        </section>

        <section className="expertise chapter" id="expertise" aria-labelledby="expertise-title">
          <SectionHeading
            eyebrow={content.labels.expertise}
            lead={content.expertise.lead}
            title={content.expertise.title}
            tone="quiet"
          />
          <ExpertiseBoard
            activeIndex={activeExpertise}
            items={content.expertise.items}
            setActiveIndex={setActiveExpertise}
          />
        </section>

        <section className="capabilities chapter" id="capabilities" aria-labelledby="capabilities-title">
          <SectionHeading
            eyebrow={content.labels.capabilities}
            lead={content.capabilities.lead}
            title={content.capabilities.title}
            tone="technical"
          />
          <CapabilityTopology />
          <motion.div className="capability-matrix" {...getReveal(44)}>
            {content.capabilities.groups.map((group, groupIndex) => (
              <article className="capability-group" key={group.title}>
                <div className="capability-group__number">
                  {String(groupIndex + 1).padStart(2, "0")}
                </div>
                <div className="capability-group__copy">
                  <h3>{group.title}</h3>
                  <p>{group.intro}</p>
                </div>
                <ul>
                  {group.capabilities.map((capability) => (
                    <li key={capability}>{capability}</li>
                  ))}
                </ul>
              </article>
            ))}
          </motion.div>
        </section>

        <section className="approach chapter" id="approach" aria-labelledby="approach-title">
          <div className="approach__image">
            <Image
              alt=""
              fill
              sizes="100vw"
              src="/images/enterprise-data-center.jpg"
            />
          </div>
          <div className="approach__shade" aria-hidden="true" />
          <SectionHeading
            eyebrow={content.labels.approach}
            lead={content.approach.lead}
            title={content.approach.title}
          />
          <ApproachBlueprint steps={content.approach.steps} />
          <motion.div className="approach-rail" {...getReveal(40)}>
            {content.approach.steps.map((step) => (
              <article className="approach-step" key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </motion.div>
        </section>

        <section className="studies chapter" id="studies" aria-labelledby="studies-title">
          <SectionHeading
            eyebrow={content.labels.studies}
            lead={content.studies.lead}
            title={content.studies.title}
            tone="quiet"
          />
          <StudyExhibition
            activeIndex={activeStudy}
            labels={{
              challenge: content.labels.challenge,
              structure: content.labels.structure,
            }}
            setActiveIndex={setActiveStudy}
            studies={content.studies.items}
          />
        </section>

        <section className="why chapter" id="why" aria-labelledby="why-title">
          <motion.div className="why__title" {...getReveal(48)}>
            <p>{content.why.lead}</p>
            <h2 id="why-title">{content.why.title}</h2>
          </motion.div>
          <OperatingCompass />
          <motion.div className="why__principles" {...getReveal(40)}>
            {content.why.principles.map((principle, index) => (
              <article key={principle.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </article>
            ))}
          </motion.div>
        </section>

        <section className="insights chapter" id="insights" aria-labelledby="insights-title">
          <SectionHeading
            eyebrow={content.labels.insights}
            lead={content.insights.lead}
            title={content.insights.title}
            tone="editorial"
          />
          <motion.div className="insight-row" {...getReveal(40)}>
            {content.insights.items.map((insight, index) => (
              <article key={insight.title}>
                <InsightAnnotation index={index} />
                <h3>{insight.title}</h3>
                <p>{insight.body}</p>
              </article>
            ))}
          </motion.div>
        </section>

        <section className="contact chapter" id="contact" aria-labelledby="contact-title">
          <div className="contact__image">
            <Image
              alt=""
              fill
              sizes="100vw"
              src="/images/architectural-hallway.jpg"
            />
          </div>
          <div className="contact__shade" aria-hidden="true" />
          <motion.div className="contact__statement" {...getReveal(52)}>
            <Image
              alt=""
              height={92}
              src={logoPath}
              width={92}
            />
            <ContactSignal />
            <h2 id="contact-title">{content.contact.title}</h2>
            <p>{content.contact.lead}</p>
          </motion.div>

          <motion.form className="contact-form" onSubmit={handleInquirySubmit} {...getReveal(44)}>
            {content.contact.fields.map((field) => (
              <label key={field.name}>
                <span>{field.label}</span>
                {field.type === "textarea" ? (
                  <textarea name={field.name} placeholder={field.placeholder} rows={4} />
                ) : (
                  <input name={field.name} placeholder={field.placeholder} type={field.type} />
                )}
              </label>
            ))}
            <button className="button button--primary" type="submit">
              {content.contact.button}
            </button>
          </motion.form>

          <motion.div className="contact-channels" {...getReveal(36)}>
            {content.contact.channels.map((channel) => (
              <div key={channel.label}>
                <span>{channel.label}</span>
                {channel.href ? (
                  <a href={channel.href}>{channel.value}</a>
                ) : (
                  <strong>{channel.value}</strong>
                )}
              </div>
            ))}
          </motion.div>
        </section>

        <footer className="footer">
          <a className="footer__brand" href="#top">
            <Image alt="" height={52} src={logoPath} width={52} />
            <span>{content.brand.name}</span>
          </a>
          <p>{content.footer.statement}</p>
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
