interface GridPatternProps {
  className?: string;
  variant?: "dot" | "line" | "iso";
  color?: string;
}

export default function GridPattern({
  className = "",
  variant = "dot",
  color = "rgba(139, 92, 246, 0.08)",
}: GridPatternProps) {
  const patterns: Record<string, string> = {
    dot: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
    line: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
    iso: `linear-gradient(30deg, ${color} 12%, transparent 12.5%, transparent 87%, ${color} 87.5%, ${color}), linear-gradient(150deg, ${color} 12%, transparent 12.5%, transparent 87%, ${color} 87.5%, ${color}), linear-gradient(30deg, ${color} 12%, transparent 12.5%, transparent 87%, ${color} 87.5%, ${color}), linear-gradient(150deg, ${color} 12%, transparent 12.5%, transparent 87%, ${color} 87.5%, ${color})`,
  };

  const sizes: Record<string, string> = {
    dot: "24px 24px",
    line: "48px 48px, 48px 48px",
    iso: "80px 140px, 80px 140px, 80px 140px, 80px 140px",
  };

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 ${className}`}
      style={{
        backgroundImage: patterns[variant],
        backgroundSize: sizes[variant],
      }}
    />
  );
}
