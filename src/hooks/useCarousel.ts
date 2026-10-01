import { useCallback, useEffect, useRef, useState } from "react";

function offsetWithin(container: HTMLElement, child: HTMLElement): number {
  return (
    child.getBoundingClientRect().left -
    container.getBoundingClientRect().left +
    container.scrollLeft
  );
}

export function useCarousel<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const center = el.scrollLeft + el.clientWidth / 2;
        let closest = 0;
        let closestDistance = Infinity;
        Array.from(el.children).forEach((child, i) => {
          const item = child as HTMLElement;
          const distance = Math.abs(
            offsetWithin(el, item) + item.offsetWidth / 2 - center,
          );
          if (distance < closestDistance) {
            closestDistance = distance;
            closest = i;
          }
        });
        setIndex(closest);
      });
    };

    el.addEventListener("scroll", update, { passive: true });
    return () => {
      el.removeEventListener("scroll", update);
      cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToIndex = useCallback((i: number) => {
    const el = ref.current;
    const item = el?.children[i] as HTMLElement | undefined;
    if (!el || !item) return;
    el.scrollTo({
      left: offsetWithin(el, item) - (el.clientWidth - item.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, []);

  return { ref, index, scrollToIndex };
}
