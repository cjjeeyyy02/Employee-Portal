import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ViewContextType {
  isManagerView: boolean;
  setIsManagerView: (value: boolean) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (value: boolean) => void;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export function ViewProvider({ children }: { children: ReactNode }) {
  const [isManagerView, setIsManagerView] = useState(() => {
    const stored = localStorage.getItem("isManagerView");
    return stored ? JSON.parse(stored) : true;
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    localStorage.setItem("isManagerView", JSON.stringify(isManagerView));
  }, [isManagerView]);

  return (
    <ViewContext.Provider
      value={{
        isManagerView,
        setIsManagerView,
        sidebarCollapsed,
        setSidebarCollapsed,
      }}
    >
      {children}
    </ViewContext.Provider>
  );
}

export function useView() {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error("useView must be used within ViewProvider");
  }
  return context;
}
