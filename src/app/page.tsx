"use client";

import {
  startTransition,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import LocaleSwitch from "@/components/LocaleSwitch";
import SkillSphere from "@/components/SkillSphere";
import { portfolioCopy, type Locale, type WorkItem } from "@/lib/portfolioCopy";

const HERO_VIDEO_PATH = "/media/hero-loop.mp4";
const EMAIL_ADDRESS = "lhd000721@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/%ED%98%84%EB%8F%99-%EC%9D%B4-11b3a6313/";
const GITHUB_URL = "https://github.com/minesp3164";
const SECTION_ORDER = ["hero", "works", "craft", "skills", "about", "contact"] as const;
type SectionId = (typeof SECTION_ORDER)[number];

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.56,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const normalize = (value: string) => value.toLowerCase().replace(/\s+/g, "");

const stackMatches = (selected: string, stack: string[]) => {
  const target = normalize(selected);
  return stack.some((item) => {
    const current = normalize(item);
    return current.includes(target) || target.includes(current);
  });
};

const getWorkLinks = (work: WorkItem) =>
  work.links && work.links.length > 0
    ? work.links
    : [{ label: work.urlLabel, url: work.url }];

function SectionTitle({
  locale,
  pair,
}: {
  locale: Locale;
  pair: { jp: string; en: string };
}) {
  const primary = locale === "jp" ? pair.jp : pair.en;

  return (
    <motion.div className="title-stack mb-8" variants={itemVariants}>
      <h2
        className={`text-2xl md:text-3xl font-semibold ${
          locale === "jp" ? "text-jp" : "tracking-tight"
        }`}
      >
        {primary}
      </h2>
    </motion.div>
  );
}

function MagneticLink({
  href,
  className,
  children,
  external = false,
}: {
  href: string;
  className: string;
  children: ReactNode;
  external?: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const xRaw = useMotionValue(0);
  const yRaw = useMotionValue(0);
  const x = useSpring(xRaw, { stiffness: 180, damping: 16, mass: 0.5 });
  const y = useSpring(yRaw, { stiffness: 180, damping: 16, mass: 0.5 });

  const reset = () => {
    xRaw.set(0);
    yRaw.set(0);
  };

  const handleMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (reducedMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - rect.left - rect.width / 2;
    const dy = event.clientY - rect.top - rect.height / 2;

    xRaw.set(dx * 0.16);
    yRaw.set(dy * 0.16);
  };

  return (
    <motion.a
      href={href}
      className={className}
      style={reducedMotion ? undefined : { x, y }}
      whileTap={reducedMotion ? undefined : { scale: 0.98 }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {children}
    </motion.a>
  );
}

function WorkDrawer({
  work,
  locale,
  onClose,
  selectedStack,
  onSelectStack,
}: {
  work: WorkItem;
  locale: Locale;
  onClose: () => void;
  selectedStack: string | null;
  onSelectStack: (stack: string | null) => void;
}) {
  const labels =
    locale === "jp"
      ? {
          close: "閉じる",
          outcome: "成果",
          role: "担当",
        }
      : {
          close: "Close",
          outcome: "Outcome",
          role: "Role",
        };

  return (
    <>
      <motion.button
        className="work-drawer-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-label="Close case drawer"
      />
      <motion.aside
        className="work-drawer-panel"
        initial={{ x: 420, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 420, opacity: 0 }}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className={`text-xs ${locale === "jp" ? "text-jp text-[var(--text-muted)]" : "text-en"}`}>
              {locale === "jp" ? work.jpLabel : work.enLabel}
            </p>
            <h3 className={`mt-1 text-2xl font-semibold ${locale === "jp" ? "text-jp" : ""}`}>
              {work.name}
            </h3>
          </div>
          <button type="button" onClick={onClose} className="drawer-close-btn">
            {labels.close}
          </button>
        </div>

        {work.previewImage ? (
          <div className="work-drawer-preview mt-5">
            <Image
              src={work.previewImage}
              alt={work.previewAlt ?? `${work.name} preview`}
              fill
              sizes="(min-width: 900px) 380px, 100vw"
              className="object-cover"
            />
          </div>
        ) : null}

        <div className="drawer-kv-grid mt-6">
          <div>
            <p className="text-en text-[11px] uppercase">{labels.outcome}</p>
            <p className="mt-1 text-sm text-[var(--text-muted)]">{work.outcome}</p>
          </div>
          <div>
            <p className="text-en text-[11px] uppercase">{labels.role}</p>
            <p className="mt-1 text-sm text-[var(--text-muted)]">{work.role}</p>
          </div>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-[var(--text-muted)]">{work.summary}</p>

        <ul className="mt-5 space-y-2 text-sm text-[var(--text-muted)]">
          {work.details.map((detail) => (
            <li key={detail} className="list-disc list-inside">
              {detail}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {work.stack.map((stack) => (
            <button
              key={stack}
              type="button"
              className={`chip rounded-full px-3 py-1 text-xs cursor-pointer ${
                selectedStack && stackMatches(selectedStack, [stack]) ? "chip-active" : ""
              }`}
              onClick={() => onSelectStack(selectedStack === stack ? null : stack)}
            >
              {stack}
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {getWorkLinks(work).map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="inline-block text-sm font-medium text-[var(--accent-blue)] hover:text-[var(--accent-mint)] underline-offset-4 hover:underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.aside>
    </>
  );
}

export default function HomePage() {
  const reducedMotion = useReducedMotion();
  const [locale, setLocale] = useState<Locale>("jp");
  const [activeSkillGroup, setActiveSkillGroup] = useState<number | null>(null);
  const [hoveredSphereSkill, setHoveredSphereSkill] = useState<string | null>(null);
  const [selectedStack, setSelectedStack] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [headerCompact, setHeaderCompact] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [drawerWorkId, setDrawerWorkId] = useState<string | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const lastScrollY = useRef(0);

  const videoXRaw = useMotionValue(0);
  const videoYRaw = useMotionValue(0);
  const videoScaleRaw = useMotionValue(1.06);
  const videoX = useSpring(videoXRaw, { stiffness: 70, damping: 18, mass: 0.8 });
  const videoY = useSpring(videoYRaw, { stiffness: 70, damping: 18, mass: 0.8 });
  const videoScale = useSpring(videoScaleRaw, { stiffness: 64, damping: 18, mass: 0.8 });

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-locale");
    if (saved === "jp" || saved === "en") {
      startTransition(() => {
        setLocale(saved);
      });
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("portfolio-locale", locale);
  }, [locale]);

  const copy = useMemo(() => portfolioCopy[locale], [locale]);
  const revealInitial = reducedMotion ? false : "hidden";

  const availableStacks = useMemo(() => {
    return Array.from(new Set(copy.works.flatMap((work) => work.stack)));
  }, [copy.works]);

  const sphereSkills = useMemo(() => {
    return Array.from(new Set(copy.skills.flatMap((group) => group.items)));
  }, [copy.skills]);

  const filteredWorks = useMemo(() => {
    if (!selectedStack) return copy.works;
    return copy.works.filter((work) => stackMatches(selectedStack, work.stack));
  }, [copy.works, selectedStack]);

  const drawerWork = useMemo(() => {
    if (!drawerWorkId) return null;
    return copy.works.find((work) => work.id === drawerWorkId) ?? null;
  }, [copy.works, drawerWorkId]);

  const aboutKeywords = locale === "jp"
    ? ["構築", "改善", "運用"]
    : ["Build", "Ship", "Iterate"];
  const uiText =
    locale === "jp"
      ? {
          all: "すべて",
          outcome: "成果",
          role: "担当",
          noMatch: "選択したスタックに一致するプロジェクトがありません。",
          skillHint: "ジオメトリノードにホバー/クリックしてプロジェクトを絞り込めます",
          copied: "コピー済み",
          copyEmail: "メールをコピー",
        }
      : {
          all: "All",
          outcome: "Outcome",
          role: "Role",
          noMatch: "No matched project for the selected stack.",
          skillHint: "Hover and click geometry nodes to filter works",
          copied: "Copied",
          copyEmail: "Copy Email",
        };

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? y / max : 0);

      const isDown = y > lastScrollY.current;
      setHeaderCompact(y > 72 && isDown);
      lastScrollY.current = y;

      const probe = y + window.innerHeight * 0.35;
      let current: SectionId = "hero";
      SECTION_ORDER.forEach((id) => {
        const element = document.getElementById(id);
        if (element && probe >= element.offsetTop) {
          current = id;
        }
      });
      setActiveSection(current);

      if (!reducedMotion) {
        const progress = Math.min(1, y / (window.innerHeight * 0.7));
        videoScaleRaw.set(1.06 - progress * 0.04);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion, videoScaleRaw]);

  useEffect(() => {
    if (!drawerWork) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDrawerWorkId(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [drawerWork]);

  const onHeroPointerMove = (event: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    videoXRaw.set(nx * 18);
    videoYRaw.set(ny * 14);
  };

  const onHeroPointerLeave = () => {
    videoXRaw.set(0);
    videoYRaw.set(0);
  };

  const handleSkillSelect = (skill: string) => {
    setSelectedStack((prev) => (prev === skill ? null : skill));
    const works = document.getElementById("works");
    works?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 1300);
    } catch {
      setEmailCopied(false);
    }
  };

  const worksActive = activeSection === "works" || activeSection === "craft" || activeSection === "skills";
  const aboutActive = activeSection === "about";
  const contactActive = activeSection === "contact";

  const ringRadius = 17;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference * (1 - scrollProgress);

  return (
    <div
      className={`min-h-screen bg-[var(--background)] text-[var(--text-primary)] ${
        locale === "jp" ? "locale-jp" : ""
      }`}
    >
      <header className={`site-header z-50 ${headerCompact ? "is-compact" : ""}`}>
        <div className="header-gradient-layer" aria-hidden="true">
          <span className="header-blob blob-a" />
          <span className="header-blob blob-b" />
          <span className="header-blob blob-c" />
        </div>
        <div className="site-header-shell flex items-center justify-between">
          <p className="text-jp font-semibold tracking-tight">HYUNDONG LEE</p>
          <div className="flex items-center gap-5">
            <nav className="hidden md:flex items-center gap-6">
              <a href="#works" className={`nav-link ${worksActive ? "is-active" : ""}`}>
                {copy.nav.works}
              </a>
              <a href="#about" className={`nav-link ${aboutActive ? "is-active" : ""}`}>
                {copy.nav.about}
              </a>
              <a href="#contact" className={`nav-link ${contactActive ? "is-active" : ""}`}>
                {copy.nav.contact}
              </a>
            </nav>
            <LocaleSwitch locale={locale} onChange={setLocale} />
          </div>
        </div>
      </header>

      <main>
        <motion.section
          id="hero"
          className="hero-section grid items-center"
          variants={sectionVariants}
          initial={revealInitial}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          onMouseMove={onHeroPointerMove}
          onMouseLeave={onHeroPointerLeave}
        >
          <motion.video
            className="hero-video"
            src={HERO_VIDEO_PATH}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            style={reducedMotion ? undefined : { x: videoX, y: videoY, scale: videoScale }}
          />
          <div className="hero-video-overlay" />
          <div className="hero-grid-lines" aria-hidden="true" />

          <div className="hero-content section-shell relative z-10">
            <motion.div className="space-y-8 max-w-3xl" variants={sectionVariants}>
              <motion.p className="text-en text-sm" variants={itemVariants}>
                {copy.hero.overline}
              </motion.p>

              <motion.div className="title-stack" variants={sectionVariants}>
                <motion.h1
                  className={`text-4xl md:text-6xl font-bold leading-tight tracking-tight ${
                    locale === "jp" ? "text-jp" : ""
                  }`}
                  variants={itemVariants}
                >
                  {locale === "jp" ? copy.hero.display.jp : copy.hero.display.en}
                </motion.h1>
              </motion.div>

              <motion.p
                className="max-w-2xl text-base md:text-lg leading-relaxed text-[var(--text-muted)]"
                variants={itemVariants}
              >
                {locale === "jp" ? copy.hero.sub.jp : copy.hero.sub.en}
              </motion.p>

              <motion.div className="flex flex-wrap gap-3" variants={itemVariants}>
                <MagneticLink
                  className="inline-flex cta-primary"
                  href={LINKEDIN_URL}
                  external
                >
                  {copy.hero.cta.linkedin}
                </MagneticLink>
                <MagneticLink className="inline-flex cta-secondary" href={`mailto:${EMAIL_ADDRESS}`}>
                  {copy.hero.cta.email}
                </MagneticLink>
                <Link
                  href="#works"
                  className="cta-sweep inline-flex items-center justify-center h-12 px-5 rounded-full border border-[var(--border)] text-sm font-medium transition-colors"
                >
                  {copy.hero.cta.works}
                </Link>
              </motion.div>

              <motion.p className="text-en text-xs" variants={itemVariants}>
                {locale === "jp" ? copy.hero.meta.jp : copy.hero.meta.en}
              </motion.p>
              <motion.p className="text-en text-xs" variants={itemVariants}>
                {locale === "jp" ? copy.hero.coe.jp : copy.hero.coe.en}
              </motion.p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="works"
          className="border-t border-[var(--border)]"
          variants={sectionVariants}
          initial={revealInitial}
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
        >
          <div className="section-shell">
            <SectionTitle locale={locale} pair={copy.sectionTitles.works} />

            <motion.div className="mb-6 flex flex-wrap gap-2" variants={itemVariants}>
              <button
                type="button"
                className={`chip rounded-full px-3 py-1.5 text-xs cursor-pointer ${selectedStack === null ? "chip-active" : ""}`}
                onClick={() => setSelectedStack(null)}
              >
                {uiText.all}
              </button>
              {availableStacks.map((stack) => (
                <button
                  key={stack}
                  type="button"
                  className={`chip rounded-full px-3 py-1.5 text-xs cursor-pointer ${selectedStack && stackMatches(selectedStack, [stack]) ? "chip-active" : ""}`}
                  onClick={() => setSelectedStack((prev) => (prev === stack ? null : stack))}
                >
                  {stack}
                </button>
              ))}
            </motion.div>

            <motion.div className="grid md:grid-cols-2 gap-4" variants={sectionVariants}>
              {filteredWorks.map((work) => (
                <motion.article
                  key={work.id}
                  className="surface-card card-interactive p-6 space-y-4 cursor-pointer"
                  variants={itemVariants}
                  whileHover={reducedMotion ? undefined : { y: -6, transition: { duration: 0.24 } }}
                  onClick={() => setDrawerWorkId(work.id)}
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setDrawerWorkId(work.id);
                    }
                  }}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-2xl font-semibold text-jp">{work.name}</h3>
                    <p className={`text-xs ${locale === "jp" ? "text-jp text-[var(--text-muted)]" : "text-en"}`}>
                      {locale === "jp" ? work.jpLabel : work.enLabel}
                    </p>
                  </div>

                  {work.previewImage ? (
                    <div className="work-preview">
                      <Image
                        src={work.previewImage}
                        alt={work.previewAlt ?? `${work.name} preview`}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  ) : null}

                  <div className="works-meta-grid">
                    <div>
                      <p className="text-en text-[11px] uppercase">{uiText.outcome}</p>
                      <p className="mt-1 text-sm text-[var(--text-muted)]">{work.outcome}</p>
                    </div>
                    <div>
                      <p className="text-en text-[11px] uppercase">{uiText.role}</p>
                      <p className="mt-1 text-sm text-[var(--text-muted)]">{work.role}</p>
                    </div>
                  </div>

                  <p className="text-[var(--text-muted)] leading-relaxed">{work.summary}</p>

                  <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                    {work.bullets.map((bullet) => (
                      <motion.li
                        key={bullet}
                        className="list-disc list-inside"
                        whileHover={reducedMotion ? undefined : { x: 3 }}
                      >
                        {bullet}
                      </motion.li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {work.stack.map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        className={`chip rounded-full px-3 py-1 text-xs cursor-pointer ${
                          selectedStack && stackMatches(selectedStack, [chip]) ? "chip-active" : ""
                        }`}
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedStack((prev) => (prev === chip ? null : chip));
                        }}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {getWorkLinks(work).map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(event) => event.stopPropagation()}
                        className="inline-block text-sm font-medium text-[var(--accent-blue)] hover:text-[var(--accent-mint)] underline-offset-4 hover:underline"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </motion.article>
              ))}
            </motion.div>

            {filteredWorks.length === 0 ? (
              <p className="mt-5 text-sm text-[var(--text-muted)]">{uiText.noMatch}</p>
            ) : null}
          </div>
        </motion.section>

        <motion.section
          id="craft"
          className="border-t border-[var(--border)]"
          variants={sectionVariants}
          initial={revealInitial}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="section-shell">
            <SectionTitle locale={locale} pair={copy.sectionTitles.craft} />
            <motion.div
              className="impact-connector"
              initial={reducedMotion ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div className="grid md:grid-cols-3 gap-4" variants={sectionVariants}>
              {copy.craft.map((craft) => (
                <motion.article
                  key={craft.jp}
                  className="surface-card card-interactive p-5 space-y-2"
                  variants={itemVariants}
                  whileHover={reducedMotion ? undefined : { y: -4, rotateX: 1.2, transition: { duration: 0.24 } }}
                >
                  <p className="text-jp font-semibold">
                    {locale === "jp" ? craft.jp : craft.en}
                  </p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="skills"
          className="border-t border-[var(--border)]"
          variants={sectionVariants}
          initial={revealInitial}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="section-shell">
            <SectionTitle locale={locale} pair={copy.sectionTitles.skills} />
            <motion.div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr] items-start" variants={sectionVariants}>
              <motion.div className="grid gap-4 sm:grid-cols-2" variants={sectionVariants}>
                {copy.skills.map((group, index) => (
                  <motion.article
                    key={group.title}
                    className={`surface-card card-interactive p-5 transition-opacity ${
                      activeSkillGroup !== null && activeSkillGroup !== index ? "opacity-50" : "opacity-100"
                    }`}
                    variants={itemVariants}
                    onMouseEnter={() => setActiveSkillGroup(index)}
                    onMouseLeave={() => setActiveSkillGroup(null)}
                    whileHover={reducedMotion ? undefined : { y: -5 }}
                  >
                    <h3 className="text-jp mb-3 text-lg">{group.title}</h3>
                    <ul className="space-y-2 text-sm">
                      {group.items.map((skill) => {
                        const selected = selectedStack ? stackMatches(selectedStack, [skill]) : false;
                        return (
                          <li key={skill}>
                            <button
                              type="button"
                              className={`skill-pill ${selected ? "is-selected" : ""}`}
                              onClick={() => handleSkillSelect(skill)}
                            >
                              {skill}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </motion.article>
                ))}
              </motion.div>

              <motion.aside className="surface-card p-4 md:p-5 skill-sphere-panel" variants={itemVariants}>
                <SkillSphere
                  skills={sphereSkills}
                  selectedSkill={selectedStack}
                  onSelectSkill={handleSkillSelect}
                  onHoverSkill={setHoveredSphereSkill}
                  reducedMotion={Boolean(reducedMotion)}
                />
                <p className="text-en text-xs mt-3">
                  {hoveredSphereSkill ?? selectedStack ?? uiText.skillHint}
                </p>
              </motion.aside>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="about"
          className="border-t border-[var(--border)]"
          variants={sectionVariants}
          initial={revealInitial}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="section-shell">
            <SectionTitle locale={locale} pair={copy.sectionTitles.about} />
            <motion.div className="surface-card p-6 md:p-8 overflow-hidden relative" variants={itemVariants}>
              <motion.div
                className="timeline-line absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-[var(--accent-mint)] via-[var(--accent-blue)] to-transparent"
                initial={reducedMotion ? { opacity: 1, scaleY: 1 } : { opacity: 0.7, scaleY: 0 }}
                whileInView={{ opacity: 1, scaleY: 1 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "top" }}
              />

              <div className="mb-4 flex flex-wrap gap-2">
                {aboutKeywords.map((keyword, index) => (
                  <motion.span
                    key={keyword}
                    className="about-keyword"
                    initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ delay: reducedMotion ? 0 : index * 0.08, duration: 0.45 }}
                  >
                    {keyword}
                  </motion.span>
                ))}
              </div>

              <p className={`text-lg leading-relaxed max-w-4xl ${locale === "jp" ? "text-jp" : ""}`}>
                {locale === "jp" ? copy.about.paragraph.jp : copy.about.paragraph.en}
              </p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="contact"
          className="border-t border-[var(--border)]"
          variants={sectionVariants}
          initial={revealInitial}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="section-shell">
            <SectionTitle locale={locale} pair={copy.sectionTitles.contact} />
            <motion.div className="grid gap-4 md:grid-cols-[1.4fr_1fr] items-start" variants={sectionVariants}>
              <motion.div className="surface-card p-6" variants={itemVariants}>
                <p
                  className={`text-2xl md:text-3xl font-semibold ${
                    locale === "jp" ? "text-jp" : ""
                  }`}
                >
                  {locale === "jp" ? copy.contact.headline.jp : copy.contact.headline.en}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <MagneticLink href={LINKEDIN_URL} external className="inline-flex cta-primary">
                    {copy.hero.cta.linkedin}
                  </MagneticLink>
                  <MagneticLink href={`mailto:${EMAIL_ADDRESS}`} className="inline-flex cta-secondary">
                    {copy.hero.cta.email}
                  </MagneticLink>
                  <MagneticLink href="/resume_minesp.pdf" external className="inline-flex cta-secondary">
                    {copy.hero.cta.resume}
                  </MagneticLink>
                  <button type="button" className="inline-flex cta-secondary" onClick={copyEmail}>
                    {emailCopied ? uiText.copied : uiText.copyEmail}
                  </button>
                </div>
                <p className="text-en mt-4 text-xs">{copy.contact.subline}</p>
              </motion.div>

              <motion.div
                className="surface-card p-6 text-sm text-[var(--text-muted)] space-y-2"
                variants={itemVariants}
                whileHover={reducedMotion ? undefined : { y: -3 }}
              >
                {copy.contact.smallMeta.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <motion.footer
        className="border-t border-[var(--border)]"
        initial={revealInitial}
        whileInView="visible"
        variants={sectionVariants}
        viewport={{ once: true, amount: 0.7 }}
      >
        <div className="section-shell py-8 text-sm text-[var(--text-muted)] flex flex-wrap gap-4 justify-between items-center">
          <motion.p variants={itemVariants}>
            © {new Date().getFullYear()} {copy.footer.copyright}
          </motion.p>
          <motion.div className="flex items-center gap-4" variants={itemVariants}>
            <motion.a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--accent-blue)]"
              whileHover={reducedMotion ? undefined : { y: -2 }}
            >
              {copy.footer.github}
            </motion.a>
            <motion.a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--accent-blue)]"
              whileHover={reducedMotion ? undefined : { y: -2 }}
            >
              {copy.footer.linkedin}
            </motion.a>
            <motion.a
              href="#contact"
              className="hover:text-[var(--accent-blue)]"
              whileHover={reducedMotion ? undefined : { y: -2 }}
            >
              {copy.footer.contact}
            </motion.a>
          </motion.div>

          <motion.button
            type="button"
            className="back-to-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={reducedMotion ? undefined : { y: -2 }}
            whileTap={reducedMotion ? undefined : { scale: 0.97 }}
            aria-label="Back to top"
          >
            <svg width="42" height="42" viewBox="0 0 42 42" aria-hidden="true">
              <circle cx="21" cy="21" r={ringRadius} className="progress-ring-track" />
              <circle
                cx="21"
                cy="21"
                r={ringRadius}
                className="progress-ring-value"
                strokeDasharray={ringCircumference}
                strokeDashoffset={ringOffset}
              />
            </svg>
            <span>↑</span>
          </motion.button>
        </div>
      </motion.footer>

      <AnimatePresence>
        {drawerWork ? (
          <WorkDrawer
            work={drawerWork}
            locale={locale}
            onClose={() => setDrawerWorkId(null)}
            selectedStack={selectedStack}
            onSelectStack={setSelectedStack}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
