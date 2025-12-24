"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SlideProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const slideVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const fadeScaleVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const slideInLeftVariants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function Slide({ children, className = "", id }: SlideProps) {
  return (
    <motion.section
      id={id}
      className={`min-h-screen w-full flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 scroll-snap-align-start ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={slideVariants}
      style={{ scrollSnapAlign: "start" }}
    >
      {children}
    </motion.section>
  );
}

export function SlideTitle({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <motion.h1
      variants={fadeUpVariants}
      className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight ${
        accent ? "text-[var(--accent)]" : "text-white"
      }`}
    >
      {children}
    </motion.h1>
  );
}

export function SlideSubtitle({ children }: { children: ReactNode }) {
  return (
    <motion.h2
      variants={fadeUpVariants}
      className="text-xl md:text-2xl lg:text-3xl font-medium text-[var(--muted)] mb-6"
    >
      {children}
    </motion.h2>
  );
}

export function SlideText({ children, highlight = false }: { children: ReactNode; highlight?: boolean }) {
  return (
    <motion.p
      variants={fadeUpVariants}
      className={`text-lg md:text-xl leading-relaxed max-w-3xl ${
        highlight ? "text-[var(--accent)]" : "text-white/80"
      }`}
    >
      {children}
    </motion.p>
  );
}

export function SlideList({ items }: { items: string[] }) {
  return (
    <motion.ul variants={fadeUpVariants} className="space-y-3 mt-6">
      {items.map((item, index) => (
        <motion.li
          key={index}
          variants={slideInLeftVariants}
          className="flex items-start gap-3 text-lg md:text-xl text-white/80"
        >
          <span className="text-[var(--accent)] mt-1">—</span>
          <span>{item}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}

export function SlideCard({ title, items, result }: { title: string; items: string[]; result?: string }) {
  return (
    <motion.div
      variants={fadeScaleVariants}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="bg-[var(--card)] rounded-2xl p-6 md:p-8 border border-white/10"
    >
      <h3 className="text-xl md:text-2xl font-semibold text-[var(--accent)] mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-white/70">
            <span className="text-[var(--accent)]">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {result && (
        <div className="mt-6 pt-4 border-t border-white/10">
          <span className="text-[var(--muted)] text-sm uppercase tracking-wider">Результат:</span>
          <p className="text-white font-medium mt-1">{result}</p>
        </div>
      )}
    </motion.div>
  );
}

export function SlideGrid({ children, cols = 2 }: { children: ReactNode; cols?: number }) {
  const gridCols = cols === 3 ? "md:grid-cols-3" : cols === 4 ? "md:grid-cols-4" : "md:grid-cols-2";
  return (
    <motion.div variants={fadeUpVariants} className={`grid grid-cols-1 ${gridCols} gap-6 mt-8`}>
      {children}
    </motion.div>
  );
}

export function SlideBadge({ children }: { children: ReactNode }) {
  return (
    <motion.span
      variants={fadeScaleVariants}
      className="inline-block mt-10 px-6 py-3 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full text-sm font-medium border border-[var(--accent)]/30"
    >
      {children}
    </motion.span>
  );
}

export function SlideNumber({ number, label }: { number: string; label: string }) {
  return (
    <motion.div variants={fadeScaleVariants} className="text-center">
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--accent)]">{number}</div>
      <div className="text-[var(--muted)] mt-2 text-sm md:text-base">{label}</div>
    </motion.div>
  );
}
