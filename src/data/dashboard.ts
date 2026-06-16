export const FILTER_OPTIONS = {
  reportType: [
    { value: "nearmiss",    label: "Near Miss" },
    { value: "observation", label: "Observation" },
    { value: "incident",    label: "Incident" },
  ],
  reportCategory: [
    { value: "technical",  label: "Texnik hisobot" },
    { value: "financial",  label: "Moliyaviy hisobot" },
    { value: "dangerous",  label: "Xavfli harakatlar" },
  ],
  riskCategory: [
    { value: "fire",       label: "Yong'in xavfi" },
    { value: "electric",   label: "Elektr xavfi" },
    { value: "ecological", label: "Ekologik xavf" },
  ],
  severity: [
    { value: "high",   label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low",    label: "Low" },
  ],
  department: [
    { value: "metallurgy",  label: "Metallurgiya bo'limi" },
    { value: "enrichment",  label: "Boyitish majmuasi" },
    { value: "mining",      label: "Konchilik bo'limi" },
  ],
};

export const KPI_DATA = [
  {
    key: "nearmiss",
    label: "Near Miss",
    count: 142,
    prev: 118,
    borderColor: "border-l-orange-500",
    iconBg: "bg-orange-100 dark:bg-orange-900/30",
    color: "text-orange-600 dark:text-orange-400",
  },
  {
    key: "observation",
    label: "Observation",
    count: 98,
    prev: 112,
    borderColor: "border-l-sky-500",
    iconBg: "bg-sky-100 dark:bg-sky-900/30",
    color: "text-sky-600 dark:text-sky-400",
  },
  {
    key: "accident",
    label: "Accident",
    count: 23,
    prev: 19,
    borderColor: "border-l-red-500",
    iconBg: "bg-red-100 dark:bg-red-900/30",
    color: "text-red-600 dark:text-red-400",
  },
  {
    key: "incident",
    label: "Incident",
    count: 57,
    prev: 61,
    borderColor: "border-l-violet-500",
    iconBg: "bg-violet-100 dark:bg-violet-900/30",
    color: "text-violet-600 dark:text-violet-400",
  },
];

export const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export const STACKED_BAR_DATA = {
  newReports:  [28,35,42,31,50,47,38,55,44,60,52,48],
  prevReports: [22,28,35,40,38,42,30,48,36,52,44,40],
};

export const CATEGORY_ANALYSIS_DATA = [
  { status: "New Report",  nearmiss: 38, observation: 25, accident: 7,  incident: 14 },
  { status: "Accepted",    nearmiss: 30, observation: 20, accident: 5,  incident: 10 },
  { status: "In-progress", nearmiss: 42, observation: 28, accident: 6,  incident: 18 },
  { status: "Cancelled",   nearmiss: 12, observation: 10, accident: 2,  incident: 6  },
  { status: "Completed",   nearmiss: 20, observation: 15, accident: 3,  incident: 9  },
];

export const STAFF_DATA = [
  { name: "Ishchilar", amount: 320 },
  { name: "Adminlar",  amount: 45  },
];
