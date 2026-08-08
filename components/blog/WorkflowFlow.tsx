import { ArrowDown, ArrowRight, CornerDownRight } from "lucide-react";
import { C } from "@/lib/constants";

const steps = [
  { name: "Intake", detail: "A request enters" },
  { name: "Context", detail: "Evidence is gathered" },
  { name: "AI action", detail: "A draft or signal" },
  { name: "Review", detail: "A person checks" },
  { name: "Handoff", detail: "Work moves on" },
  { name: "Outcome", detail: "The result lands" },
];

const shell = "border border-[#0F1C3F]/15 bg-[#FBFAF7]";
const label = "font-mono text-[10px] font-semibold uppercase tracking-[0.16em]";

export function WorkflowFlow() {
  return (
    <figure className={`my-10 overflow-hidden border-y ${shell} md:my-12`}>
      <div className="px-5 py-8 md:px-10 md:py-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-9">
          <div>
            <p className={label} style={{ color: C.coral }}>The complete workflow</p>
            <h3 className="mt-2 font-display text-[24px] font-semibold leading-[1.12] tracking-[-0.02em] md:text-[27px]" style={{ color: C.navy }}>
              Where did the work go?
            </h3>
          </div>
          <span className="border-b border-[#C9A84C] pb-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#586174]">
            Measure the episode
          </span>
        </div>

        <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_28px_minmax(0,1fr)_28px_minmax(0,1fr)_28px_minmax(0,1fr)_28px_minmax(0,1fr)_28px_minmax(0,1fr)] md:items-stretch">
          {steps.map((step, index) => (
            <div key={step.name} className="contents">
              <div className="relative border border-[#0F1C3F]/15 bg-white px-3 py-4 md:min-h-[112px] md:px-3 md:py-4">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0F1C3F] font-mono text-[10px] font-semibold text-white" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <strong className="mt-3 block font-sans text-[14px] font-semibold leading-tight text-[#0F1C3F]">{step.name}</strong>
                <span className="mt-1 block font-sans text-[11px] leading-snug text-[#586174]">{step.detail}</span>
              </div>
              {index < steps.length - 1 && <WorkflowConnector />}
            </div>
          ))}
        </div>

        <div className="mt-7 grid gap-3 border border-[#C9A84C]/45 bg-[#C9A84C]/10 px-4 py-3 text-[13px] leading-relaxed text-[#586174] md:grid-cols-[auto_1fr_auto] md:items-center md:gap-4">
          <CornerDownRight className="h-4 w-4 text-[#C9A84C]" aria-hidden="true" />
          <span><strong className="font-semibold text-[#0F1C3F]">The loop is part of the workflow.</strong> Exceptions, correction, and escalation can return work to review.</span>
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-[#8A8278]">Do not hide it</span>
        </div>
      </div>
      <figcaption className="border-t border-[#0F1C3F]/10 px-5 py-3 font-sans text-[12px] leading-relaxed text-[#8A8278] md:px-8">
        A pilot should measure the workflow episode, not only the AI step.
      </figcaption>
    </figure>
  );
}

function WorkflowConnector() {
  return (
    <div className="relative flex min-h-[22px] items-center justify-center text-[#C9A84C] md:min-h-0">
      <span className="absolute left-1/2 top-0 h-full border-l border-[#C9A84C]/65 md:left-0 md:top-1/2 md:h-0 md:w-full md:border-l-0 md:border-t" aria-hidden="true" />
      <ArrowRight className="relative hidden h-4 w-4 bg-[#FBFAF7] md:block" aria-hidden="true" />
      <ArrowDown className="relative h-4 w-4 bg-[#FBFAF7] md:hidden" aria-hidden="true" />
    </div>
  );
}

