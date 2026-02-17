"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const particles = [
  { left: "14%", top: "20%", size: 6, delay: 0.1 },
  { left: "22%", top: "74%", size: 4, delay: 0.4 },
  { left: "31%", top: "35%", size: 5, delay: 0.8 },
  { left: "45%", top: "83%", size: 3, delay: 0.3 },
  { left: "57%", top: "28%", size: 4, delay: 0.7 },
  { left: "66%", top: "58%", size: 6, delay: 0.2 },
  { left: "77%", top: "19%", size: 3, delay: 1.1 },
  { left: "84%", top: "69%", size: 5, delay: 0.5 },
];

export default function InteractiveOrb() {
  const reduceMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rawRotateZ = useMotionValue(0);
  const rawScale = useMotionValue(1);

  const x = useSpring(rawX, { stiffness: 84, damping: 19, mass: 0.68 });
  const y = useSpring(rawY, { stiffness: 84, damping: 19, mass: 0.68 });
  const rotateX = useSpring(rawRotateX, { stiffness: 84, damping: 19, mass: 0.84 });
  const rotateY = useSpring(rawRotateY, { stiffness: 84, damping: 19, mass: 0.84 });
  const rotateZ = useSpring(rawRotateZ, { stiffness: 84, damping: 19, mass: 0.84 });
  const scale = useSpring(rawScale, { stiffness: 64, damping: 16, mass: 0.78 });

  useEffect(() => {
    if (reduceMotion) {
      rawX.set(0);
      rawY.set(0);
      rawRotateX.set(0);
      rawRotateY.set(0);
      rawRotateZ.set(0);
      rawScale.set(1);
      return;
    }

    const onMouseMove = (event: MouseEvent) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;

      rawX.set(clamp(nx * 16, -24, 24));
      rawY.set(clamp(ny * 16, -24, 24));
      rawRotateY.set(clamp(nx * 12, -10, 10));
      rawRotateX.set(clamp(-ny * 9, -8, 8));
    };

    const onScroll = () => {
      const progress = clamp(window.scrollY / (window.innerHeight * 0.65), 0, 1);
      rawRotateZ.set(progress * 6);
      rawScale.set(clamp(1 - progress * 0.06, 0.93, 1));
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [rawRotateX, rawRotateY, rawRotateZ, rawScale, rawX, rawY, reduceMotion]);

  return (
    <motion.div
      className="orb-shell relative"
      initial={{ opacity: 0.92 }}
      animate={{ opacity: 1 }}
      style={{ x, y, rotateX, rotateY, rotateZ, scale }}
      aria-hidden="true"
    >
      <div className="orb-backdrop" />
      <motion.div
        className="orb-core"
        animate={reduceMotion ? undefined : { rotate: [0, 360] }}
        transition={reduceMotion ? undefined : { duration: 26, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="orb-ring ring-outer"
        animate={reduceMotion ? undefined : { rotate: [0, 360] }}
        transition={reduceMotion ? undefined : { duration: 34, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="orb-ring ring-inner"
        animate={reduceMotion ? undefined : { rotate: [360, 0] }}
        transition={reduceMotion ? undefined : { duration: 28, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="orb-glare"
        animate={reduceMotion ? undefined : { opacity: [0.35, 0.6, 0.35] }}
        transition={reduceMotion ? undefined : { duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="orb-grid" />
      {particles.map((dot) => (
        <motion.span
          key={`${dot.left}-${dot.top}`}
          className="orb-particle"
          style={{
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
          }}
          animate={reduceMotion ? undefined : { y: [-3, 4, -3], opacity: [0.3, 1, 0.3] }}
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 3.2,
                  delay: dot.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        />
      ))}
      <div className="noise-veil" />
    </motion.div>
  );
}
