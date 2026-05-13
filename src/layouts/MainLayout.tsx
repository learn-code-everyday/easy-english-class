import { ReactNode } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LiveChatSupport from "@/components/LiveChatSupport";

interface LayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--app-bg)] text-slate-950">
      <Header />
      <div className="flex-1 pt-[72px]">{children}</div>
      <LiveChatSupport />
      <Footer />
    </div>
  );
}
