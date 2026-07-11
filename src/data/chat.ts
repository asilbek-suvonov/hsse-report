import { ChatMessage, ChatUser, MediaItem } from "@/types/chat";

export const CHAT_USERS: ChatUser[] = [
  {
    id: "u1", name: "Aziza Karimova",  avatar: "https://avatar.vercel.sh/aziza",
    role: "Admin", status: "online", lastSeen: "Hozir",
    bio: "HSSE bo'limi rahbari. Xavfsizlik va muhit nazorati mutaxassisi.",
    phone: "+998 90 123 45 67", email: "aziza@hsse.uz", department: "HSSE bo'limi",
  },
  {
    id: "u2", name: "Jasur Toshmatov", avatar: "https://avatar.vercel.sh/jasur",
    role: "Xodim", status: "away", lastSeen: "10 daqiqa oldin",
    bio: "Metallurgiya bo'limi mutaxassisi.",
    phone: "+998 91 234 56 78", email: "jasur@hsse.uz", department: "Metallurgiya bo'limi",
  },
  {
    id: "u3", name: "Malika Yusupova", avatar: "https://avatar.vercel.sh/malika",
    role: "Manager", status: "online", lastSeen: "Hozir",
    bio: "HR bo'limi rahbari. Xodimlar menejment mutaxassisi.",
    phone: "+998 93 345 67 89", email: "malika@hsse.uz", department: "HR bo'limi",
  },
  {
    id: "u4", name: "Bobur Rahimov",   avatar: "https://avatar.vercel.sh/bobur",
    role: "Xodim", status: "offline", lastSeen: "2 soat oldin",
    bio: "IT bo'limi mutaxassisi.",
    phone: "+998 94 456 78 90", email: "bobur@hsse.uz", department: "IT bo'limi",
  },
  {
    id: "u5", name: "Nilufar Hasanova", avatar: "https://avatar.vercel.sh/nilufar",
    role: "Admin", status: "online", lastSeen: "Hozir",
    bio: "Moliya bo'limi rahbari.",
    phone: "+998 95 567 89 01", email: "nilufar@hsse.uz", department: "Moliya bo'limi",
  },
  {
    id: "u6", name: "Sardor Mirzayev", avatar: "https://avatar.vercel.sh/sardor",
    role: "Xodim", status: "offline", lastSeen: "Kecha",
    bio: "Konchilik bo'limi muhandisi.",
    phone: "+998 97 678 90 12", email: "sardor@hsse.uz", department: "Konchilik bo'limi",
  },
  {
    id: "u7", name: "Kamola Ergasheva", avatar: "https://avatar.vercel.sh/kamola",
    role: "Admin", status: "online", lastSeen: "Hozir",
    bio: "Andijon filiali HSSE rahbari.",
    phone: "+998 98 789 01 23", email: "kamola@hsse.uz", department: "HSSE bo'limi",
  },
  {
    id: "u8", name: "Otabek Normatov", avatar: "https://avatar.vercel.sh/otabek",
    role: "Xodim", status: "away", lastSeen: "30 daqiqa oldin",
    bio: "Boyitish majmuasi mutaxassisi.",
    phone: "+998 99 890 12 34", email: "otabek@hsse.uz", department: "Boyitish majmuasi",
  },
  {
    id: "u9", name: "Feruza Nazarova", avatar: "https://avatar.vercel.sh/feruza",
    role: "Xodim", status: "online", lastSeen: "Hozir",
    bio: "Huquq bo'limi mutaxassisi.",
    phone: "+998 90 901 23 45", email: "feruza@hsse.uz", department: "Huquq bo'limi",
  },
  {
    id: "u10", name: "Sherzod Alimov", avatar: "https://avatar.vercel.sh/sherzod",
    role: "Manager", status: "offline", lastSeen: "3 soat oldin",
    bio: "Logistika bo'limi rahbari.",
    phone: "+998 91 012 34 56", email: "sherzod@hsse.uz", department: "Logistika bo'limi",
  },
];

export const LAST_MESSAGES: Record<string, { text: string; time: string; unread: number }> = {
  u1:  { text: "Hisobot tayyor, ko'rib chiqishingiz mumkin",    time: "10:42", unread: 3 },
  u2:  { text: "Xavf darajasi ko'tarildi, choralar ko'rilsin",  time: "Kecha",  unread: 0 },
  u3:  { text: "Yangi trening materiallari yuborildi",          time: "Kecha",  unread: 1 },
  u4:  { text: "Tizimga kirishda muammo bor",                   time: "Dush",   unread: 0 },
  u5:  { text: "OK, tushunarlı. Rahmat!",                       time: "Yak",    unread: 0 },
  u6:  { text: "Yangi hodisa hisoboti yuborildi",               time: "Sha",    unread: 5 },
  u7:  { text: "Andijon filialida tekshiruv o'tkaziladi",       time: "09:15",  unread: 2 },
  u8:  { text: "Boyitish majmuasida muammo yo'q",               time: "08:30",  unread: 0 },
  u9:  { text: "Shartnoma tayyor imzolash uchun",               time: "Erta",   unread: 1 },
  u10: { text: "Yuk mashinasi kechikmoqda",                     time: "Chors",  unread: 0 },
};

