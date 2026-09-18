import { WhatsAppButton } from "@/components/WhatsAppButton";
import { copy } from "@/lib/copy";

interface EmptyStateProps {
  whatsappHref: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ whatsappHref }) => (
  <div className="mx-auto max-w-prose rounded-2xl border border-stone bg-surface px-4 py-8 text-center md:px-6 md:py-12">
    <h2 className="text-display font-semibold text-foreground">{copy.empty.title}</h2>
    <p className="mt-2 text-moss">{copy.empty.body}</p>
    <div className="mt-4 flex justify-center">
      <WhatsAppButton href={whatsappHref} label={copy.whatsapp} />
    </div>
  </div>
);
