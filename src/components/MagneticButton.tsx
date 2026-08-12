import React, { useRef, useState } from "react";
import { motion, useSpring } from "motion/react";

type MagneticButtonProps = {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  as?: "a" | "button";
} & React.HTMLAttributes<HTMLElement> &
  Partial<React.AnchorHTMLAttributes<HTMLAnchorElement>> &
  Partial<React.ButtonHTMLAttributes<HTMLButtonElement>>;

export function MagneticButton({
  children,
  strength = 6,
  className = "",
  as: Tag = "a",
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set(((e.clientX - cx) / rect.width) * strength * 2);
    y.set(((e.clientY - cy) / rect.height) * strength * 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const Comp = Tag as React.ElementType;

  return (
    <Comp
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      {...rest}
    >
      <motion.span
        style={{ x, y, display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
        className={`transition-shadow duration-200 ${hovered ? "drop-shadow-[0_0_8px_rgba(0,153,34,0.6)]" : ""}`}
      >
        {children}
      </motion.span>
    </Comp>
  );
}
