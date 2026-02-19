export function ActionSkeleton() {
    return (
        <div className="w-full max-w-sm rounded-[2.5rem] bg-white/40 p-6 backdrop-blur-2xl">
            <div className="mb-4 h-6 w-1/3 rounded-lg bg-black/10 animate-pulse" />
            <div className="space-y-3">
                <div className="h-4 w-full rounded-md bg-black/5 animate-pulse" />
                <div className="h-4 w-3/4 rounded-md bg-black/5 animate-pulse" />
                <div className="h-4 w-1/2 rounded-md bg-black/5 animate-pulse" />
            </div>
            <div className="mt-6 flex gap-3">
                <div className="h-10 flex-1 rounded-xl bg-black/10 animate-pulse" />
                <div className="h-10 flex-1 rounded-xl bg-black/5 animate-pulse" />
            </div>
        </div>
    );
}
