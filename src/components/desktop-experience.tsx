"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  MotionConfig,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  getMailtoHref,
  getWhatsAppHref,
  temporaryContactConfig,
} from "@/content/contact-config";
import {
  siteContent,
  type ExpertiseItem,
  type Locale,
  type SystemStudy,
} from "@/content/site-content";

const logoPath = "/brand/khalid-bamarouf-logo-transparent.png";
type TextDirection = "ltr" | "rtl";
type RevealAxis = "x" | "y";

const revealTransition = {
  duration: 1,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

function getReveal(distance = 56, direction: TextDirection = "ltr", axis: RevealAxis = "y") {
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
    viewport: { once: true, amount: 0.16 },
    transition: revealTransition,
  };
}

function oppositeDirection(direction: TextDirection) {
  return direction === "rtl" ? "ltr" : "rtl";
}

const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

function localizeNumerals(value: string, locale: Locale) {
  if (locale !== "ar") {
    return value;
  }

  return value.replace(/\d/g, (digit) => arabicDigits[Number(digit)] ?? digit);
}

function formatIndex(index: number, locale: Locale) {
  return localizeNumerals(String(index + 1).padStart(2, "0"), locale);
}

function ApproachBlueprint({
  direction,
  locale,
  steps,
}: {
  direction: TextDirection;
  locale: Locale;
  steps: { number: string; title: string }[];
}) {
  const labels = direction === "rtl" ? [...steps].reverse() : steps;

  return (
    <motion.div className="approach-blueprint decorative-layer" {...getReveal(28)} aria-hidden="true">
      <svg viewBox="0 0 960 170">
        <path className="approach-blueprint__rail" d="M70 92H890" />
        <path className="approach-blueprint__measure" d="M70 58V128M275 58V128M480 58V128M685 58V128M890 58V128" />
        <path
          className="approach-blueprint__trace"
          d={
            direction === "rtl"
              ? "M890 92C786 24 710 160 620 92S506 24 408 92S250 164 70 58"
              : "M70 92C174 24 250 160 340 92S454 24 552 92S710 164 890 58"
          }
        />
        {steps.map((step, index) => {
          const x = direction === "rtl" ? 890 - index * 205 : 70 + index * 205;
          return (
            <g key={step.number}>
              <circle cx={x} cy="92" r="10" />
              <text x={x} y="38">
                {localizeNumerals(step.number, locale)}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="approach-blueprint__labels">
        {labels.map((step) => (
          <span key={step.number}>{step.title}</span>
        ))}
      </div>
    </motion.div>
  );
}

function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  tone,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  lead: string;
  tone?: "quiet" | "technical" | "editorial";
}) {
  return (
    <motion.div
      className={`section-heading content-protected ${tone ? `section-heading--${tone}` : ""}`}
      {...getReveal(44)}
    >
      {eyebrow ? <p className="section-heading__eyebrow">{eyebrow}</p> : null}
      <h2 id={id}>{title}</h2>
      <p>{lead}</p>
    </motion.div>
  );
}

function ExpertiseBoard({
  items,
  activeIndex,
  locale,
  ariaLabel,
  setActiveIndex,
}: {
  items: ExpertiseItem[];
  activeIndex: number;
  locale: Locale;
  ariaLabel: string;
  setActiveIndex: (index: number) => void;
}) {
  const activeItem = items[activeIndex];

  return (
    <motion.div className="expertise-board" {...getReveal(40)}>
      <div className="expertise-board__index content-protected" role="tablist" aria-label={ariaLabel}>
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
            <span>{formatIndex(index, locale)}</span>
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
        <div className="expertise-panel__copy content-protected">
          <span>{activeItem.name}</span>
          <h3>{activeItem.focus}</h3>
          <p>{activeItem.value}</p>
          <div className="signal-row">
            {activeItem.signals.map((signal) => (
              <small key={signal}>{signal}</small>
            ))}
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

function StudyExhibition({
  studies,
  activeIndex,
  setActiveIndex,
  labels,
  ariaLabel,
}: {
  studies: SystemStudy[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  labels: { challenge: string; structure: string };
  ariaLabel: string;
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
        <div className="study-stage__caption content-protected">
          <span>{activeStudy.label}</span>
          <h3>{activeStudy.title}</h3>
        </div>
      </div>

      <div className="study-controls content-protected" role="tablist" aria-label={ariaLabel}>
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
        className="study-panel content-protected"
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

export function DesktopExperience({ locale = "en" }: { locale?: Locale }) {
  const [activeExpertise, setActiveExpertise] = useState(0);
  const [activeStudy, setActiveStudy] = useState(0);
  const { scrollYProgress } = useScroll();
  const content = siteContent[locale];
  const heroImageY = useTransform(scrollYProgress, [0, 0.22], [0, 110]);
  const heroCopyY = useTransform(scrollYProgress, [0, 0.18], [0, 68]);

  return (
    <MotionConfig reducedMotion="user">
      <main
        className={`experience-shell ${content.direction === "rtl" ? "is-rtl" : ""}`}
        data-locale={content.locale}
        dir={content.direction}
        id="top"
        lang={content.locale}
      >
        <div className="ambient-grid" aria-hidden="true" />
        <header className="topbar">
          <a className="brand-lockup" href="#top" aria-label={`${content.brand.name} home`}>
            <Image
              alt=""
              height={64}
              priority
              src={logoPath}
              width={64}
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

          <Link
            aria-label={content.language.switchLabel}
            className="language-switch"
            href={locale === "ar" ? "/" : "/ar"}
            hrefLang={locale === "ar" ? "en" : "ar"}
          >
            <span>{content.language.current}</span>
            <span>{content.language.alternate}</span>
          </Link>
        </header>

        <section className="hero" aria-labelledby="hero-title">
          <motion.div
            className="hero__image decorative-layer"
            style={{ y: heroImageY }}
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
          <div className="hero__shadow decorative-layer" aria-hidden="true" />
          <div className="hero__architectural-mask decorative-layer" aria-hidden="true" />

          <motion.div
            className="hero__content content-protected"
            initial={{
              opacity: 0.001,
              x: content.direction === "rtl" ? -42 : 42,
              y: 30,
              filter: "blur(12px)",
            }}
            animate={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
            transition={revealTransition}
            style={{ y: heroCopyY }}
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
            className="hero__metrics content-protected"
            initial={{ opacity: 0.001, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
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
          <motion.div className="positioning__statement content-protected" {...getReveal(50, content.direction, "x")}>
            <p>{content.brand.role}</p>
            <h2 id="positioning-title">{content.positioning.title}</h2>
          </motion.div>
          <motion.div className="positioning__body content-protected" {...getReveal(42, oppositeDirection(content.direction), "x")}>
            <p className="positioning__lead">{content.positioning.lead}</p>
            <p>{content.positioning.body}</p>
            <ul>
              {content.positioning.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </motion.div>
        </section>

        <section className="expertise chapter" id="expertise" aria-labelledby="expertise-title">
          <SectionHeading
            eyebrow={content.labels.expertise}
            id="expertise-title"
            lead={content.expertise.lead}
            title={content.expertise.title}
            tone="quiet"
          />
          <ExpertiseBoard
            activeIndex={activeExpertise}
            ariaLabel={content.labels.expertise}
            items={content.expertise.items}
            locale={locale}
            setActiveIndex={setActiveExpertise}
          />
        </section>

        <section className="capabilities chapter" id="capabilities" aria-labelledby="capabilities-title">
          <SectionHeading
            eyebrow={content.labels.capabilities}
            id="capabilities-title"
            lead={content.capabilities.lead}
            title={content.capabilities.title}
            tone="technical"
          />
          <motion.div className="capability-matrix" {...getReveal(44)}>
            {content.capabilities.groups.map((group, groupIndex) => (
              <article className="capability-group content-protected" key={group.title}>
                <div className="capability-group__number">
                  {formatIndex(groupIndex, locale)}
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
          <div className="approach__image decorative-layer">
            <Image
              alt=""
              fill
              sizes="100vw"
              src="/images/enterprise-data-center.jpg"
            />
          </div>
          <div className="approach__shade decorative-layer" aria-hidden="true" />
          <SectionHeading
            eyebrow={content.labels.approach}
            id="approach-title"
            lead={content.approach.lead}
            title={content.approach.title}
          />
          <ApproachBlueprint
            direction={content.direction}
            locale={locale}
            steps={content.approach.steps}
          />
          <motion.div className="approach-rail" {...getReveal(40)}>
            {content.approach.steps.map((step) => (
              <article className="approach-step content-protected" key={step.number}>
                <span>{localizeNumerals(step.number, locale)}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </motion.div>
        </section>

        <section className="studies chapter" id="studies" aria-labelledby="studies-title">
          <SectionHeading
            eyebrow={content.labels.studies}
            id="studies-title"
            lead={content.studies.lead}
            title={content.studies.title}
            tone="quiet"
          />
          <StudyExhibition
            activeIndex={activeStudy}
            ariaLabel={content.labels.studies}
            labels={{
              challenge: content.labels.challenge,
              structure: content.labels.structure,
            }}
            setActiveIndex={setActiveStudy}
            studies={content.studies.items}
          />
        </section>

        <section className="why chapter" id="why" aria-labelledby="why-title">
          <motion.div className="why__title content-protected" {...getReveal(48)}>
            <p>{content.why.lead}</p>
            <h2 id="why-title">{content.why.title}</h2>
          </motion.div>
          <motion.div className="why__principles content-protected" {...getReveal(40)}>
            {content.why.principles.map((principle, index) => (
              <article key={principle.title}>
                <span>{formatIndex(index, locale)}</span>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </article>
            ))}
          </motion.div>
        </section>

        <section className="insights chapter" id="insights" aria-labelledby="insights-title">
          <SectionHeading
            eyebrow={content.labels.insights}
            id="insights-title"
            lead={content.insights.lead}
            title={content.insights.title}
            tone="editorial"
          />
          <motion.div className="insight-row" {...getReveal(40)}>
            {content.insights.items.map((insight) => (
              <article className="content-protected" key={insight.title}>
                <h3>{insight.title}</h3>
                <p>{insight.body}</p>
              </article>
            ))}
          </motion.div>
        </section>

        <section className="contact chapter" id="contact" aria-labelledby="contact-title">
          <div className="contact__image decorative-layer">
            <Image
              alt=""
              fill
              sizes="100vw"
              src="/images/architectural-hallway.jpg"
            />
          </div>
          <div className="contact__shade decorative-layer" aria-hidden="true" />
          <motion.div className="contact__statement content-protected" {...getReveal(52, content.direction, "x")}>
            <Image
              alt=""
              height={92}
              src={logoPath}
              width={92}
            />
            <h2 id="contact-title">{content.contact.title}</h2>
            <p>{content.contact.lead}</p>
          </motion.div>

          <motion.div
            className="contact-actions content-protected"
            {...getReveal(44, oppositeDirection(content.direction), "x")}
          >
            <a href={getWhatsAppHref()} target="_blank" rel="noreferrer">
              <span>{content.contact.whatsappLabel}</span>
              <strong>{temporaryContactConfig.whatsapp.display}</strong>
            </a>
            <a href={getMailtoHref(content.contact.subject)}>
              <span>{content.contact.emailLabel}</span>
              <strong>{temporaryContactConfig.email.address}</strong>
            </a>
          </motion.div>
        </section>

        <footer className="footer content-protected">
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
