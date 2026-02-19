import Image from "next/image";
import { ShieldCheck } from "lucide-react";

type ProfileCardProps = {
  displayName: string;
  image?: string | null;
};

export function ProfileCard({ displayName, image }: ProfileCardProps) {
  return (
    <aside className="rounded-3xl border border-black/5 bg-white/60 p-5 text-center">
      <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-[1.6rem] bg-black text-white">
        {image ? (
          <Image src={image} alt="User" fill sizes="96px" className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-3xl font-black">
            {displayName[0]?.toUpperCase() ?? "A"}
          </div>
        )}
        <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-white bg-emerald-500 text-white">
          <ShieldCheck className="h-4 w-4" />
        </div>
      </div>

      <h2 className="mt-4 text-lg font-black text-slate-900">{displayName}</h2>
      <p className="mt-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Developer Admin</p>
    </aside>
  );
}
