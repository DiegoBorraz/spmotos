interface WhatsAppButtonProps {
  href: string;
  label: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-accent-cta px-4 py-2 text-sm font-bold hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page focus-visible:outline-none sm:w-fit"
  >
    {label}
  </a>
);
