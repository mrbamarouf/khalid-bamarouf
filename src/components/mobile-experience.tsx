"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import {
  contactConfig,
  getMailtoHref,
  getWhatsAppHref,
} from "@/content/contact-config";
import {
  siteContent,
  type Locale,
  type SiteContent,
} from "@/content/site-content";
import styles from "./mobile-experience.module.css";

const logoPath = "/brand/khalid-bamarouf-logo-transparent.png";
const studioFooterMarkPath = "/brand/bamarouf-studio-footer.png";
const studioSymbolPath = "/brand/bamarouf-studio-symbol.png";
const brandName = "Khalid Bamarouf";
const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

const reveal = {
  initial: { opacity: 0.86, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.58, ease: easeOut },
};

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

function splitHeroLead(lead: string) {
  const sentenceEnd = lead.indexOf(". ");

  if (sentenceEnd === -1) {
    return [lead, ""] as const;
  }

  return [lead.slice(0, sentenceEnd + 1), lead.slice(sentenceEnd + 2)] as const;
}

function MobileSystemWorld() {
  return (
    <div aria-hidden="true" className={styles.systemWorld}>
      <span>01 workflow.input</span>
      <span>02 agent.evaluate</span>
      <span>03 api.connect</span>
      <span>04 action.verify</span>
    </div>
  );
}

function ChapterHeader({
  id,
  label,
  lead,
  title,
}: {
  id: string;
  label: string;
  lead: string;
  title: string;
}) {
  return (
    <motion.header className={styles.chapterHeader} {...reveal}>
      <span className={styles.chapterLabel}>{renderCopy(label)}</span>
      <h2 id={id}>{renderCopy(title)}</h2>
      <p>{renderCopy(lead)}</p>
    </motion.header>
  );
}

