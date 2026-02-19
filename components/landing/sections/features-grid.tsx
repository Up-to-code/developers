const LANDING_FEATURES = [
  {
    title: "تحليل السوق",
    desc: "تقارير تعتمد على بيانات السوق الحالية لتحليل العوائد والفرص الاستثمارية.",
    icon: "📊",
  },
  {
    title: "إدارة العقود",
    desc: "مراجعة ذكية للعقود القانونية وضمان توافقها مع القوانين المحلية.",
    icon: "⚖️",
  },
  {
    title: "أتمتة العمليات",
    desc: "أتمتة المهام اليومية لفرق المبيعات والتشغيل بفاعلية عالية.",
    icon: "🤖",
  },
] as const;

export function LandingFeaturesGrid() {
  return (
    <section className="space-y-12">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-black tracking-tight md:text-5xl">قدرات ذكاء اصطناعي عقارية</h2>
        <p className="text-lg font-bold text-[var(--subtle)]">أدوات متخصصة لمطوري العقارات والمستثمرين</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {LANDING_FEATURES.map((feature) => (
          <div key={feature.title} className="group relative overflow-hidden rounded-[2.5rem] p-10 transition-all">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[1.2rem] bg-black text-3xl text-white shadow-2xl transition-transform group-hover:rotate-6">
              {feature.icon}
            </div>
            <h3 className="mb-4 text-2xl font-black">{feature.title}</h3>
            <p className="leading-relaxed font-bold text-[var(--subtle)]">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
