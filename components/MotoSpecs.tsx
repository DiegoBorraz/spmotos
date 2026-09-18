import { copy } from "@/lib/copy";
import { formatKm } from "@/lib/format";
import { PublicMoto } from "@/lib/clickgarage/types";

interface MotoSpecsProps {
  moto: PublicMoto;
}

interface SpecItem {
  label: string;
  value: string;
}

export const MotoSpecs: React.FC<MotoSpecsProps> = ({ moto }) => {
  const items: SpecItem[] = [
    { label: copy.detail.year, value: String(moto.anoModelo) },
    { label: copy.detail.km, value: formatKm(moto.km) },
    { label: copy.detail.color, value: moto.cor },
    { label: copy.detail.engine, value: `${moto.motor} cc` },
    { label: copy.detail.gearbox, value: moto.cambio },
    { label: copy.detail.fuel, value: moto.combustivel },
    { label: copy.detail.origin, value: moto.proveniencia },
  ];

  return (
    <section>
      <h2 className="mb-2 text-base font-semibold text-foreground md:mb-3 md:text-lg">{copy.detail.specs}</h2>
      <dl className="grid grid-cols-2 gap-2 text-sm md:gap-3">
        {items.map((item) => (
          <div key={item.label} className="rounded-xl border border-stone bg-muted p-2 md:p-3">
            <dt className="text-moss">{item.label}</dt>
            <dd className="font-medium text-foreground">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};