function MobileHeader({
  content,
  locale,
  menuButtonRef,
  menuOpen,
  onClose,
  onToggle,
}: {
  content: SiteContent;
  locale: Locale;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
  menuOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}) {
  const menuLabel = locale === "ar" ? "فتح القائمة" : "Open menu";
  const closeLabel = locale === "ar" ? "إغلاق القائمة" : "Close menu";
  const navigation = [
    { label: locale === "ar" ? "عن خالد" : "About", href: "#m-about" },
    { label: content.labels.expertise, href: "#m-expertise" },
    { label: content.labels.capabilities, href: "#m-capabilities" },
    { label: content.labels.approach, href: "#m-approach" },
    { label: content.labels.studies, href: "#m-studies" },
    { label: content.why.title, href: "#m-why" },
    { label: content.labels.insights, href: "#m-insights" },
    { label: locale === "ar" ? "التواصل" : "Contact", href: "#m-contact" },
  ];

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a className={styles.brand} href="#m-top" aria-label={`${brandName} home`}>
            <Image alt="" height={40} priority src={logoPath} width={40} />
            <strong className="brand-name" dir="ltr">
              {brandName}
            </strong>
          </a>

          <div className={styles.headerActions}>
            <Link
              aria-label={content.language.switchLabel}
              className={styles.languageSwitch}
              href={locale === "ar" ? "/" : "/ar"}
              hrefLang={locale === "ar" ? "en" : "ar"}
            >
              <span>{content.language.current}</span>
              <i aria-hidden="true" />
              <span>{content.language.alternate}</span>
            </Link>
            <button
              aria-controls="mobile-navigation"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? closeLabel : menuLabel}
              className={styles.menuButton}
              onClick={onToggle}
              ref={menuButtonRef}
              type="button"
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.aside
            animate={{ opacity: 1, y: 0 }}
            aria-label={locale === "ar" ? "تنقل الهاتف" : "Mobile navigation"}
            aria-modal="true"
            className={styles.menu}
            exit={{ opacity: 0, y: 18 }}
            id="mobile-navigation"
            initial={{ opacity: 0, y: 18 }}
            role="dialog"
            transition={{ duration: 0.32, ease: easeOut }}
          >
            <div className={styles.menuTopline}>
              <span>{content.brand.role}</span>
              <button data-mobile-menu-close onClick={onClose} type="button">
                {locale === "ar" ? "إغلاق" : "Close"}
              </button>
            </div>
            <nav>
              {navigation.map((item, index) => (
                <a href={item.href} key={item.href} onClick={onClose}>
                  <span>{formatIndex(index, locale)}</span>
                  <strong>{item.label}</strong>
                  <i aria-hidden="true">↘</i>
                </a>
              ))}
            </nav>
            <a
              aria-label={content.studio.ariaLabel}
              className={styles.menuStudio}
              href={content.studio.url}
            >
              <Image alt="" height={34} src={studioSymbolPath} width={34} />
              <span>{content.studio.label}</span>
            </a>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function MobileHero({ content }: { content: SiteContent }) {
  const [opening, detail] = splitHeroLead(content.hero.lead);

  return (
    <section aria-labelledby="m-hero-title" className={styles.hero} id="m-hero">
      <div className={styles.heroNarrative}>
        <motion.span className={styles.heroIdentity} {...reveal}>
          {renderCopy(content.hero.eyebrow)}
        </motion.span>
        <motion.h1 id="m-hero-title" {...reveal}>
          {content.hero.title}
        </motion.h1>
        <motion.div className={styles.heroLead} {...reveal}>
          <p>{opening}</p>
        </motion.div>
        <motion.div className={styles.heroActions} {...reveal}>
          <a className={styles.primaryAction} href="#m-contact">
            <span>{content.hero.primaryCta}</span>
            <i aria-hidden="true">↘</i>
          </a>
          <a className={styles.secondaryAction} href="#m-expertise">
            <span>{content.hero.secondaryCta}</span>
            <i aria-hidden="true">↓</i>
          </a>
        </motion.div>
      </div>

      <motion.figure
        animate={{ opacity: 1, scale: 1 }}
        className={styles.heroVisual}
        initial={{ opacity: 0.78, scale: 1.02 }}
        transition={{ duration: 1.1, ease: easeOut }}
      >
        <Image
          alt=""
          fill
          fetchPriority="high"
          loading="eager"
          priority
          sizes="(max-width: 960px) 100vw, 0vw"
          src="/images/ai-operations-headquarters.webp"
        />
        <div aria-hidden="true" className={styles.heroNetwork}>
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className={styles.heroCore}>
          <Image alt="" height={82} priority src={logoPath} width={82} />
          <span>{content.brand.role}</span>
        </div>
        <figcaption>
          <span>{content.expertise.items[0].focus}</span>
          <strong>{content.expertise.items[0].name}</strong>
          <i aria-hidden="true" />
        </figcaption>
      </motion.figure>
      {detail ? (
        <motion.p className={styles.heroDetail} {...reveal}>
          {detail}
        </motion.p>
      ) : null}
    </section>
  );
}

