"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface NavigationProps {
  slides: { id: string; title: string }[];
  currentSlide: number;
  showNavbar?: boolean;
  onSlideClick?: (index: number) => void;
}

export function Navigation({ slides, currentSlide, showNavbar = true, onSlideClick }: NavigationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Top Navigation */}
      {showNavbar && (
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: isVisible ? 0 : -100 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-[var(--background)]/80 backdrop-blur-md border-b border-white/5"
        >
          <Image src="/logo.svg" alt="goQode" width={120} height={40} />
          <div className="hidden md:flex items-center gap-2 text-sm text-[var(--muted)]">
            <span className="text-[var(--accent)] font-medium">{String(currentSlide + 1).padStart(2, "0")}</span>
            <span>/</span>
            <span>{String(slides.length).padStart(2, "0")}</span>
          </div>
        </motion.nav>
      )}

      {/* Side Dots Navigation */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
        {slides.map((slide, index) => (
          <a
            key={slide.id}
            href={`#${slide.id}`}
            className="group relative flex items-center justify-end"
          >
            <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity text-sm text-white/60 whitespace-nowrap">
              {slide.title}
            </span>
            <motion.div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "bg-[var(--accent)] scale-125"
                  : "bg-white/30 hover:bg-white/50"
              }`}
              whileHover={{ scale: 1.5 }}
            />
          </a>
        ))}
      </div>

          </>
  );
}
