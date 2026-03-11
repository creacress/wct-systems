interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <div
      className={`inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-1 text-xs font-medium uppercase tracking-wide text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300 ${className}`}
    >
      {children}
    </div>
  );
}
