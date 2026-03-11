interface FloatingOrbsProps {
  className?: string;
  colors?: [string, string, string];
}

export default function FloatingOrbs({
  className = "",
  colors = ["violet", "cyan", "indigo"],
}: FloatingOrbsProps) {
  const orbs = [
    { size: "h-72 w-72", pos: "top-0 -left-20", delay: "0s", color: colors[0] },
    { size: "h-56 w-56", pos: "-top-10 right-10", delay: "2s", color: colors[1] },
    { size: "h-64 w-64", pos: "bottom-20 left-1/3", delay: "4s", color: colors[2] },
  ];

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
      {orbs.map((o, i) => (
        <div
          key={i}
          className={`absolute ${o.size} ${o.pos} animate-orb-float rounded-full bg-${o.color}-500/[0.06] blur-3xl`}
          style={{ animationDelay: o.delay }}
        />
      ))}
    </div>
  );
}
