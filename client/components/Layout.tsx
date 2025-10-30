import { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useView } from "@/context/ViewContext";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isManagerView } = useView();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - hidden on mobile, shown on desktop */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto bg-white">
          <div className="px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 max-w-full w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
