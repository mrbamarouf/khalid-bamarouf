"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./mobile-intro-experience.module.css";

const introStorageKey = "kb-intro-played";
const introDuration = 6400;
const mobileQuery = "(max-width: 860px), (max-width: 960px) and (max-height: 520px)";
const logoPath = "/brand/khalid-bamarouf-logo-transparent.png";

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
    <div className={styles.shell} dir={isArabic ? "rtl" : "ltr"}>
      <div aria-hidden="true" className={styles.codeField}>
        <span>system.boot</span>
        <span>agent.connect</span>
        <span>workflow.ready</span>
      </div>
      <svg aria-hidden="true" className={styles.construction} viewBox="0 0 320 480">
        <path className={styles.axis} d="M28 240H292" />
        <path className={styles.axis} d="M160 72V408" />
        <path className={styles.frame} d="M72 142H248V338H72Z" />
        <circle className={styles.ring} cx="160" cy="240" r="84" />
        <circle className={styles.ring} cx="160" cy="240" r="116" />
        <path className={styles.signal} d="M28 240H86L112 196L140 286L170 216L198 258H292" />
      </svg>
      <div className={styles.logoStage}>
        <span aria-hidden="true" />
        <Image alt="" height={116} priority src={logoPath} width={116} />
        <strong>READY</strong>
      </div>
      <button className={styles.skip} onClick={finishIntro} type="button">
        {isArabic ? "تخط" : "Skip"}
      </button>
    </div>
  );
}
