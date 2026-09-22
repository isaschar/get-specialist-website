import { Link } from "@/i18n/navigation";
import { loc } from "@/lib/locale-text";
import { CATEGORIES } from "@/lib/taxonomy";
import { CategoryIcon } from "./category-icon";

export function CategoryGrid({ locale }: { locale: string }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {CATEGORIES.map((category) => (
        <li key={category.id}>
          <Link
            href={`/client/jobs/new?category=${category.id}`}
            className="flex h-full gap-3 rounded-3xl border border-line bg-paper p-4 transition hover:border-accent"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-mist text-accent">
              <CategoryIcon id={category.id} />
            </span>
            <span>
              <span className="block font-extrabold">{loc(locale, category.name)}</span>
              <span className="mt-1 block text-sm leading-relaxed text-ink/70">
                {loc(locale, category.blurb)}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
