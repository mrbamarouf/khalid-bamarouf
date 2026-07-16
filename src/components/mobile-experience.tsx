"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import {
  getMailtoHref,
  getWhatsAppHref,
  temporaryContactConfig,
} from "@/content/contact-config";
import {
  siteContent,
  type CapabilityGroup,
  type ExpertiseItem,
  type Locale,
  type NavigationItem,
  type SystemStudy,
} from "@/content/site-content";
import styles from "./mobile-experience.module.css";

const logoPath = "/brand/khalid-bamarouf-logo-transparent.png";
const brandName = "Khalid Bamarouf";
const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

const reveal = {
  initial: { opacity: 1, y: 0 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: {
    duration: 0.58,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  },
};

function mobileHref(href: string) {
  return href.startsWith("#") ? `#m-${href.slice(1)}` : href;
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

function SectionIntro({
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
    <motion.header className={styles.sectionIntro} {...reveal}>
      <span className={styles.sectionLabel}>{label}</span>
      <h2 id={id}>{renderCopy(title)}</h2>
      <p>{renderCopy(lead)}</p>
    </motion.header>
  );
}

function MobileHeader({
  locale,
  menuOpen,
  navigation,
  onClose,
  onToggle,
  switchLabel,
}: {
  locale: Locale;
  menuOpen: boolean;
  navigation: NavigationItem[];
  onClose: () => void;
  onToggle: () => void;
  switchLabel: string;
}) {
  const menuLabel = locale === "ar" ? "القائمة" : "Open menu";
  const closeLabel = locale === "ar" ? "إغلاق القائمة" : "Close menu";

  return (
    <header className={styles.header}>
      <a className={styles.brand} href="#m-top" aria-label={`${brandName} home`}>
        <Image alt="" height={44} priority src={logoPath} width={44} />
        <strong className="brand-name" dir="ltr">
          {brandName}
        </strong>
      </a>

      <div className={styles.headerActions}>
        <Link
          aria-label={switchLabel}
          className={styles.language}
          href={locale === "ar" ? "/" : "/ar"}
          hrefLang={locale === "ar" ? "en" : "ar"}
        >
          {locale === "ar" ? "EN" : "AR"}
        </Link>
        <button
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? closeLabel : menuLabel}
          className={styles.menuButton}
          onClick={onToggle}
          type="button"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.button
              aria-label={closeLabel}
              animate={{ opacity: 1 }}
              className={styles.menuScrim}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              onClick={onClose}
              type="button"
            />
            <motion.aside
              animate={{ opacity: 1, y: 0 }}
              aria-label={locale === "ar" ? "تنقل الهاتف" : "Mobile navigation"}
              aria-modal="true"
              className={styles.menuSheet}
              exit={{ opacity: 0, y: 28 }}
              id="mobile-navigation"
              initial={{ opacity: 0, y: 28 }}
              role="dialog"
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.menuHeading}>
                <span>{locale === "ar" ? "الفصول" : "Chapters"}</span>
                <button aria-label={closeLabel} onClick={onClose} type="button">
                  {locale === "ar" ? "إغلاق" : "Close"}
                </button>
              </div>
              <nav>
                {navigation.map((item, index) => (
                  <a href={mobileHref(item.href)} key={item.href} onClick={onClose}>
                    <span>{formatIndex(index, locale)}</span>
                    <strong>{item.label}</strong>
                  </a>
                ))}
              </nav>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function ExpertiseConsole({
  activeIndex,
  items,
  locale,
  onSelect,
}: {
  activeIndex: number;
  items: ExpertiseItem[];
  locale: Locale;
  onSelect: (index: number) => void;
}) {
  const activeItem = items[activeIndex];

  return (
    <motion.div className={styles.expertiseConsole} {...reveal}>
      <div className={styles.expertiseIndex} role="tablist" aria-label={locale === "ar" ? "مجالات الخبرة" : "Expertise areas"}>
        {items.map((item, index) => (
          <button
            aria-controls="mobile-expertise-panel"
            aria-selected={activeIndex === index}
            className={activeIndex === index ? styles.active : undefined}
            id={`mobile-expertise-tab-${index}`}
            key={item.name}
            onClick={() => onSelect(index)}
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
          className={styles.expertiseDetail}
          exit={{ opacity: 0, y: -8 }}
          id="mobile-expertise-panel"
          initial={{ opacity: 0.65, y: 8 }}
          key={activeItem.name}
          role="tabpanel"
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <p>{activeItem.short}</p>
          <h3>{activeItem.focus}</h3>
          <p>{activeItem.value}</p>
          <ul aria-label={locale === "ar" ? "نطاق الخبرة" : "Expertise signals"}>
            {activeItem.signals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        </motion.article>
      </AnimatePresence>
    </motion.div>
  );
}

function CapabilityAccordion({
  activeIndex,
  groups,
  locale,
  onSelect,
}: {
  activeIndex: number;
  groups: CapabilityGroup[];
  locale: Locale;
  onSelect: (index: number) => void;
}) {
  return (
    <motion.div className={styles.accordion} {...reveal}>
      {groups.map((group, index) => {
        const isOpen = activeIndex === index;
        const panelId = `mobile-capability-panel-${index}`;

        return (
          <article className={isOpen ? styles.open : undefined} key={group.title}>
            <button
              aria-controls={panelId}
              aria-expanded={isOpen}
              onClick={() => onSelect(index)}
              type="button"
            >
              <span>{formatIndex(index, locale)}</span>
              <strong>{group.title}</strong>
              <i aria-hidden="true" />
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  animate={{ height: "auto", opacity: 1 }}
                  className={styles.accordionPanel}
                  exit={{ height: 0, opacity: 0 }}
                  id={panelId}
                  initial={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div>
                    <p>{group.intro}</p>
                    <ul>
                      {group.capabilities.map((capability) => (
                        <li key={capability}>{capability}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </article>
        );
      })}
    </motion.div>
  );
}

function StudySelector({
  activeIndex,
  locale,
  onSelect,
  studies,
}: {
  activeIndex: number;
  locale: Locale;
  onSelect: (index: number) => void;
  studies: SystemStudy[];
}) {
  const activeStudy = studies[activeIndex];

  return (
    <motion.div className={styles.studySelector} {...reveal}>
      <AnimatePresence mode="wait">
        <motion.figure
          animate={{ opacity: 1, scale: 1 }}
          className={styles.studyImage}
          exit={{ opacity: 0.5, scale: 0.985 }}
          initial={{ opacity: 0.6, scale: 1.015 }}
          key={activeStudy.image}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            alt=""
            fill
            sizes="(max-width: 960px) and (max-height: 520px) 720px, (max-width: 860px) calc(100vw - 32px), 0vw"
            src={activeStudy.image}
          />
          <figcaption>
            <span>{formatIndex(activeIndex, locale)}</span>
            <strong>{activeStudy.label}</strong>
          </figcaption>
        </motion.figure>
      </AnimatePresence>

      <div className={styles.studyTabs} role="tablist" aria-label={locale === "ar" ? "دراسات الأنظمة" : "System studies"}>
        {studies.map((study, index) => (
          <button
            aria-controls="mobile-study-summary"
            aria-selected={activeIndex === index}
            className={activeIndex === index ? styles.active : undefined}
            id={`mobile-study-tab-${index}`}
            key={study.title}
            onClick={() => onSelect(index)}
            role="tab"
            type="button"
          >
            <span>{formatIndex(index, locale)}</span>
            <strong>{study.title}</strong>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          aria-labelledby={`mobile-study-tab-${activeIndex}`}
          className={styles.studySummary}
          exit={{ opacity: 0, y: -6 }}
          id="mobile-study-summary"
          initial={{ opacity: 0.65, y: 6 }}
          key={activeStudy.title}
          role="tabpanel"
          transition={{ duration: 0.28 }}
        >
          <p>{activeStudy.summary}</p>
          <a href="#m-study-detail">
            {locale === "ar" ? "اقرأ تفاصيل الدراسة" : "Read the study detail"}
          </a>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

function StudyStory({
  labels,
  locale,
  study,
}: {
  labels: { challenge: string; structure: string };
  locale: Locale;
  study: SystemStudy;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.article
        animate={{ opacity: 1, y: 0 }}
        className={styles.story}
        exit={{ opacity: 0, y: -10 }}
        initial={{ opacity: 0.65, y: 10 }}
        key={study.title}
        transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
      >
        <header>
          <span className={styles.sectionLabel}>{locale === "ar" ? "تفاصيل الدراسة" : "Study detail"}</span>
          <h2 id="m-study-detail-title">{study.title}</h2>
          <p>{study.summary}</p>
        </header>

        <section>
          <span>{labels.challenge}</span>
          <p>{study.challenge}</p>
        </section>
        <section>
          <span>{labels.structure}</span>
          <ol>
            {study.structure.map((item, index) => (
              <li key={item}>
                <small>{formatIndex(index, locale)}</small>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className={styles.storyOutcome}>
          <span>{locale === "ar" ? "النتيجة" : "Outcome"}</span>
          <p>{study.value}</p>
        </section>
      </motion.article>
    </AnimatePresence>
  );
}

export function MobileExperience({ locale = "en" }: { locale?: Locale }) {
  const [activeCapability, setActiveCapability] = useState(0);
  const [activeExpertise, setActiveExpertise] = useState(0);
  const [activeStudy, setActiveStudy] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const content = siteContent[locale];
  const activeStudyItem = content.studies.items[activeStudy];
  const mobileNavigation = [
    { label: locale === "ar" ? "عن خالد" : "About", href: "#about" },
    { label: content.labels.expertise, href: "#expertise" },
    { label: content.labels.capabilities, href: "#capabilities" },
    { label: content.labels.approach, href: "#approach" },
    { label: content.labels.studies, href: "#studies" },
    { label: content.labels.insights, href: "#insights" },
    { label: locale === "ar" ? "التواصل" : "Contact", href: "#contact" },
  ];

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
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
        <MobileHeader
          locale={locale}
          menuOpen={menuOpen}
          navigation={mobileNavigation}
          onClose={() => setMenuOpen(false)}
          onToggle={() => setMenuOpen((open) => !open)}
          switchLabel={content.language.switchLabel}
        />

        <section aria-labelledby="m-hero-title" className={styles.hero} id="m-hero">
          <motion.figure
            animate={{ opacity: 1, scale: 1 }}
            className={styles.heroImage}
            initial={{ opacity: 0.72, scale: 1.025 }}
            transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              alt=""
              fill
              fetchPriority="high"
              loading="eager"
              priority
              sizes="(max-width: 960px) and (max-height: 520px) 42vw, (max-width: 860px) 100vw, 0vw"
              src="/images/enterprise-data-center.jpg"
            />
          </motion.figure>
          <motion.div className={styles.heroCopy} {...reveal}>
            <span className={styles.heroLabel}>{content.hero.eyebrow}</span>
            <h1 id="m-hero-title">{content.hero.title}</h1>
            <p>{content.hero.lead}</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryAction} href="#m-contact">
                {content.hero.primaryCta}
              </a>
              <a className={styles.textAction} href="#m-expertise">
                {content.hero.secondaryCta}
                <span aria-hidden="true">↘</span>
              </a>
            </div>
          </motion.div>
        </section>

        <section aria-labelledby="m-about-title" className={`${styles.section} ${styles.about}`} id="m-about">
          <SectionIntro
            id="m-about-title"
            label={content.brand.role}
            lead={content.positioning.lead}
            title={content.positioning.title}
          />
          <motion.figure className={styles.aboutImage} {...reveal}>
            <Image
              alt=""
              fill
              sizes="(max-width: 960px) and (max-height: 520px) 720px, (max-width: 860px) calc(100vw - 32px), 0vw"
              src="/images/architectural-hallway.jpg"
            />
          </motion.figure>
          <motion.div className={styles.aboutBody} {...reveal}>
            <p>{renderCopy(content.positioning.body)}</p>
            <ul>
              {content.positioning.notes.map((note) => (
                <li key={note}>{renderCopy(note)}</li>
              ))}
            </ul>
          </motion.div>
        </section>

        <section aria-labelledby="m-expertise-title" className={`${styles.section} ${styles.expertise}`} id="m-expertise">
          <SectionIntro
            id="m-expertise-title"
            label={content.labels.expertise}
            lead={content.expertise.lead}
            title={content.expertise.title}
          />
          <ExpertiseConsole
            activeIndex={activeExpertise}
            items={content.expertise.items}
            locale={locale}
            onSelect={setActiveExpertise}
          />
        </section>

        <section aria-labelledby="m-capabilities-title" className={`${styles.section} ${styles.capabilities}`} id="m-capabilities">
          <SectionIntro
            id="m-capabilities-title"
            label={content.labels.capabilities}
            lead={content.capabilities.lead}
            title={content.capabilities.title}
          />
          <CapabilityAccordion
            activeIndex={activeCapability}
            groups={content.capabilities.groups}
            locale={locale}
            onSelect={setActiveCapability}
          />
        </section>

        <section aria-labelledby="m-approach-title" className={`${styles.section} ${styles.approach}`} id="m-approach">
          <SectionIntro
            id="m-approach-title"
            label={content.labels.approach}
            lead={content.approach.lead}
            title={content.approach.title}
          />
          <motion.figure className={styles.approachImage} {...reveal}>
            <Image
              alt=""
              fill
              sizes="(max-width: 960px) and (max-height: 520px) 720px, (max-width: 860px) calc(100vw - 32px), 0vw"
              src="/images/compute-cooling.jpg"
            />
          </motion.figure>
          <ol className={styles.timeline}>
            {content.approach.steps.map((step) => (
              <motion.li key={step.number} {...reveal}>
                <span>{localizeNumerals(step.number, locale)}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="m-studies-title" className={`${styles.section} ${styles.studies}`} id="m-studies">
          <SectionIntro
            id="m-studies-title"
            label={content.labels.studies}
            lead={content.studies.lead}
            title={content.studies.title}
          />
          <StudySelector
            activeIndex={activeStudy}
            locale={locale}
            onSelect={setActiveStudy}
            studies={content.studies.items}
          />
        </section>

        <section
          aria-labelledby="m-study-detail-title"
          className={`${styles.section} ${styles.studyDetail}`}
          id="m-study-detail"
        >
          <StudyStory
            labels={{
              challenge: content.labels.challenge,
              structure: content.labels.structure,
            }}
            locale={locale}
            study={activeStudyItem}
          />
        </section>

        <section aria-labelledby="m-insights-title" className={`${styles.section} ${styles.insights}`} id="m-insights">
          <SectionIntro
            id="m-insights-title"
            label={content.labels.insights}
            lead={content.insights.lead}
            title={content.insights.title}
          />
          <div className={styles.insightList}>
            {content.insights.items.map((insight, index) => (
              <motion.article key={insight.title} {...reveal}>
                <span>{formatIndex(index, locale)}</span>
                <div>
                  <h3>{insight.title}</h3>
                  <p>{insight.body}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section aria-labelledby="m-contact-title" className={styles.contact} id="m-contact">
          <motion.div className={styles.contactCopy} {...reveal}>
            <span>{locale === "ar" ? "تواصل مباشر" : "Direct line"}</span>
            <h2 id="m-contact-title">{content.contact.title}</h2>
            <p>{content.contact.lead}</p>
          </motion.div>
          <motion.div className={styles.contactActions} {...reveal}>
            <a href={getWhatsAppHref()} rel="noreferrer" target="_blank">
              <span>{content.contact.whatsappLabel}</span>
              <strong>{temporaryContactConfig.whatsapp.display}</strong>
              <i aria-hidden="true">↗</i>
            </a>
            <a href={getMailtoHref(content.contact.subject)}>
              <span>{content.contact.emailLabel}</span>
              <strong>{temporaryContactConfig.email.address}</strong>
              <i aria-hidden="true">↗</i>
            </a>
          </motion.div>
        </section>

        <footer className={styles.footer}>
          <a className={styles.footerBrand} href="#m-top">
            <Image alt="" height={38} src={logoPath} width={38} />
            <strong className="brand-name" dir="ltr">
              {brandName}
            </strong>
          </a>
          <p>{content.footer.statement}</p>
          <small>© {new Date().getFullYear()} {brandName}</small>
        </footer>
      </main>
    </MotionConfig>
  );
}
