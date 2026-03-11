interface GradientMeshProps {
  /** Array of color stops, e.g. ["violet", "cyan", "indigo"] */
  colors?: string[];
  className?: string;
}

const PRESETS: Record<string, string> = {
  home: "from-violet-500/10 via-cyan-500/8 to-indigo-500/6",
  "digital-workplace": "from-cyan-500/10 via-lime-400/8 to-teal-500/6",
  prospection: "from-emerald-500/10 via-green-400/8 to-teal-500/6",
  "site-web": "from-sky-500/10 via-blue-400/8 to-indigo-500/6",
  automatisation: "from-amber-500/10 via-orange-400/8 to-yellow-500/6",
  "integration-ia": "from-fuchsia-500/10 via-purple-400/8 to-pink-500/6",
  tarifs: "from-violet-500/8 via-indigo-400/6 to-slate-500/4",
};

export default function GradientMesh({
  colors,
  className = "",
}: GradientMeshProps & { preset?: string }) {
  // Accept a preset prop if no custom colors
  const preset = (className.match(/preset-(\S+)/)?.[1]) || "";
  const gradientClass = PRESETS[preset] || PRESETS.home;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${gradientClass} ${className}`}
    >
      {/* Animated mesh orbs */}
      <div className="absolute -top-1/4 -left-1/4 h-[60%] w-[60%] animate-mesh-float rounded-full bg-gradient-to-br from-violet-400/[0.07] to-transparent blur-3xl" />
      <div className="absolute -bottom-1/4 -right-1/4 h-[50%] w-[50%] animate-mesh-float-reverse rounded-full bg-gradient-to-tl from-cyan-400/[0.05] to-transparent blur-3xl" />
    </div>
  );
}
