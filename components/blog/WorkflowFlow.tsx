import { ArrowRight, CornerDownRight } from "lucide-react";
import { C } from "@/lib/constants";

const steps = ["Intake", "Context", "AI action", "Review", "Handoff", "Outcome"];

export function WorkflowFlow() {
  return (
    <figure className="my-10 rounded-2xl border border-[#0F1C3F]/10 bg-white p-5 shadow-[0_14px_40px_rgba(15,28,63,0.08)] md:p-7">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: C.coral }}>The complete workflow</p>
          <p className="mt-1 font-display text-xl font-semibold" style={{ color: C.navy }}>Where did the work go?</p>
        </div>
        <span className="rounded-full bg-[#F5F2EC] px-3 py-1 font-mono text-[11px] text-[#586174]">Measure the chain</span>
      </div>
      <div className="grid gap-2 md:grid-cols-6 md:items-center">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-2 md:block">
            <div className="flex min-h-[58px] flex-1 items-center justify-center rounded-xl border border-[#0F1C3F]/10 bg-[#FBFAF7] px-3 text-center font-sans text-sm font-semibold text-[#0F1C3F]">
              <span className="mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0F1C3F] font-mono text-[10px] text-white md:hidden">{index + 1}</span>
              {step}
            </div>
            {index < steps.length - 1 ? <ArrowRight className="h-4 w-4 shrink-0 text-[#6A8A9E] md:mx-auto md:mt-2" aria-hidden="true" /> : null}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-start gap-2 rounded-xl border border-[#C9A84C]/30 bg-[#C9A84C]/10 px-4 py-3 text-sm text-[#586174]">
        <CornerDownRight className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A84C]" aria-hidden="true" />
        <span>Exceptions, correction, and escalation can send work back into review.</span>
      </div>
      <figcaption className="mt-4 text-center font-sans text-xs leading-relaxed text-[#8A8278]">A pilot should measure the workflow episode, not only the AI step.</figcaption>
    </figure>
  );
}

export function ValueBridge() {
  return (
    <figure className="my-10 overflow-hidden rounded-2xl border border-[#0F1C3F]/10 bg-[#0F1C3F] shadow-[0_18px_48px_rgba(15,28,63,0.16)]">
      <div className="p-5 md:p-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9FE8CF]">The AI Pilot Value Bridge</p>
            <p className="mt-2 max-w-xl font-display text-2xl font-semibold leading-tight text-white md:text-3xl">Count the work created after the output.</p>
          </div>
          <span className="rounded-full border border-white/15 px-3 py-1 font-mono text-[11px] text-white/60">Proposed model</span>
        </div>
        <div className="grid gap-3 md:grid-cols-[1fr_auto_1.25fr_auto_1fr] md:items-stretch">
          <BridgeCard label="AI-assisted task" detail="The step that gets faster" tone="navy" />
          <BridgeArrow />
          <BridgeCard label="Gross task benefit" detail="Speed, volume, and queue" tone="green" />
          <BridgeArrow />
          <BridgeCard label="Net downstream value" detail="What the business receives" tone="coral" />
        </div>
        <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">Subtract the hidden work</p>
          <div className="grid gap-2 text-sm text-white/75 sm:grid-cols-2 lg:grid-cols-5">
            {['Review', 'Rework', 'Exceptions', 'Handoffs', 'Risk + cost'].map((item) => <span key={item} className="rounded-lg bg-white/10 px-3 py-2">Less {item}</span>)}
          </div>
        </div>
      </div>
      <figcaption className="border-t border-white/10 px-5 py-3 text-center font-sans text-xs leading-relaxed text-white/50 md:px-8">A proposed operating model, not a universal ROI formula.</figcaption>
    </figure>
  );
}

