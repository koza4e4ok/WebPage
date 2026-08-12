import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ScanlineWipeProps {
  trigger: string; // changes when a new section becomes active
}

export function ScanlineWipe({ trigger }: ScanlineWipeProps) {
  const [visible, setVisible] = useState(false);
  const prevTrigger = useRef(trigger);

  useEffect(() => {
    if (trigger !== prevTrigger.current) {
      prevTrigger.current = trigger;
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(t);
    }
  }, [trigger]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="scanline"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 h-[2px] bg-terminal-green z-[9999] pointer-events-none"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        />
      )}
    </AnimatePresence>
  );
}
