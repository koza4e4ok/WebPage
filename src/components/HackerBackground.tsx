import { useEffect, useState } from 'react';

export function HackerBackground() {
  const [hexGrid, setHexGrid] = useState<string[]>([]);
  
  useEffect(() => {
    const generateGrid = () => {
      // 200 random hex words for the background
      const newGrid = Array.from({ length: 200 }).map(() => {
         return Math.floor(Math.random() * 65535).toString(16).padStart(4, '0').toUpperCase();
      });
      setHexGrid(newGrid);
    };
    generateGrid();
    const interval = setInterval(generateGrid, 2000); // Shift data every 2s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-gray-100 dark:bg-[#020202]">
      {/* Vignette mask */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#f3f4f6_90%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,#020202_90%)] z-10" />
      
      {/* Raw Hex Data Dump */}
      <div className="absolute inset-0 opacity-[0.05] text-terminal-green font-mono text-sm break-all leading-relaxed p-4 select-none">
        {hexGrid.join(' ')}
      </div>
      
      {/* Overlay Scanlines Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[size:40px_40px] z-10" />
    </div>
  );
}