function BridgeCard({ label, detail, tone }: { label: string; detail: string; tone: 'navy' | 'green' | 'coral' }) {
  const styles = { navy: 'border-white/15 bg-white/10', green: 'border-[#00CC88]/50 bg-[#00CC88]/15', coral: 'border-[#E05A47]/60 bg-[#E05A47]/20' };
  return <div className={`flex min-h-[112px] flex-col justify-center rounded-xl border p-4 ${styles[tone]}`}><strong className="font-display text-lg leading-tight text-white">{label}</strong><span className="mt-2 text-xs text-white/55">{detail}</span></div>;
}
function BridgeArrow() { return <div className="flex items-center justify-center text-[#E2C97A] md:px-1"><ArrowRight className="hidden h-5 w-5 md:block" aria-hidden="true" /><span className="md:hidden">↓</span></div>; }

export function ReviewMatrix() {
  const rows = [
    ['Low consequence', 'Easy to reverse', 'Sample or spot-check', 'Difficult to reverse', 'Named review'],
    ['Moderate consequence', 'Easy to reverse', 'Targeted approval', 'Difficult to reverse', 'Qualified owner approval'],
    ['High consequence', 'Any reversibility', 'Human decision owner', 'Any reversibility', 'No autonomous action'],
  ];
  return <figure className="my-10 rounded-2xl border border-[#0F1C3F]/10 bg-white p-5 shadow-[0_14px_40px_rgba(15,28,63,0.08)] md:p-7">
    <div className="mb-6"><p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6A8A9E]">The review boundary</p><p className="mt-2 font-display text-2xl font-semibold text-[#0F1C3F]">Review should follow consequence and reversibility.</p></div>
    <div className="hidden overflow-hidden rounded-xl border border-[#0F1C3F]/10 md:block"><div className="grid grid-cols-5 bg-[#F5F2EC] text-xs font-semibold text-[#0F1C3F]"><div className="p-3">Consequence</div><div className="p-3">Reversibility</div><div className="col-span-2 p-3">Default control</div><div className="p-3">Direction</div></div>{rows.map((row) => <div key={row.join('-')} className="grid grid-cols-5 border-t border-[#0F1C3F]/10 text-sm"><div className="p-3 font-semibold text-[#0F1C3F]">{row[0]}</div><div className="p-3 text-[#586174]">{row[1]}</div><div className="col-span-2 p-3 text-[#586174]">{row[2]}</div><div className="p-3 text-[#586174]">{row[4]}</div></div>)}</div>
    <div className="grid gap-3 md:hidden">{rows.map((row) => <div key={row.join('-')} className="rounded-xl border border-[#0F1C3F]/10 bg-[#FBFAF7] p-4"><p className="font-semibold text-[#0F1C3F]">{row[0]}</p><p className="mt-2 text-sm text-[#586174]">{row[1]}</p><p className="mt-3 text-sm font-semibold text-[#6A8A9E]">{row[2]}</p></div>)}</div>
    <figcaption className="mt-4 text-center font-sans text-xs leading-relaxed text-[#8A8278]">This is a proposed operating model, not a legal classification. Thresholds require local workflow validation.</figcaption>
  </figure>;
}

export function MetricGrid() {
  const cards = [['Task', 'Time, throughput, and queue'], ['Quality', 'Acceptance, correction, and rework'], ['Downstream', 'Resolution, defects, and cash'], ['Burden + downside', 'Review, escalation, and recovery']];
  return <div className="my-10 grid gap-3 sm:grid-cols-2">{cards.map(([title, detail], i) => <div key={title} className="rounded-xl border border-[#0F1C3F]/10 bg-white p-5 shadow-sm"><span className="font-mono text-[11px] text-[#6A8A9E]">0{i + 1}</span><h4 className="mt-2 font-display text-xl font-semibold text-[#0F1C3F]">{title}</h4><p className="mt-2 text-sm leading-relaxed text-[#586174]">{detail}</p></div>)}</div>;
}

export function EditorialCallout({ children, type = 'tip' }: { children: React.ReactNode; type?: 'info' | 'warning' | 'tip' }) {
  const colors = { info: 'border-[#0F1C3F] bg-[#0F1C3F]/5', warning: 'border-[#E05A47] bg-[#E05A47]/5', tip: 'border-[#C9A84C] bg-[#C9A84C]/10' };
  return <aside className={`my-10 rounded-xl border-l-4 p-5 md:p-6 ${colors[type]}`}><div className="text-[16px] leading-relaxed text-[#0F1C3F]">{children}</div></aside>;
}


