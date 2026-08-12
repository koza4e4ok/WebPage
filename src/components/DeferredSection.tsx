import { Suspense, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

interface DeferredSectionProps {
  id: string;
  children: ReactNode;
}

function SectionPlaceholder({ id, forwardedRef }: { id: string; forwardedRef?: RefObject<HTMLElement | null> }) {
  return (
    <section
      id={id}
      ref={forwardedRef}
      aria-hidden="true"
      className="w-full h-full flex-shrink-0 snap-start snap-always"
    />
  );
}

/**
 * Keeps the snap-scroll geometry intact while delaying a section’s JavaScript,
 * DOM, images, and in-view animations until it actually enters the scroll viewport.
 */
export function DeferredSection({ id, children }: DeferredSectionProps) {
  const placeholderRef = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const target = placeholderRef.current;
    if (!target) return;
    const root = target.closest("main");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { root, rootMargin: "0px", threshold: 0.01 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  if (!ready) return <SectionPlaceholder id={id} forwardedRef={placeholderRef} />;

  return (
    <Suspense fallback={<SectionPlaceholder id={id} />}>
      {children}
    </Suspense>
  );
}
