// ── KPI Row 1: Report turlari ─────────────────────────────────────────────
export const ADMIN_TYPE_KPI = [
  { key: "nearmiss",    label: "Near Miss",   count: 48,  prev: 39,  borderColor: "border-l-orange-500", iconBg: "bg-orange-100 dark:bg-orange-900/30", color: "text-orange-600 dark:text-orange-400" },
  { key: "observation", label: "Observation", count: 31,  prev: 37,  borderColor: "border-l-sky-500",    iconBg: "bg-sky-100 dark:bg-sky-900/30",       color: "text-sky-600 dark:text-sky-400"       },
  { key: "accident",    label: "Accident",    count: 9,   prev: 7,   borderColor: "border-l-red-500",    iconBg: "bg-red-100 dark:bg-red-900/30",       color: "text-red-600 dark:text-red-400"       },
  { key: "incident",    label: "Incident",    count: 18,  prev: 21,  borderColor: "border-l-violet-500", iconBg: "bg-violet-100 dark:bg-violet-900/30", color: "text-violet-600 dark:text-violet-400" },
];

// ── KPI Row 2: Status ──────────────────────────────────────────────────────
export const ADMIN_STATUS_KPI = [
  { key: "new",          label: "Yangi",           count: 12, prev: 8,  dot: "bg-blue-500",   iconBg: "bg-blue-50 dark:bg-blue-900/20",     color: "text-blue-600 dark:text-blue-400"     },
  { key: "accepted",     label: "Qabul qilingan",  count: 18, prev: 15, dot: "bg-violet-500", iconBg: "bg-violet-50 dark:bg-violet-900/20", color: "text-violet-600 dark:text-violet-400" },
  { key: "in-progress",  label: "Jarayonda",       count: 24, prev: 20, dot: "bg-amber-500",  iconBg: "bg-amber-50 dark:bg-amber-900/20",   color: "text-amber-600 dark:text-amber-400"   },
  { key: "cancelled",    label: "Bekor qilingan",  count: 5,  prev: 8,  dot: "bg-red-500",    iconBg: "bg-red-50 dark:bg-red-900/20",       color: "text-red-600 dark:text-red-400"       },
  { key: "completed",    label: "Yakunlangan",     count: 47, prev: 38, dot: "bg-green-500",  iconBg: "bg-green-50 dark:bg-green-900/20",   color: "text-green-600 dark:text-green-400"   },
];

// ── Chart data ─────────────────────────────────────────────────────────────
export const CHART_PERIODS = [
  { key: "daily",   label: "Kunlik"   },
  { key: "weekly",  label: "Haftalik" },
  { key: "monthly", label: "Oylik"    },
  { key: "yearly",  label: "Yillik"   },
];

export const ANALYTICS_DATA: Record<string, {
  categories: string[];
  nearmiss: number[];
  observation: number[];
  accident: number[];
  incident: number[];
}> = {
  daily: {
    categories: ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"],
    nearmiss:    [5, 7, 4, 8, 6, 3, 2],
    observation: [3, 4, 6, 5, 4, 2, 1],
    accident:    [1, 0, 2, 1, 0, 1, 0],
    incident:    [2, 3, 1, 2, 4, 1, 1],
  },
  weekly: {
    categories: ["1-hafta", "2-hafta", "3-hafta", "4-hafta"],
    nearmiss:    [18, 22, 15, 20],
    observation: [12, 16, 10, 14],
    accident:    [3,  2,  4,  2],
    incident:    [6,  8,  5,  9],
  },
  monthly: {
    categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    nearmiss:    [12,15,10,18,14,16,11,20,17,22,19,16],
    observation: [8, 10, 7, 12, 9, 11, 8, 14,12,15,13,11],
    accident:    [2,  1, 3,  2, 1,  3, 2,  2, 3, 2, 1, 3],
    incident:    [4,  5, 3,  6, 5,  4, 3,  7, 5, 8, 6, 5],
  },
  yearly: {
    categories: ["2022", "2023", "2024", "2025", "2026"],
    nearmiss:    [98, 120, 135, 142, 48],
    observation: [72,  88,  95, 105, 31],
    accident:    [18,  22,  20,  25,  9],
    incident:    [35,  42,  50,  58, 18],
  },
};

