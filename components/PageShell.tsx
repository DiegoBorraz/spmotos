import { ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
}

export const PageShell: React.FC<PageShellProps> = ({ children }) => (
  <div className="mx-auto w-full max-w-6xl bg-page px-4 py-6 md:px-6 md:py-10">{children}</div>
);
