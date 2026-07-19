"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import styles from "./intro-experience.module.css";

const introStorageKey = "kb-intro-played";
const introDuration = 8800;
const mobileQuery = "(max-width: 860px), (max-width: 960px) and (max-height: 520px)";
const logoPath = "/brand/khalid-bamarouf-logo-transparent.png";

const bootStages = [
  "SYSTEM BOOT",
  "CORE LOADING",
  "AGENT ONLINE",
  "WORKFLOW READY",
  "INTEGRATIONS CONNECTED",
  "EVALUATION PASSED",
  "CONTROL LAYER ACTIVE",
];

const codeLanes = [
  {
    title: "orchestrator.ts",
    lines: [
      "agent.initialize({ control: true })",
      "workflow.load(\"operations\")",
      "permissions.check(\"execution\")",
      "model.evaluate(current_state)",
    ],
  },
  {
    title: "integration.bus",
    lines: [
      "await api.connect(\"core\")",
      "integration.status = connected",
      "process.queue = ready",
      "monitoring.stream = online",
    ],
  },
  {
    title: "policy.engine",
    lines: [
      "route.exception(human_review)",
      "human.escalation.ready",
      "evaluation.threshold = 0.94",
      "system.health = stable",
    ],
  },
  {
    title: "deployment.runtime",
    lines: [
      "automation.status = active",
      "deployment.state = running",
      "telemetry.flush(1200ms)",
      "control.layer.commit()",
    ],
  },
  {
    title: "workflow.graph",
    lines: [
      "node.input.resolve()",
      "node.agent.execute()",
      "node.output.validate()",
      "workflow.signal(\"ready\")",
    ],
  },
];

const terminalPanels = [
  {
    title: "AGENT RUNTIME",
    state: "ONLINE",
    rows: [
      ["00:01.24", "agent.initialize()", "PASS"],
      ["00:01.68", "model.evaluate()", "PASS"],
      ["00:02.10", "permissions.check()", "PASS"],
      ["00:02.62", "human.escalation", "READY"],
    ],
  },
  {
    title: "INTEGRATION BUS",
    state: "CONNECTED",
    rows: [
      ["00:02.18", "api.connect(core)", "200"],
      ["00:02.46", "route.bind(events)", "OPEN"],
      ["00:02.88", "schema.validate()", "PASS"],
      ["00:03.12", "stream.observe()", "LIVE"],
    ],
  },
  {
    title: "WORKFLOW ENGINE",
    state: "READY",
    rows: [
      ["00:03.08", "workflow.load()", "DONE"],
      ["00:03.54", "process.queue", "READY"],
      ["00:03.92", "exception.route", "ARMED"],
      ["00:04.20", "automation.start", "ACTIVE"],
    ],
  },
  {
    title: "CONTROL LAYER",
    state: "STABLE",
    rows: [
      ["00:04.02", "telemetry.stream", "ONLINE"],
      ["00:04.38", "evaluation.run", "PASS"],
      ["00:04.74", "system.health", "STABLE"],
      ["00:05.06", "deployment.state", "RUNNING"],
    ],
  },
];

const topologyPaths = [
  "M54 150H246L348 248H642L800 450",
  "M54 310H286L390 390H650L800 450",
  "M54 720H264L390 596H646L800 450",
  "M1546 148H1338L1230 246H958L800 450",
  "M1546 326H1334L1212 398H946L800 450",
  "M1546 718H1338L1200 590H958L800 450",
  "M386 60V170L520 304H676L800 450",
  "M1214 60V174L1084 304H936L800 450",
];

const nearSignals = [
  "execution.policy = controlled",
  "evaluation.result = passed",
  "workflow.state = operational",
];

