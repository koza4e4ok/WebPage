import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]): string {
  const [active, setActive] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    let observers: IntersectionObserver[] = [];
    const root = document.querySelector("main");

    const observeSections = () => {
      observers.forEach((observer) => observer.disconnect());
      observers = sectionIds.flatMap((id) => {
        const element = document.getElementById(id);
        if (!element) return [];

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) setActive(id);
          },
          { root, threshold: 0.5 }
        );
        observer.observe(element);
        return [observer];
      });
    };

    observeSections();
    const mutationObserver = root
      ? new MutationObserver(observeSections)
      : undefined;
    mutationObserver?.observe(root, { childList: true, subtree: false });

    return () => {
      observers.forEach((observer) => observer.disconnect());
      mutationObserver?.disconnect();
    };
  }, [sectionIds]);

  return active;
}
