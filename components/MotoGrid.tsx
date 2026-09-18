import { MotoCard } from "@/components/MotoCard";
import { PublicMoto } from "@/lib/clickgarage/types";

interface MotoGridProps {
  motos: PublicMoto[];
}

export const MotoGrid: React.FC<MotoGridProps> = ({ motos }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
    {motos.map((moto) => {
      const detailHref = `/motos/${moto.id}`;
      return (
        <MotoCard key={moto.id} moto={moto} detailHref={detailHref} />
      );
    })}
  </div>
);
