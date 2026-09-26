import { ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
  width?: "default" | "prose";
}

export const PageShell: React.FC<PageShellProps> = ({ children, width = "default" }) => (
  <div
    className="site-container min-w-0 w-full overflow-x-clip bg-page py-[var(--page-py)] md:py-10 2xl:py-12"
  >
    {width === "prose" ? (
      <div className="mx-auto w-full min-w-0 max-w-prose">{children}</div>
    ) : (
      children
    )}
  </div>
);
