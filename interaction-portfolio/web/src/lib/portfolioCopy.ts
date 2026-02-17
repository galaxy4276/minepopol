export type Locale = "jp" | "en";

type SectionPair = {
  jp: string;
  en: string;
};

export type WorkLink = {
  label: string;
  url: string;
};

export type WorkItem = {
  id: string;
  name: string;
  jpLabel: string;
  enLabel: string;
  previewImage?: string;
  previewAlt?: string;
  outcome: string;
  role: string;
  summary: string;
  details: string[];
  bullets: string[];
  stack: string[];
  links: WorkLink[];
  urlLabel: string;
  url: string;
};

type SkillGroup = {
  title: string;
  items: string[];
};

type PortfolioCopy = {
  nav: {
    works: string;
    about: string;
    contact: string;
  };
  hero: {
    overline: string;
    display: SectionPair;
    sub: SectionPair;
    meta: SectionPair;
    coe: SectionPair;
    orbCaption: string;
    cta: {
      linkedin: string;
      email: string;
      works: string;
    };
  };
  sectionTitles: {
    works: SectionPair;
    craft: SectionPair;
    skills: SectionPair;
    about: SectionPair;
    contact: SectionPair;
  };
  works: WorkItem[];
  craft: SectionPair[];
  skills: SkillGroup[];
  about: {
    paragraph: SectionPair;
  };
  contact: {
    headline: SectionPair;
    subline: string;
    smallMeta: string[];
  };
  footer: {
    copyright: string;
    github: string;
    linkedin: string;
    contact: string;
  };
};

