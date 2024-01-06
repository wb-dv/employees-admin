import { Group, GroupValue, JobTitle, JobValue } from '@prisma/client';

export const groups: Group[] = [
  { value: 'management', label: 'Руководство' },
  { value: 'development', label: 'Разработка' },
  { value: 'marketing', label: 'Маркетинг' },
  { value: 'accounting', label: 'Бухгалтерия' },
  { value: 'hr', label: 'Отдел кадров' },
];

export const jobTitles: Record<JobValue, JobTitle> = {
  director: { value: 'director', label: 'Директор' },
  financeDirector: {
    value: 'financeDirector',
    label: 'Финансовый директор',
  },
  technialDirector: {
    value: 'technialDirector',
    label: 'Технический директор',
  },
  marketingDirector: {
    value: 'marketingDirector',
    label: 'Директор по маркетингу',
  },
  headOfHR: {
    value: 'headOfHR',
    label: 'Директор отдела кадров',
  },
  manager: { value: 'manager', label: 'Менеджер' },

  teamLeader: {
    value: 'teamLeader',
    label: 'Руководитель команды разработки',
  },
  juniorDeveloper: {
    value: 'juniorDeveloper',
    label: 'Младший разработчик',
  },
  developer: {
    value: 'developer',
    label: 'Разработчик',
  },
  seniorDeveloper: {
    value: 'seniorDeveloper',
    label: 'Старший разработчик',
  },

  accountant: {
    value: 'accountant',
    label: 'Бухгалтер',
  },
  seniorAccountant: {
    value: 'seniorAccountant',
    label: 'Старший бухгалтер',
  },
  chiefAccountant: {
    value: 'chiefAccountant',
    label: 'Главный бухгалтер',
  },

  markentingAndAdvertisingManager: {
    value: 'markentingAndAdvertisingManager',
    label: 'Менеджер по маркетингу и рекламе',
  },
  assistantOfMarketing: {
    value: 'assistantOfMarketing',
    label: 'Ассистент маркетинга',
  },
  brandAmbassador: {
    value: 'brandAmbassador',
    label: 'Бренд-амбассадор',
  },
  analyst: { value: 'analyst', label: 'Аналитик' },
  juniorAnalyst: {
    value: 'juniorAnalyst',
    label: 'Младший аналитик',
  },
  seniorAnalyst: {
    value: 'seniorAnalyst',
    label: 'Старший аналитик',
  },
  seoSpecialist: {
    value: 'seoSpecialist',
    label: 'SEO-специалист',
  },
  targetAdvertisingSpecialist: {
    value: 'targetAdvertisingSpecialist',
    label: 'Таргетолог',
  },
  copywriter: {
    value: 'copywriter',
    label: 'Копирайтер',
  },

  hrManager: {
    value: 'hrManager',
    label: 'Менеджер по персоналу',
  },
  hrInspector: {
    value: 'hrInspector',
    label: 'Инспектор по персоналу',
  },
  recruiter: { value: 'recruiter', label: 'Рекрутер' },
};

export const jobsTitlesByGroup: Record<GroupValue, JobTitle[]> = {
  management: [
    jobTitles.director,
    jobTitles.financeDirector,
    jobTitles.technialDirector,
    jobTitles.manager,
    jobTitles.teamLeader,
    jobTitles.chiefAccountant,
    jobTitles.marketingDirector,
    jobTitles.headOfHR,
  ],

  development: [
    jobTitles.teamLeader,
    jobTitles.juniorDeveloper,
    jobTitles.developer,
    jobTitles.seniorDeveloper,
  ],

  marketing: [
    jobTitles.marketingDirector,
    jobTitles.assistantOfMarketing,
    jobTitles.brandAmbassador,
    jobTitles.analyst,
    jobTitles.juniorAnalyst,
    jobTitles.seniorAnalyst,
    jobTitles.markentingAndAdvertisingManager,
    jobTitles.seoSpecialist,
    jobTitles.targetAdvertisingSpecialist,
    jobTitles.copywriter,
  ],

  accounting: [
    jobTitles.financeDirector,
    jobTitles.chiefAccountant,
    jobTitles.accountant,
    jobTitles.seniorAccountant,
  ],

  hr: [
    jobTitles.headOfHR,
    jobTitles.hrManager,
    jobTitles.hrInspector,
    jobTitles.recruiter,
  ],
};

export const groupsByJobTitle: Record<JobValue, GroupValue[]> = {
  director: ['management'],
  financeDirector: ['management', 'accounting'],
  technialDirector: ['management', 'development'],
  marketingDirector: ['management', 'marketing'],
  headOfHR: ['management', 'hr'],
  manager: ['management'],

  teamLeader: ['management', 'development'],
  juniorDeveloper: ['development'],
  developer: ['development'],
  seniorDeveloper: ['development'],

  accountant: ['accounting'],
  seniorAccountant: ['accounting'],
  chiefAccountant: ['management', 'accounting'],

  markentingAndAdvertisingManager: ['marketing'],
  assistantOfMarketing: ['marketing'],
  brandAmbassador: ['marketing'],
  analyst: ['marketing'],
  juniorAnalyst: ['marketing'],
  seniorAnalyst: ['marketing'],
  seoSpecialist: ['marketing'],
  targetAdvertisingSpecialist: ['marketing'],
  copywriter: ['marketing'],

  hrManager: ['hr'],
  hrInspector: ['hr'],
  recruiter: ['hr'],
};
