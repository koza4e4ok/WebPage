import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]): string {
  const [active, setActive] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const root = document.querySelector("main");
    if (!root) return;

    const observedElements = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target.id) {
            setActive(entry.target.id);
          }
        }
      },
      { root, threshold: 0.5 }
    );

    const updateObservedSections = () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el && !observedElements.has(el)) {
          observer.observe(el);
          observedElements.add(el);
        }
      });
    };

    updateObservedSections();

    const mutationObserver = new MutationObserver(updateObservedSections);
    mutationObserver.observe(root, { childList: true, subtree: false });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      observedElements.clear();
    };
  }, [sectionIds]);

  return active;
}