// ── Report distribution ────────────────────────────────────────────────────
export const DISTRIBUTION_DATA = [
  {
    type: "nearmiss", label: "Near Miss", total: 48, color: "#F97316",
    statuses: [
      { label: "Yangi",          count: 12, color: "#3B82F6" },
      { label: "Qabul qilingan", count: 10, color: "#8B5CF6" },
      { label: "Jarayonda",      count: 14, color: "#F59E0B" },
      { label: "Bekor qilingan", count: 2,  color: "#EF4444" },
      { label: "Yakunlangan",    count: 10, color: "#22C55E" },
    ],
  },
  {
    type: "observation", label: "Observation", total: 31, color: "#0EA5E9",
    statuses: [
      { label: "Yangi",          count: 5,  color: "#3B82F6" },
      { label: "Qabul qilingan", count: 8,  color: "#8B5CF6" },
      { label: "Jarayonda",      count: 9,  color: "#F59E0B" },
      { label: "Bekor qilingan", count: 2,  color: "#EF4444" },
      { label: "Yakunlangan",    count: 7,  color: "#22C55E" },
    ],
  },
  {
    type: "accident", label: "Accident", total: 9, color: "#EF4444",
    statuses: [
      { label: "Yangi",          count: 2, color: "#3B82F6" },
      { label: "Qabul qilingan", count: 2, color: "#8B5CF6" },
      { label: "Jarayonda",      count: 3, color: "#F59E0B" },
      { label: "Bekor qilingan", count: 1, color: "#EF4444" },
      { label: "Yakunlangan",    count: 1, color: "#22C55E" },
    ],
  },
  {
    type: "incident", label: "Incident", total: 18, color: "#8B5CF6",
    statuses: [
      { label: "Yangi",          count: 4, color: "#3B82F6" },
      { label: "Qabul qilingan", count: 5, color: "#8B5CF6" },
      { label: "Jarayonda",      count: 5, color: "#F59E0B" },
      { label: "Bekor qilingan", count: 2, color: "#EF4444" },
      { label: "Yakunlangan",    count: 2, color: "#22C55E" },
    ],
  },
];

// ── Recent activity ────────────────────────────────────────────────────────
export const RECENT_ACTIVITY = [
  { id: "a1", type: "created",   user: "Aziza Karimova",  action: "Near Miss hisoboti yaratdi",       reportId: "RPT-010", time: "Hozir",           dotColor: "#3B82F6" },
  { id: "a2", type: "accepted",  user: "Sardor Mirzayev", action: "Incident hisobotini qabul qildi",  reportId: "RPT-006", time: "5 daqiqa oldin",  dotColor: "#8B5CF6" },
  { id: "a3", type: "completed", user: "Admin",           action: "Observation hisobotini yakunladi", reportId: "RPT-008", time: "22 daqiqa oldin", dotColor: "#22C55E" },
  { id: "a4", type: "created",   user: "Jasur Toshmatov", action: "Accident hisoboti yaratdi",        reportId: "RPT-005", time: "1 soat oldin",    dotColor: "#EF4444" },
  { id: "a5", type: "progress",  user: "Malika Yusupova", action: "Hisobot jarayonga o'tkazildi",     reportId: "RPT-003", time: "2 soat oldin",    dotColor: "#F59E0B" },
  { id: "a6", type: "completed", user: "Kamola Ergasheva",action: "Near Miss hisoboti yakunlandi",    reportId: "RPT-007", time: "3 soat oldin",    dotColor: "#22C55E" },
];

// ── Quick actions: faqat label, href, colorClass ───────────────────────────
// icon'larni page.tsx da e'lon qilamiz (TSX kerak)
export const QUICK_ACTION_ITEMS = [
  { label: "Hisobot yaratish", href: "/admin/reports",    colorClass: "bg-primary text-white hover:bg-opacity-90",                                                                                iconKey: "plus"     },
];
