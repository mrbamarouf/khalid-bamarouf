import Image from "next/image";
import Link from "next/link";
import {
  getMailtoHref,
  getWhatsAppHref,
  temporaryContactConfig,
} from "@/content/contact-config";
import { siteContent } from "@/content/site-content";
import styles from "./arabic-desktop-experience.module.css";

const logoPath = "/brand/khalid-bamarouf-logo-transparent.png";
const content = siteContent.ar;
const primaryStudy = content.studies.items[0];
const arabicOrder = ["٠١", "٠٢", "٠٣", "٠٤", "٠٥"];
const arabicNav = [
  { label: "الخبرات", href: "#arabic-expertise" },
  { label: "القدرات", href: "#arabic-capabilities" },
  { label: "المنهج", href: "#arabic-approach" },
  { label: "الدراسات", href: "#arabic-studies" },
  { label: "التواصل", href: "#arabic-contact" },
];

export function ArabicDesktopExperience() {
  return (
    <main
      className={styles.shell}
      data-arabic-composition="native-desktop"
      data-locale="ar"
      dir="rtl"
      lang="ar"
    >
      <header className={styles.header}>
        <a className={styles.brand} href="#arabic-top" aria-label={`${content.brand.name} home`}>
          <Image alt="" height={64} src={logoPath} width={64} />
          <span>
            <strong>{content.brand.name}</strong>
            <small>{content.brand.role}</small>
          </span>
        </a>

        <nav className={styles.nav} aria-label="Arabic navigation">
          {arabicNav.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <Link className={styles.languageSwitch} href="/" hrefLang="en" aria-label="English version">
          <span>AR</span>
          <span>EN</span>
        </Link>
      </header>

      <section className={`${styles.chapter} ${styles.hero}`} id="arabic-top">
        <div className={styles.heroVisual} aria-hidden="true">
          <Image
            alt=""
            fill
            priority
            sizes="50vw"
            src="/images/enterprise-data-center.jpg"
          />
        </div>

        <div className={styles.heroContent}>
          <p>{content.hero.eyebrow}</p>
          <h1>{content.hero.title}</h1>
          <p>{content.hero.lead}</p>
          <div className={styles.actions}>
            <a href="#arabic-contact">{content.hero.primaryCta}</a>
            <a href="#arabic-expertise">{content.hero.secondaryCta}</a>
          </div>
          <div className={styles.heroMetrics} aria-label="مؤشرات العمل">
            {content.hero.metrics.map((metric) => (
              <div key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.chapter} ${styles.about}`} id="arabic-about">
        <div className={styles.aboutVisual} aria-hidden="true">
          <Image alt="" fill sizes="42vw" src="/images/architectural-hallway.jpg" />
        </div>
        <div className={styles.aboutContent}>
          <p>{content.brand.role}</p>
          <h2>{content.positioning.title}</h2>
          <p>{content.positioning.lead}</p>
          <p>{content.positioning.body}</p>
          <ul>
            {content.positioning.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${styles.chapter} ${styles.expertise}`} id="arabic-expertise">
        <div className={styles.expertiseLayout}>
          <div className={styles.expertiseDiagram} aria-hidden="true">
            <div className={styles.expertiseHub}>
              <span>بنية النظام</span>
              <strong>Khalid Bamarouf</strong>
            </div>
            {content.expertise.items.map((item, index) => (
              <div className={`${styles.expertiseNode} ${styles[`expertiseNode${index + 1}`]}`} key={item.name}>
                <span>{item.name}</span>
              </div>
            ))}
            <div className={styles.expertiseAxis} />
          </div>

          <div className={styles.expertiseContent}>
            <div className={styles.chapterTitle}>
              <p>{content.labels.expertise}</p>
              <h2>{content.expertise.title}</h2>
              <p>{content.expertise.lead}</p>
            </div>

            <div className={styles.expertiseList}>
              {content.expertise.items.map((item) => (
                <article key={item.name}>
                  <span>{item.name}</span>
                  <h3>{item.short}</h3>
                  <p>{item.focus}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.chapter} ${styles.capabilities}`} id="arabic-capabilities">
        <div className={styles.capabilitiesLayout}>
          <div className={styles.capabilityRows}>
            {content.capabilities.groups.map((group, index) => (
              <article key={group.title}>
                <span>{arabicOrder[index]}</span>
                <div>
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
          </div>

          <div className={`${styles.chapterTitle} ${styles.capabilitiesIntro}`}>
            <p>{content.labels.capabilities}</p>
            <h2>{content.capabilities.title}</h2>
            <p>{content.capabilities.lead}</p>
          </div>
        </div>
      </section>

      <section className={`${styles.chapter} ${styles.approach}`} id="arabic-approach">
        <div className={styles.approachLayout}>
          <div className={styles.approachVisual} aria-hidden="true">
            <Image alt="" fill sizes="42vw" src="/images/automation-control-panel.jpg" />
          </div>
          <div className={`${styles.chapterTitle} ${styles.approachIntro}`}>
            <p>{content.labels.approach}</p>
            <h2>{content.approach.title}</h2>
            <p>{content.approach.lead}</p>
          </div>
        </div>

        <div className={styles.approachSteps}>
          {content.approach.steps.map((step) => (
            <article key={step.number}>
              <span>{arabicOrder[Number(step.number) - 1]}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.chapter} ${styles.studies}`} id="arabic-studies">
        <div className={styles.chapterTitle}>
          <p>{content.labels.studies}</p>
          <h2>{content.studies.title}</h2>
          <p>{content.studies.lead}</p>
        </div>

        <div className={styles.studyStage}>
          <div className={styles.studyImage}>
            <Image alt="" fill sizes="46vw" src={primaryStudy.image} />
          </div>
          <div className={styles.studyIndex}>
            {content.studies.items.map((study) => (
              <article key={study.title}>
                <span>{study.label}</span>
                <h3>{study.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.chapter} ${styles.studyDetails}`}>
        <div className={styles.studySummary}>
          <span>{primaryStudy.label}</span>
          <h2>{primaryStudy.title}</h2>
          <p>{primaryStudy.summary}</p>
        </div>
        <div className={styles.studyDetailList}>
          <article>
            <span>{content.labels.challenge}</span>
            <p>{primaryStudy.challenge}</p>
          </article>
          <article>
            <span>{content.labels.structure}</span>
            <ul>
              {primaryStudy.structure.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article>
            <span>{primaryStudy.value}</span>
          </article>
        </div>
      </section>

      <section className={`${styles.chapter} ${styles.insights}`} id="arabic-insights">
        <div className={styles.chapterTitle}>
          <p>{content.labels.insights}</p>
          <h2>{content.insights.title}</h2>
          <p>{content.insights.lead}</p>
        </div>
        <div className={styles.insightGrid}>
          {content.insights.items.map((insight) => (
            <article key={insight.title}>
              <h3>{insight.title}</h3>
              <p>{insight.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.chapter} ${styles.contact}`} id="arabic-contact">
        <div className={styles.contactActions}>
          <a href={getWhatsAppHref()} target="_blank" rel="noreferrer">
            <span>واتساب</span>
            <strong>{temporaryContactConfig.whatsapp.display}</strong>
          </a>
          <a href={getMailtoHref(content.contact.subject)}>
            <span>البريد</span>
            <strong>{temporaryContactConfig.email.address}</strong>
          </a>
        </div>

        <div className={styles.contactContent}>
          <Image alt="" height={92} src={logoPath} width={92} />
          <h2>{content.contact.title}</h2>
          <p>{content.contact.lead}</p>
        </div>
      </section>

      <footer className={styles.footer}>
        <a className={styles.brand} href="#arabic-top">
          <Image alt="" height={52} src={logoPath} width={52} />
          <span>{content.brand.name}</span>
        </a>
        <p>{content.footer.statement}</p>
        <nav className={styles.footerNav} aria-label="Arabic footer navigation">
          {arabicNav.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </footer>
    </main>
  );
}
