"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./intro-experience.module.css";

const introStorageKey = "kb-intro-played";
const introDuration = 8600;
const logoPath = "/brand/khalid-bamarouf-logo-transparent.png";

export function IntroExperience() {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const shouldPlay = document.documentElement.dataset.kbIntro === "play";

    if (!shouldPlay) {
      return;
    }

    const timeout = window.setTimeout(() => {
      window.sessionStorage.setItem(introStorageKey, "true");
      document.documentElement.dataset.kbIntro = "done";
      setMounted(false);
    }, introDuration);

    return () => window.clearTimeout(timeout);
  }, []);

  function finishIntro() {
    window.sessionStorage.setItem(introStorageKey, "true");
    document.documentElement.dataset.kbIntro = "done";
    setMounted(false);
  }

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.shell}>
      <div className={styles.blackout} />
      <div className={styles.codeField} aria-hidden="true">
        <span>system.boot</span>
        <span>workflow.ready</span>
        <span>agent.running</span>
        <span>api.connected</span>
      </div>
      <svg aria-hidden="true" className={styles.construct} viewBox="0 0 900 520">
        <path className={styles.constructLine} d="M120 260H780" />
        <path className={styles.constructLine} d="M450 82V438" />
        <path className={styles.constructLine} d="M260 150H640V370H260Z" />
        <path className={styles.constructArc} d="M270 318C360 144 542 144 630 318" />
        <path className={styles.constructArc} d="M302 350C404 436 512 436 600 350" />
        <circle className={styles.constructRing} cx="450" cy="260" r="124" />
        <circle className={styles.constructRing} cx="450" cy="260" r="172" />
      </svg>
      <div className={styles.logoStage}>
        <span className={styles.logoGuide} />
        <Image alt="" height={176} priority src={logoPath} width={176} />
        <strong>READY</strong>
      </div>
      <button className={styles.skip} onClick={finishIntro} type="button">
        Skip
      </button>
    </div>
  );
}
