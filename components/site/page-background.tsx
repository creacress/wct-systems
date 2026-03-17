/**
 * Animated page backgrounds — one per service universe.
 * Pure CSS animations, absolute positioned, z-index -10.
 * Hidden on mobile, respects prefers-reduced-motion via .page-bg-animated class.
 */

type BackgroundVariant =
  | "default"
  | "radar"
  | "grid-iso"
  | "circuit"
  | "neural"
  | "tron"
  | "minimal";

export function PageBackground({ variant = "default" }: { variant?: BackgroundVariant }) {
  return (
    <div
      className="page-bg-animated pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden md:block"
      aria-hidden
    >
      {variant === "radar" && <RadarBg />}
      {variant === "grid-iso" && <GridIsoBg />}
      {variant === "circuit" && <CircuitBg />}
      {variant === "neural" && <NeuralBg />}
      {variant === "tron" && <TronBg />}
    </div>
  );
}

/* ── Radar: concentric pulsing circles (Prospection IA / emerald) ── */
function RadarBg() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border border-emerald-500/[0.08] dark:border-emerald-400/[0.06]"
          style={{
            width: `${i * 220}px`,
            height: `${i * 220}px`,
            animation: `pulse-ring ${3 + i * 0.5}s ease-out infinite`,
            animationDelay: `${i * 0.8}s`,
          }}
        />
      ))}
      {/* Sweep line */}
      <div
        className="absolute h-[440px] w-px origin-bottom bg-gradient-to-t from-emerald-500/20 to-transparent"
        style={{ animation: "radar-sweep 6s linear infinite" }}
      />
    </div>
  );
}

/* ── Grid Iso: perspective grid with glowing dots (Site Web / sky) ── */
function GridIsoBg() {
  return (
    <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="iso-grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0L0 48M0 0l48 48" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-sky-500/[0.07] dark:text-sky-400/[0.05]" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#iso-grid)" />
      {/* Glowing intersection dots */}
      {[
        [120, 96], [264, 192], [408, 96], [168, 288], [360, 336],
        [72, 384], [312, 432], [504, 240], [456, 384], [216, 480],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="2"
          className="fill-sky-500/30 dark:fill-sky-400/20"
          style={{
            animation: `neural-pulse ${2 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
    </svg>
  );
}

/* ── Circuit: horizontal/vertical lines with traveling pulses (Automatisation / amber) ── */
function CircuitBg() {
  const lines = [
    { x1: 0, y1: 80, x2: 600, y2: 80 },
    { x1: 200, y1: 0, x2: 200, y2: 500 },
    { x1: 0, y1: 240, x2: 500, y2: 240 },
    { x1: 400, y1: 0, x2: 400, y2: 600 },
    { x1: 0, y1: 400, x2: 700, y2: 400 },
    { x1: 100, y1: 0, x2: 100, y2: 400 },
    { x1: 0, y1: 160, x2: 400, y2: 160 },
    { x1: 300, y1: 100, x2: 300, y2: 500 },
  ];

  return (
    <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
      {lines.map((l, i) => (
        <line
          key={i}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          className="stroke-amber-500/[0.06] dark:stroke-amber-400/[0.04]"
          strokeWidth="1"
        />
      ))}
      {/* Traveling pulses */}
      {lines.slice(0, 5).map((l, i) => (
        <circle key={`p${i}`} r="3" className="fill-amber-500/30 dark:fill-amber-400/20">
          <animateMotion
            dur={`${4 + i}s`}
            repeatCount="indefinite"
            path={`M${l.x1},${l.y1} L${l.x2},${l.y2}`}
            begin={`${i * 0.7}s`}
          />
        </circle>
      ))}
    </svg>
  );
}

/* ── Neural: nodes with connections (Intégration IA / fuchsia) ── */
function NeuralBg() {
  const nodes = [
    [80, 120], [220, 60], [350, 140], [480, 80], [150, 250],
    [300, 300], [450, 220], [100, 400], [250, 450], [400, 380],
    [550, 320], [180, 150], [520, 160], [70, 300], [370, 480],
  ];

  const connections = [
    [0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [5, 6], [3, 6],
    [7, 8], [8, 9], [9, 10], [5, 9], [4, 7], [6, 10],
    [11, 1], [12, 3], [13, 7], [14, 9],
  ];

  return (
    <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
      {connections.map(([a, b], i) => (
        <line
          key={`c${i}`}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          className="stroke-fuchsia-500/[0.06] dark:stroke-fuchsia-400/[0.04]"
          strokeWidth="1"
        />
      ))}
      {nodes.map(([cx, cy], i) => (
        <circle
          key={`n${i}`}
          cx={cx}
          cy={cy}
          r="3"
          className="fill-fuchsia-500/20 dark:fill-fuchsia-400/15"
          style={{
            animation: `neural-pulse ${2 + (i % 4) * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}
    </svg>
  );
}

/* ── Tron: perspective grid floor (Digital Workplace / cyan) ── */
function TronBg() {
  return (
    <div className="absolute inset-0" style={{ perspective: "600px" }}>
      <div
        className="absolute inset-x-0 bottom-0 h-[60%] origin-bottom"
        style={{ transform: "rotateX(60deg)" }}
      >
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="tron-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M60 0L60 60M0 60L60 60"
                stroke="currentColor"
                strokeWidth="0.5"
                fill="none"
                className="text-cyan-400/[0.1] dark:text-cyan-400/[0.07]"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tron-grid)" />
        </svg>
        {/* Glowing lines */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
            style={{
              top: `${30 + i * 25}%`,
              animation: `glow-pulse ${3 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
