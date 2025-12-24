export interface SlideData {
  id: string;
  title: string;
  type: "hero" | "text" | "list" | "cards" | "grid" | "kpi" | "final" | "about" | "philosophy" | "solutions" | "service" | "section-header" | "process" | "tech-stack" | "strategy" | "timeline";
  subtitle?: string;
  content?: string;
  items?: string[];
  cards?: {
    title: string;
    items: string[];
    result?: string;
  }[];
  kpis?: {
    number: string;
    label: string;
  }[];
  badge?: string;
  technologies?: {
    category: string;
    items: {
      name: string;
      logo: string;
    }[];
  }[];
  stages?: {
    title: string;
    items: string[];
  }[];
}

export const slides: SlideData[] = [
  {
    id: "hero",
    title: "goQode",
    type: "hero",
    badge: "Digital Partner",
  },
  {
    id: "about",
    title: "Общее описание",
    type: "about",
    content: "goQode — digital-агентство полного цикла, специализирующееся на создании, запуске и развитии цифровых продуктов и маркетинг-систем под бизнес-задачи.",
    subtitle: "Агентство работает на стыке:",
    items: [
      "стратегии",
      "UX/UI",
      "веб- и платформенной разработки",
      "маркетинга",
      "автоматизации",
      "аналитики",
    ],
    badge: "Фокус goQode — не отдельные услуги, а целостные цифровые решения, которые приносят измеримый результат.",
    kpis: [
      { number: "~6 000 €", label: "Средний чек проектов" },
      { number: "Средние и сложные", label: "Тип проектов" },
    ],
  },
  {
    id: "philosophy",
    title: "Позиционирование и философия",
    type: "philosophy",
    cards: [
      {
        title: "Подход",
        items: [
          "goQode не продаёт сайты, рекламу или технологии по отдельности.",
          "Агентство проектирует систему, в которой каждый элемент работает на бизнес-цель клиента.",
        ],
      },
      {
        title: "Принцип",
        items: [
          "Веб-разработка и маркетинг не разделяются.",
          "Они являются частями одного решения и работают синхронно.",
        ],
      },
      {
        title: "Роль агентства",
        items: [
          "goQode выступает не как подрядчик, а как цифровой партнёр бизнеса.",
        ],
      },
    ],
  },
  {
    id: "solutions",
    title: "Архитектура предложений",
    type: "solutions",
    content: "Все предложения агентства структурированы не по типу услуг, а по типам задач, с которыми приходит клиент.",
    subtitle: "Основные решения:",
    items: [
      "Запуск бизнеса",
      "Рост продаж",
      "Онлайн-платформы",
      "Event-решения",
      "Автоматизация",
      "Брендинг",
      "Поддержка и развитие",
    ],
  },
  {
    id: "details",
    title: "Детализация решений",
    type: "section-header",
    content: "Подробный разбор каждого направления работы агентства",
  },
  {
    id: "service-launch",
    title: "Запуск бизнеса",
    type: "service",
    badge: "01",
    content: "Вывести продукт или компанию на рынок с правильно выстроенной цифровой базой.",
    subtitle: "Состав решения:",
    items: [
      "аналитика ниши и целевой аудитории",
      "UX-архитектура",
      "UI-дизайн",
      "разработка сайта или платформы",
      "подключение аналитики",
      "первичная маркетинговая настройка",
      "формирование воронки",
    ],
    cards: [
      {
        title: "Результат",
        items: ["готовая цифровая точка продаж"],
      },
    ],
  },
  {
    id: "service-sales",
    title: "Рост продаж",
    type: "service",
    badge: "02",
    content: "Масштабировать продажи через системный маркетинг и конверсионные инструменты.",
    subtitle: "Состав решения:",
    items: [
      "аудит текущих каналов",
      "разработка маркетинговой стратегии",
      "настройка рекламных кампаний",
      "оптимизация воронки продаж",
      "A/B тестирование",
      "ретаргетинг и лидогенерация",
      "аналитика и отчётность",
    ],
    cards: [
      {
        title: "Результат",
        items: ["рост конверсии и выручки"],
      },
    ],
  },
  {
    id: "service-platforms",
    title: "Онлайн-платформы",
    type: "service",
    badge: "03",
    content: "Создать функциональную платформу: маркетплейс, личный кабинет, SaaS-продукт.",
    subtitle: "Состав решения:",
    items: [
      "бизнес-анализ и проектирование",
      "UX/UI дизайн платформы",
      "разработка MVP",
      "интеграция платёжных систем",
      "панель администратора",
      "API и интеграции",
      "масштабирование и поддержка",
    ],
    cards: [
      {
        title: "Результат",
        items: ["работающий цифровой продукт"],
      },
    ],
  },
  {
    id: "service-events",
    title: "Event-решения",
    type: "service",
    badge: "04",
    content: "Цифровое сопровождение мероприятий: от лендингов до систем регистрации.",
    subtitle: "Состав решения:",
    items: [
      "лендинг мероприятия",
      "система онлайн-регистрации",
      "интеграция с CRM",
      "email и SMS-рассылки",
      "QR-коды и бейджи",
      "мобильное приложение события",
      "аналитика участников",
    ],
    cards: [
      {
        title: "Результат",
        items: ["полный цифровой цикл мероприятия"],
      },
    ],
  },
  {
    id: "service-automation",
    title: "Автоматизация",
    type: "service",
    badge: "05",
    content: "Оптимизировать процессы через интеграции, CRM, чат-боты и внутренние системы.",
    subtitle: "Состав решения:",
    items: [
      "аудит бизнес-процессов",
      "внедрение CRM-систем",
      "настройка интеграций",
      "разработка чат-ботов",
      "автоматизация рассылок",
      "внутренние порталы и инструменты",
      "документация и обучение",
    ],
    cards: [
      {
        title: "Результат",
        items: ["экономия времени и ресурсов"],
      },
    ],
  },
  {
    id: "service-branding",
    title: "Брендинг",
    type: "service",
    badge: "06",
    content: "Создать или обновить визуальную и коммуникационную идентичность бренда.",
    subtitle: "Состав решения:",
    items: [
      "стратегия позиционирования",
      "нейминг и слоган",
      "логотип и фирменный стиль",
      "брендбук",
      "дизайн носителей",
      "tone of voice",
      "адаптация для digital",
    ],
    cards: [
      {
        title: "Результат",
        items: ["целостный образ бренда"],
      },
    ],
  },
  {
    id: "service-support",
    title: "Поддержка и развитие",
    type: "service",
    badge: "07",
    content: "Обеспечить стабильную работу и развитие существующих цифровых продуктов.",
    subtitle: "Состав решения:",
    items: [
      "техническая поддержка",
      "мониторинг и безопасность",
      "регулярные обновления",
      "доработка функционала",
      "оптимизация производительности",
      "консультации и аналитика",
      "SLA-соглашения",
    ],
    cards: [
      {
        title: "Результат",
        items: ["надёжная работа и развитие продукта"],
      },
    ],
  },
  {
    id: "experience",
    title: "Отраслевой и продуктовый опыт",
    type: "section-header",
    content: "goQode создаёт веб-сайты, онлайн-платформы и мобильные приложения любой сложности",
    subtitle: "От отдельных решений до комплексных цифровых экосистем",
    items: [
      "Корпоративные сайты и e-commerce",
      "SaaS-сервисы, личные кабинеты, CRM",
      "Билетные системы и платформы бронирования",
      "iOS / Android мобильные приложения",
    ],
  },
  {
    id: "process",
    title: "Процесс работы",
    type: "process",
    content: "Работа над каждым проектом строится по этапам",
    subtitle: "Процесс прозрачен, масштабируем и адаптируется под проект",
    items: [
      "Аналитика",
      "Стратегия",
      "UX-проектирование",
      "UI-дизайн",
      "Разработка",
      "Интеграции",
      "Тестирование",
      "Запуск",
      "Поддержка и рост",
    ],
  },
  {
    id: "tech-stack",
    title: "Технологическая база",
    type: "tech-stack",
    content: "Технологии используются как инструмент, а не как продукт",
    technologies: [
      {
        category: "Frontend",
        items: [
          { name: "React", logo: "/React-icon.svg" },
          { name: "Next.js", logo: "https://svgl.app/library/nextjs_icon_dark.svg" },
        ],
      },
      {
        category: "Backend",
        items: [
          { name: "Node.js", logo: "https://svgl.app/library/nodejs.svg" },
          { name: "Express", logo: "https://svgl.app/library/expressjs_dark.svg" },
          { name: "Fastify", logo: "https://svgl.app/library/fastify_dark.svg" },
          { name: "NestJS", logo: "https://svgl.app/library/nestjs.svg" },
        ],
      },
      {
        category: "Mobile",
        items: [
          { name: "Flutter", logo: "https://svgl.app/library/flutter.svg" },
        ],
      },
      {
        category: "CMS",
        items: [
          { name: "Webflow", logo: "https://svgl.app/library/webflow.svg" },
          { name: "WordPress", logo: "https://svgl.app/library/wordpress.svg" },
        ],
      },
      {
        category: "Databases",
        items: [
          { name: "PostgreSQL", logo: "https://svgl.app/library/postgresql.svg" },
          { name: "Supabase", logo: "https://svgl.app/library/supabase.svg" },
          { name: "Firebase", logo: "https://svgl.app/library/firebase.svg" },
        ],
      },
      {
        category: "Integrations",
        items: [
          { name: "API", logo: "" },
          { name: "Payments", logo: "" },
          { name: "CRM", logo: "" },
        ],
      },
    ],
  },
  {
    id: "strategy",
    title: "Стратегия запуска",
    type: "strategy",
    content: "Закрепить goQode на рынке как агентство цифровых решений с фокусом на системный подход и проекты от 6 000 €",
    badge: "Цель",
  },
  {
    id: "strategy-stages",
    title: "Этапы запуска",
    type: "timeline",
    stages: [
      {
        title: "Подготовка",
        items: [
          "Фиксация позиционирования",
          "Архитектура сайта по решениям",
          "Подготовка кейсов",
          "Создание презентационных материалов",
        ],
      },
      {
        title: "Запуск",
        items: [
          "Публикация сайта",
          "Soft launch через контакты",
          "Публичный анонс",
          "Первые входящие диалоги",
        ],
      },
      {
        title: "Закрепление",
        items: [
          "Усиление кейсов цифрами",
          "Формирование доверия",
          "Повторные продажи",
          "Систематизация через CRM",
        ],
      },
      {
        title: "Масштабирование",
        items: [
          "Фокус на ключевые отрасли",
          "Расширение команды",
          "Развитие бренда",
        ],
      },
    ],
  },
  {
    id: "final",
    title: "goQode",
    type: "final",
    content: "Digital-агентство полного цикла, которое объединяет стратегию, UX, разработку, маркетинг и аналитику в единую систему роста бизнеса.",
  },
];
