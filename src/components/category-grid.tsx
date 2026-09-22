import { Link } from "@/i18n/navigation";
import { loc } from "@/lib/locale-text";
import { CATEGORIES } from "@/lib/taxonomy";
import { CategoryIcon } from "./category-icon";

export function CategoryGrid({ locale, compact = false }: { locale: string; compact?: boolean }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {CATEGORIES.map((category) => (
        <li key={category.id}>
          <Link
            href={`/client/jobs/new?category=${category.id}`}
            className={`flex h-full flex-col items-start rounded-3xl bg-mist transition hover:bg-[#E7F6FC] ${compact ? "min-h-[148px] p-5" : "p-5"}`}
          >
            <span className="grid size-12 place-items-center rounded-full bg-white text-accent">
              <CategoryIcon id={category.id} />
            </span>
            <span className="mt-5 text-[17px] font-bold leading-snug">{loc(locale, category.name)}</span>
            {!compact && (
              <span className="mt-1 text-sm leading-relaxed text-ink/65">{loc(locale, category.blurb)}</span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}