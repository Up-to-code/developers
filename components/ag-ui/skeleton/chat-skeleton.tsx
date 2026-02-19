export function ChatSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className={index % 2 === 0 ? "flex items-start gap-3" : "flex justify-end"}
        >
          {index % 2 === 0 ? <div className="h-8 w-8 rounded-xl bg-black/10 animate-pulse" /> : null}
          <div
            className={
              index % 2 === 0
                ? "h-12 w-full max-w-md rounded-2xl bg-black/10 animate-pulse"
                : "h-12 w-full max-w-sm rounded-2xl bg-black/10 animate-pulse"
            }
          />
        </div>
      ))}
    </div>
  );
}