export function ValueBridge() {
  return (
    <figure className="my-12 overflow-hidden border border-[#0F1C3F] bg-[#0F1C3F] md:my-16">
      <div className="px-5 py-8 md:px-10 md:py-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-9">
          <div>
            <p className={`${label} text-[#E2C97A]`}>The AI Pilot Value Bridge</p>
            <h3 className="mt-2 max-w-xl font-display text-[25px] font-semibold leading-tight tracking-[-0.02em] text-white md:text-[30px]">
              Count the work created after the output.
            </h3>
          </div>
          <span className="border border-white/25 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white/65">
            Proposed model
          </span>
        </div>

        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_36px_minmax(0,1.15fr)_36px_minmax(0,1.15fr)] md:items-stretch">
          <BridgeCard label="AI-assisted task" detail="The step that gets faster" tone="quiet" />
          <BridgeArrow />
          <div className="border border-[#C9A84C] bg-[#C9A84C]/10 px-4 py-4 md:px-5 md:py-5">
            <p className={`${label} text-[#E2C97A]`}>Gross benefit</p>
            <strong className="mt-3 block font-display text-[19px] font-semibold leading-tight text-white">Speed, volume, and queue</strong>
            <p className="mt-2 text-[12px] leading-relaxed text-white/60">The gain you can see first.</p>
            <div className="mt-5 border-t border-[#C9A84C]/35 pt-3 text-[11px] text-white/70">Then account for what the output creates.</div>
          </div>
          <BridgeArrow />
          <div className="border border-[#E05A47] bg-[#E05A47]/15 px-4 py-4 md:px-5 md:py-5">
            <p className={`${label} text-[#FFE5DF]`}>Net value</p>
            <strong className="mt-3 block font-display text-[19px] font-semibold leading-tight text-white">What the business receives</strong>
            <p className="mt-2 text-[12px] leading-relaxed text-white/65">The outcome that remains after the burden.</p>
            <div className="mt-5 flex items-center gap-2 border-t border-[#E05A47]/45 pt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[#FFE5DF]">
              <span className="h-2 w-2 rounded-full bg-[#E05A47]" aria-hidden="true" /> A complete measure
            </div>
          </div>
        </div>

        <div className="mt-7 border border-white/15 bg-white/[0.03] px-4 py-4 md:mt-8 md:px-5">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className={`${label} text-white/45`}>Subtract the hidden work</p>
            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/35">The bridge only closes here</span>
          </div>
          <div className="mt-3 grid border-y border-white/10 sm:grid-cols-5 sm:divide-x sm:divide-white/10">
            {["Review", "Rework", "Exceptions", "Handoffs", "Risk + cost"].map((item) => (
              <div key={item} className="flex items-center gap-2 border-b border-white/10 py-3 text-[13px] text-white/75 last:border-b-0 sm:border-b-0 sm:px-3 sm:py-2 first:sm:pl-0 last:sm:pr-0">
                <span className="text-[#E2C97A]">−</span>{item}
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="border-t border-white/15 px-5 py-3 font-sans text-[12px] leading-relaxed text-white/50 md:px-8">
        A proposed operating model, not a universal ROI formula.
      </figcaption>
    </figure>
  );
}

function BridgeCard({ label: cardLabel, detail, tone }: { label: string; detail: string; tone: "quiet" | "gold" | "coral" }) {
  const tones = {
    quiet: "border-white/20 bg-white/[0.03]",
    gold: "border-[#C9A84C] bg-[#C9A84C]/10",
    coral: "border-[#E05A47] bg-[#E05A47]/15",
  };
  return (
    <div className={`border px-4 py-4 md:px-5 md:py-5 ${tones[tone]}`}>
      <p className={`${label} ${tone === "coral" ? "text-[#FFE5DF]" : tone === "gold" ? "text-[#E2C97A]" : "text-white/45"}`}>{cardLabel}</p>
      <strong className="mt-3 block font-display text-[19px] font-semibold leading-tight text-white">{detail}</strong>
      <span className="mt-2 block font-sans text-[12px] leading-relaxed text-white/55">{tone === "quiet" ? "The step that gets faster" : tone === "gold" ? "The gain you can see first" : "What the business receives"}</span>
    </div>
  );
}

function BridgeArrow() {
  return (
    <div className="relative flex min-h-[24px] items-center justify-center text-[#E2C97A] md:min-h-0">
      <span className="absolute left-1/2 top-0 h-full border-l border-white/20 md:left-0 md:top-1/2 md:h-0 md:w-full md:border-l-0 md:border-t" aria-hidden="true" />
      <ArrowRight className="relative hidden h-4 w-4 bg-[#0F1C3F] md:block" aria-hidden="true" />
      <ArrowDown className="relative h-4 w-4 bg-[#0F1C3F] md:hidden" aria-hidden="true" />
    </div>
  );
}

const reviewRows = [
  { consequence: "Low consequence", reversibility: "Easy to reverse", control: "Sample or spot-check", direction: "Named review" },
  { consequence: "Moderate consequence", reversibility: "Easy to reverse", control: "Targeted approval", direction: "Qualified owner approval" },
  { consequence: "High consequence", reversibility: "Any reversibility", control: "Human decision owner", direction: "No autonomous action" },
];

export function ReviewMatrix() {
  return (
    <figure className="my-10 border-y border-[#0F1C3F]/15 bg-[#FBFAF7] md:my-12">
      <div className="px-5 py-8 md:px-10 md:py-10">
        <div className="mb-10 md:mb-12">
          <p className={`${label} text-[#6A8A9E]`}>The review boundary</p>
          <h3 className="mt-2 max-w-2xl font-display text-[25px] font-semibold leading-tight tracking-[-0.02em] text-[#0F1C3F]">
            Review should follow consequence and reversibility.
          </h3>
        </div>

        <div className="hidden overflow-hidden border-y border-[#0F1C3F]/15 md:block">
          <div className="grid grid-cols-4 bg-[#F0EDE5] font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[#586174]">
            <div className="px-4 py-3.5">Consequence</div><div className="px-4 py-3.5">Reversibility</div><div className="px-4 py-3.5">Default control</div><div className="px-4 py-3.5">Direction</div>
          </div>
          {reviewRows.map((row) => (
            <div key={row.consequence} className="grid grid-cols-4 border-t border-[#0F1C3F]/10 text-[13px] leading-relaxed">
              <div className="px-4 py-4 font-semibold text-[#0F1C3F]">{row.consequence}</div><div className="px-4 py-4 text-[#586174]">{row.reversibility}</div><div className="px-4 py-4 text-[#586174]">{row.control}</div><div className="px-4 py-4 text-[#586174]">{row.direction}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-4 md:hidden">
          {reviewRows.map((row) => (
            <div key={row.consequence} className="border-l-2 border-[#C9A84C] bg-white px-5 py-5">
              <p className="font-sans text-[15px] font-semibold text-[#0F1C3F]">{row.consequence}</p>
              <dl className="mt-3 grid gap-2 text-[13px] leading-relaxed">
                <div><dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#8A8278]">Reversibility</dt><dd className="text-[#586174]">{row.reversibility}</dd></div>
                <div><dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#8A8278]">Default control</dt><dd className="text-[#586174]">{row.control}</dd></div>
                <div><dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#8A8278]">Direction</dt><dd className="font-semibold text-[#0F1C3F]">{row.direction}</dd></div>
              </dl>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="border-t border-[#0F1C3F]/10 px-5 py-3 font-sans text-[12px] leading-relaxed text-[#8A8278] md:px-8">
        This is a proposed operating model, not a legal classification. Thresholds require local workflow validation.
      </figcaption>
    </figure>
  );
}

const metricRows = [
  ["01", "Task", "Time, throughput, and queue"],
  ["02", "Quality", "Acceptance, correction, and rework"],
  ["03", "Downstream", "Resolution, defects, and cash"],
  ["04", "Burden + downside", "Review, escalation, and recovery"],
];

export function MetricGrid() {
  return (
    <div className="my-10 border-y border-[#0F1C3F]/15 md:my-12">
      {metricRows.map(([number, title, detail]) => (
        <div key={title} className="grid gap-3 border-b border-[#0F1C3F]/10 py-5 last:border-b-0 sm:grid-cols-[48px_1fr_1.4fr] sm:items-baseline sm:gap-6">
          <span className="font-mono text-[11px] font-semibold text-[#C9A84C]">{number}</span>
          <h4 className="font-display text-[20px] font-semibold text-[#0F1C3F]">{title}</h4>
          <p className="font-sans text-[14px] leading-relaxed text-[#586174]">{detail}</p>
        </div>
      ))}
    </div>
  );
}

export function EditorialCallout({ children, type = "tip" }: { children: React.ReactNode; type?: "info" | "warning" | "tip" }) {
  const colors = { info: "border-[#0F1C3F] bg-[#0F1C3F]/5", warning: "border-[#E05A47] bg-[#E05A47]/5", tip: "border-[#C9A84C] bg-[#C9A84C]/10" };
  return <aside className={`my-10 border-l-2 p-5 md:p-6 ${colors[type]}`}><div className="font-sans text-[16px] leading-[1.75] text-[#0F1C3F]">{children}</div></aside>;
}

