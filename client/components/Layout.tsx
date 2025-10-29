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
        <main className="flex-1 overflow-y-auto bg-gray-100">
          <div className="p-2 sm:p-3 md:p-4 max-w-full lg:max-w-7xl lg:mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
