"use client";

interface ScrollToButtonProps {
  targetId: string;
  className?: string;
  children: React.ReactNode;
}

export default function ScrollToButton({ targetId, className, children }: ScrollToButtonProps) {
  return (
    <button
      onClick={() => {
        const el = document.getElementById(targetId);
        el?.scrollIntoView({ behavior: "smooth" });
      }}
      className={className}
    >
      {children}
    </button>
  );
}
