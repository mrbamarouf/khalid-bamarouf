"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import styles from "./mobile-intro-experience.module.css";

const introStorageKey = "kb-intro-played";
const introDuration = 6600;
const mobileQuery = "(max-width: 860px), (max-width: 960px) and (max-height: 520px)";
const logoPath = "/brand/khalid-bamarouf-logo-transparent.png";

const codeColumns = [
  [
    "agent.initialize()",
    "permissions.check()",
    "model.evaluate()",
    "humanEscalation.ready",
  ],
  [
    "workflow.trigger()",
    "api.connect()",
    "integration.ready",
    "process.completed",
  ],
  [
    "monitor.status = online",
    "routeException()",
    "automation.active",
    "system.health = stable",
  ],
];

const bootStates = [
  "CORE LOADING",
  "AGENT ONLINE",
  "WORKFLOW READY",
  "CONTROL ACTIVE",
];

export function MobileIntroExperience() {
  const [mounted, setMounted] = useState(true);
  const previousOverflow = useRef("");
  const pathname = usePathname();
  const isArabic = pathname.startsWith("/ar");

  useEffect(() => {
    if (!window.matchMedia(mobileQuery).matches) {
      return;
    }

    const shouldPlay = document.documentElement.dataset.kbIntro === "play";

    if (!shouldPlay) {
      return;
    }

    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timeout = window.setTimeout(() => {
      window.sessionStorage.setItem(introStorageKey, "true");
      document.documentElement.dataset.kbIntro = "done";
      document.body.style.overflow = previousOverflow.current;
      setMounted(false);
    }, introDuration);

    return () => {
      window.clearTimeout(timeout);
      document.body.style.overflow = previousOverflow.current;
    };
  }, []);

  function finishIntro() {
    window.sessionStorage.setItem(introStorageKey, "true");
    document.documentElement.dataset.kbIntro = "done";
    document.body.style.overflow = previousOverflow.current;
    setMounted(false);
  }

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.shell} dir="ltr">
      <div aria-hidden="true" className={styles.atmosphere} />
      <div aria-hidden="true" className={styles.scan} />

      <div aria-hidden="true" className={styles.bootHeader}>
        <span>KB.OS / MOBILE CONTROL</span>
        <strong>SYSTEM BOOT</strong>
      </div>

      <div aria-hidden="true" className={styles.codeDepth}>
        {codeColumns.map((column, columnIndex) => (
          <div
            className={styles.codeColumn}
            key={column[0]}
            style={{ "--column-index": columnIndex } as CSSProperties}
          >
            {column.map((line, lineIndex) => (
              <code
                key={line}
                style={{ "--line-index": lineIndex } as CSSProperties}
              >
                <span>{String(lineIndex + 1).padStart(2, "0")}</span>
                {line}
              </code>
            ))}
          </div>
        ))}
      </div>

      <svg aria-hidden="true" className={styles.topology} viewBox="0 0 390 760">
        <path d="M18 154H86L124 234H170L195 288" />
        <path d="M372 205H306L274 270H220L195 320" />
        <path d="M22 520H92L130 448H168L195 402" />
        <path d="M370 574H306L268 486H224L195 426" />
        <path d="M195 70V236" />
        <path d="M195 470V690" />
        <g>
          <circle cx="18" cy="154" r="3" />
          <circle cx="372" cy="205" r="3" />
          <circle cx="22" cy="520" r="3" />
          <circle cx="370" cy="574" r="3" />
          <circle cx="195" cy="70" r="3" />
          <circle cx="195" cy="690" r="3" />
        </g>
      </svg>

      <div aria-hidden="true" className={styles.stateRail}>
        {bootStates.map((state, index) => (
          <span
            key={state}
            style={{ "--state-index": index } as CSSProperties}
          >
            <i />
            {state}
          </span>
        ))}
      </div>

      <div className={styles.logoStage}>
        <div aria-hidden="true" className={styles.logoPaths}>
          <i />
          <i />
          <i />
          <i />
        </div>
        <Image alt="" height={128} priority src={logoPath} width={128} />
        <strong>READY</strong>
      </div>

      <div aria-hidden="true" className={styles.bootFooter}>
        <span>automation.status = active</span>
        <i />
        <span>100%</span>
      </div>

      <button className={styles.skip} onClick={finishIntro} type="button">
        {isArabic ? "تخط" : "Skip"}
      </button>
    </div>
  );
}
