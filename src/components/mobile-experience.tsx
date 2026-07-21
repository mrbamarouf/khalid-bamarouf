"use client";

import Image from "next/image";
import Link from "next/link";
import {
  type CSSProperties,
  type ReactNode,
  type RefObject,
  useEffect,
  useRef,
  useState,
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
import { StudioSocialLinks } from "./studio-social-links";
import styles from "./mobile-experience.module.css";

const logoPath = "/brand/khalid-bamarouf-logo-transparent.png";
const studioFooterMarkPath = "/brand/bamarouf-studio-footer.png";
const studioSymbolPath = "/brand/bamarouf-studio-symbol.png";
const brandName = "Khalid Bamarouf";
const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

const reveal = {
  initial: { opacity: 0.84, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.16 },
  transition: { duration: 0.56, ease: easeOut },
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

function splitSentences(text: string) {
  const sentences = text.match(/[^.!?؟]+[.!?؟]?/g)?.map((sentence) => sentence.trim());
  return sentences?.filter(Boolean) ?? [text];
}

function DirectionalArrow({
  kind,
  locale,
}: {
  kind: "external" | "section";
  locale: Locale;
}) {
  const isArabic = locale === "ar";
  const paths =
    kind === "external"
      ? isArabic
        ? ["M14 14 6 6", "M12 6H6v6"]
        : ["M6 14 14 6", "M8 6h6v6"]
      : isArabic
        ? ["M14 6 6 14", "M6 8v6h6"]
        : ["M6 6 14 14", "M14 8v6H8"];

  return (
    <span
      aria-hidden="true"
      className={kind === "external" ? styles.externalArrow : styles.menuArrow}
    >
      <svg fill="none" focusable="false" height="20" viewBox="0 0 20 20" width="20">
        {paths.map((path) => (
          <path
            d={path}
            key={path}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.45"
          />
        ))}
      </svg>
    </span>
  );
}

function MobileAmbient() {
  return (
    <div aria-hidden="true" className={styles.ambient}>
      <code>agent.initialize()</code>
      <code>workflow.trigger()</code>
      <code>api.connect()</code>
      <code>evaluateOutput()</code>
      <code>humanEscalation.ready</code>
    </div>
  );
}

function ChapterIntro({
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
    <motion.header className={styles.chapterIntro} {...reveal}>
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
  const menuLabel = locale === "ar" ? "فتح القائمة" : "Open menu";
  const closeLabel = locale === "ar" ? "إغلاق القائمة" : "Close menu";

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a className={styles.identity} href="#m-top" aria-label={`${brandName} home`}>
            <Image alt="" height={36} priority src={logoPath} width={36} />
            <span>
              <strong className="brand-name" dir="ltr">
                {brandName}
              </strong>
              <small>{content.brand.role}</small>
            </span>
          </a>

          <div className={styles.headerControls}>
            <Link
              aria-label={content.language.switchLabel}
              className={styles.languageControl}
              href={locale === "ar" ? "/" : "/ar"}
              hrefLang={locale === "ar" ? "en" : "ar"}
            >
              {content.language.alternate}
            </Link>
            <button
              aria-controls="mobile-navigation"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? closeLabel : menuLabel}
              className={styles.menuTrigger}
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
            exit={{ opacity: 0, y: -14 }}
            id="mobile-navigation"
            initial={{ opacity: 0, y: -14 }}
            role="dialog"
            transition={{ duration: 0.28, ease: easeOut }}
          >
            <div className={styles.menuHeader}>
              <div>
                <span>KB.OS</span>
                <strong>{content.brand.role}</strong>
              </div>
              <button data-mobile-menu-close onClick={onClose} type="button">
                {locale === "ar" ? "إغلاق" : "Close"}
              </button>
            </div>

            <nav className={styles.menuNavigation}>
              {navigation.map((item, index) => (
                <a href={item.href} key={item.href} onClick={onClose}>
                  <span>{formatIndex(index, locale)}</span>
                  <strong>{item.label}</strong>
                  <DirectionalArrow kind="section" locale={locale} />
                </a>
              ))}
            </nav>

            <StudioSocialLinks className={styles.menuSocialLinks} />

            <a
              aria-label={content.studio.ariaLabel}
              className={styles.menuStudio}
              href={content.studio.url}
            >
              <Image alt="" height={36} src={studioSymbolPath} width={36} />
              <span>{content.studio.label}</span>
              <DirectionalArrow kind="external" locale={locale} />
            </a>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function HeroActionIcon({
  direction,
  locale,
}: {
  direction: "down" | "forward";
  locale: Locale;
}) {
  if (direction === "down") {
    return (
      <svg aria-hidden="true" focusable="false" viewBox="0 0 20 20">
        <path d="M10 3.5v12M5.5 11l4.5 4.5 4.5-4.5" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 20 20">
      <path
        d={
          locale === "ar"
            ? "M15 5 6 14M6 14V6M6 14h8"
            : "M5 5l9 9M14 14V6M14 14H6"
        }
      />
    </svg>
  );
}

function HeroSystemCore({ content }: { content: SiteContent }) {
  const isArabic = content.locale === "ar";
  const states = isArabic
    ? [
        ["الوكيل", "متصل"],
        ["مسار العمل", "يعمل"],
        ["API", "متصل"],
        ["الأتمتة", "نشطة"],
        ["التقييم", "ناجح"],
        ["التصعيد البشري", "جاهز"],
      ]
    : [
        ["AGENT", "ONLINE"],
        ["WORKFLOW", "RUNNING"],
        ["API", "CONNECTED"],
        ["AUTOMATION", "ACTIVE"],
        ["EVALUATION", "PASSED"],
        ["HUMAN ESCALATION", "READY"],
      ];

  return (
    <motion.figure
      aria-label={isArabic ? "نظام تحكم حي بالذكاء الاصطناعي" : "Live AI control system"}
      className={styles.heroSystem}
      {...reveal}
    >
      <div className={styles.heroSystemImage}>
        <Image
          alt=""
          fill
          loading="eager"
          sizes="(max-width: 860px) 100vw, (max-width: 960px) and (max-height: 520px) 100vw, 0vw"
          src="/images/ai-operations-headquarters.webp"
        />
      </div>

      <div aria-hidden="true" className={styles.systemCoreMap}>
        <div className={styles.systemTelemetry} dir="ltr">
          <span>KB.AI / CONTROL</span>
          <strong>
            <i />
            {isArabic ? "SYSTEM READY" : "SYSTEM READY"}
          </strong>
        </div>

        <div className={styles.systemTopology}>
          <svg className={styles.systemPaths} preserveAspectRatio="none" viewBox="0 0 360 224">
            <path d="M180 112C139 112 132 42 74 42" />
            <path d="M180 112C142 112 126 86 66 86" />
            <path d="M180 112C141 112 126 182 74 182" />
            <path d="M180 112C221 112 228 42 286 42" />
            <path d="M180 112C218 112 234 86 294 86" />
            <path d="M180 112C219 112 234 182 286 182" />
          </svg>

          <div className={styles.systemCodeLayer} dir="ltr">
            <code>agent.evaluate()</code>
            <code>api.route.ready</code>
            <code>workflow.execute()</code>
            <code>human.escalation.ready</code>
          </div>

          <div className={styles.systemCoreIdentity}>
            <span className={styles.systemCoreIndicator} />
            <Image alt="" height={72} priority src={logoPath} width={72} />
            <strong dir="ltr">CONTROL CORE</strong>
            <small dir="ltr">automation.status = active</small>
          </div>

          <div className={styles.systemStateOrbit}>
            {states.map(([label, state], index) => (
              <div
                data-position={index + 1}
                dir={label === "API" ? "ltr" : content.direction}
                key={label}
                style={{ "--state-index": index } as CSSProperties}
              >
                <i />
                <span>{label}</span>
                <strong>{state}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.systemCommand} dir="ltr">
          <span>process.queue</span>
          <i />
          <strong>READY</strong>
        </div>
      </div>
      <figcaption>
        <span dir="ltr">LIVE CONTROL LAYER</span>
        <strong>{isArabic ? "الأتمتة نشطة" : "Automation active"}</strong>
      </figcaption>
    </motion.figure>
  );
}

function MobileHero({ content }: { content: SiteContent }) {
  const heroSentences = splitSentences(content.hero.lead);
  const headline = heroSentences[0] ?? content.hero.lead;
  const supportingCopy = heroSentences[1] ?? "";
  const continuation = heroSentences.slice(2).join(" ");

  return (
    <section aria-labelledby="m-hero-title" className={styles.hero} id="m-hero">
      <div className={styles.heroCopy}>
        <motion.span className={styles.heroLabel} {...reveal}>
          {renderCopy(content.hero.title)}
        </motion.span>
        <motion.h1 id="m-hero-title" {...reveal}>
          {renderCopy(headline)}
        </motion.h1>
        <motion.p className={styles.heroLead} {...reveal}>
          {renderCopy(supportingCopy)}
        </motion.p>
      </div>

      <HeroSystemCore content={content} />

      <div className={styles.heroClose}>
        <motion.div className={styles.heroActions} {...reveal}>
          <a className={styles.primaryAction} href="#m-contact">
            <span>{content.hero.primaryCta}</span>
            <HeroActionIcon direction="forward" locale={content.locale} />
          </a>
          <a className={styles.secondaryAction} href="#m-expertise">
            <span>{content.hero.secondaryCta}</span>
            <HeroActionIcon direction="down" locale={content.locale} />
          </a>
        </motion.div>
        {continuation ? (
          <motion.p className={styles.heroContinuation} {...reveal}>
            {renderCopy(continuation)}
          </motion.p>
        ) : null}
      </div>
    </section>
  );
}

function MobileAbout({ content, locale }: { content: SiteContent; locale: Locale }) {
  return (
    <section aria-labelledby="m-about-title" className={`${styles.chapter} ${styles.about}`} id="m-about">
      <ChapterIntro
        id="m-about-title"
        label={content.brand.role}
        lead={content.positioning.lead}
        title={content.positioning.title}
      />

      <motion.div className={styles.aboutFlow} {...reveal}>
        <div className={styles.aboutFlowImage}>
          <Image
            alt=""
            fill
            sizes="(max-width: 860px) calc(100vw - 32px), (max-width: 960px) and (max-height: 520px) calc(100vw - 48px), 0vw"
            src="/images/enterprise-data-center.jpg"
          />
        </div>
        <div aria-hidden="true" className={styles.flowTrack}>
          {["INPUT", "EVALUATE", "AUTOMATE", "CONTROL"].map((item, index) => (
            <span key={item}>
              <i>{formatIndex(index, locale)}</i>
              <strong>{item}</strong>
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div className={styles.aboutReading} {...reveal}>
        <p className={styles.aboutBody}>{renderCopy(content.positioning.body)}</p>
        <div className={styles.aboutNotes}>
          {content.positioning.notes.map((note, index) => (
            <article key={note}>
              <span>{formatIndex(index, locale)}</span>
              <p>{renderCopy(note)}</p>
            </article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function MobileExpertise({ content, locale }: { content: SiteContent; locale: Locale }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section aria-labelledby="m-expertise-title" className={`${styles.chapter} ${styles.expertise}`} id="m-expertise">
      <ChapterIntro
        id="m-expertise-title"
        label={content.labels.expertise}
        lead={content.expertise.lead}
        title={content.expertise.title}
      />

      <motion.div className={styles.serviceSystem} {...reveal}>
        <div aria-hidden="true" className={styles.serviceStatus}>
          <span>service.select()</span>
          <i />
          <strong>{formatIndex(activeIndex, locale)}</strong>
        </div>

        <div className={styles.serviceList}>
          {content.expertise.items.map((item, index) => {
            const isActive = index === activeIndex;
            const panelId = `mobile-service-panel-${index}`;

            return (
              <article className={isActive ? styles.active : undefined} key={item.name}>
                <button
                  aria-controls={panelId}
                  aria-expanded={isActive}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                >
                  <span>{formatIndex(index, locale)}</span>
                  <strong>{item.name}</strong>
                  <i aria-hidden="true" />
                </button>
                <AnimatePresence initial={false}>
                  {isActive ? (
                    <motion.div
                      animate={{ height: "auto", opacity: 1 }}
                      className={styles.servicePanel}
                      exit={{ height: 0, opacity: 0 }}
                      id={panelId}
                      initial={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.34, ease: easeOut }}
                    >
                      <div>
                        <span>{item.focus}</span>
                        <p>{item.value}</p>
                        <ul>
                          {item.signals.map((signal) => (
                            <li key={signal}>{signal}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

function MobileCapabilities({ content, locale }: { content: SiteContent; locale: Locale }) {
  const [activeLayer, setActiveLayer] = useState(0);

  return (
    <section aria-labelledby="m-capabilities-title" className={`${styles.chapter} ${styles.capabilities}`} id="m-capabilities">
      <ChapterIntro
        id="m-capabilities-title"
        label={content.labels.capabilities}
        lead={content.capabilities.lead}
        title={content.capabilities.title}
      />

      <motion.div className={styles.layerSystem} {...reveal}>
        <div className={styles.layerMap} aria-hidden="true">
          <span>STRATEGY</span>
          <i />
          <span>ENGINEERING</span>
          <i />
          <span>AUTOMATION</span>
        </div>

        <div className={styles.layerList}>
          {content.capabilities.groups.map((group, index) => {
            const isActive = index === activeLayer;
            const panelId = `mobile-layer-panel-${index}`;

            return (
              <article className={isActive ? styles.active : undefined} key={group.title}>
                <button
                  aria-controls={panelId}
                  aria-expanded={isActive}
                  onClick={() => setActiveLayer(index)}
                  type="button"
                >
                  <span>{formatIndex(index, locale)}</span>
                  <span>
                    <small>{group.intro}</small>
                    <strong>{group.title}</strong>
                  </span>
                  <i aria-hidden="true" />
                </button>
                <AnimatePresence initial={false}>
                  {isActive ? (
                    <motion.div
                      animate={{ height: "auto", opacity: 1 }}
                      className={styles.layerPanel}
                      exit={{ height: 0, opacity: 0 }}
                      id={panelId}
                      initial={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.34, ease: easeOut }}
                    >
                      <ol>
                        {group.capabilities.map((capability, capabilityIndex) => (
                          <li key={capability}>
                            <span>{formatIndex(capabilityIndex, locale)}</span>
                            <p>{capability}</p>
                          </li>
                        ))}
                      </ol>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

function MobileApproach({ content, locale }: { content: SiteContent; locale: Locale }) {
  const [activeStep, setActiveStep] = useState(0);
  const progress = ((activeStep + 1) / content.approach.steps.length) * 100;

  return (
    <section aria-labelledby="m-approach-title" className={`${styles.chapter} ${styles.approach}`} id="m-approach">
      <ChapterIntro
        id="m-approach-title"
        label={content.labels.approach}
        lead={content.approach.lead}
        title={content.approach.title}
      />

      <div
        className={styles.operatingPath}
        style={{ "--path-progress": `${progress}%` } as CSSProperties}
      >
        <div aria-hidden="true" className={styles.pathLine}>
          <span />
        </div>
        <ol>
          {content.approach.steps.map((step, index) => (
            <motion.li
              className={index === activeStep ? styles.active : undefined}
              key={step.number}
              onViewportEnter={() => setActiveStep(index)}
              viewport={{ amount: 0.62 }}
            >
              <span>{localizeNumerals(step.number, locale)}</span>
              <div>
                <strong>{step.title}</strong>
                <p>{step.body}</p>
              </div>
              <i aria-hidden="true" />
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function MobileStudy({ content, locale }: { content: SiteContent; locale: Locale }) {
  const study = content.studies.items[0];

  return (
    <section aria-labelledby="m-studies-title" className={`${styles.chapter} ${styles.studies}`} id="m-studies">
      <ChapterIntro
        id="m-studies-title"
        label={content.labels.studies}
        lead={content.studies.lead}
        title={content.studies.title}
      />

      <motion.figure className={styles.studyPortal} {...reveal}>
        <div className={styles.studyImage}>
          <Image
            alt=""
            fill
            sizes="(max-width: 860px) calc(100vw - 32px), (max-width: 960px) and (max-height: 520px) calc(100vw - 48px), 0vw"
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
  const study = content.studies.items[0];
  const labels = locale === "ar"
    ? ["التحدي", "رسم مسار العمل", "طبقة الأتمتة", "مسار الاستثناء البشري", "المراقبة والتحكم", "النتيجة"]
    : ["Challenge", "Workflow mapping", "AI automation layer", "Human exception route", "Monitoring and control", "Outcome"];
  const story = [
    { body: study.challenge, signal: "workflow.blocked", title: labels[0] },
    { body: study.structure[0], signal: "workflow.map()", title: labels[1] },
    { body: study.structure[1], signal: "automation.active", title: labels[2] },
    { body: "", signal: "human.escalation.ready", title: labels[3] },
    { body: study.structure[2], signal: "monitor.status = online", title: labels[4] },
    { body: study.value, signal: "process.completed", title: labels[5] },
  ];

  return (
    <section aria-labelledby="m-study-detail-title" className={`${styles.chapter} ${styles.studyDetail}`} id="m-study-detail">
      <motion.header className={styles.storyHeader} {...reveal}>
        <span className={styles.chapterLabel}>{study.label}</span>
        <h2 id="m-study-detail-title">{study.title}</h2>
        <p>{study.summary}</p>
      </motion.header>

      <div className={styles.storySequence}>
        {story.map((stage, index) => (
          <motion.article key={stage.title} {...reveal}>
            <div className={styles.storyIndex}>
              <span>{formatIndex(index, locale)}</span>
              <i aria-hidden="true" />
            </div>
            <div>
              <small dir="ltr">{stage.signal}</small>
              <h3>{stage.title}</h3>
              {stage.body ? <p>{stage.body}</p> : null}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function MobileWhy({ content, locale }: { content: SiteContent; locale: Locale }) {
  const [activePrinciple, setActivePrinciple] = useState(0);
  const principle = content.why.principles[activePrinciple];

  return (
    <section aria-labelledby="m-why-title" className={`${styles.chapter} ${styles.why}`} id="m-why">
      <ChapterIntro
        id="m-why-title"
        label={content.brand.name}
        lead={content.why.lead}
        title={content.why.title}
      />

      <motion.div className={styles.principleSystem} {...reveal}>
        <div className={styles.principleSelector} role="tablist" aria-label={content.why.title}>
          {content.why.principles.map((item, index) => (
            <button
              aria-controls="mobile-principle-panel"
              aria-selected={activePrinciple === index}
              className={activePrinciple === index ? styles.active : undefined}
              id={`mobile-principle-tab-${index}`}
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
          <motion.article
            animate={{ opacity: 1, y: 0 }}
            aria-labelledby={`mobile-principle-tab-${activePrinciple}`}
            className={styles.principlePanel}
            exit={{ opacity: 0, y: -8 }}
            id="mobile-principle-panel"
            initial={{ opacity: 0.68, y: 8 }}
            key={principle.title}
            role="tabpanel"
            transition={{ duration: 0.28, ease: easeOut }}
          >
            <span>{formatIndex(activePrinciple, locale)}</span>
            <h3>{principle.title}</h3>
            <p>{principle.body}</p>
            <code dir="ltr">principle.verify() = true</code>
          </motion.article>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function MobileInsights({ content, locale }: { content: SiteContent; locale: Locale }) {
  return (
    <section aria-labelledby="m-insights-title" className={`${styles.chapter} ${styles.insights}`} id="m-insights">
      <ChapterIntro
        id="m-insights-title"
        label={content.labels.insights}
        lead={content.insights.lead}
        title={content.insights.title}
      />

      <div className={styles.insightSequence}>
        {content.insights.items.map((insight, index) => (
          <motion.article key={insight.title} {...reveal}>
            <div className={styles.insightMeta}>
              <span>{formatIndex(index, locale)}</span>
              <code dir="ltr">note.commit()</code>
            </div>
            <h3>{insight.title}</h3>
            <p>{insight.body}</p>
            <div aria-hidden="true" className={styles.insightPulse}>
              <i />
              <i />
              <i />
              <i />
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function MobileContact({ content }: { content: SiteContent }) {
  return (
    <section aria-labelledby="m-contact-title" className={styles.contact} id="m-contact">
      <div aria-hidden="true" className={styles.contactSystem}>
        <span>CONTROL LAYER</span>
        <i />
        <strong>READY</strong>
      </div>
      <motion.div className={styles.contactIdentity} {...reveal}>
        <Image alt="" height={88} src={logoPath} width={88} />
        <span>{content.brand.role}</span>
      </motion.div>
      <motion.div className={styles.contactCopy} {...reveal}>
        <h2 id="m-contact-title">{content.contact.title}</h2>
        <p>{renderCopy(content.contact.lead)}</p>
      </motion.div>
      <motion.div className={styles.contactActions} {...reveal}>
        <a href={getWhatsAppHref()} rel="noreferrer" target="_blank">
          <span>{content.contact.whatsappLabel}</span>
          <strong dir="ltr">{contactConfig.whatsapp.display}</strong>
          <DirectionalArrow kind="external" locale={content.locale} />
        </a>
        <a href={getMailtoHref(content.contact.subject)}>
          <span>{content.contact.emailLabel}</span>
          <strong dir="ltr">{contactConfig.email.address}</strong>
          <DirectionalArrow kind="external" locale={content.locale} />
        </a>
        <StudioSocialLinks className={styles.contactSocialLinks} />
      </motion.div>
    </section>
  );
}

function MobileFooter({ content }: { content: SiteContent }) {
  return (
    <footer className={styles.footer}>
      <a className={styles.footerBrand} href="#m-top">
        <Image alt="" height={40} src={logoPath} width={40} />
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
        <Image alt="" height={32} src={studioFooterMarkPath} width={32} />
        <span>{content.studio.footerSignature}</span>
        <DirectionalArrow kind="external" locale={content.locale} />
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

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
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
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    window.requestAnimationFrame(() => closeButton?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
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
        <MobileAmbient />
        <div className={styles.surface}>
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
