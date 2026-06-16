import { DayData, DayReport } from "@/types/calendar";

function r(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const DEPARTMENTS = ["Metallurgiya bo'limi","Boyitish majmuasi","Konchilik bo'limi"];
const RISK_CATS   = ["Yong'in xavfi","Elektr xavfi","Ekologik xavf"];
const USERS = [
  { name: "Aziza Karimova",  avatar: "https://avatar.vercel.sh/aziza"  },
  { name: "Jasur Toshmatov", avatar: "https://avatar.vercel.sh/jasur"  },
  { name: "Malika Yusupova", avatar: "https://avatar.vercel.sh/malika" },
  { name: "Bobur Rahimov",   avatar: "https://avatar.vercel.sh/bobur"  },
  { name: "Nilufar Hasanova",avatar: "https://avatar.vercel.sh/nilufar"},
];

const SAMPLE: Record<string,{title:string;description:string}[]> = {
  nearmiss:    [{title:"Quvur bosim tushishi",description:"3-uchastka yaqinida bosim tushishi."},{title:"Kran nosozligi",description:"Kran to'satdan ishdan chiqdi."}],
  observation: [{title:"Himoya vositalari yetishmayapti",description:"Ishchilar shlyapa kiymasdan ishlayapti."},{title:"Yo'lda yog' oqishi",description:"Zavod yo'lida moy oqishi aniqlandi."}],
  accident:    [{title:"Yiqilish hodisasi",description:"Ishchi narvondan yiqildi."},{title:"Qo'l jarohati",description:"Kesuvchi asbobdan qo'l jarohatlandi."}],
  incident:    [{title:"Elektr toki urilishi",description:"Texnik xodim tok urganligi."},{title:"Gaz sizishi",description:"Qozonxonada gaz hidi sezildi."}],
};

function genReports(
  date: string,
  count: number,
  type: "nearmiss"|"observation"|"accident"|"incident",
): DayReport[] {
  const statuses  = ["new","accepted","in-progress","cancelled","completed"] as const;
  const severities= ["high","medium","low"] as const;
  return Array.from({length:count},(_,i)=>{
    const s = SAMPLE[type][i % SAMPLE[type].length];
    return {
      id:`${date}-${type}-${i}`,
      title:s.title, description:s.description, type,
      status:     statuses[r(0,4)],
      severity:   severities[r(0,2)],
      department: DEPARTMENTS[r(0,2)],
      riskCategory:RISK_CATS[r(0,2)],
      createdBy:  USERS[r(0,4)],
      time:`${String(r(8,17)).padStart(2,"0")}:${String(r(0,59)).padStart(2,"0")}`,
    };
  });
}

export function generateMonthData(year:number,month:number):DayData[]{
  const days = new Date(year,month+1,0).getDate();
  return Array.from({length:days},(_,idx)=>{
    const day  = idx+1;
    const date = `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
    const dow  = new Date(date).getDay();
    if([0,6].includes(dow)&&Math.random()<0.4)
      return{date,nearmiss:0,observation:0,accident:0,incident:0,reports:[]};
    const nm=r(0,12),ob=r(0,18),ac=r(0,5),inc=r(0,7);
    return{
      date,nearmiss:nm,observation:ob,accident:ac,incident:inc,
      reports:[
        ...genReports(date,nm,"nearmiss"),
        ...genReports(date,ob,"observation"),
        ...genReports(date,ac,"accident"),
        ...genReports(date,inc,"incident"),
      ],
    };
  });
}

export function getDayState(d:DayData):"empty"|"critical"|"warning"|"normal"{
  if(d.nearmiss===0&&d.observation===0&&d.accident===0&&d.incident===0) return "empty";
  if(d.accident>=4||d.incident>=5) return "critical";
  if(d.accident>=2||d.incident>=3) return "warning";
  return "normal";
}

export const CALENDAR_FILTER_OPTIONS = {
  reportType:   [{value:"nearmiss",label:"Near Miss"},{value:"observation",label:"Observation"},{value:"accident",label:"Accident"},{value:"incident",label:"Incident"}],
  riskCategory: [{value:"fire",label:"Yong'in xavfi"},{value:"electric",label:"Elektr xavfi"},{value:"ecological",label:"Ekologik xavf"}],
  department:   [{value:"metallurgy",label:"Metallurgiya bo'limi"},{value:"enrichment",label:"Boyitish majmuasi"},{value:"mining",label:"Konchilik bo'limi"}],
  severity:     [{value:"high",label:"High"},{value:"medium",label:"Medium"},{value:"low",label:"Low"}],
  status:       [{value:"new",label:"Yangi"},{value:"accepted",label:"Qabul qilingan"},{value:"in-progress",label:"Jarayonda"},{value:"cancelled",label:"Bekor qilingan"},{value:"completed",label:"Yakunlangan"}],
};

export const CALENDAR_KPI = [
  {key:"nearmiss",   label:"Near Miss",   count:142,prev:118, color:"text-orange-600 dark:text-orange-400", iconBg:"bg-orange-100 dark:bg-orange-900/30", border:"border-l-orange-500"},
  {key:"observation",label:"Observation", count:98, prev:112, color:"text-sky-600 dark:text-sky-400",       iconBg:"bg-sky-100 dark:bg-sky-900/30",       border:"border-l-sky-500"},
  {key:"accident",   label:"Accident",    count:23, prev:19,  color:"text-red-600 dark:text-red-400",       iconBg:"bg-red-100 dark:bg-red-900/30",       border:"border-l-red-500"},
  {key:"incident",   label:"Incident",    count:57, prev:61,  color:"text-violet-600 dark:text-violet-400", iconBg:"bg-violet-100 dark:bg-violet-900/30", border:"border-l-violet-500"},
];
