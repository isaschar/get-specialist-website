import type { CategoryId, CityId, JobStatus, LifecycleStage } from "./types";
import type { Localized } from "./types";

export type Category = {
  id: CategoryId;
  name: Localized;
  blurb: Localized;
};

export const CATEGORIES: Category[] = [
  {
    id: "plumbing",
    name: { en: "Plumbing", he: "אינסטלציה" },
    blurb: {
      en: "Leaks, clogs, boilers, and bathroom fixes — fast local help.",
      he: "נזילות, סתימות, דודי שמש ותיקוני אמבטיה — עזרה מקומית ומהירה.",
    },
  },
  {
    id: "electricity",
    name: { en: "Electricity", he: "חשמל" },
    blurb: {
      en: "Outlets, panels, lighting, and safe electrical troubleshooting.",
      he: "שקעים, לוחות חשמל, תאורה ואיתור תקלות — בבטיחות.",
    },
  },
  {
    id: "hvac",
    name: { en: "HVAC", he: "מיזוג אוויר" },
    blurb: {
      en: "AC install, service, and heating/cooling tune-ups for Israeli summers.",
      he: "התקנה, תחזוקה וטיפול במזגנים — במיוחד לקיץ הישראלי.",
    },
  },
  {
    id: "locksmith",
    name: { en: "Locksmith", he: "מנעולנות" },
    blurb: {
      en: "Locked out? Keys, locks, and door security — day or night.",
      he: "ננעלתם בחוץ? מפתחות, מנעולים ואבטחת דלתות — יום ולילה.",
    },
  },
  {
    id: "painting",
    name: { en: "Painting", he: "צביעה" },
    blurb: {
      en: "Walls, touch-ups, and full-room refresh with clean finish.",
      he: "קירות, תיקונים וריענון חדרים — גימור נקי ומסודר.",
    },
  },
  {
    id: "cleaning",
    name: { en: "Cleaning", he: "ניקיון" },
    blurb: {
      en: "Home deep-clean, move-out clean, and recurring tidy-ups.",
      he: "ניקיון יסודי, ניקיון לפני מסירה, ותחזוקה שוטפת.",
    },
  },
  {
    id: "appliances",
    name: { en: "Appliances", he: "מוצרי חשמל ביתיים" },
    blurb: {
      en: "Washers, fridges, ovens — diagnosis and repair at home.",
      he: "מכונות כביסה, מקררים, תנורים — אבחון ותיקון בבית.",
    },
  },
  {
    id: "moving",
    name: { en: "Moving", he: "הובלות" },
    blurb: {
      en: "Local moves, packing help, and careful furniture handling.",
      he: "הובלות מקומיות, עזרה באריזה וטיפול זהיר ברהיטים.",
    },
  },
  {
    id: "handyman",
    name: { en: "Handyman", he: "שיפוצניק / תיקונים קטנים" },
    blurb: {
      en: "Small fixes that pile up — shelves, doors, mounts, and more.",
      he: "תיקונים קטנים שמצטברים — מדפים, דלתות, תלייה ועוד.",
    },
  },
  {
    id: "pest",
    name: { en: "Pest Control", he: "הדברה" },
    blurb: {
      en: "Ants, rodents, and seasonal pests — treated with care.",
      he: "נמלים, מכרסמים ומזיקים עונתיים — טיפול מקצועי ובזהירות.",
    },
  },
  {
    id: "gardening",
    name: { en: "Gardening", he: "גינון" },
    blurb: {
      en: "Lawn, plants, pruning, and balcony greenery maintenance.",
      he: "דשא, צמחים, גיזום ותחזוקת ירק במרפסת ובגינה.",
    },
  },
];

export const CITIES: { id: CityId; name: Localized }[] = [
  { id: "tel_aviv", name: { en: "Tel Aviv-Yafo", he: "תל אביב-יפו" } },
  { id: "jerusalem", name: { en: "Jerusalem", he: "ירושלים" } },
  { id: "haifa", name: { en: "Haifa", he: "חיפה" } },
];

export function categoryById(id: CategoryId): Category {
  const found = CATEGORIES.find((item) => item.id === id);
  if (!found) throw new Error(`Unknown category ${id}`);
  return found;
}

export function cityById(id: CityId) {
  const found = CITIES.find((item) => item.id === id);
  if (!found) throw new Error(`Unknown city ${id}`);
  return found;
}

export function lifecycleOf(status: JobStatus): LifecycleStage {
  switch (status) {
    case "DRAFT":
    case "POSTED":
    case "MATCHING":
    case "OFFERED":
    case "UNFILLED":
      return "pending";
    case "MATCHED":
    case "ACCEPTED":
    case "CONFIRMED":
      return "assigned";
    case "EN_ROUTE":
    case "ON_SITE":
    case "IN_PROGRESS":
      return "in_progress";
    case "COMPLETED_PRO":
    case "COMPLETED":
    case "RATED":
      return "completed";
    case "CANCELLED_CLIENT":
    case "CANCELLED_PRO":
    case "CANCELLED_DISPATCH":
      return "cancelled";
    case "DISPUTED":
      return "disputed";
  }
}

export function emphasizesEmergency(category: CategoryId): boolean {
  return category === "locksmith" || category === "hvac";
}
