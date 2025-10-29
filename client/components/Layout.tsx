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
    <div className="flex h-screen bg-gray-100">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto bg-white">
          <div className="px-2 py-1.5 sm:px-2.5 sm:py-2 md:px-3 md:py-2.5 max-w-full w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
