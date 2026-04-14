type SectionTitleProps = {
  primary: string;
  outline: string;
  className?: string;
};

export function SectionTitle({
  primary,
  outline,
  className = "",
}: SectionTitleProps) {
  return (
    <h2
      className={`font-display text-[clamp(2rem,4vw,3.25rem)] font-bold uppercase leading-none tracking-[-0.04em] ${className}`}
    >
      {primary} <span className="outline-copy">{outline}</span>
    </h2>
  );
}