function MobileAbout({ content, locale }: { content: SiteContent; locale: Locale }) {
  const [activeNote, setActiveNote] = useState(0);

  return (
    <section aria-labelledby="m-about-title" className={`${styles.chapter} ${styles.about}`} id="m-about">
      <ChapterHeader
        id="m-about-title"
        label={content.brand.role}
        lead={content.positioning.lead}
        title={content.positioning.title}
      />

      <motion.figure className={styles.aboutVisual} {...reveal}>
        <Image
          alt=""
          fill
          sizes="(max-width: 960px) calc(100vw - 32px), 0vw"
          src="/images/automation-control-panel.jpg"
        />
        <figcaption>{content.expertise.items[0].focus}</figcaption>
      </motion.figure>

      <motion.div className={styles.aboutBrief} {...reveal}>
        <p>{renderCopy(content.positioning.body)}</p>
        <div className={styles.noteSwitcher} role="tablist" aria-label={content.labels.insights}>
          {content.positioning.notes.map((note, index) => (
            <button
              aria-controls="mobile-about-note"
              aria-selected={activeNote === index}
              className={activeNote === index ? styles.active : undefined}
              id={`mobile-about-note-tab-${index}`}
              key={note}
              onClick={() => setActiveNote(index)}
              role="tab"
              type="button"
            >
              {formatIndex(index, locale)}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            aria-labelledby={`mobile-about-note-tab-${activeNote}`}
            className={styles.activeNote}
            exit={{ opacity: 0, y: -8 }}
            id="mobile-about-note"
            initial={{ opacity: 0.65, y: 8 }}
            key={content.positioning.notes[activeNote]}
            role="tabpanel"
            transition={{ duration: 0.28, ease: easeOut }}
          >
            {renderCopy(content.positioning.notes[activeNote])}
          </motion.p>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function MobileExpertise({ content, locale }: { content: SiteContent; locale: Locale }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = content.expertise.items[activeIndex];

  return (
    <section aria-labelledby="m-expertise-title" className={`${styles.chapter} ${styles.expertise}`} id="m-expertise">
      <ChapterHeader
        id="m-expertise-title"
        label={content.labels.expertise}
        lead={content.expertise.lead}
        title={content.expertise.title}
      />

      <motion.div className={styles.expertiseSystem} {...reveal}>
        <div className={styles.expertiseRail} role="tablist" aria-label={content.labels.expertise}>
          {content.expertise.items.map((item, index) => (
            <button
              aria-controls="mobile-expertise-panel"
              aria-selected={activeIndex === index}
              className={activeIndex === index ? styles.active : undefined}
              id={`mobile-expertise-tab-${index}`}
              key={item.name}
              onClick={() => setActiveIndex(index)}
              role="tab"
              type="button"
            >
              <span>{formatIndex(index, locale)}</span>
              <strong>{item.name}</strong>
              <i aria-hidden="true" />
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            animate={{ opacity: 1, y: 0 }}
            aria-labelledby={`mobile-expertise-tab-${activeIndex}`}
            className={styles.expertisePanel}
            exit={{ opacity: 0, y: -10 }}
            id="mobile-expertise-panel"
            initial={{ opacity: 0.68, y: 10 }}
            key={activeItem.name}
            role="tabpanel"
            transition={{ duration: 0.3, ease: easeOut }}
          >
            <span>{activeItem.focus}</span>
            <p>{activeItem.value}</p>
            <ul>
              {activeItem.signals.map((signal) => (
                <li key={signal}>{signal}</li>
              ))}
            </ul>
          </motion.article>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function MobileCapabilities({ content, locale }: { content: SiteContent; locale: Locale }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const group = content.capabilities.groups[activeIndex];

  return (
    <section aria-labelledby="m-capabilities-title" className={`${styles.chapter} ${styles.capabilities}`} id="m-capabilities">
      <ChapterHeader
        id="m-capabilities-title"
        label={content.labels.capabilities}
        lead={content.capabilities.lead}
        title={content.capabilities.title}
      />

      <motion.div className={styles.capabilityConsole} {...reveal}>
        <div className={styles.capabilityTabs} role="tablist" aria-label={content.labels.capabilities}>
          {content.capabilities.groups.map((item, index) => (
            <button
              aria-controls="mobile-capability-panel"
              aria-selected={activeIndex === index}
              className={activeIndex === index ? styles.active : undefined}
              id={`mobile-capability-tab-${index}`}
              key={item.title}
              onClick={() => setActiveIndex(index)}
              role="tab"
              type="button"
            >
              <span>{formatIndex(index, locale)}</span>
              <strong>{item.title}</strong>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.article
            animate={{ opacity: 1, x: 0 }}
            aria-labelledby={`mobile-capability-tab-${activeIndex}`}
            className={styles.capabilityPanel}
            exit={{ opacity: 0, x: locale === "ar" ? 10 : -10 }}
            id="mobile-capability-panel"
            initial={{ opacity: 0.66, x: locale === "ar" ? -10 : 10 }}
            key={group.title}
            role="tabpanel"
            transition={{ duration: 0.3, ease: easeOut }}
          >
            <header>
              <span>{group.intro}</span>
              <strong>{group.title}</strong>
            </header>
            <ol>
              {group.capabilities.map((capability, index) => (
                <li key={capability}>
                  <span>{formatIndex(index, locale)}</span>
                  <p>{capability}</p>
                </li>
              ))}
            </ol>
          </motion.article>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function MobileApproach({ content, locale }: { content: SiteContent; locale: Locale }) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section aria-labelledby="m-approach-title" className={`${styles.chapter} ${styles.approach}`} id="m-approach">
      <ChapterHeader
        id="m-approach-title"
        label={content.labels.approach}
        lead={content.approach.lead}
        title={content.approach.title}
      />

      <motion.div className={styles.journey} {...reveal}>
        <div aria-hidden="true" className={styles.journeyProgress}>
          <span style={{ height: `${(activeStep / (content.approach.steps.length - 1)) * 100}%` }} />
        </div>
        <ol>
          {content.approach.steps.map((step, index) => {
            const isActive = activeStep === index;

            return (
              <li className={isActive ? styles.active : undefined} key={step.number}>
                <button
                  aria-controls={`mobile-approach-step-${index}`}
                  aria-expanded={isActive}
                  onClick={() => setActiveStep(index)}
                  type="button"
                >
                  <span>{localizeNumerals(step.number, locale)}</span>
                  <strong>{step.title}</strong>
                  <i aria-hidden="true" />
                </button>
                <AnimatePresence initial={false}>
                  {isActive ? (
                    <motion.div
                      animate={{ height: "auto", opacity: 1 }}
                      className={styles.journeyDetail}
                      exit={{ height: 0, opacity: 0 }}
                      id={`mobile-approach-step-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.34, ease: easeOut }}
                    >
                      <p>{step.body}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ol>
      </motion.div>
    </section>
  );
}

function MobileStudy({ content, locale }: { content: SiteContent; locale: Locale }) {
  const study = content.studies.items[0];

  return (
    <section aria-labelledby="m-studies-title" className={`${styles.chapter} ${styles.studies}`} id="m-studies">
      <ChapterHeader
        id="m-studies-title"
        label={content.labels.studies}
        lead={content.studies.lead}
        title={content.studies.title}
      />

      <motion.figure className={styles.studyCover} {...reveal}>
        <div className={styles.studyImage}>
          <Image
            alt=""
            fill
            sizes="(max-width: 960px) calc(100vw - 32px), 0vw"
            src={study.image}
          />
          <span>{formatIndex(0, locale)}</span>
        </div>
        <figcaption>
          <span>{study.label}</span>
          <p>{study.summary}</p>
          <a href="#m-study-detail">
            <strong>{study.title}</strong>
            <i aria-hidden="true">↓</i>
          </a>
        </figcaption>
      </motion.figure>
    </section>
  );
}

function MobileStudyDetail({ content, locale }: { content: SiteContent; locale: Locale }) {
  const [activeStage, setActiveStage] = useState(0);
  const study = content.studies.items[0];
  const stages = [
    { label: content.labels.challenge, type: "text" as const, value: study.challenge },
    { label: content.labels.structure, type: "list" as const, value: study.structure },
    { label: locale === "ar" ? "النتيجة" : "Outcome", type: "text" as const, value: study.value },
  ];
  const stage = stages[activeStage];

  return (
    <section aria-labelledby="m-study-detail-title" className={`${styles.chapter} ${styles.studyDetail}`} id="m-study-detail">
      <motion.header className={styles.studyDetailHeader} {...reveal}>
        <span className={styles.chapterLabel}>{study.label}</span>
        <h2 id="m-study-detail-title">{study.title}</h2>
        <p>{study.summary}</p>
      </motion.header>

      <motion.div className={styles.studyStory} {...reveal}>
        <div className={styles.storyTabs} role="tablist" aria-label={study.title}>
          {stages.map((item, index) => (
            <button
              aria-controls="mobile-study-stage"
              aria-selected={activeStage === index}
              className={activeStage === index ? styles.active : undefined}
              id={`mobile-study-stage-tab-${index}`}
              key={item.label}
              onClick={() => setActiveStage(index)}
              role="tab"
              type="button"
            >
              <span>{formatIndex(index, locale)}</span>
              <strong>{item.label}</strong>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            animate={{ opacity: 1, y: 0 }}
            aria-labelledby={`mobile-study-stage-tab-${activeStage}`}
            className={styles.storyPanel}
            exit={{ opacity: 0, y: -10 }}
            id="mobile-study-stage"
            initial={{ opacity: 0.66, y: 10 }}
            key={stage.label}
            role="tabpanel"
            transition={{ duration: 0.3, ease: easeOut }}
          >
            <span>{stage.label}</span>
            {stage.type === "list" ? (
              <ol>
                {stage.value.map((item, index) => (
                  <li key={item}>
                    <small>{formatIndex(index, locale)}</small>
                    <p>{item}</p>
                  </li>
                ))}
              </ol>
            ) : (
              <p>{stage.value}</p>
            )}
          </motion.article>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function MobileWhy({ content, locale }: { content: SiteContent; locale: Locale }) {
  const [activePrinciple, setActivePrinciple] = useState(0);
  const principle = content.why.principles[activePrinciple];

  return (
    <section aria-labelledby="m-why-title" className={`${styles.chapter} ${styles.why}`} id="m-why">
      <ChapterHeader
        id="m-why-title"
        label={content.brand.name}
        lead={content.why.lead}
        title={content.why.title}
      />

      <motion.div className={styles.whySystem} {...reveal}>
        <div className={styles.whyRail} role="tablist" aria-label={content.why.title}>
          {content.why.principles.map((item, index) => (
            <button
              aria-controls="mobile-why-panel"
              aria-selected={activePrinciple === index}
              className={activePrinciple === index ? styles.active : undefined}
              id={`mobile-why-tab-${index}`}
              key={item.title}
              onClick={() => setActivePrinciple(index)}
              role="tab"
              type="button"
            >
              <span>{formatIndex(index, locale)}</span>
              <strong>{item.title}</strong>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            aria-labelledby={`mobile-why-tab-${activePrinciple}`}
            className={styles.whyPanel}
            exit={{ opacity: 0, y: -8 }}
            id="mobile-why-panel"
            initial={{ opacity: 0.65, y: 8 }}
            key={principle.title}
            role="tabpanel"
            transition={{ duration: 0.28, ease: easeOut }}
          >
            {principle.body}
          </motion.p>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function MobileInsights({ content, locale }: { content: SiteContent; locale: Locale }) {
  const [activeInsight, setActiveInsight] = useState(0);

  return (
    <section aria-labelledby="m-insights-title" className={`${styles.chapter} ${styles.insights}`} id="m-insights">
      <ChapterHeader
        id="m-insights-title"
        label={content.labels.insights}
        lead={content.insights.lead}
        title={content.insights.title}
      />

      <motion.div className={styles.insightLedger} {...reveal}>
        {content.insights.items.map((insight, index) => {
          const isActive = activeInsight === index;

          return (
            <article className={isActive ? styles.active : undefined} key={insight.title}>
              <button
                aria-controls={`mobile-insight-${index}`}
                aria-expanded={isActive}
                onClick={() => setActiveInsight(index)}
                type="button"
              >
                <span>{formatIndex(index, locale)}</span>
                <strong>{insight.title}</strong>
                <i aria-hidden="true" />
              </button>
              <AnimatePresence initial={false}>
                {isActive ? (
                  <motion.div
                    animate={{ height: "auto", opacity: 1 }}
                    className={styles.insightBody}
                    exit={{ height: 0, opacity: 0 }}
                    id={`mobile-insight-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: easeOut }}
                  >
                    <p>{insight.body}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </article>
          );
        })}
      </motion.div>
    </section>
  );
}

function MobileContact({ content }: { content: SiteContent }) {
  return (
    <section aria-labelledby="m-contact-title" className={styles.contact} id="m-contact">
      <motion.div className={styles.contactMark} {...reveal}>
        <span aria-hidden="true" />
        <Image alt="" height={96} src={logoPath} width={96} />
        <i aria-hidden="true" />
      </motion.div>
      <motion.div className={styles.contactCopy} {...reveal}>
        <span>{content.brand.role}</span>
        <h2 id="m-contact-title">{content.contact.title}</h2>
        <p>{renderCopy(content.contact.lead)}</p>
      </motion.div>
      <motion.div className={styles.contactActions} {...reveal}>
        <a href={getWhatsAppHref()} rel="noreferrer" target="_blank">
          <span>{content.contact.whatsappLabel}</span>
          <strong dir="ltr">{contactConfig.whatsapp.display}</strong>
          <i aria-hidden="true">↗</i>
        </a>
        <a href={getMailtoHref(content.contact.subject)}>
          <span>{content.contact.emailLabel}</span>
          <strong dir="ltr">{contactConfig.email.address}</strong>
          <i aria-hidden="true">↗</i>
        </a>
      </motion.div>
    </section>
  );
}

function MobileFooter({ content }: { content: SiteContent }) {
  return (
    <footer className={styles.footer}>
      <a className={styles.footerBrand} href="#m-top">
        <Image alt="" height={38} src={logoPath} width={38} />
        <strong className="brand-name" dir="ltr">
          {brandName}
        </strong>
      </a>
      <p>{content.footer.statement}</p>
      <a
        aria-label={content.studio.ariaLabel}
        className={styles.footerStudio}
        href={content.studio.url}
      >
        <Image alt="" height={28} src={studioFooterMarkPath} width={28} />
        <span>{content.studio.footerSignature}</span>
      </a>
      <small dir="ltr">© {new Date().getFullYear()} {brandName}</small>
    </footer>
  );
}

export function MobileExperience({ locale = "en" }: { locale?: Locale }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement | null>(null);
  const content = siteContent[locale];

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const menuButton = menuTriggerRef.current;
    const menu = document.getElementById("mobile-navigation");
    const closeButton = document.querySelector<HTMLButtonElement>("[data-mobile-menu-close]");
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }

      if (event.key !== "Tab" || !menu) {
        return;
      }

      const focusable = Array.from(
        menu.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    window.requestAnimationFrame(() => closeButton?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      menuButton?.focus();
    };
  }, [menuOpen]);

  return (
    <MotionConfig reducedMotion="user">
      <main
        className={`${styles.shell} mobile-shell`}
        data-locale={content.locale}
        dir={content.direction}
        id="m-top"
        lang={content.locale}
      >
        <MobileSystemWorld />
        <div className={styles.mobileSurface}>
          <MobileHeader
            content={content}
            locale={locale}
            menuButtonRef={menuTriggerRef}
            menuOpen={menuOpen}
            onClose={() => setMenuOpen(false)}
            onToggle={() => setMenuOpen((open) => !open)}
          />
          <MobileHero content={content} />
          <MobileAbout content={content} locale={locale} />
          <MobileExpertise content={content} locale={locale} />
          <MobileCapabilities content={content} locale={locale} />
          <MobileApproach content={content} locale={locale} />
          <MobileStudy content={content} locale={locale} />
          <MobileStudyDetail content={content} locale={locale} />
          <MobileWhy content={content} locale={locale} />
          <MobileInsights content={content} locale={locale} />
          <MobileContact content={content} />
          <MobileFooter content={content} />
        </div>
      </main>
    </MotionConfig>
  );
}
