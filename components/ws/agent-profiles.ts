export type AgentProfileId =
  | "orchestrator"
  | "deep-search"
  | "property-ops"
  | "market-analyst"
  | "legal-compliance";

export type AgentProfile = {
  id: AgentProfileId;
  title: string;
  description: string;
  category: "general" | "research" | "real-estate";
  promptPrefix?: string;
};

export const DEFAULT_AGENT_PROFILE_ID: AgentProfileId = "orchestrator";

export const AGENT_PROFILES: AgentProfile[] = [
  {
    id: "orchestrator",
    title: "Agent Orchestrator",
    description: "إدارة المحادثة متعددة الأدوات وتنسيق خطوات التنفيذ.",
    category: "general",
  },
  {
    id: "deep-search",
    title: "Deep Search",
    description: "تحليل بحثي عميق للمصادر الخارجية قبل اتخاذ القرار.",
    category: "research",
    promptPrefix:
      "[profile:deep-search] افترض أن المطلوب بحث عميق. قدّم الفرضيات، الأدلة، ثم توصية تنفيذية واضحة.",
  },
  {
    id: "property-ops",
    title: "Property Profile",
    description: "تشغيل وإنشاء وتحديث العقارات وسير العمل التشغيلي.",
    category: "real-estate",
    promptPrefix:
      "[profile:property-ops] ركّز على عمليات العقار: إنشاء، تعديل، حالة الوحدة، والتأكيد قبل التنفيذ.",
  },
  {
    id: "market-analyst",
    title: "Market Analyst",
    description: "تحليل مؤشرات السوق العقاري مع قرارات قابلة للتنفيذ.",
    category: "real-estate",
    promptPrefix:
      "[profile:market-analyst] قدّم ملخصًا رقميًا للعرض والطلب والسعر مع أفضل 3 توصيات.",
  },
  {
    id: "legal-compliance",
    title: "Legal Compliance",
    description: "تدقيق الالتزامات النظامية والمخاطر التعاقدية.",
    category: "real-estate",
    promptPrefix:
      "[profile:legal-compliance] تحقّق من التوافق النظامي والعقود، واذكر المخاطر بنمط واضح.",
  },
];

export function resolveAgentProfile(
  profileId: string | null | undefined,
): AgentProfile {
  if (!profileId) {
    return AGENT_PROFILES[0];
  }

  return (
    AGENT_PROFILES.find((profile) => profile.id === profileId) ?? AGENT_PROFILES[0]
  );
}
