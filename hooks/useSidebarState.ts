import { useState, useEffect } from "react";
import { useUiStore } from "@/store";
import { usePathname } from "next/navigation";
import { SidebarItem } from "@/lib/sidebar/core";

const safeParse = (value: string | null) => {
  try {
    return value ? JSON.parse(value) : {};
  } catch {
    return {};
  }
};

export function useSidebarState(visibleNav: SidebarItem[] = []) {
  const pathname = usePathname();
  const { sidebarCollapsed, setSidebarCollapsed, mobileNavOpen, setMobileNavOpen } = useUiStore();

  // Persist submenu open state across page refreshes
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    return safeParse(localStorage.getItem("tp_sidebar_openMenus"));
  });

  // Sync openMenus to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("tp_sidebar_openMenus", JSON.stringify(openMenus));
  }, [openMenus]);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname, setMobileNavOpen]);

  // Auto-open active section and auto-scroll on route change or nav data load
  useEffect(() => {
    if (!visibleNav.length) return;

    const activeItem = visibleNav.find(item =>
      item.subItems?.some(sub =>
        pathname === sub.href || pathname.startsWith(sub.href + "/")
      )
    );
    
    if (activeItem?.key) {
      setOpenMenus(prev => ({ ...prev, [activeItem.key]: true }));
    }

    // Auto-scroll active item into view
    setTimeout(() => {
      const activeEl = document.querySelector("[data-active='true']");
      activeEl?.scrollIntoView({ block: "center", behavior: "smooth" });
    }, 100);
  }, [pathname, visibleNav]); 

  const toggleSubmenu = (key: string, e: React.MouseEvent) => {
    e.preventDefault();
    setOpenMenus(prev => ({ ...prev, [key]: !prev[key] }));
    if (sidebarCollapsed) setSidebarCollapsed(false);
  };

  return {
    openMenus,
    toggleSubmenu,
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileNavOpen,
    setMobileNavOpen,
    setOpenMenus
  };
}
