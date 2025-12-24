"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useAnimation } from "framer-motion";

interface AnimatedLogoProps {
  width?: number;
  height?: number;
  onAnimationComplete?: () => void;
}

// Block data for Q shape
interface Block {
  x: number;
  y: number;
  delay: number;
}

export default function AnimatedLogo({
  width = 400,
  height = 143,
  onAnimationComplete,
}: AnimatedLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [showSolidQ, setShowSolidQ] = useState(false);
  const [blocksReady, setBlocksReady] = useState(false);
  const [taglineText, setTaglineText] = useState("");
  const controls = useAnimation();

  const scale = width / 890;
  const tagline = "we build bold digital";
  const blockSize = 6; // Size of each pixel block

  // Letter positions (based on SVG viewBox 890x319, scaled)
  const letters = useMemo(
    () => [
      {
        id: "g",
        path: "M127.616 215.793H27.4975C18.1521 215.793 10.5762 208.217 10.5762 198.872V131.95C10.5762 122.604 18.1522 115.028 27.4975 115.028H110.694C120.039 115.028 127.616 122.604 127.616 131.95V215.793ZM127.616 215.793L127.616 269.509C127.616 278.855 120.04 286.431 110.695 286.431H42.3639C24.8084 286.431 10.5769 272.199 10.5769 254.644",
        from: { x: -150, y: 0, opacity: 0 },
        delay: 0.3,
      },
      {
        id: "o1",
        path: "M161.621 198.872V131.95C161.621 122.604 169.197 115.028 178.543 115.028H261.739C271.084 115.028 278.661 122.604 278.661 131.95V198.872C278.661 208.217 271.084 215.793 261.739 215.793H178.543C169.197 215.793 161.621 208.217 161.621 198.872Z",
        from: { x: 0, y: -150, opacity: 0 },
        delay: 0.4,
      },
      {
        id: "o2",
        path: "M463.205 198.872V131.95C463.205 122.604 470.782 115.028 480.13 115.028H563.327C572.671 115.028 580.248 122.604 580.248 131.95V198.872C580.248 208.217 572.671 215.793 563.327 215.793H480.13C470.782 215.793 463.205 208.217 463.205 198.872Z",
        from: { x: 0, y: 150, opacity: 0 },
        delay: 0.6,
      },
      {
        id: "d",
        path: "M731.47 114.881V198.874C731.47 208.219 723.894 215.795 714.55 215.795H631.175C621.826 215.795 614.254 208.219 614.254 198.874V131.802C614.254 122.456 621.826 114.881 631.175 114.881H731.47ZM731.47 114.881V0",
        from: { x: 0, y: -150, opacity: 0 },
        delay: 0.7,
      },
      {
        id: "e",
        path: "M878.464 215.793H782.397C773.053 215.793 765.477 208.217 765.477 198.872V165.411M765.477 165.411V131.95C765.477 122.604 773.053 115.028 782.397 115.028H861.543C870.892 115.028 878.464 122.604 878.464 131.95V140.219V148.489C878.464 157.835 870.892 165.411 861.543 165.411H765.477Z",
        from: { x: 150, y: 0, opacity: 0 },
        delay: 0.8,
      },
    ],
    []
  );

  // Q path for SVG
  const qPath =
    "M418.084 0.046875C454.687 0.046875 484.361 29.7193 484.361 66.3223V221.888C484.361 245.221 472.299 265.737 454.076 277.546L483.283 306.755L478.163 311.875C469.906 320.135 456.512 320.135 448.252 311.875L424.255 287.878C422.224 288.065 420.165 288.163 418.084 288.163H323.784C287.181 288.163 257.509 258.49 257.508 221.888V66.3223C257.509 29.7194 287.181 0.0469709 323.784 0.046875H418.084ZM323.784 42.3504C310.545 42.3505 299.812 53.083 299.812 66.3223V221.888C299.812 235.127 310.545 245.859 323.784 245.859H382.237L363.498 227.121L368.618 222.001C376.878 213.74 390.271 213.74 398.531 222.001L422.061 245.53C433.408 243.636 442.056 233.772 442.056 221.888V66.3223C442.056 53.083 431.324 42.3504 418.084 42.3504H323.784Z";

  const [fadeOutBlocks, setFadeOutBlocks] = useState(false);

  // Generate blocks for Q shape on mount
  useEffect(() => {
    const offCanvas = document.createElement("canvas");
    const qWidth = 230;
    const qHeight = 320;
    offCanvas.width = qWidth;
    offCanvas.height = qHeight;
    const ctx = offCanvas.getContext("2d")!;

    const path2D = new Path2D(qPath);
    ctx.translate(-257, 0);
    ctx.fillStyle = "#C9FD48";
    ctx.fill(path2D);

    const imageData = ctx.getImageData(0, 0, qWidth, qHeight);
    const newBlocks: Block[] = [];
    const step = blockSize;

    // Sample pixels and create blocks
    for (let y = 0; y < qHeight; y += step) {
      for (let x = 0; x < qWidth; x += step) {
        // Check if any pixel in this block area is filled
        let hasFill = false;
        for (let dy = 0; dy < step && !hasFill; dy++) {
          for (let dx = 0; dx < step && !hasFill; dx++) {
            const px = x + dx;
            const py = y + dy;
            if (px < qWidth && py < qHeight) {
              const idx = (py * qWidth + px) * 4;
              if (imageData.data[idx + 3] > 128) {
                hasFill = true;
              }
            }
          }
        }

        if (hasFill) {
          // Calculate delay based on position (top-left to bottom-right diagonal)
          const diagPos = (x + y) / (qWidth + qHeight);
          const rowDelay = y / qHeight;
          // Mix of row-by-row and diagonal for typewriter effect
          const delay = rowDelay * 0.7 + diagPos * 0.3 + Math.random() * 0.05;

          newBlocks.push({
            x: (x - qWidth / 2 + 10) * scale,
            y: (y - qHeight / 2 + 15) * scale,
            delay: delay * 0.6, // Faster assembly
          });
        }
      }
    }

    setBlocks(newBlocks);
    setBlocksReady(true);

    // Start fade out transition
    const fadeTimer = setTimeout(() => {
      setFadeOutBlocks(true);
      setShowSolidQ(true);
    }, 700);

    // Hide blocks completely after transition
    const hideTimer = setTimeout(() => {
      setBlocksReady(false);
    }, 1100);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [scale, blockSize, qPath]);

  // Typewriter effect for tagline
  useEffect(() => {
    if (!showSolidQ) return;

    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex <= tagline.length) {
        setTaglineText(tagline.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        onAnimationComplete?.();
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [showSolidQ, tagline, onAnimationComplete]);

  // Start letter animations
  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const letterVariants = {
    hidden: (custom: { x: number; y: number; opacity: number }) => ({
      x: custom.x * scale,
      y: custom.y * scale,
      opacity: 0,
      pathLength: 0,
    }),
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      pathLength: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ width, height }}
    >
      {/* SVG Logo */}
      <svg
        width={width}
        height={height}
        viewBox="0 0 890 319"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
      >
        {/* Letters g, o, o, d, e */}
        {letters.map((letter) => (
          <motion.path
            key={letter.id}
            d={letter.path}
            stroke="white"
            strokeWidth="21.1517"
            fill="none"
            custom={letter.from}
            initial="hidden"
            animate={controls}
            variants={letterVariants}
            transition={{ delay: letter.delay }}
          />
        ))}

        {/* Q - solid version (appears after blocks) */}
        <motion.path
          d={qPath}
          fill="#C9FD48"
          initial={{ opacity: 0 }}
          animate={{ opacity: showSolidQ ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />

        {/* Tagline with typewriter effect */}
        <motion.text
          x="492"
          y="285"
          fill="white"
          fontSize="24"
          fontFamily="sans-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: showSolidQ ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {taglineText}
          <motion.tspan
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            style={{ marginLeft: 2 }}
          >
            |
          </motion.tspan>
        </motion.text>
      </svg>

      {/* Typewriter Blocks for Q */}
      {blocksReady && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            // Position to match Q in SVG viewBox (Q center is around x=370, y=144 in 890x319 viewBox)
            left: (370 / 890) * width,
            top: (155 / 319) * height,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            opacity: fadeOutBlocks ? 0 : 1,
            filter: fadeOutBlocks ? "blur(4px)" : "blur(0px)",
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {blocks.map((block, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{
                width: blockSize * scale,
                height: blockSize * scale,
                left: block.x,
                top: block.y,
                backgroundColor: "#C9FD48",
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: fadeOutBlocks ? 0.5 : 1,
              }}
              transition={{
                delay: fadeOutBlocks ? 0 : block.delay,
                duration: fadeOutBlocks ? 0.3 : 0.05,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Scanline effect */}
      {blocksReady && !showSolidQ && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: (370 / 890) * width,
            width: 110 * scale,
            height: 2,
            backgroundColor: "rgba(201, 253, 72, 0.8)",
            boxShadow: "0 0 10px rgba(201, 253, 72, 0.5)",
            transform: "translateX(-50%)",
          }}
          initial={{ top: "5%", opacity: 0 }}
          animate={{ top: "95%", opacity: [0, 1, 1, 0] }}
          transition={{ duration: 0.8, ease: "linear" }}
        />
      )}

      {/* Glow effect behind Q */}
      <motion.div
        className="absolute rounded-full blur-3xl pointer-events-none"
        style={{
          width: 150 * scale,
          height: 200 * scale,
          left: (370 / 890) * width,
          top: (155 / 319) * height,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(201,253,72,0.4) 0%, rgba(201,253,72,0) 70%)",
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: showSolidQ ? 0.6 : 0.3,
          scale: showSolidQ ? 1 : 0.7,
        }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}
