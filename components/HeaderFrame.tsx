import { ReactNode } from "react";

interface HeaderFrameProps {
  children: ReactNode;
}

export const HeaderFrame: React.FC<HeaderFrameProps> = ({ children }) => (
  <header className="sticky top-0 z-50 w-full overflow-visible border-b border-chrome-border bg-chrome text-chrome-foreground shadow-sm">
    {children}
  </header>
);
