"use client";

import React, { useRef, useEffect, useMemo, useCallback } from "react";
import * as THREE from "three";

interface QGlitchTransitionProps {
  isTransitioning: boolean;
  direction: "up" | "down";
  onTransitionComplete?: () => void;
  className?: string;
}

const QGlitchTransition: React.FC<QGlitchTransitionProps> = ({
  isTransitioning,
  direction,
  onTransitionComplete,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const rafRef = useRef<number | null>(null);
  const animationProgressRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const prevTransitioningRef = useRef(false);

  // Q shape pixel data - parsed from SVG path
  const qPixels = useMemo(() => {
    const pixels: { x: number; y: number }[] = [];
    const resolution = 40; // Grid resolution
    const svgWidth = 52;
    const svgHeight = 73;

    // Create a canvas to rasterize the Q shape
    const canvas = document.createElement("canvas");
    canvas.width = resolution;
    canvas.height = Math.round(resolution * (svgHeight / svgWidth));
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // Draw Q path
      const scale = resolution / svgWidth;
      ctx.scale(scale, scale);
      ctx.fillStyle = "#C9FD48";

      const path = new Path2D(
        "M36.5306 0C44.8575 0 51.6082 6.75039 51.6082 15.0774V50.468C51.6082 55.7763 48.8642 60.4435 44.7186 63.1301L51.363 69.775L50.1983 70.9398C48.3198 72.819 45.2727 72.819 43.3935 70.9398L37.9344 65.4806C37.4722 65.5233 37.0039 65.5454 36.5306 65.5454H15.0775C6.75042 65.5454 0.000103897 58.795 0 50.468V15.0774C0.000103897 6.7504 6.75042 2.18185e-05 15.0775 0H36.5306ZM15.0775 9.62391C12.0656 9.62393 9.62392 12.0656 9.62392 15.0774V50.468C9.62392 53.4799 12.0656 55.9215 15.0775 55.9215H28.3753L24.1124 51.6586L25.2771 50.4938C27.1563 48.6146 30.2031 48.6146 32.0822 50.4938L37.4352 55.8467C40.0165 55.4157 41.984 53.1716 41.984 50.468V15.0774C41.984 12.0656 39.5424 9.62391 36.5306 9.62391H15.0775Z"
      );
      ctx.fill(path, "evenodd");

      // Sample pixels
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const i = (y * canvas.width + x) * 4;
          if (imageData.data[i + 3] > 128) {
            pixels.push({
              x: (x / canvas.width - 0.5) * 2,
              y: -(y / canvas.height - 0.5) * 2,
            });
          }
        }
      }
    }

    return pixels;
  }, []);

  const initScene = useCallback(() => {
    if (!containerRef.current || rendererRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const aspect = width / height;
    const camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 100);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create particles
    const particleCount = qPixels.length;
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const randomOffsets = new Float32Array(particleCount * 3);
    const delays = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);

    const baseColor = new THREE.Color("#C9FD48");
    const glitchColors = [
      new THREE.Color("#FF0080"),
      new THREE.Color("#00FFFF"),
      new THREE.Color("#FF00FF"),
      new THREE.Color("#C9FD48"),
    ];

    qPixels.forEach((pixel, i) => {
      const i3 = i * 3;
      positions[i3] = pixel.x * 0.5;
      positions[i3 + 1] = pixel.y * 0.5;
      positions[i3 + 2] = 0;

      originalPositions[i3] = pixel.x * 0.5;
      originalPositions[i3 + 1] = pixel.y * 0.5;
      originalPositions[i3 + 2] = 0;

      // Random explosion direction
      const angle = Math.random() * Math.PI * 2;
      const distance = 1 + Math.random() * 2;
      randomOffsets[i3] = Math.cos(angle) * distance;
      randomOffsets[i3 + 1] = Math.sin(angle) * distance;
      randomOffsets[i3 + 2] = (Math.random() - 0.5) * 2;

      // Random delay for stagger effect
      delays[i] = Math.random() * 0.3;

      // Base color
      colors[i3] = baseColor.r;
      colors[i3 + 1] = baseColor.g;
      colors[i3 + 2] = baseColor.b;
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("originalPosition", new THREE.BufferAttribute(originalPositions, 3));
    geometry.setAttribute("randomOffset", new THREE.BufferAttribute(randomOffsets, 3));
    geometry.setAttribute("delay", new THREE.BufferAttribute(delays, 1));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Custom shader material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uDirection: { value: 1 },
        uGlitchIntensity: { value: 0 },
      },
      vertexShader: `
        attribute vec3 originalPosition;
        attribute vec3 randomOffset;
        attribute float delay;
        attribute vec3 color;

        uniform float uProgress;
        uniform float uTime;
        uniform float uDirection;
        uniform float uGlitchIntensity;

        varying vec3 vColor;
        varying float vGlitch;

        void main() {
          vColor = color;

          // Delayed progress per particle
          float delayedProgress = clamp((uProgress - delay) / (1.0 - delay), 0.0, 1.0);

          // Easing
          float easedProgress = delayedProgress < 0.5
            ? 4.0 * delayedProgress * delayedProgress * delayedProgress
            : 1.0 - pow(-2.0 * delayedProgress + 2.0, 3.0) / 2.0;

          // Glitch offset
          float glitchX = sin(uTime * 50.0 + position.x * 10.0) * uGlitchIntensity * 0.1;
          float glitchY = cos(uTime * 40.0 + position.y * 10.0) * uGlitchIntensity * 0.1;

          // Position interpolation
          vec3 pos = mix(originalPosition, originalPosition + randomOffset * uDirection, easedProgress);
          pos.x += glitchX;
          pos.y += glitchY;

          // Random z-fighting for depth effect
          pos.z += sin(uTime * 30.0 + delay * 100.0) * uGlitchIntensity * 0.2;

          vGlitch = uGlitchIntensity;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = 4.0 * (1.0 + uGlitchIntensity * 0.5);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vGlitch;

        void main() {
          // Square pixels
          vec2 coord = gl_PointCoord - 0.5;
          if (abs(coord.x) > 0.45 || abs(coord.y) > 0.45) discard;

          // Glitch color shift
          vec3 color = vColor;
          if (vGlitch > 0.1) {
            float shift = sin(gl_FragCoord.y * 0.5) * vGlitch;
            color.r += shift * 0.5;
            color.b -= shift * 0.3;
          }

          gl_FragColor = vec4(color, 1.0);
        }
      `,
      transparent: true,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    // Initial render
    renderer.render(scene, camera);
  }, [qPixels]);

  // Animation loop
  const animate = useCallback(() => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current || !particlesRef.current) {
      return;
    }

    const material = particlesRef.current.material as THREE.ShaderMaterial;
    const time = performance.now() * 0.001;
    material.uniforms.uTime.value = time;

    if (isAnimatingRef.current) {
      // Progress animation
      const speed = 0.02;
      animationProgressRef.current += speed;

      if (animationProgressRef.current <= 1) {
        // Dissolve phase
        material.uniforms.uProgress.value = animationProgressRef.current;
        material.uniforms.uGlitchIntensity.value = Math.sin(animationProgressRef.current * Math.PI) * 0.8;
      } else if (animationProgressRef.current <= 2) {
        // Reassemble phase
        material.uniforms.uProgress.value = 2 - animationProgressRef.current;
        material.uniforms.uGlitchIntensity.value = Math.sin((2 - animationProgressRef.current) * Math.PI) * 0.8;
      } else {
        // Animation complete
        isAnimatingRef.current = false;
        material.uniforms.uProgress.value = 0;
        material.uniforms.uGlitchIntensity.value = 0;
        onTransitionComplete?.();
      }
    }

    rendererRef.current.render(sceneRef.current, cameraRef.current);
    rafRef.current = requestAnimationFrame(animate);
  }, [onTransitionComplete]);

  // Initialize scene
  useEffect(() => {
    initScene();

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (containerRef.current?.contains(rendererRef.current.domElement)) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
      }
    };
  }, [initScene]);

  // Start animation loop
  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [animate]);

  // Handle transition trigger
  useEffect(() => {
    if (isTransitioning && !prevTransitioningRef.current && particlesRef.current) {
      // Start new animation
      const material = particlesRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uDirection.value = direction === "down" ? 1 : -1;
      animationProgressRef.current = 0;
      isAnimatingRef.current = true;
    }
    prevTransitioningRef.current = isTransitioning;
  }, [isTransitioning, direction]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      const aspect = width / height;

      cameraRef.current.left = -aspect;
      cameraRef.current.right = aspect;
      cameraRef.current.updateProjectionMatrix();

      rendererRef.current.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none ${className}`}
      style={{ width: "200px", height: "200px" }}
    />
  );
};

export default QGlitchTransition;
