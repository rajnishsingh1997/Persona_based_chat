export default function TypingIndicator({
  bubble = true,
  avatar = null,
  dotSize = 8, // px
  dotGap = 6, // px
  className = "",
  bubbleClassName = "",
}) {
  const dotPx = `${dotSize}px`;
  const gapPx = `${dotGap}px`;

  const Dot = ({ delay = 0 }) => (
    <span
      className="inline-block rounded-full bg-gray-500/70 dark:bg-gray-300/70 animate-pulse"
      style={{
        width: dotPx,
        height: dotPx,
        animationDelay: `${delay}ms`,
      }}
    />
  );

  const dots = (
    <div className="flex items-center" style={{ gap: gapPx }} aria-hidden>
      <Dot delay={0} />
      <Dot delay={200} />
      <Dot delay={400} />
    </div>
  );

  return (
    <div
      className={`flex items-end gap-2 ${className}`}
      role="status"
      aria-live="polite"
    >
      {avatar}
      {bubble ? (
        <div
          className={`max-w-[60%] rounded-2xl bg-gray-100 text-gray-700 dark:bg-gray-400 dark:text-gray-100 shadow-sm px-8 py-2 ${bubbleClassName}`}
        >
          {dots}
          <span className="sr-only">Typing…</span>
        </div>
      ) : (
        <>
          {dots}
          <span className="sr-only">Typing…</span>
        </>
      )}
    </div>
  );
}
