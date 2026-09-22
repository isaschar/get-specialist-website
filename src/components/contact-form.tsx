"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { applyPlaceholders, legalPlaceholders } from "@/lib/placeholders";
import { btnPrimary, fieldClass } from "@/lib/ui";

export function ContactForm() {
  const t = useTranslations("contact");
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("client");

  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        if (!name.trim() || !email.trim() || message.trim().length < 8) return;
        setSent(true);
      }}
    >
      <label className="grid gap-1 text-sm font-semibold">
        {t("name")}
        <input className={fieldClass} value={name} onChange={(event) => setName(event.target.value)} required />
      </label>
      <label className="grid gap-1 text-sm font-semibold">
        {t("email")}
        <input className={fieldClass} type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
      </label>
      <label className="grid gap-1 text-sm font-semibold">
        {t("role")}
        <select className={fieldClass} value={role} onChange={(event) => setRole(event.target.value)}>
          <option value="client">{t("client")}</option>
          <option value="pro">{t("pro")}</option>
          <option value="other">{t("other")}</option>
        </select>
      </label>
      <label className="grid gap-1 text-sm font-semibold">
        {t("message")}
        <textarea className={fieldClass} rows={5} value={message} onChange={(event) => setMessage(event.target.value)} required minLength={8} />
      </label>
      <button type="submit" className={btnPrimary}>
        {t("send")}
      </button>
      {sent && (
        <p className="rounded-2xl bg-[#E6F7FD] p-4 text-sm font-semibold text-sea" role="status">
          {t("success")}
        </p>
      )}
      <p className="text-sm leading-relaxed text-ink/70">
        {applyPlaceholders(t("emails"))}{" "}
        <span className="font-mono text-sea">{legalPlaceholders.SUPPORT_EMAIL}</span>
        {" · "}
        <span className="font-mono text-sea">{legalPlaceholders.PRIVACY_EMAIL}</span>
      </p>
    </form>
  );
}
