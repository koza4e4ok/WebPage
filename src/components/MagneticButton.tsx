import React, { useRef } from "react";

type MagneticButtonProps = {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  as?: "a" | "button";
} & React.HTMLAttributes<HTMLElement> &
  Partial<React.AnchorHTMLAttributes<HTMLAnchorElement>> &
  Partial<React.ButtonHTMLAttributes<HTMLButtonElement>>;

/**
 * Cursor-responsive CTA without a runtime animation dependency. The transform
 * is updated directly on the compositor-only span rather than through React state.
 */
export function MagneticButton({
  children,
  strength = 6,
  className = "",
  as: Tag = "a",
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);
  const Comp = Tag as React.ElementType;

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const element = ref.current;
    const content = contentRef.current;
    if (!element || !content) return;
    const rect = element.getBoundingClientRect();
    const x = ((event.clientX - (rect.left + rect.width / 2)) / rect.width) * strength * 2;
    const y = ((event.clientY - (rect.top + rect.height / 2)) / rect.height) * strength * 2;
    content.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const handleMouseLeave = () => {
    if (contentRef.current) contentRef.current.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <Comp
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`magnetic-trigger relative overflow-hidden ${className}`}
      {...rest}
    >
      <span ref={contentRef} className="magnetic-content inline-flex items-center gap-2">
        {children}
      </span>
    </Comp>
  );
}