export const MOCK_MESSAGES: Record<string, ChatMessage[]> = {
  u1: [
    { id:"m1", chatId:"u1", senderId:"u1", text:"Salom! Bugun yangi Near Miss hisobotini ko'rib chiqdingizmi?", type:"text", status:"read", timestamp:"10:15", date:"2026-06-15" },
    { id:"m2", chatId:"u1", senderId:"me", text:"Ha, ko'rib chiqdim. 3-uchastka bo'yicha jiddiy muammo ko'rinmoqda.", type:"text", status:"read", timestamp:"10:17", date:"2026-06-15" },
    { id:"m3", chatId:"u1", senderId:"u1", text:"To'g'ri. Zudlik bilan texnik guruhni chaqirishimiz kerak.", type:"text", status:"read", timestamp:"10:20", date:"2026-06-15" },
    { id:"m4", chatId:"u1", senderId:"me", text:"Yig'ilish soat 14:00 da bo'ladi.", type:"text", status:"read", timestamp:"10:25", date:"2026-06-15", reactions:[{emoji:"👍",count:1}] },
    { id:"m5", chatId:"u1", senderId:"u1", text:"Hisobot tayyor, ko'rib chiqishingiz mumkin", type:"text", status:"delivered", timestamp:"10:42", date:"2026-06-15" },
  ],
  u2: [
    { id:"m1", chatId:"u2", senderId:"u2", text:"Metallurgiya bo'limida kecha katta muammo yuz berdi.", type:"text", status:"read", timestamp:"09:00", date:"2026-06-14" },
    { id:"m2", chatId:"u2", senderId:"me", text:"Qanaqa muammo? Batafsil aytib bering.", type:"text", status:"read", timestamp:"09:05", date:"2026-06-14" },
    { id:"m3", chatId:"u2", senderId:"u2", text:"Xavf darajasi ko'tarildi, darhol choralar ko'rilsin", type:"text", status:"read", timestamp:"09:10", date:"2026-06-14" },
  ],
  u3: [
    { id:"m1", chatId:"u3", senderId:"u3", text:"Yangi xavfsizlik trening materiallari tayyor.", type:"text", status:"read", timestamp:"14:00", date:"2026-06-14" },
    { id:"m2", chatId:"u3", senderId:"me", text:"Qachon trening bo'ladi?", type:"text", status:"read", timestamp:"14:15", date:"2026-06-14" },
    { id:"m3", chatId:"u3", senderId:"u3", text:"Yangi trening materiallari yuborildi", type:"text", status:"delivered", timestamp:"14:30", date:"2026-06-14" },
  ],
  u4: [
    { id:"m1", chatId:"u4", senderId:"u4", text:"Tizimga kirishda muammo bor", type:"text", status:"read", timestamp:"11:00", date:"2026-06-13" },
    { id:"m2", chatId:"u4", senderId:"me", text:"Qanaqa xato?", type:"text", status:"read", timestamp:"11:05", date:"2026-06-13" },
  ],
  u5: [
    { id:"m1", chatId:"u5", senderId:"u5", text:"Moliyaviy hisobot uchun ma'lumotlar kerak.", type:"text", status:"read", timestamp:"15:00", date:"2026-06-12" },
    { id:"m2", chatId:"u5", senderId:"me", text:"Albatta, qaysi ma'lumotlar kerak?", type:"text", status:"read", timestamp:"15:10", date:"2026-06-12" },
    { id:"m3", chatId:"u5", senderId:"u5", text:"OK, tushunarlı. Rahmat!", type:"text", status:"read", timestamp:"15:30", date:"2026-06-12" },
  ],
  u6: [], u7: [], u8: [], u9: [], u10: [],
};

export const USER_MEDIA: MediaItem[] = [
  { id:"i1", type:"image", url:"https://picsum.photos/seed/a1/300/200", name:"report_photo.jpg", date:"2026-06-14" },
  { id:"i2", type:"image", url:"https://picsum.photos/seed/a2/300/200", name:"site_photo.jpg",   date:"2026-06-13" },
  { id:"i3", type:"image", url:"https://picsum.photos/seed/a3/300/200", name:"inspection.jpg",   date:"2026-06-12" },
  { id:"i4", type:"image", url:"https://picsum.photos/seed/a4/300/200", name:"hazard_zone.jpg",  date:"2026-06-11" },
  { id:"i5", type:"image", url:"https://picsum.photos/seed/a5/300/200", name:"equipment.jpg",    date:"2026-06-10" },
  { id:"i6", type:"image", url:"https://picsum.photos/seed/a6/300/200", name:"safety_gear.jpg",  date:"2026-06-09" },
  { id:"v1", type:"video", url:"#",  name:"inspection_video.mp4",  duration:"2:34", date:"2026-06-14" },
  { id:"v2", type:"video", url:"#",  name:"safety_training.mp4",   duration:"5:12", date:"2026-06-12" },
  { id:"v3", type:"video", url:"#",  name:"site_walkthrough.mp4",  duration:"3:45", date:"2026-06-10" },
  { id:"v4", type:"video", url:"#",  name:"equipment_demo.mp4",    duration:"1:58", date:"2026-06-08" },
  { id:"a1", type:"audio", url:"#",  name:"voice_note_1.ogg",  duration:"0:45", size:"120KB", date:"2026-06-14" },
  { id:"a2", type:"audio", url:"#",  name:"report_summary.ogg", duration:"1:23", size:"215KB", date:"2026-06-13" },
  { id:"a3", type:"audio", url:"#",  name:"meeting_record.ogg", duration:"4:10", size:"580KB", date:"2026-06-12" },
  { id:"a4", type:"audio", url:"#",  name:"instructions.ogg",  duration:"2:05", size:"290KB", date:"2026-06-11" },
];
