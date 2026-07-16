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
    initial: { opacity: 1, y: 0 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.18 },
    transition: { duration: 0.58, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  };
}

function MobileSectionIntro({
  eyebrow,
  id,
  lead,
  title,
}: {
  eyebrow: string;
  id: string;
  lead: string;
  title: string;
}) {
  return (
    <motion.div className="mobile-section-intro" {...mobileReveal()}>
      <p className="mobile-kicker">{eyebrow}</p>
      <h2 id={id}>{renderCopy(title)}</h2>
      <p>{renderCopy(lead)}</p>
    </motion.div>
  );
}

function MobileHeader({
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
    <header className="mobile-header">
      <div className="mobile-header__bar">
        <a className="mobile-brand" href="#m-top" aria-label={`${brand.name} home`}>
          <Image alt="" height={48} priority src={logoPath} width={48} />
          <span>
            <strong className="brand-name" dir="ltr">{brand.name}</strong>
            <small>{brand.role}</small>
          </span>
        </a>

        <Link
          aria-label={switchLabel}
          className="mobile-language"
          href={locale === "ar" ? "/" : "/ar"}
          hrefLang={locale === "ar" ? "en" : "ar"}
        >
          {locale === "ar" ? "EN" : "AR"}
        </Link>

        <button
          aria-controls="mobile-menu"
          aria-expanded={menuOpen}
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          type="button"
        >
          <span>{menuOpen ? closeLabel : menuLabel}</span>
          <i aria-hidden="true" />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mobile-menu"
            exit={{ opacity: 0, y: -10 }}
            id="mobile-menu"
            initial={{ opacity: 0.001, y: -10 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <nav aria-label="Mobile navigation">
              {nav.map((item) => (
                <a
                  href={mobileHref(item.href)}
                  key={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
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
      className="mobile-study-detail"
      initial={{ opacity: 0.001, y: 14 }}
      key={activeStudy.title}
      transition={{ duration: 0.36, ease: "easeOut" }}
    >
      <figure className="mobile-study-detail__image">
        <Image alt="" fill sizes="100vw" src={activeStudy.image} />
      </figure>
      <div className="mobile-study-detail__copy">
        <p className="mobile-study-detail__label">{activeStudy.label}</p>
        <h3>{activeStudy.title}</h3>
        <p>{activeStudy.summary}</p>
      </div>
      <div className="mobile-study-detail__body">
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
        <p className="mobile-study-detail__value">{activeStudy.value}</p>
      </div>
    </motion.article>
  );
}

export function MobileExperience({ locale = "en" }: { locale?: Locale }) {
  const [activeExpertise, setActiveExpertise] = useState(0);
  const [activeStudy, setActiveStudy] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const content = siteContent[locale];
  const isRtl = content.direction === "rtl";
  const activeExpertiseItem = content.expertise.items[activeExpertise];
  const activeStudyItem = content.studies.items[activeStudy];
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
        className={`mobile-shell ${isRtl ? "is-mobile-rtl" : ""}`}
        data-locale={content.locale}
        dir={content.direction}
        id="m-top"
        lang={content.locale}
      >
        <MobileHeader
          brand={content.brand}
          locale={locale}
          menuOpen={menuOpen}
          nav={mobileNav}
          setMenuOpen={setMenuOpen}
          switchLabel={content.language.switchLabel}
        />

        <section className="mobile-hero" aria-labelledby="m-hero-title">
          <motion.div className="mobile-hero__copy" {...mobileReveal()}>
            <p className="mobile-kicker">{content.hero.eyebrow}</p>
            <h1 id="m-hero-title">{content.hero.title}</h1>
            <p>{content.hero.lead}</p>
            <div className="mobile-actions">
              <a className="mobile-button mobile-button--primary" href="#m-contact">
                {content.hero.primaryCta}
              </a>
              <a className="mobile-button mobile-button--secondary" href="#m-expertise">
                {content.hero.secondaryCta}
              </a>
            </div>
          </motion.div>
          <motion.figure className="mobile-hero__image" {...mobileReveal(0.06)}>
            <Image
              alt=""
              fetchPriority="high"
              fill
              loading="eager"
              priority
              sizes="100vw"
              src="/images/enterprise-data-center.jpg"
            />
          </motion.figure>
          <motion.div className="mobile-hero__metrics" {...mobileReveal(0.08)}>
            {content.hero.metrics.map((metric) => (
              <div key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
              </div>
            ))}
          </motion.div>
        </section>

        <section className="mobile-section mobile-about" id="m-about" aria-labelledby="m-about-title">
          <MobileSectionIntro
            eyebrow={content.brand.role}
            id="m-about-title"
            lead={content.positioning.lead}
            title={content.positioning.title}
          />
          <motion.figure className="mobile-about__image" {...mobileReveal(0.04)}>
            <Image alt="" fill sizes="100vw" src="/images/architectural-hallway.jpg" />
          </motion.figure>
          <motion.div className="mobile-about__body" {...mobileReveal(0.08)}>
            <p>{renderCopy(content.positioning.body)}</p>
            <ul>
              {content.positioning.notes.map((note) => (
                <li key={note}>{renderCopy(note)}</li>
              ))}
            </ul>
          </motion.div>
        </section>

        <section className="mobile-section mobile-expertise" id="m-expertise" aria-labelledby="m-expertise-title">
          <MobileSectionIntro
            eyebrow={content.labels.expertise}
            id="m-expertise-title"
            lead={content.expertise.lead}
            title={content.expertise.title}
          />
          <motion.div className="mobile-expertise__selector" role="tablist" aria-label={content.labels.expertise} {...mobileReveal(0.04)}>
            {content.expertise.items.map((item, index) => (
              <div className="mobile-expertise__item" key={item.name}>
                <button
                  aria-controls="mobile-expertise-panel"
                  aria-selected={activeExpertise === index}
                  onClick={() => setActiveExpertise(index)}
                  role="tab"
                  type="button"
                >
                  <span>{formatIndex(index, locale)}</span>
                  <strong>{item.name}</strong>
                  <small>{item.short}</small>
                </button>
                <AnimatePresence initial={false}>
                  {activeExpertise === index ? (
                    <motion.article
                      animate={{ opacity: 1, height: "auto" }}
                      className="mobile-expertise__panel"
                      exit={{ opacity: 0, height: 0 }}
                      id="mobile-expertise-panel"
                      initial={{ opacity: 0.001, height: 0 }}
                      role="tabpanel"
                      transition={{ duration: 0.28, ease: "easeOut" }}
                    >
                      <h3>{activeExpertiseItem.focus}</h3>
                      <p>{activeExpertiseItem.value}</p>
                      <div>
                        {activeExpertiseItem.signals.map((signal) => (
                          <small key={signal}>{signal}</small>
                        ))}
                      </div>
                    </motion.article>
                  ) : null}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </section>

        <section className="mobile-section mobile-capabilities" id="m-capabilities" aria-labelledby="m-capabilities-title">
          <MobileSectionIntro
            eyebrow={content.labels.capabilities}
            id="m-capabilities-title"
            lead={content.capabilities.lead}
            title={content.capabilities.title}
          />
          <div className="mobile-capability-list">
            {content.capabilities.groups.map((group, index) => (
              <motion.article className="mobile-capability" key={group.title} {...mobileReveal(index * 0.03)}>
                <span>{formatIndex(index, locale)}</span>
                <h3>{group.title}</h3>
                <p>{group.intro}</p>
                <ul>
                  {group.capabilities.map((capability) => (
                    <li key={capability}>{capability}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mobile-section mobile-approach" id="m-approach" aria-labelledby="m-approach-title">
          <MobileSectionIntro
            eyebrow={content.labels.approach}
            id="m-approach-title"
            lead={content.approach.lead}
            title={content.approach.title}
          />
          <ol className="mobile-approach__steps">
            {content.approach.steps.map((step, index) => (
              <motion.li className="mobile-step" key={step.number} {...mobileReveal(index * 0.03)}>
                <span className="mobile-step__index">{localizeNumerals(step.number, locale)}</span>
                <div className="mobile-step__copy">
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </section>

        <section className="mobile-section mobile-studies" id="m-studies" aria-labelledby="m-studies-title">
          <MobileSectionIntro
            eyebrow={content.labels.studies}
            id="m-studies-title"
            lead={content.studies.lead}
            title={content.studies.title}
          />
          <motion.div className="mobile-study-selector" role="tablist" aria-label={content.labels.studies} {...mobileReveal(0.04)}>
            {content.studies.items.map((study, index) => (
              <button
                aria-controls="mobile-study-detail"
                aria-selected={activeStudy === index}
                key={study.title}
                onClick={() => setActiveStudy(index)}
                role="tab"
                type="button"
              >
                <span>{study.label}</span>
                <strong>{study.title}</strong>
              </button>
            ))}
          </motion.div>
          <div id="mobile-study-detail">
            <StudyDetail
              activeStudy={activeStudyItem}
              labels={{
                challenge: content.labels.challenge,
                structure: content.labels.structure,
              }}
            />
          </div>
        </section>

        <section className="mobile-section mobile-insights" id="m-insights" aria-labelledby="m-insights-title">
          <MobileSectionIntro
            eyebrow={content.labels.insights}
            id="m-insights-title"
            lead={content.insights.lead}
            title={content.insights.title}
          />
          <div className="mobile-insight-list">
            {content.insights.items.map((insight, index) => (
              <motion.article className="mobile-insight" key={insight.title} {...mobileReveal(index * 0.03)}>
                <span>{formatIndex(index, locale)}</span>
                <h3>{insight.title}</h3>
                <p>{insight.body}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mobile-contact" id="m-contact" aria-labelledby="m-contact-title">
          <motion.figure className="mobile-contact__image" {...mobileReveal()}>
            <Image alt="" fill sizes="100vw" src="/images/architectural-hallway.jpg" />
          </motion.figure>
          <motion.div className="mobile-contact__copy" {...mobileReveal(0.04)}>
            <Image alt="" height={64} src={logoPath} width={64} />
            <h2 id="m-contact-title">{content.contact.title}</h2>
            <p>{content.contact.lead}</p>
            <div className="mobile-contact__actions">
              <a href={getWhatsAppHref()} target="_blank" rel="noreferrer">
                <span>{content.contact.whatsappLabel}</span>
                <strong>{temporaryContactConfig.whatsapp.display}</strong>
              </a>
              <a href={getMailtoHref(content.contact.subject)}>
                <span>{content.contact.emailLabel}</span>
                <strong>{temporaryContactConfig.email.address}</strong>
              </a>
            </div>
          </motion.div>
        </section>

        <footer className="mobile-footer">
          <a className="mobile-footer__brand" href="#m-top">
            <Image alt="" height={44} src={logoPath} width={44} />
            <span className="brand-name" dir="ltr">{content.brand.name}</span>
          </a>
          <p>{content.footer.statement}</p>
          <nav aria-label="Mobile footer navigation">
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
