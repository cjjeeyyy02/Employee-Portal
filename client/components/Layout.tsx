import { ReactNode, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isManagerView, setIsManagerView] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isManagerView={isManagerView} setIsManagerView={setIsManagerView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header isManagerView={isManagerView} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
