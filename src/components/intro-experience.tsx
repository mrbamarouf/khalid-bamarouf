"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const introStorageKey = "kb-intro-played";
const introDuration = 7200;
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

  if (!mounted) {
    return null;
  }

  return (
    <div className="kb-intro" aria-hidden="true">
      <div className="kb-intro__light" />
      <div className="kb-intro__field">
        <span className="kb-intro__line kb-intro__line--x1" />
        <span className="kb-intro__line kb-intro__line--x2" />
        <span className="kb-intro__line kb-intro__line--y1" />
        <span className="kb-intro__line kb-intro__line--y2" />
        <span className="kb-intro__guide kb-intro__guide--tl" />
        <span className="kb-intro__guide kb-intro__guide--tr" />
        <span className="kb-intro__guide kb-intro__guide--br" />
        <span className="kb-intro__guide kb-intro__guide--bl" />
        <div className="kb-intro__mark">
          <Image alt="" height={132} priority src={logoPath} width={132} />
        </div>
      </div>
    </div>
  );
}