export const portfolioCopy: Record<Locale, PortfolioCopy> = {
  jp: {
    nav: {
      works: "代表作",
      about: "自己紹介",
      contact: "連絡",
    },
    hero: {
      overline: "Hyundong Lee · 体験を届けるプロダクト開発",
      display: {
        jp: "プロダクトを“届ける”開発者。",
        en: "Product-minded. Built to ship.",
      },
      sub: {
        jp: "React/TypeScript と API 開発を軸に、i18n/ローカライズと運用改善まで一貫して取り組みます。",
        en: "Frontend + API + i18n. Production mindset.",
      },
      meta: {
        jp: "愛知（名古屋）を第一希望 / 新卒・第二新卒ポジション歓迎",
        en: "Aichi/Nagoya preferred · Entry-level",
      },
      coe: {
        jp: "COEサポートが必要となる可能性があります（事前に確認希望）",
        en: "COE support may be required.",
      },
      orbCaption: "Subtle spatial cue + text-first layout",
      cta: {
        linkedin: "LinkedIn",
        email: "Email",
        works: "代表作を見る",
      },
    },
    sectionTitles: {
      works: { jp: "代表作", en: "Selected Works" },
      craft: { jp: "作り方", en: "Impact & Craft" },
      skills: { jp: "スキル", en: "Skills Snapshot" },
      about: { jp: "自己紹介", en: "About" },
      contact: { jp: "連絡", en: "Contact" },
    },
    works: [
      {
        id: "sometime",
        name: "SOMETIME",
        jpLabel: "ローカライズ主導のプロダクト実装",
        enLabel: "Localization-first product build",
        previewImage: "/media/sometime-banner.png",
        previewAlt: "SOMETIME campaign visual",
        outcome: "日本向けi18n改善を本番運用まで継続",
        role: "ローカライズ / フロントエンド / 運用",
        summary:
          "日本向けローカライズ（i18n）とUX改善を、実装から運用まで一貫して推進。",
        details: [
          "日本ユーザーの導線分析をベースに文言と画面フローを再設計",
          "運用時のエラー傾向を分類し、改善優先度を短いサイクルで更新",
          "機能追加とリファクタを並行し、体験品質と開発速度の両立を継続",
        ],
        bullets: [
          "ko/ja/en i18nの設計・実装と、JP向け文言/導線の最適化",
          "React Native / NestJS基盤で機能改善と運用安定化を推進",
          "国・言語コンテキストを踏まえた仮説検証サイクルを実行",
        ],
        stack: ["React Native", "TypeScript", "Node.js", "NestJS", "PostgreSQL"],
        links: [
          { label: "プロダクトサイト", url: "https://some-in-univ.com" },
        ],
        urlLabel: "Product Site",
        url: "https://some-in-univ.com",
      },
      {
        id: "letter-u",
        name: "Letter U",
        jpLabel: "手書き手紙交換と遠隔印刷の連携",
        enLabel: "Handwriting letter exchange with remote printing",
        previewImage: "/media/letter-u-banner.png",
        previewAlt: "Letter U product presentation slide",
        outcome: "ハッカソン本選で体験価値を短期実装",
        role: "フロントエンドリード / 連携",
        summary:
          "EPSON遠隔プリンターAPIを活用し、手書きの手紙をスキャンして送受信できる交流サービスを実装。",
        details: [
          "限られた期間で、核心体験(書く→送る→受け取る)を優先して設計",
          "HTTPS環境・API連携・UXフローを並行開発し、デモ品質を担保",
          "マッチング、チャット、統計までつなぎ、製品としての一貫性を構築",
        ],
        bullets: [
          "Next.js 13(App Router)ベースでフロントエンド全体を設計・実装",
          "EPSON遠隔プリンターAPI連携のためHTTPS環境を構築",
          "手紙送受信、マッチング/チャット、マイページ/統計など主要機能を開発",
        ],
        stack: ["Next.js", "Tailwind", "PostgreSQL", "Django REST", "AWS", "Nginx"],
        links: [
          {
            label: "デモ資料",
            url: "https://docs.google.com/presentation/d/1O6ZajdVFiXRuhHKWSB73Yb9L9WWzZYM6/edit?pli=1&slide=id.p1#slide=id.p1",
          },
          {
            label: "デモ動画",
            url: "https://drive.google.com/file/d/1mZhNjx1OulHGFZ2eQnJ3Jz7-YlpSukWt/view?pli=1",
          },
        ],
        urlLabel: "Deck / Demo",
        url: "https://docs.google.com/presentation/d/1O6ZajdVFiXRuhHKWSB73Yb9L9WWzZYM6/edit?pli=1&slide=id.p1#slide=id.p1",
      },
    ],
    craft: [
      {
        jp: "ローカライズは翻訳ではなく、UX設計。",
        en: "Localization is UX.",
      },
      {
        jp: "仕様の曖昧さを分解して、動く形にして改善。",
        en: "Turn ambiguity into shippable.",
      },
      {
        jp: "本番を前提に、速度と安定性を両立。",
        en: "Reliable by design.",
      },
    ],
    skills: [
      {
        title: "フロントエンド",
        items: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
      },
      {
        title: "バックエンド",
        items: ["Node.js", "NestJS", "Django REST"],
      },
      {
        title: "データ",
        items: ["PostgreSQL"],
      },
      {
        title: "インフラ / 開発",
        items: ["Docker", "Git", "AWS"],
      },
    ],
    about: {
      paragraph: {
        jp: "ユーザー体験と実装の両方に責任を持つことが好きです。曖昧な要件を分解し、動く形にして改善サイクルを回します。",
        en: "I build, ship, and iterate.",
      },
    },
    contact: {
      headline: {
        jp: "まずは一言、気軽にご連絡ください。",
        en: "Happy to connect.",
      },
      subline: "COEサポートが必要になる可能性があります。事前にご相談できます。",
      smallMeta: [
        "希望勤務地: 愛知（名古屋）",
        "対応言語: 日本語 / 韓国語 / 英語",
        "Next.js + Motion + Tailwind CSS で構築",
      ],
    },
    footer: {
      copyright: "Hyundong Lee",
      github: "GitHub",
      linkedin: "LinkedIn",
      contact: "連絡",
    },
  },
  en: {
    nav: {
      works: "Works",
      about: "About",
      contact: "Contact",
    },
    hero: {
      overline: "Hyundong Lee · Product-minded developer who ships",
      display: {
        jp: "プロダクトを“届ける”開発者。",
        en: "Product-minded. Built to ship.",
      },
      sub: {
        jp: "React/TypeScript と API 開発を軸に、i18n/ローカライズと運用改善まで一貫して取り組みます。",
        en: "Frontend + API development with i18n and production operations mindset.",
      },
      meta: {
        jp: "愛知（名古屋）を第一希望 / 新卒・第二新卒ポジション歓迎",
        en: "Aichi/Nagoya preferred · Open to entry-level roles",
      },
      coe: {
        jp: "COEサポートが必要となる可能性があります（事前に確認希望）",
        en: "COE support may be required.",
      },
      orbCaption: "Subtle spatial cue + text-first layout",
      cta: {
        linkedin: "LinkedIn",
        email: "Email",
        works: "Selected Works",
      },
    },
    sectionTitles: {
      works: { jp: "代表作", en: "Selected Works" },
      craft: { jp: "作り方", en: "Impact & Craft" },
      skills: { jp: "スキル", en: "Skills Snapshot" },
      about: { jp: "自己紹介", en: "About" },
      contact: { jp: "連絡", en: "Contact" },
    },
    works: [
      {
        id: "sometime",
        name: "SOMETIME",
        jpLabel: "ローカライズ主導のプロダクト実装",
        enLabel: "Localization-first product build",
        previewImage: "/media/sometime-banner.png",
        previewAlt: "SOMETIME campaign visual",
        outcome: "Shipped JP i18n improvements into live operations",
        role: "Localization / Frontend / Ops",
        summary:
          "Shipped Japanese localization (i18n) and UX improvements from implementation through live operations.",
        details: [
          "Reworked JP copy and user flow based on real usage behavior analysis",
          "Grouped production issues by impact and iterated in short release cycles",
          "Balanced feature delivery with refactoring to keep quality and speed aligned",
        ],
        bullets: [
          "Designed and implemented ko/ja/en i18n with JP copy and flow optimization",
          "Improved features and runtime stability on a React Native + NestJS stack",
          "Executed experiment-to-iteration loops aligned with country/language context",
        ],
        stack: ["React Native", "TypeScript", "Node.js", "NestJS", "PostgreSQL"],
        links: [
          { label: "Live Product", url: "https://some-in-univ.com" },
        ],
        urlLabel: "Live Product",
        url: "https://some-in-univ.com",
      },
      {
        id: "letter-u",
        name: "Letter U",
        jpLabel: "手書き手紙交換と遠隔印刷の連携",
        enLabel: "Handwriting letter exchange with remote printing",
        previewImage: "/media/letter-u-banner.png",
        previewAlt: "Letter U product presentation slide",
        outcome: "Built and shipped the core experience under hackathon constraints",
        role: "Frontend Lead / Integration",
        summary:
          "Built a social product that scans and exchanges handwritten letters through Epson remote printer API.",
        details: [
          "Prioritized the core value flow: write, send, receive, and reply",
          "Integrated HTTPS setup and Epson API while designing front-end flows in parallel",
          "Delivered matching, chat, and stats to make the prototype feel product-ready",
        ],
        bullets: [
          "Owned full frontend architecture and implementation with Next.js 13 App Router",
          "Built HTTPS environment for Epson remote printer API integration",
          "Implemented core features: letter exchange, matching/chat, my page, and statistics",
        ],
        stack: ["Next.js", "Tailwind", "PostgreSQL", "Django REST", "AWS", "Nginx"],
        links: [
          {
            label: "Demo Deck",
            url: "https://docs.google.com/presentation/d/1O6ZajdVFiXRuhHKWSB73Yb9L9WWzZYM6/edit?pli=1&slide=id.p1#slide=id.p1",
          },
          {
            label: "Demo Video",
            url: "https://drive.google.com/file/d/1mZhNjx1OulHGFZ2eQnJ3Jz7-YlpSukWt/view?pli=1",
          },
        ],
        urlLabel: "Deck / Demo",
        url: "https://docs.google.com/presentation/d/1O6ZajdVFiXRuhHKWSB73Yb9L9WWzZYM6/edit?pli=1&slide=id.p1#slide=id.p1",
      },
    ],
    craft: [
      {
        jp: "ローカライズは翻訳ではなく、UX設計。",
        en: "Localization is UX.",
      },
      {
        jp: "仕様の曖昧さを分解して、動く形にして改善。",
        en: "Turn ambiguity into shippable.",
      },
      {
        jp: "本番を前提に、速度と安定性を両立。",
        en: "Reliable by design.",
      },
    ],
    skills: [
      {
        title: "Frontend",
        items: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
      },
      {
        title: "Backend",
        items: ["Node.js", "NestJS", "Django REST"],
      },
      {
        title: "Data",
        items: ["PostgreSQL"],
      },
      {
        title: "Infra / Dev",
        items: ["Docker", "Git", "AWS"],
      },
    ],
    about: {
      paragraph: {
        jp: "ユーザー体験と実装の両方に責任を持つことが好きです。曖昧な要件を分解し、動く形にして改善サイクルを回します。",
        en: "I like owning both user experience and implementation. I break ambiguity into shippable outcomes and iterate with feedback.",
      },
    },
    contact: {
      headline: {
        jp: "まずは一言、気軽にご連絡ください。",
        en: "Feel free to send a quick hello.",
      },
      subline: "COE support may be required — happy to discuss.",
      smallMeta: [
        "Aichi/Nagoya preferred · Entry-level available",
        "Languages: JP / KR / EN",
        "Built with Next.js + Motion + Tailwind CSS.",
      ],
    },
    footer: {
      copyright: "Hyundong Lee",
      github: "GitHub",
      linkedin: "LinkedIn",
      contact: "Contact",
    },
  },
};
