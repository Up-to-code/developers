import Link from "next/link";
import { ChevronLeft, Book, FileText, Code, Share2 } from "lucide-react";

export default function DocsPage() {
    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[repeating-linear-gradient(to_right,var(--border)_1px,transparent_1px),repeating-linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:20px_20px]" />

            <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md px-8 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--subtle)] hover:text-[var(--foreground)] transition-colors">
                    <ChevronLeft className="h-3 w-3" />
                    Back to Home
                </Link>
                <div className="flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--subtle)]/60">Documentation v2.0</span>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-8 py-20 space-y-20">
                <section className="space-y-6">
                    <h1 className="text-5xl font-black tracking-tighter">Everything in one bucket.</h1>
                    <p className="text-xl text-[var(--subtle)] leading-relaxed">
                        Welcome to the Anan AI Developer Documentation. Our platform is designed as a unified system for Real Estate Developers to digitize their entire workflow.
                    </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        {
                            title: "Property Creation",
                            desc: "Automate the transition from raw data to structured property listings.",
                            icon: Book
                        },
                        {
                            title: "PDF Synthesis",
                            desc: "Generate professional marketing brochures and architectural profiles instantly.",
                            icon: FileText
                        },
                        {
                            title: "Broker Network",
                            desc: "Build bridges between your developments and a global network of agencies.",
                            icon: Share2
                        },
                        {
                            title: "Developer API",
                            desc: "Integrate our 'One Chat' capabilities into your own custom platforms.",
                            icon: Code
                        }
                    ].map(item => (
                        <div key={item.title} className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 space-y-4 hover:border-[var(--primary)]/30 transition-all">
                            <div className="h-10 w-10 rounded-2xl bg-[var(--surface-soft)] flex items-center justify-center text-[var(--subtle)]">
                                <item.icon className="h-5 w-5" />
                            </div>
                            <h3 className="text-xl font-bold">{item.title}</h3>
                            <p className="text-sm text-[var(--subtle)] leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <section className="pt-20 border-t border-[var(--border)] space-y-8">
                    <h2 className="text-2xl font-black">Production Integration</h2>
                    <div className="bg-zinc-900 rounded-3xl p-8 overflow-hidden relative">
                        <div className="flex gap-2 mb-6">
                            <div className="h-2 w-2 rounded-full bg-red-400" />
                            <div className="h-2 w-2 rounded-full bg-amber-400" />
                            <div className="h-2 w-2 rounded-full bg-green-400" />
                        </div>
                        <pre className="font-mono text-[11px] leading-relaxed text-zinc-400">
                            {`// Initialize the Developer Bucket
const anan = await Anan.init({
  apiKey: process.env.ANAN_API_KEY,
  sector: "REAL_ESTATE"
});

// Draft a property via Chat Intent
await anan.process("Create a penthouse listing for Burj Vista Unit 702");

// Synthesize PDF Marketing Assets
const brochure = await anan.assets.generatePDF({
  type: "BROCHURE_PREMIUM",
  unit: "702"
});`}
                        </pre>
                    </div>
                </section>
            </main>
        </div>
    );
}
