"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import {
  getMailtoHref,
  getWhatsAppHref,
  temporaryContactConfig,
} from "@/content/contact-config";
import {
  siteContent,
  type CapabilityGroup,
  type Locale,
  type NavigationItem,
  type SystemStudy,
} from "@/content/site-content";

const logoPath = "/brand/khalid-bamarouf-logo-transparent.png";
const brandName = "Khalid Bamarouf";
const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

function mobileHref(href: string) {
  if (!href.startsWith("#")) {
    return href;
  }

  return `#m-${href.slice(1)}`;
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

function mobileReveal(delay = 0) {
  return {
    initial: { opacity: 0.001, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.22 },
    transition: {
      duration: 0.5,
      delay,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  };
}

function PhoneSectionHeader({
  eyebrow,
  id,
  lead,
  title,
  tone = "standard",
}: {
  eyebrow: string;
  id: string;
  lead: string;
  title: string;
  tone?: "standard" | "quiet" | "monument";
}) {
  return (
    <motion.div className={`phone-section-head phone-section-head--${tone}`} {...mobileReveal()}>
      <p className="phone-eyebrow">{eyebrow}</p>
      <h2 id={id}>{renderCopy(title)}</h2>
      <p>{renderCopy(lead)}</p>
    </motion.div>
  );
}

function PhoneHeader({
  brand,
  locale,
  menuOpen,
  nav,
  setMenuOpen,
  switchLabel,
}: {
  brand: { name: string; role: string };
  locale: Locale;
  menuOpen: boolean;
  nav: NavigationItem[];
  setMenuOpen: (open: boolean) => void;
  switchLabel: string;
}) {
  const menuLabel = locale === "ar" ? "القائمة" : "Menu";
  const closeLabel = locale === "ar" ? "إغلاق" : "Close";

  return (
    <header className="phone-header">
      <div className="phone-header__bar">
        <a className="phone-brand" href="#m-top" aria-label={`${brand.name} home`}>
          <Image alt="" height={40} priority src={logoPath} width={40} />
          <span>
            <strong className="brand-name" dir="ltr">
              {brand.name}
            </strong>
            <small>{brand.role}</small>
          </span>
        </a>

        <div className="phone-header__actions">
          <Link
            aria-label={switchLabel}
            className="phone-language"
            href={locale === "ar" ? "/" : "/ar"}
            hrefLang={locale === "ar" ? "en" : "ar"}
          >
            {locale === "ar" ? "EN" : "AR"}
          </Link>

          <button
            aria-controls="phone-menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? closeLabel : menuLabel}
            className="phone-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            type="button"
          >
            <span>{menuOpen ? closeLabel : menuLabel}</span>
            <i aria-hidden="true" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.button
              aria-label={closeLabel}
              animate={{ opacity: 1 }}
              className="phone-menu-scrim"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0.001 }}
              onClick={() => setMenuOpen(false)}
              type="button"
            />
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="phone-menu"
              exit={{ opacity: 0, y: -12 }}
              id="phone-menu"
              initial={{ opacity: 0.001, y: -12 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
            >
              <nav aria-label={locale === "ar" ? "تنقل الهاتف" : "Mobile navigation"}>
                {nav.map((item, index) => (
                  <a
                    href={mobileHref(item.href)}
                    key={item.href}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>{formatIndex(index, locale)}</span>
                    <strong>{item.label}</strong>
                  </a>
                ))}
              </nav>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function CapabilityAccordion({
  activeIndex,
  groups,
  locale,
  setActiveIndex,
}: {
  activeIndex: number;
  groups: CapabilityGroup[];
  locale: Locale;
  setActiveIndex: (index: number) => void;
}) {
  return (
    <div className="phone-capability-accordion">
      {groups.map((group, index) => {
        const isOpen = activeIndex === index;
        const panelId = `phone-capability-${index}`;

        return (
          <article className="phone-capability" key={group.title}>
            <button
              aria-controls={panelId}
              aria-expanded={isOpen}
              onClick={() => setActiveIndex(index)}
              type="button"
            >
              <span>{formatIndex(index, locale)}</span>
              <strong>{group.title}</strong>
              <i aria-hidden="true" />
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  animate={{ opacity: 1, height: "auto" }}
                  className="phone-capability__panel"
                  exit={{ opacity: 0, height: 0 }}
                  id={panelId}
                  initial={{ opacity: 0.001, height: 0 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  <p>{group.intro}</p>
                  <ul>
                    {group.capabilities.map((capability) => (
                      <li key={capability}>{capability}</li>
                    ))}
                  </ul>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </article>
        );
      })}
    </div>
  );
}

function StudyDetail({
  activeStudy,
  labels,
}: {
  activeStudy: SystemStudy;
  labels: { challenge: string; structure: string };
}) {
  return (
    <motion.article
      animate={{ opacity: 1, y: 0 }}
      className="phone-study-story__card"
      initial={{ opacity: 0.001, y: 12 }}
      key={activeStudy.title}
      transition={{ duration: 0.36, ease: "easeOut" }}
    >
      <p className="phone-eyebrow">{activeStudy.label}</p>
      <h2>{activeStudy.title}</h2>
      <p className="phone-study-story__summary">{activeStudy.summary}</p>

      <div className="phone-story-block">
        <span>{labels.challenge}</span>
        <p>{activeStudy.challenge}</p>
      </div>

      <div className="phone-story-block">
        <span>{labels.structure}</span>
        <ul>
          {activeStudy.structure.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="phone-story-block phone-story-block--outcome">
        <span>{labels.structure === "Structure" ? "Outcome" : "النتيجة"}</span>
        <p>{activeStudy.value}</p>
      </div>
    </motion.article>
  );
}

export function MobileExperience({ locale = "en" }: { locale?: Locale }) {
  const [activeCapability, setActiveCapability] = useState(0);
  const [activeStudy, setActiveStudy] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const content = siteContent[locale];
  const isRtl = content.direction === "rtl";
  const activeStudyItem = content.studies.items[activeStudy];
  const contactActionLabel = locale === "ar" ? "جاهز لتوضيح النظام؟" : "Ready to clarify the system?";
  const heroLead =
    locale === "ar"
      ? "معمارية، منصات خلفية، أتمتة، ذكاء اصطناعي، سحابة وتكامل للمؤسسات التي تكون فيها الأعطال مكلفة."
      : "Architecture, backend platforms, automation, AI, cloud, and integration for organizations where failure is expensive.";
  const storyLabel = locale === "ar" ? "تفاصيل الدراسة" : "Study detail";
  const mobileNav = [
    { label: locale === "ar" ? "عن خالد" : "About", href: "#about" },
    { label: content.labels.expertise, href: "#expertise" },
    { label: content.labels.capabilities, href: "#capabilities" },
    { label: content.labels.approach, href: "#approach" },
    { label: content.labels.studies, href: "#studies" },
    { label: content.labels.insights, href: "#insights" },
    { label: locale === "ar" ? "التواصل" : "Contact", href: "#contact" },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <main
        className={`mobile-shell phone-shell ${isRtl ? "is-mobile-rtl" : ""}`}
        data-locale={content.locale}
        dir={content.direction}
        id="m-top"
        lang={content.locale}
      >
        <PhoneHeader
          brand={content.brand}
          locale={locale}
          menuOpen={menuOpen}
          nav={mobileNav}
          setMenuOpen={setMenuOpen}
          switchLabel={content.language.switchLabel}
        />

        <section className="phone-hero" id="m-hero" aria-labelledby="m-hero-title">
          <motion.div className="phone-hero__copy" {...mobileReveal()}>
            <p className="phone-eyebrow">{content.hero.eyebrow}</p>
            <h1 id="m-hero-title">{content.hero.title}</h1>
            <p>{heroLead}</p>
            <div className="phone-actions">
              <a className="phone-button phone-button--primary" href="#m-contact">
                {content.hero.primaryCta}
              </a>
              <a className="phone-button phone-button--ghost" href="#m-studies">
                {content.hero.secondaryCta}
              </a>
            </div>
          </motion.div>

          <motion.figure className="phone-hero__image" {...mobileReveal(0.05)}>
            <Image
              alt=""
              fetchPriority="high"
              fill
              loading="eager"
              priority
              sizes="(max-width: 860px) and (orientation: landscape) 42vw, (max-width: 860px) calc(100vw - 32px), 0vw"
              src="/images/enterprise-data-center.jpg"
            />
          </motion.figure>

        </section>

        <section className="phone-section phone-about" id="m-about" aria-labelledby="m-about-title">
          <PhoneSectionHeader
            eyebrow={content.brand.role}
            id="m-about-title"
            lead={content.positioning.lead}
            title={content.positioning.title}
            tone="quiet"
          />
          <motion.figure className="phone-about__image" {...mobileReveal(0.04)}>
            <Image alt="" fill sizes="(max-width: 860px) calc(100vw - 32px), 0vw" src="/images/architectural-hallway.jpg" />
          </motion.figure>
          <motion.div className="phone-about__copy" {...mobileReveal(0.08)}>
            <p>{renderCopy(content.positioning.body)}</p>
            <ul>
              {content.positioning.notes.map((note) => (
                <li key={note}>{renderCopy(note)}</li>
              ))}
            </ul>
          </motion.div>
        </section>

        <section className="phone-section phone-expertise" id="m-expertise" aria-labelledby="m-expertise-title">
          <PhoneSectionHeader
            eyebrow={content.labels.expertise}
            id="m-expertise-title"
            lead={content.expertise.lead}
            title={content.expertise.title}
          />
          <motion.div className="phone-card-rail phone-expertise__rail" {...mobileReveal(0.04)}>
            {content.expertise.items.map((item, index) => (
              <article className="phone-expertise-card" key={item.name}>
                <span>{formatIndex(index, locale)}</span>
                <h3>{item.name}</h3>
                <p>{item.short}</p>
                <strong>{item.focus}</strong>
                <div>
                  {item.signals.map((signal) => (
                    <small key={signal}>{signal}</small>
                  ))}
                </div>
              </article>
            ))}
          </motion.div>
        </section>

        <section className="phone-section phone-capabilities" id="m-capabilities" aria-labelledby="m-capabilities-title">
          <PhoneSectionHeader
            eyebrow={content.labels.capabilities}
            id="m-capabilities-title"
            lead={content.capabilities.lead}
            title={content.capabilities.title}
            tone="quiet"
          />
          <CapabilityAccordion
            activeIndex={activeCapability}
            groups={content.capabilities.groups}
            locale={locale}
            setActiveIndex={setActiveCapability}
          />
        </section>

        <section className="phone-section phone-approach" id="m-approach" aria-labelledby="m-approach-title">
          <PhoneSectionHeader
            eyebrow={content.labels.approach}
            id="m-approach-title"
            lead={content.approach.lead}
            title={content.approach.title}
            tone="monument"
          />
          <ol className="phone-timeline">
            {content.approach.steps.map((step, index) => (
              <motion.li className="phone-timeline__item" key={step.number} {...mobileReveal(index * 0.025)}>
                <span>{localizeNumerals(step.number, locale)}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </section>

        <section className="phone-section phone-studies" id="m-studies" aria-labelledby="m-studies-title">
          <PhoneSectionHeader
            eyebrow={content.labels.studies}
            id="m-studies-title"
            lead={content.studies.lead}
            title={content.studies.title}
          />
          <motion.div className="phone-study-rail" role="tablist" aria-label={content.labels.studies} {...mobileReveal(0.04)}>
            {content.studies.items.map((study, index) => (
              <button
                aria-controls="m-study-detail"
                aria-selected={activeStudy === index}
                className="phone-study-card"
                key={study.title}
                onClick={() => setActiveStudy(index)}
                role="tab"
                type="button"
              >
                <figure>
                  <Image alt="" fill sizes="(max-width: 860px) calc(100vw - 56px), 0vw" src={study.image} />
                </figure>
                <span>{study.label}</span>
                <strong>{study.title}</strong>
                <small>{study.summary}</small>
              </button>
            ))}
          </motion.div>
        </section>

        <section className="phone-section phone-study-story" id="m-study-detail" aria-label={storyLabel}>
          <StudyDetail
            activeStudy={activeStudyItem}
            labels={{
              challenge: content.labels.challenge,
              structure: content.labels.structure,
            }}
          />
        </section>

        <section className="phone-section phone-insights" id="m-insights" aria-labelledby="m-insights-title">
          <PhoneSectionHeader
            eyebrow={content.labels.insights}
            id="m-insights-title"
            lead={content.insights.lead}
            title={content.insights.title}
            tone="quiet"
          />
          <div className="phone-insight-stack">
            {content.insights.items.map((insight, index) => (
              <motion.article className="phone-insight" key={insight.title} {...mobileReveal(index * 0.03)}>
                <span>{formatIndex(index, locale)}</span>
                <h3>{insight.title}</h3>
                <p>{insight.body}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="phone-contact" id="m-contact" aria-labelledby="m-contact-title">
          <motion.div className="phone-contact__copy" {...mobileReveal()}>
            <p className="phone-eyebrow">{contactActionLabel}</p>
            <h2 id="m-contact-title">{content.contact.title}</h2>
            <p>{content.contact.lead}</p>
          </motion.div>
          <motion.div className="phone-contact__actions" {...mobileReveal(0.04)}>
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

        <footer className="phone-footer">
          <a className="phone-footer__brand" href="#m-top">
            <Image alt="" height={38} src={logoPath} width={38} />
            <span className="brand-name" dir="ltr">
              {content.brand.name}
            </span>
          </a>
          <p>{content.footer.statement}</p>
          <nav aria-label={locale === "ar" ? "تنقل التذييل" : "Footer navigation"}>
            {mobileNav.map((item) => (
              <a href={mobileHref(item.href)} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </footer>
      </main>
    </MotionConfig>
  );
}
