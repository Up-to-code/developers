export function RailSkeleton() {
  return (
    <div className="space-y-3 p-4">
      <div className="h-10 w-full rounded-xl bg-black/10 animate-pulse" />
      <div className="h-9 w-full rounded-xl bg-black/10 animate-pulse" />
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="h-8 w-full rounded-lg bg-black/10 animate-pulse" />
      ))}
    </div>
  );
}
