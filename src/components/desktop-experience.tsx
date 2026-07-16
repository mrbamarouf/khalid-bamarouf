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

function SectionHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead: string;
}) {
  return (
    <motion.div className="section-heading" {...getReveal(44)}>
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
          />
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
          />
          <motion.div className="insight-row" {...getReveal(40)}>
            {content.insights.items.map((insight) => (
              <article key={insight.title}>
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
