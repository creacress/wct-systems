import type { ReactNode } from "react";

interface AnimatedBorderProps {
  children: ReactNode;
  className?: string;
  borderColor?: string;
}

export default function AnimatedBorder({
  children,
  className = "",
  borderColor = "from-violet-500 via-cyan-500 to-indigo-500",
}: AnimatedBorderProps) {
  return (
    <div className={`animated-border-wrapper relative rounded-3xl p-px ${className}`}>
      <div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${borderColor} opacity-50 blur-sm animate-border-rotate`}
      />
      <div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${borderColor} opacity-75 animate-border-rotate`}
      />
      <div className="relative rounded-3xl bg-background">
        {children}
      </div>
    </div>
  );
}
