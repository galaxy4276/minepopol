"use client";

import { motion } from "motion/react";
import type { Locale } from "@/lib/portfolioCopy";

type LocaleSwitchProps = {
  locale: Locale;
  onChange: (nextLocale: Locale) => void;
};

export default function LocaleSwitch({ locale, onChange }: LocaleSwitchProps) {
  return (
    <div
      className="locale-switch relative inline-flex items-center rounded-full border border-[var(--border)] p-1"
      role="group"
      aria-label="Language switch"
    >
      <motion.span
        className="locale-switch-indicator"
        animate={{ x: locale === "jp" ? 0 : 38 }}
        transition={{ duration: 0.24, ease: [0.2, 0.8, 0.2, 1] }}
      />
      <button
        type="button"
        onClick={() => onChange("jp")}
        className={`locale-switch-btn ${locale === "jp" ? "is-active" : ""}`}
        aria-pressed={locale === "jp"}
      >
        JP
      </button>
      <button
        type="button"
        onClick={() => onChange("en")}
        className={`locale-switch-btn ${locale === "en" ? "is-active" : ""}`}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
    </div>
  );
}
