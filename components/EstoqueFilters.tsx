"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { copy } from "@/lib/copy";

interface EstoqueFiltersProps {
  marcas: string[];
  busca: string;
  marca: string;
  valorMax: string;
}

const PRICE_BANDS: { value: string; label: string }[] = [
  { value: "", label: copy.filters.anyPrice },
  { value: "40000", label: copy.filters.priceUpTo("R$ 40.000") },
  { value: "60000", label: copy.filters.priceUpTo("R$ 60.000") },
  { value: "80000", label: copy.filters.priceUpTo("R$ 80.000") },
  { value: "100000", label: copy.filters.priceUpTo("R$ 100.000") },
  { value: "150000", label: copy.filters.priceUpTo("R$ 150.000") },
];

const fieldClassName =
  "min-h-[44px] w-full rounded-lg border border-chrome-border bg-chrome/80 px-3 py-2 text-base text-chrome-foreground placeholder:text-chrome-muted md:text-sm";

export const EstoqueFilters: React.FC<EstoqueFiltersProps> = ({
  marcas,
  busca,
  marca,
  valorMax,
}) => {
  const router = useRouter();

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const params = new URLSearchParams();
    const fields = ["busca", "marca", "valorMax"];
    fields.forEach((field) => {
      const value = String(form.get(field) ?? "").trim();
      if (value) {
        params.set(field, value);
      }
    });
    const query = params.toString();
    router.push(query ? `/?${query}` : "/");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto grid max-w-6xl grid-cols-1 gap-3 rounded-2xl border border-chrome-border bg-chrome px-4 py-4 shadow-lg sm:grid-cols-2 md:px-5 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="filter-busca" className="text-xs font-medium text-chrome-muted">
          {copy.filters.model}
        </label>
        <input
          id="filter-busca"
          name="busca"
          defaultValue={busca}
          placeholder={copy.searchPlaceholder}
          className={fieldClassName}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="filter-marca" className="text-xs font-medium text-chrome-muted">
          {copy.filters.category}
        </label>
        <select id="filter-marca" name="marca" defaultValue={marca} className={fieldClassName}>
          <option value="">{copy.filters.todasMarcas}</option>
          {marcas.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="filter-valor" className="text-xs font-medium text-chrome-muted">
          {copy.filters.priceBand}
        </label>
        <select id="filter-valor" name="valorMax" defaultValue={valorMax} className={fieldClassName}>
          {PRICE_BANDS.map((band) => (
            <option key={band.value || "all"} value={band.value}>
              {band.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2 sm:col-span-2 lg:col-span-1">
        <button
          type="submit"
          className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-accent-cta px-5 text-base font-bold focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-chrome focus-visible:outline-none md:text-sm"
        >
          {copy.filters.buscar}
        </button>
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center justify-center text-center text-sm text-chrome-muted hover:text-chrome-foreground"
        >
          {copy.filters.limpar}
        </Link>
      </div>
    </form>
  );
};
