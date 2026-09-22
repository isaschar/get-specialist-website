import type { CategoryId, CityId, Role } from "./types";
import type { Localized } from "./types";

export type Person = {
  id: string;
  role: Role;
  name: Localized;
  company?: Localized;
  phone: string;
  categories: CategoryId[];
  cities: CityId[];
  rating?: number;
  jobsCompleted?: number;
};

export const PEOPLE: Person[] = [
  {
    id: "maya",
    role: "client",
    name: { en: "Maya R.", he: "מאיה ר." },
    phone: "050-000-0101",
    categories: [],
    cities: ["tel_aviv"],
  },
  {
    id: "yonatan",
    role: "client",
    name: { en: "Yonatan S.", he: "יונתן ש." },
    phone: "050-000-0102",
    categories: [],
    cities: ["haifa"],
  },
  {
    id: "noa",
    role: "client",
    name: { en: "Noa L.", he: "נועה ל." },
    phone: "050-000-0103",
    categories: [],
    cities: ["jerusalem"],
  },
  {
    id: "avi",
    role: "pro",
    name: { en: "Avi K.", he: "אבי ק." },
    company: { en: "Avi Plumbing Co.", he: "אבי שירותי אינסטלציה" },
    phone: "050-000-0201",
    categories: ["plumbing", "handyman"],
    cities: ["tel_aviv"],
    rating: 4.9,
    jobsCompleted: 128,
  },
  {
    id: "david",
    role: "pro",
    name: { en: "David M.", he: "דוד מ." },
    company: { en: "David Keys", he: "מפתחות דוד" },
    phone: "050-000-0202",
    categories: ["locksmith"],
    cities: ["jerusalem"],
    rating: 4.8,
    jobsCompleted: 86,
  },
];

export function personById(id: string | null | undefined): Person | undefined {
  if (!id) return undefined;
  return PEOPLE.find((person) => person.id === id);
}

export function peopleByRole(role: Role): Person[] {
  return PEOPLE.filter((person) => person.role === role);
}
