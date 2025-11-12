export type Bilingual = {
  ar: string;
  en: string;
};

export const designers = [
  {
    id: 'd-1',
    name: {
      ar: 'ليان العتيبي',
      en: 'Layan Al-Otaibi',
    } satisfies Bilingual,
    specialty: {
      ar: 'تصاميم مستدامة + NFTs قابلة للتصنيع',
      en: 'Sustainable couture + On-chain manufacturable NFTs',
    } satisfies Bilingual,
    volume: '420K SAR',
    avatarGradient: 'linear-gradient(135deg, rgba(var(--color-primary),0.6), rgba(var(--color-accent),0.7))',
    badge: 'Level ∞',
  },
  {
    id: 'd-2',
    name: {
      ar: 'فارس المدني',
      en: 'Faris Al-Madani',
    } satisfies Bilingual,
    specialty: {
      ar: 'أزياء رياضية رقمية مع واقع معزز',
      en: 'Digital athleisure with AR overlays',
    } satisfies Bilingual,
    volume: '310K SAR',
    avatarGradient: 'linear-gradient(135deg, rgba(var(--color-secondary),0.6), rgba(var(--color-primary),0.8))',
    badge: 'Polygon Verified',
  },
  {
    id: 'd-3',
    name: {
      ar: 'ميرا خان',
      en: 'Meera Khan',
    } satisfies Bilingual,
    specialty: {
      ar: 'منسوجات رقمية + إنتاج سريع',
      en: 'Digital textiles + Rapid manufacturing',
    } satisfies Bilingual,
    volume: '265K SAR',
    avatarGradient: 'linear-gradient(135deg, rgba(var(--color-accent),0.65), rgba(var(--color-secondary),0.7))',
    badge: 'Factory Synced',
  },
] as const;

export const manufacturers = [
  {
    id: 'm-1',
    name: {
      ar: 'مصنع نسيج 4.0',
      en: 'Fabrication 4.0 Mill',
    } satisfies Bilingual,
    capability: {
      ar: 'نسيج ثلاثي الأبعاد • طباعة فورية • جودة Web3',
      en: '3D weaving • Instant print • Web3 QA',
    } satisfies Bilingual,
    turnaround: '72h',
    status: 'active',
  },
  {
    id: 'm-2',
    name: {
      ar: 'ورشة الخياطة الذكية',
      en: 'Smart Atelier',
    } satisfies Bilingual,
    capability: {
      ar: 'نماذج أولية للملابس الفاخرة + دمج BNPL',
      en: 'Luxury prototyping + BNPL-ready fulfilment',
    } satisfies Bilingual,
    turnaround: '96h',
    status: 'syncing',
  },
  {
    id: 'm-3',
    name: {
      ar: 'مصنع المنسوجات المستدامة',
      en: 'Sustain Fab Factory',
    } satisfies Bilingual,
    capability: {
      ar: 'مواد معاد تدويرها • تتبع سلسلة الإمداد على Polygon',
      en: 'Recycled fibers • Polygon supply-chain tracing',
    } satisfies Bilingual,
    turnaround: '120h',
    status: 'pending',
  },
] as const;

export const nftDrops = [
  {
    id: 'nft-1',
    title: {
      ar: 'عباءة أثير',
      en: 'Ather Abaya',
    } satisfies Bilingual,
    priceTft: 320,
    type: 'auction',
    endsIn: '5h 44m',
    edition: 12,
    badge: 'Polygon',
  },
  {
    id: 'nft-2',
    title: {
      ar: 'بدلة نيوم الحضرية',
      en: 'NEOM Urban Suit',
    } satisfies Bilingual,
    priceTft: 210,
    type: 'fixed',
    endsIn: 'Open',
    edition: 50,
    badge: 'Verified',
  },
  {
    id: 'nft-3',
    title: {
      ar: 'مجموعة أورا',
      en: 'Aura Capsule',
    } satisfies Bilingual,
    priceTft: 540,
    type: 'auction',
    endsIn: '1d 3h',
    edition: 8,
    badge: 'Reserve',
  },
] as const;

export const walletActivity = [
  {
    id: 'tx-1',
    label: {
      ar: 'تسوية عقد مصنع نسيج 4.0',
      en: 'Settlement – Fabrication 4.0',
    } satisfies Bilingual,
    amount: '-145 TFT',
    timestamp: 'قبل 12 دقيقة',
    type: 'debit',
  },
  {
    id: 'tx-2',
    label: {
      ar: 'إيرادات مصمم – عباءة أثير',
      en: 'Designer Revenue – Ather Abaya',
    } satisfies Bilingual,
    amount: '+320 TFT',
    timestamp: 'قبل ساعتين',
    type: 'credit',
  },
  {
    id: 'tx-3',
    label: {
      ar: 'ربط BNPL مع تابي',
      en: 'BNPL Settlement – Taby',
    } satisfies Bilingual,
    amount: '+1,200 SAR',
    timestamp: 'قبل يوم واحد',
    type: 'credit',
  },
] as const;
