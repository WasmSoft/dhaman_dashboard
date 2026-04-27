"use client";

import * as React from "react";

const MOBILE_BREAKPOINT = 768;

// AR: يحدد هذا الـ hook متى يجب عرض واجهة الجوال للمكونات المشتركة مثل الشريط الجانبي.
// EN: This hook detects when shared components such as the sidebar should use the mobile UI.
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.innerWidth < MOBILE_BREAKPOINT;
  });

  React.useEffect(() => {
    const mediaQueryList = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(mediaQueryList.matches);
    };

    mediaQueryList.addEventListener("change", onChange);

    return () => mediaQueryList.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
