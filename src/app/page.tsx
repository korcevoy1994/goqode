"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedLogo from "@/components/AnimatedLogo";
import {
  Slide,
  SlideTitle,
  SlideSubtitle,
  SlideText,
  SlideList,
  SlideCard,
  SlideGrid,
  SlideBadge,
  SlideNumber,
} from "@/components/Slide";
import LightPillar from "@/components/LightPillar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Navigation } from "@/components/Navigation";
import { slides } from "@/data/slides";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const slideHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      const newSlide = Math.round(scrollPosition / slideHeight);
      setCurrentSlide(Math.min(newSlide, slides.length - 1));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        const nextSlide = Math.min(currentSlide + 1, slides.length - 1);
        document.getElementById(slides[nextSlide].id)?.scrollIntoView({ behavior: "smooth" });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prevSlide = Math.max(currentSlide - 1, 0);
        document.getElementById(slides[prevSlide].id)?.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSlide]);

  const navSlides = slides.map((s) => ({ id: s.id, title: s.title }));

  return (
    <main className="bg-[var(--background)] relative">
      {/* Global Background */}
      <div className="fixed inset-0 z-0">
        <LightPillar
          topColor="#C9FD48"
          bottomColor="#56ab2f"
          intensity={0.8}
          rotationSpeed={0.3}
          glowAmount={0.002}
          pillarWidth={3}
          pillarHeight={0.4}
          noiseIntensity={0.5}
          pillarRotation={136}
          mixBlendMode="screen"
        />
      </div>

      <Navigation slides={navSlides} currentSlide={currentSlide} showNavbar={false} />

      {slides.map((slide) => {
        switch (slide.type) {
          case "hero":
            return (
              <Slide key={slide.id} id={slide.id} className="items-center text-center relative z-10">
                <div className="relative z-10 mb-8">
                  <AnimatedLogo width={400} height={143} />
                </div>
                {slide.badge && (
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="relative z-10 inline-block px-5 py-2 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full text-base font-medium border border-[var(--accent)]/30"
                  >
                    {slide.badge}
                  </motion.span>
                )}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="relative z-10 text-xl md:text-2xl text-[var(--muted)] mt-8 max-w-xl"
                >
                  {slide.subtitle}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 1 }}
                  className="absolute bottom-12 left-1/2 -translate-x-1/2"
                >
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-[var(--muted)]"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                  </motion.div>
                </motion.div>
              </Slide>
            );

          case "about":
            return (
              <Slide key={slide.id} id={slide.id} className="relative z-10">
                <div className="max-w-5xl mx-auto w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                  >
                    <Badge variant="outline" className="mb-6 text-[var(--accent)] border-[var(--accent)]/30">
                      goQode
                    </Badge>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8"
                  >
                    {slide.title}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="text-xl md:text-2xl text-white/70 mb-8 max-w-3xl"
                  >
                    {slide.content}
                  </motion.p>

                  {slide.subtitle && (
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      viewport={{ once: true }}
                      className="text-lg text-white/50 mb-6"
                    >
                      {slide.subtitle}
                    </motion.p>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                    {slide.items?.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          delay: 0.4 + index * 0.08,
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                        viewport={{ once: true }}
                      >
                        <Card className="bg-white/5 border-white/10 hover:border-[var(--accent)]/50 hover:bg-white/[0.08] transition-all duration-300">
                          <CardContent className="p-3 md:p-4 flex items-center">
                            <span className="text-[var(--accent)] text-base font-medium">{item}</span>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  {slide.badge && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      viewport={{ once: true }}
                      className="text-lg md:text-xl text-white/80 mb-12 max-w-3xl"
                    >
                      {slide.badge}
                    </motion.p>
                  )}

                  <div className="flex gap-8 md:gap-16">
                    {slide.kpis?.map((kpi, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          delay: 1 + index * 0.15,
                          duration: 0.6,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                        viewport={{ once: true }}
                        className="text-left"
                      >
                        <div className="text-3xl md:text-4xl font-bold text-[var(--accent)]">{kpi.number}</div>
                        <div className="text-[var(--muted)] mt-2">{kpi.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Slide>
            );

          case "service":
            return (
              <Slide key={slide.id} id={slide.id} className="relative z-10">
                <div className="max-w-5xl mx-auto w-full">
                  <div className="flex items-start gap-8">
                    {/* Left side - Number */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      viewport={{ once: true }}
                      className="hidden md:block"
                    >
                      <span className="text-8xl lg:text-9xl font-bold text-[var(--accent)]/20">
                        {slide.badge}
                      </span>
                    </motion.div>

                    {/* Right side - Content */}
                    <div className="flex-1">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true }}
                      >
                        <Badge variant="outline" className="mb-4 text-[var(--accent)] border-[var(--accent)]/30">
                          Задача
                        </Badge>
                      </motion.div>

                      <motion.h2
                        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
                      >
                        {slide.title}
                      </motion.h2>

                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true }}
                        className="text-xl text-white/70 mb-8"
                      >
                        {slide.content}
                      </motion.p>

                      {slide.subtitle && (
                        <motion.p
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          viewport={{ once: true }}
                          className="text-lg text-[var(--accent)] font-medium mb-6"
                        >
                          {slide.subtitle}
                        </motion.p>
                      )}

                      <motion.ul
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="space-y-3 mb-8"
                      >
                        {slide.items?.map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.4 + index * 0.08,
                              duration: 0.4,
                              ease: [0.22, 1, 0.36, 1]
                            }}
                            viewport={{ once: true }}
                            className="flex items-center gap-3 text-lg text-white/80"
                          >
                            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                            {item}
                          </motion.li>
                        ))}
                      </motion.ul>

                      {slide.cards?.[0] && (
                        <motion.div
                          initial={{ opacity: 0, y: 20, scale: 0.95 }}
                          whileInView={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: 0.8, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          viewport={{ once: true }}
                        >
                          <Card className="bg-[var(--accent)]/10 border-[var(--accent)]/30">
                            <CardContent className="p-6">
                              <span className="text-sm text-[var(--accent)] font-medium uppercase tracking-wider">
                                {slide.cards[0].title}
                              </span>
                              <p className="text-xl text-white font-semibold mt-2">
                                {slide.cards[0].items[0]}
                              </p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </Slide>
            );

          case "solutions":
            return (
              <Slide key={slide.id} id={slide.id} className="relative z-10">
                <div className="max-w-5xl mx-auto w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                  >
                    <Badge variant="outline" className="mb-6 text-[var(--accent)] border-[var(--accent)]/30">
                      goQode
                    </Badge>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                  >
                    {slide.title}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="text-xl text-white/70 mb-8 max-w-3xl"
                  >
                    {slide.content}
                  </motion.p>

                  {slide.subtitle && (
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      viewport={{ once: true }}
                      className="text-lg text-[var(--accent)] font-medium mb-8"
                    >
                      {slide.subtitle}
                    </motion.p>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {slide.items?.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          delay: 0.4 + index * 0.08,
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                        viewport={{ once: true }}
                      >
                        <Card className="bg-white/5 border-white/10 hover:border-[var(--accent)]/50 hover:bg-white/[0.08] transition-all duration-300 h-full group">
                          <CardContent className="p-6 h-full flex flex-col">
                            <span className="text-4xl font-bold text-[var(--accent)]/30 group-hover:text-[var(--accent)]/50 transition-colors mb-3">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <span className="text-white text-lg font-medium">{item}</span>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Slide>
            );

          case "philosophy":
            return (
              <Slide key={slide.id} id={slide.id} className="relative z-10">
                <div className="max-w-5xl mx-auto w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                  >
                    <Badge variant="outline" className="mb-6 text-[var(--accent)] border-[var(--accent)]/30">
                      goQode
                    </Badge>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
                  >
                    {slide.title}
                  </motion.h2>

                  <div className="space-y-4">
                    {slide.cards?.map((card, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.2 + index * 0.15,
                          duration: 0.6,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                        viewport={{ once: true }}
                      >
                        <Card className="bg-white/5 border-white/10 hover:border-[var(--accent)]/30 transition-all duration-300">
                          <CardContent className="p-4 md:p-5">
                            <h3 className="text-lg md:text-xl font-bold text-[var(--accent)] mb-2">
                              {card.title}
                            </h3>
                            <div className="space-y-1">
                              {card.items.map((item, itemIndex) => (
                                <p key={itemIndex} className="text-sm md:text-base text-white/80 leading-relaxed">
                                  {item}
                                </p>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                        {index < (slide.cards?.length || 0) - 1 && (
                          <Separator className="my-4 bg-white/10" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Slide>
            );

          case "section-header":
            return (
              <Slide key={slide.id} id={slide.id} className="items-center text-center relative z-10">
                <div className="max-w-4xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                  >
                    <Badge variant="outline" className="mb-6 text-[var(--accent)] border-[var(--accent)]/30">
                      goQode
                    </Badge>
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                  >
                    {slide.title}
                  </motion.h2>
                  {slide.content && (
                    <motion.p
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      viewport={{ once: true }}
                      className="text-xl md:text-2xl text-white/70 mb-8"
                    >
                      {slide.content}
                    </motion.p>
                  )}
                  {slide.items && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                      {slide.items.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20, scale: 0.95 }}
                          whileInView={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{
                            delay: 0.3 + index * 0.1,
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1]
                          }}
                          viewport={{ once: true }}
                          className="h-full"
                        >
                          <Card className="bg-white/5 border-white/10 hover:border-[var(--accent)]/50 transition-all duration-300 h-full">
                            <CardContent className="p-6 h-full flex items-center justify-center">
                              <span className="text-white text-lg">{item}</span>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  {slide.subtitle && slide.items && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                      viewport={{ once: true }}
                      className="text-lg text-[var(--accent)] mt-8 italic"
                    >
                      {slide.subtitle}
                    </motion.p>
                  )}
                </div>
              </Slide>
            );

          case "strategy":
            return (
              <Slide key={slide.id} id={slide.id} className="items-center text-center relative z-10">
                <div className="max-w-4xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="mb-8"
                  >
                    <span className="inline-block px-6 py-2 bg-[var(--accent)] text-[var(--background)] rounded-full text-sm font-bold uppercase tracking-wider">
                      {slide.badge}
                    </span>
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8"
                  >
                    {slide.title}
                  </motion.h2>
                  {slide.content && (
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/20 via-[var(--accent)]/10 to-transparent blur-3xl" />
                      <p className="relative text-2xl md:text-3xl text-white/90 leading-relaxed font-light">
                        {slide.content}
                      </p>
                    </motion.div>
                  )}
                </div>
              </Slide>
            );

          case "timeline":
            return (
              <Slide key={slide.id} id={slide.id} className="relative z-10">
                <div className="max-w-6xl mx-auto w-full">
                  <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12 text-center"
                  >
                    {slide.title}
                  </motion.h2>

                  {slide.stages && (
                    <div className="relative">
                      {/* Timeline line */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true }}
                        className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--accent)] via-[var(--accent)]/50 to-[var(--accent)]/20 origin-left hidden md:block"
                      />

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {slide.stages.map((stage, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: 0.3 + index * 0.2,
                              duration: 0.6,
                              ease: [0.22, 1, 0.36, 1]
                            }}
                            viewport={{ once: true }}
                            className="relative"
                          >
                            {/* Timeline dot */}
                            <motion.div
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              transition={{ delay: 0.5 + index * 0.2, duration: 0.4 }}
                              viewport={{ once: true }}
                              className="hidden md:flex w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--background)] border-2 border-[var(--accent)] items-center justify-center"
                            >
                              <span className="text-2xl font-bold text-[var(--accent)]">{index + 1}</span>
                            </motion.div>

                            <Card className="bg-white/5 border-white/10 hover:border-[var(--accent)]/50 transition-all duration-500 h-full group hover:bg-white/[0.08]">
                              <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4 md:justify-center">
                                  <span className="md:hidden w-8 h-8 flex items-center justify-center bg-[var(--accent)]/20 text-[var(--accent)] font-bold rounded-full">
                                    {index + 1}
                                  </span>
                                  <h3 className="text-xl font-semibold text-[var(--accent)] group-hover:text-white transition-colors">
                                    {stage.title}
                                  </h3>
                                </div>
                                <ul className="space-y-2">
                                  {stage.items.map((item, itemIndex) => (
                                    <motion.li
                                      key={itemIndex}
                                      initial={{ opacity: 0, x: -10 }}
                                      whileInView={{ opacity: 1, x: 0 }}
                                      transition={{
                                        delay: 0.6 + index * 0.2 + itemIndex * 0.05,
                                        duration: 0.3
                                      }}
                                      viewport={{ once: true }}
                                      className="text-white/70 text-sm flex items-start gap-2"
                                    >
                                      <span className="text-[var(--accent)] mt-1">•</span>
                                      {item}
                                    </motion.li>
                                  ))}
                                </ul>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Slide>
            );

          case "tech-stack":
            return (
              <Slide key={slide.id} id={slide.id} className="items-center text-center relative z-10">
                <div className="max-w-6xl mx-auto w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                  >
                    <Badge variant="outline" className="mb-6 text-[var(--accent)] border-[var(--accent)]/30">
                      goQode
                    </Badge>
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                  >
                    {slide.title}
                  </motion.h2>
                  {slide.content && (
                    <motion.p
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      viewport={{ once: true }}
                      className="text-xl md:text-2xl text-white/70 mb-12"
                    >
                      {slide.content}
                    </motion.p>
                  )}
                  {slide.technologies && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {slide.technologies.map((category, catIndex) => (
                        <motion.div
                          key={catIndex}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.3 + catIndex * 0.1,
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1]
                          }}
                          viewport={{ once: true }}
                        >
                          <Card className="bg-white/5 border-white/10 h-full">
                            <CardContent className="p-6">
                              <h3 className="text-[var(--accent)] font-medium text-sm uppercase tracking-wider mb-4">
                                {category.category}
                              </h3>
                              <div className="space-y-3">
                                {category.items.map((tech, techIndex) => (
                                  <motion.div
                                    key={techIndex}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{
                                      delay: 0.4 + catIndex * 0.1 + techIndex * 0.05,
                                      duration: 0.3
                                    }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-3 group"
                                  >
                                    <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                                      {tech.logo ? (
                                        <img
                                          src={tech.logo}
                                          alt={tech.name}
                                          className="w-5 h-5 object-contain"
                                        />
                                      ) : (
                                        <span className="text-[var(--accent)] text-xs font-bold">
                                          {tech.name.charAt(0)}
                                        </span>
                                      )}
                                    </div>
                                    <span className="text-white/80 text-sm">{tech.name}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </Slide>
            );

          case "process":
            return (
              <Slide key={slide.id} id={slide.id} className="items-center text-center relative z-10">
                <div className="max-w-6xl mx-auto w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                  >
                    <Badge variant="outline" className="mb-6 text-[var(--accent)] border-[var(--accent)]/30">
                      goQode
                    </Badge>
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                  >
                    {slide.title}
                  </motion.h2>
                  {slide.content && (
                    <motion.p
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      viewport={{ once: true }}
                      className="text-xl md:text-2xl text-white/70 mb-12"
                    >
                      {slide.content}
                    </motion.p>
                  )}
                  {slide.items && (
                    <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                      {slide.items.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: 0.3 + index * 0.08,
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1]
                          }}
                          viewport={{ once: true }}
                          className="flex items-center"
                        >
                          <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-full hover:border-[var(--accent)]/50 transition-all duration-300">
                            <span className="w-6 h-6 flex items-center justify-center bg-[var(--accent)]/20 text-[var(--accent)] text-sm font-bold rounded-full">
                              {index + 1}
                            </span>
                            <span className="text-white text-sm md:text-base">{item}</span>
                          </div>
                          {index < (slide.items?.length || 0) - 1 && (
                            <span className="text-[var(--accent)]/50 mx-1 hidden md:block">→</span>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                  {slide.subtitle && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 1, duration: 0.6 }}
                      viewport={{ once: true }}
                      className="text-lg text-white/50 mt-10"
                    >
                      {slide.subtitle}
                    </motion.p>
                  )}
                </div>
              </Slide>
            );

          case "text":
            return (
              <Slide key={slide.id} id={slide.id} className="relative z-10">
                <SlideTitle>{slide.title}</SlideTitle>
                {slide.content && <SlideText>{slide.content}</SlideText>}
                {slide.items && <SlideList items={slide.items} />}
              </Slide>
            );

          case "list":
            return (
              <Slide key={slide.id} id={slide.id} className="relative z-10">
                <SlideTitle>{slide.title}</SlideTitle>
                {slide.subtitle && <SlideSubtitle>{slide.subtitle}</SlideSubtitle>}
                {slide.items && <SlideList items={slide.items} />}
              </Slide>
            );

          case "cards":
            return (
              <Slide key={slide.id} id={slide.id} className="relative z-10">
                <SlideTitle>{slide.title}</SlideTitle>
                {slide.subtitle && <SlideSubtitle>{slide.subtitle}</SlideSubtitle>}
                <SlideGrid cols={slide.cards?.length === 1 ? 1 : 2}>
                  {slide.cards?.map((card, index) => (
                    <SlideCard key={index} title={card.title} items={card.items} result={card.result} />
                  ))}
                </SlideGrid>
              </Slide>
            );

          case "grid":
            return (
              <Slide key={slide.id} id={slide.id} className="relative z-10">
                <SlideTitle>{slide.title}</SlideTitle>
                {slide.subtitle && <SlideSubtitle>{slide.subtitle}</SlideSubtitle>}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8"
                >
                  {slide.items?.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(201, 253, 72, 0.1)" }}
                      className="bg-[var(--card)] p-4 md:p-6 rounded-xl border border-white/10 text-center transition-colors"
                    >
                      <span className="text-white/80">{item}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </Slide>
            );

          case "kpi":
            return (
              <Slide key={slide.id} id={slide.id} className="items-center relative z-10">
                <SlideTitle accent>{slide.title}</SlideTitle>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-12">
                  {slide.kpis?.map((kpi, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2, duration: 0.6 }}
                    >
                      <SlideNumber number={kpi.number} label={kpi.label} />
                    </motion.div>
                  ))}
                </div>
              </Slide>
            );

          case "final":
            return (
              <Slide key={slide.id} id={slide.id} className="items-center text-center relative z-10">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <Image src="/logo.svg" alt="goQode" width={300} height={107} className="mb-8" />
                </motion.div>
                <SlideText>{slide.content}</SlideText>
              </Slide>
            );

          default:
            return null;
        }
      })}
    </main>
  );
}
