import Image from "next/image";
import Link from "next/link";
import { copy } from "@/lib/copy";
import { PublicMoto } from "@/lib/clickgarage/types";

interface HomeHeroProps {
  heroMoto: PublicMoto | null;
}

const HeroChip: React.FC<{ label: string }> = ({ label }) => (
  <li className="flex items-center gap-2 text-sm text-chrome-foreground/90 lg:justify-end">
    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
    {label}
  </li>
);

export const HomeHero: React.FC<HomeHeroProps> = ({ heroMoto }) => (
  <section className="relative overflow-hidden bg-chrome text-chrome-foreground">
    <div
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_50%,rgb(198_255_0_/_0.08),transparent_55%)]"
      aria-hidden="true"
    />
    <div
      className="pointer-events-none absolute inset-0 bg-gradient-to-r from-chrome from-30% via-transparent to-transparent lg:from-40%"
      aria-hidden="true"
    />
    <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-10 md:px-6 md:py-12 lg:grid-cols-12 lg:items-center lg:gap-6 lg:py-14 xl:py-16">
      <div className="flex flex-col gap-4 md:gap-5 lg:col-span-4 xl:col-span-4">
        <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-chrome-muted uppercase">
          {copy.home.heroKicker}
          <span className="h-px w-8 bg-accent" aria-hidden="true" />
        </p>
        <h1 className="text-display font-bold tracking-tight">
          {copy.home.heroTitleLead}{" "}
          <span className="text-accent">{copy.home.heroTitleAccent}</span>
        </h1>
        <p className="max-w-prose text-base text-chrome-muted md:text-lg">{copy.home.heroBody}</p>
        <div>
          <Link
            href="#estoque"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-accent-cta px-6 py-3 text-sm font-bold focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-chrome focus-visible:outline-none"
          >
            {copy.home.heroCta}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div className="relative mx-auto aspect-[16/10] w-full max-w-lg lg:col-span-5 lg:mx-0 lg:max-w-none lg:aspect-[5/3] xl:col-span-5">
        {heroMoto?.imagemPrincipal ? (
          <Image
            src={heroMoto.imagemPrincipal}
            alt={heroMoto.titulo}
            fill
            className="object-contain object-center drop-shadow-[0_24px_48px_rgb(0_0_0_/_0.45)]"
            sizes="(max-width: 1024px) 90vw, 520px"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-chrome-border text-sm text-chrome-muted">
            {copy.card.noPhoto}
          </div>
        )}
      </div>

      <ul className="flex flex-col gap-3 lg:col-span-3 lg:items-end lg:text-right xl:col-span-3">
        <HeroChip label={copy.home.heroChip1} />
        <HeroChip label={copy.home.heroChip2} />
        <HeroChip label={copy.home.heroChip3} />
      </ul>
    </div>
  </section>
);
