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
  const motorLabel = moto.motor.trim().length > 0 ? `${moto.motor} cc` : "—";

  const items: SpecItem[] = [
    { label: copy.detail.year, value: String(moto.anoModelo) },
    { label: copy.detail.km, value: formatKm(moto.km) },
    { label: copy.detail.color, value: moto.cor },
    { label: copy.detail.engine, value: motorLabel },
    { label: copy.detail.gearbox, value: moto.cambio },
    { label: copy.detail.fuel, value: moto.combustivel },
  ];

  if (moto.proveniencia.trim().length > 0) {
    items.push({ label: copy.detail.origin, value: moto.proveniencia });
  }

  return (
    <section className="min-w-0">
      <h2 className="text-section-title mb-2 text-foreground md:mb-3">{copy.detail.specs}</h2>
      <dl className="grid min-w-0 grid-cols-1 gap-2 text-sm min-[480px]:grid-cols-2 md:gap-3">
        {items.map((item) => (
          <div key={item.label} className="min-w-0 rounded-xl border border-stone bg-muted p-2 md:p-3">
            <dt className="text-moss">{item.label}</dt>
            <dd className="break-words font-medium text-foreground">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};
