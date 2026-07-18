"use client";
import { useState } from "react";
import { Send, Check } from "lucide-react";
import { SITE } from "@/lib/site";

const fieldCls =
  "mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 font-body text-white outline-none transition-colors placeholder-white/45 focus:border-white/60 focus:bg-white/15";
const labelCls = "font-heading text-[11px] font-bold uppercase tracking-wider text-white/70";

export default function KontaktForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  // No backend yet: compose a pre-filled email the visitor sends from their own
  // mail client. TODO(client): wire to a real form endpoint if desired.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullName = `${form.firstName} ${form.lastName}`.trim();
    const subject = encodeURIComponent(`Прашање од ${fullName || "клиент"} — мотоцикли`);
    const body = encodeURIComponent(
      `Име: ${fullName}\nЕ-пошта: ${form.email}\nТелефон: ${form.phone}\n\nПорака:\n${form.message}`
    );
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit}>
      {/* Horizontal field grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className={labelCls}>Име</label>
          <input required value={form.firstName} onChange={set("firstName")} className={fieldCls} placeholder="Твоето име" />
        </div>
        <div>
          <label className={labelCls}>Презиме</label>
          <input required value={form.lastName} onChange={set("lastName")} className={fieldCls} placeholder="Твоето презиме" />
        </div>
        <div>
          <label className={labelCls}>Е-пошта</label>
          <input required type="email" value={form.email} onChange={set("email")} className={fieldCls} placeholder="ime@email.com" />
        </div>
        <div>
          <label className={labelCls}>Телефон</label>
          <input required value={form.phone} onChange={set("phone")} className={fieldCls} placeholder="07X XXX XXX" />
        </div>
      </div>

      {/* Message + submit row */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <label className={labelCls}>Порака</label>
          <textarea
            required
            value={form.message}
            onChange={set("message")}
            rows={3}
            className={`${fieldCls} resize-none`}
            placeholder="За кој модел си заинтересиран/а?"
          />
        </div>
        <button
          type="submit"
          className="inline-flex h-[3.25rem] items-center justify-center gap-2 rounded-full bg-red px-8 font-heading font-bold text-white transition-all hover:bg-red-light hover:-translate-y-0.5 lg:mb-px"
        >
          {sent ? <><Check size={18} /> Испратено</> : <><Send size={18} /> Прати порака</>}
        </button>
      </div>

      <p className="mt-4 font-body text-xs text-white/55">
        Или јави се директно на{" "}
        <a href={SITE.phoneHref} className="font-semibold text-white underline-offset-2 hover:underline">
          {SITE.phone}
        </a>
      </p>
    </form>
  );
}