export function IntroExperience() {
  const [mounted, setMounted] = useState(true);
  const previousOverflow = useRef("");
  const pathname = usePathname();
  const isArabic = pathname.startsWith("/ar");

  useEffect(() => {
    if (window.matchMedia(mobileQuery).matches) {
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
      <div aria-hidden="true" className={styles.perspectiveGrid} />
      <div aria-hidden="true" className={styles.scanField} />

      <div aria-hidden="true" className={styles.bootRail}>
        <div className={styles.bootIdentity}>
          <span>KB.OS</span>
          <strong>AI AUTOMATION CONTROL PLANE</strong>
        </div>
        <div className={styles.bootStages}>
          {bootStages.map((stage, index) => (
            <span
              className={styles.bootStage}
              key={stage}
              style={{ "--stage-index": index } as CSSProperties}
            >
              <i />
              {stage}
            </span>
          ))}
        </div>
        <span className={styles.bootProgress} />
      </div>

      <div aria-hidden="true" className={styles.depthField}>
        <div className={styles.farLayer}>
          {codeLanes.map((lane, laneIndex) => (
            <section
              className={styles.codeLane}
              key={lane.title}
              style={{ "--lane-index": laneIndex } as CSSProperties}
            >
              <header>
                <span>{String(laneIndex + 1).padStart(2, "0")}</span>
                <strong>{lane.title}</strong>
              </header>
              {lane.lines.map((line, lineIndex) => (
                <code key={line} style={{ "--line-index": lineIndex } as CSSProperties}>
                  {line}
                </code>
              ))}
            </section>
          ))}
        </div>

        <div className={styles.midLayer}>
          {terminalPanels.map((panel, panelIndex) => (
            <section
              className={styles.terminal}
              key={panel.title}
              style={{ "--panel-index": panelIndex } as CSSProperties}
            >
              <header>
                <strong>{panel.title}</strong>
                <span>{panel.state}</span>
              </header>
              <div className={styles.terminalRows}>
                {panel.rows.map(([time, event, state], rowIndex) => (
                  <div
                    className={styles.terminalRow}
                    key={event}
                    style={{ "--row-index": rowIndex } as CSSProperties}
                  >
                    <time>{time}</time>
                    <code>{event}</code>
                    <b>{state}</b>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className={styles.nearLayer}>
          {nearSignals.map((signal, index) => (
            <code key={signal} style={{ "--signal-index": index } as CSSProperties}>
              {signal}
            </code>
          ))}
        </div>
      </div>

      <svg
        aria-hidden="true"
        className={styles.topology}
        preserveAspectRatio="none"
        viewBox="0 0 1600 900"
      >
        <g className={styles.topologyGuides}>
          <path d="M0 450H1600" />
          <path d="M800 0V900" />
          <circle cx="800" cy="450" r="98" />
          <circle cx="800" cy="450" r="164" />
        </g>
        <g className={styles.processNodes}>
          {[
            [800, 276, "INGEST"],
            [934, 326, "VALIDATE"],
            [982, 450, "MODEL"],
            [934, 574, "EVALUATE"],
            [800, 624, "ACT"],
            [666, 574, "OBSERVE"],
            [618, 450, "ROUTE"],
            [666, 326, "CONTROL"],
          ].map(([x, y, label], index) => (
            <g
              key={label}
              style={{ "--process-index": index } as CSSProperties}
              transform={`translate(${x} ${y})`}
            >
              <circle r="7" />
              <text textAnchor="middle" y="-16">
                {label}
              </text>
            </g>
          ))}
        </g>
        <g className={styles.topologyPaths}>
          {topologyPaths.map((path, index) => (
            <path
              d={path}
              key={path}
              pathLength="1"
              style={{ "--path-index": index } as CSSProperties}
            />
          ))}
        </g>
        <g className={styles.topologyNodes}>
          {[
            [54, 150],
            [54, 310],
            [54, 720],
            [1546, 148],
            [1546, 326],
            [1546, 718],
            [386, 60],
            [1214, 60],
            [800, 450],
          ].map(([cx, cy], index) => (
            <circle
              cx={cx}
              cy={cy}
              key={`${cx}-${cy}`}
              r={index === 8 ? 6 : 4}
              style={{ "--node-index": index } as CSSProperties}
            />
          ))}
        </g>
      </svg>

      <div aria-hidden="true" className={styles.logoCore}>
        <svg className={styles.convergence} viewBox="0 0 420 420">
          <path className={styles.coreAxis} d="M28 210H392M210 28V392" pathLength="1" />
          <path className={styles.coreArc} d="M70 258C118 104 302 104 350 258" pathLength="1" />
          <g className={styles.coreNodes}>
            <circle cx="112" cy="112" r="4" />
            <circle cx="308" cy="112" r="4" />
            <circle cx="308" cy="308" r="4" />
            <circle cx="112" cy="308" r="4" />
          </g>
        </svg>
        <div className={styles.logoAperture}>
          <span className={styles.logoScan} />
          <Image alt="" height={190} priority src={logoPath} width={190} />
        </div>
        <div className={styles.readyState}>
          <i />
          <span>CONTROL LAYER</span>
          <strong>READY</strong>
        </div>
      </div>

      <div aria-hidden="true" className={styles.telemetryBar}>
        <span>LAT 24.7136</span>
        <span>LONG 46.6753</span>
        <span>QUEUE 000</span>
        <span>HEALTH 100%</span>
        <span>RUNTIME STABLE</span>
      </div>

      <button className={styles.skip} onClick={finishIntro} type="button">
        {isArabic ? "تخط" : "Skip"}
      </button>
    </div>
  );
}
