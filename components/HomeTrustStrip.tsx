import { copy } from "@/lib/copy";

interface TrustItem {
  title: string;
  body: string;
}

const TRUST_ITEMS: TrustItem[] = [
  { title: copy.trust.item1Title, body: copy.trust.item1Body },
  { title: copy.trust.item2Title, body: copy.trust.item2Body },
  { title: copy.trust.item3Title, body: copy.trust.item3Body },
  { title: copy.trust.item4Title, body: copy.trust.item4Body },
];

export const HomeTrustStrip: React.FC = () => (
  <section className="border-t border-chrome-border bg-chrome text-chrome-foreground">
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-2 md:px-6 lg:grid-cols-4 lg:gap-8 lg:py-10">
      {TRUST_ITEMS.map((item) => (
        <div key={item.title} className="flex flex-col gap-1">
          <p className="text-sm font-bold text-accent">{item.title}</p>
          <p className="text-sm text-chrome-muted">{item.body}</p>
        </div>
      ))}
    </div>
  </section>
);
