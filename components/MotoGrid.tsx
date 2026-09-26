import { MotoCard } from "@/components/MotoCard";
import { ListMotosParams, PublicMotoListItem } from "@/lib/clickgarage/types";
import { buildHomeMotoModalHref } from "@/lib/estoque-query";

interface MotoGridProps {
  motos: PublicMotoListItem[];
  listParams: ListMotosParams;
}

export const MotoGrid: React.FC<MotoGridProps> = ({ motos, listParams }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6 2xl:gap-7">
    {motos.map((moto, index) => {
      const detailHref = buildHomeMotoModalHref(listParams, moto.id);
      return (
        <MotoCard
          key={moto.id}
          moto={moto}
          detailHref={detailHref}
          priority={index === 0}
        />
      );
    })}
  </div>
);
