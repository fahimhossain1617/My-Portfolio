"use client";

import { useEffect } from "react";
import { initWaves } from "@/lib/waves-background";

export function WaveBackground() {
  useEffect(() => {
    // #home is the hero section id, footer is the footer selector
    const cleanup = initWaves({ hero: "#home, #hero", footer: "footer" });

    return () => {
      cleanup?.();
    };
  }, []);

  return null;
}
