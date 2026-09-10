import React, { useState, useEffect, useRef } from "react";
import { X, Terminal as TerminalIcon, Maximize2, Minimize2, Sparkles } from "lucide-react";
import { playKeypress, playConfirm, playSuccess, playError } from "../lib/audioEngine";
import { haptic } from "../hooks/useHaptic";

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleMatrixOverdrive?: () => void;
  isMatrixOverdrive?: boolean;
}

interface CommandHistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
}

const WELCOME_BANNER = `
  ▄▄▄       ███▄    █ ▓█████▄  ██▀███   ██▓ ██▓
 ▒████▄     ██ ▀█   █ ▒██▀ ██▌▓██ ▒ ██▒▓██▒▓██▒
 ▒██  ▀█▄  ▓██  ▀█ ██▒░██   █▌▓██ ░▄█ ▒▒██▒▒██▒
 ░██▄▄▄▄██ ▓██▒  ▐▌██▒░▓█▄   ▌▒██▀▀█▄  ░██░░██░
  ▓█   ▓██▒▒██░   ▓██░░▒████▓ ░██▓ ▓██▒░██░░██░
 ▀    ▀  ▀ ▀░      ▀   ▒▒▓  ▒ ░ ▒▓ ░▒▓░░▓  ░▓
  SYSTEM TERMINAL v2.04 [Type 'help' for available commands]
`;

export function TerminalModal({
  isOpen,
  onClose,
  onToggleMatrixOverdrive,
  isMatrixOverdrive = false,
}: TerminalModalProps) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      id: "init-banner",
      command: "",
      output: (
        <div className="font-mono text-xs md:text-sm text-terminal-green whitespace-pre leading-none mb-3 overflow-x-auto">
          {WELCOME_BANNER}
          <p className="text-gray-400 mt-2">
            Welcome to <span className="text-terminal-green font-bold">Andrii Kozakov</span> System Shell.
            Type <span className="text-yellow-400 font-bold">'help'</span> to see available commands or <span className="text-cyan-400 font-bold">'matrix'</span> to engage Matrix Overdrive.
          </p>
        </div>
      ),
    },
  ]);

  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdHistoryIndex, setCmdHistoryIndex] = useState<number>(-1);
  const [theme, setTheme] = useState<"green" | "amber" | "cyan">("green");
  const [isExpanded, setIsExpanded] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Scroll to bottom on history change
  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isOpen]);

  // Keyboard escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    const cmdLower = trimmed.toLowerCase();

    // Add to raw command history
    if (trimmed) {
      setCmdHistory((prev) => [...prev, trimmed]);
      setCmdHistoryIndex(-1);
    }

    let output: React.ReactNode = null;

    if (!cmdLower) {
      output = null;
    } else if (cmdLower === "help") {
      playSuccess();
      output = (
        <div className="text-xs md:text-sm space-y-1 font-mono text-gray-300 my-1">
          <p className="text-terminal-green font-bold mb-2">// AVAILABLE SYSTEM COMMANDS:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-2">
            <div><span className="text-yellow-400 font-bold">help</span> - Display list of commands</div>
            <div><span className="text-yellow-400 font-bold">about</span> - Print developer bio &amp; info</div>
            <div><span className="text-yellow-400 font-bold">skills</span> - Display key technical competencies</div>
            <div><span className="text-yellow-400 font-bold">projects</span> - Deployed Android project links</div>
            <div><span className="text-yellow-400 font-bold">contact</span> - Retrieve contact coordinates</div>
            <div><span className="text-yellow-400 font-bold">matrix</span> - Toggle Matrix Rain Overdrive</div>
            <div><span className="text-yellow-400 font-bold">theme [green|amber|cyan]</span> - Switch phosphor HUD color</div>
            <div><span className="text-yellow-400 font-bold">sudo</span> - Request root access permissions</div>
            <div><span className="text-yellow-400 font-bold">cat secret.txt</span> - Display confidential data</div>
            <div><span className="text-yellow-400 font-bold">clear</span> - Wipe terminal output history</div>
            <div><span className="text-yellow-400 font-bold">exit</span> - Terminate shell session</div>
          </div>
        </div>
      );
    } else if (cmdLower === "about") {
      playConfirm();
      output = (
        <p className="text-xs md:text-sm font-mono text-gray-300">
          <span className="text-terminal-green font-bold">[BIO]</span> Andrii Kozakov is a Senior Android Engineer with 12+ years of experience building scalable, modular Android apps using Kotlin, Jetpack Compose, Coroutines, and Clean Architecture.
        </p>
      );
    } else if (cmdLower === "skills") {
      playConfirm();
      output = (
        <div className="text-xs md:text-sm font-mono text-gray-300 space-y-1">
          <p className="text-terminal-green font-bold">[SKILLS MATRIX]</p>
          <p>• <span className="text-cyan-400">Core Android:</span> Kotlin (97%), Jetpack Compose (92%), Flow &amp; Coroutines (90%)</p>
          <p>• <span className="text-cyan-400">Architecture:</span> MVVM/MVI (95%), Clean Architecture (92%), Modularity (87%)</p>
          <p>• <span className="text-cyan-400">Tools &amp; APIs:</span> Retrofit, WorkManager, Room, Dagger Hilt, CI/CD</p>
        </div>
      );
    } else if (cmdLower === "projects") {
      playConfirm();
      output = (
        <div className="text-xs md:text-sm font-mono text-gray-300 space-y-1">
          <p className="text-terminal-green font-bold">[DEPLOYED PROJECTS]</p>
          <p>1. <span className="text-yellow-300 font-bold">VitaFit</span> - Biometric tracking &amp; health app (Jetpack Compose + Health API)</p>
          <p>2. <span className="text-yellow-300 font-bold">CryptoEdge</span> - Biometric secure crypto wallet (MVVM + Room + Biometrics)</p>
          <p>3. <span className="text-yellow-300 font-bold">FlowSync</span> - Background task manager (WorkManager + Coroutines)</p>
        </div>
      );
    } else if (cmdLower === "contact") {
      playConfirm();
      output = (
        <div className="text-xs md:text-sm font-mono text-gray-300 space-y-1">
          <p className="text-terminal-green font-bold">[COMMUNICATION ENDPOINTS]</p>
          <p>• Email: <a href="mailto:koza4e4ok@gmail.com" className="text-yellow-300 underline">koza4e4ok@gmail.com</a></p>
          <p>• GitHub: <a href="https://github.com/koza4e4ok" target="_blank" rel="noreferrer" className="text-yellow-300 underline">https://github.com/koza4e4ok</a></p>
        </div>
      );
    } else if (cmdLower === "matrix") {
      playSuccess();
      if (onToggleMatrixOverdrive) {
        onToggleMatrixOverdrive();
      }
      output = (
        <p className="text-xs md:text-sm font-mono text-cyan-400 animate-pulse font-bold">
          [MATRIX OVERDRIVE] {isMatrixOverdrive ? "DISENGAGED" : "ENGAGED"}! High-density stream activated across background canvases.
        </p>
      );
    } else if (cmdLower.startsWith("theme")) {
      playConfirm();
      const arg = cmdLower.split(" ")[1];
      if (arg === "amber") {
        setTheme("amber");
        output = <p className="text-amber-400 font-mono text-xs md:text-sm">[HUD THEME] Switched to Vintage Amber Phosphor (CRT 1984).</p>;
      } else if (arg === "cyan") {
        setTheme("cyan");
        output = <p className="text-cyan-400 font-mono text-xs md:text-sm">[HUD THEME] Switched to Cyberpunk Cyan Phosphor.</p>;
      } else if (arg === "green") {
        setTheme("green");
        output = <p className="text-terminal-green font-mono text-xs md:text-sm">[HUD THEME] Switched to Standard Matrix Green.</p>;
      } else {
        output = <p className="text-gray-400 font-mono text-xs md:text-sm">Usage: theme [green | amber | cyan]</p>;
      }
    } else if (cmdLower === "sudo" || cmdLower === "su" || cmdLower === "root") {
      playError();
      output = (
        <div className="text-xs md:text-sm font-mono text-red-400 space-y-1">
          <p className="font-bold">SECURITY ALERT: Root privilege request logged.</p>
          <p className="text-gray-300">"Nice try! Permission granted: You already have full access to explore the portfolio."</p>
        </div>
      );
    } else if (cmdLower === "cat secret.txt" || cmdLower === "cat secret" || cmdLower === "cat") {
      playSuccess();
      output = (
        <div className="text-xs md:text-sm font-mono text-terminal-green bg-black/60 p-3 rounded border border-terminal-green/40 my-1">
          <p className="text-yellow-400 font-bold mb-1">=== TOP SECRET TRANSMISSION ===</p>
          <p className="text-gray-300 italic mb-2">
            "The best code is code that solves real human problems with simplicity, reliability, and elegance."
          </p>
          <p className="text-cyan-400 text-xs">// Easter egg unlocked! Try typing 'matrix' or pressing Konami Code anytime!</p>
        </div>
      );
    } else if (cmdLower === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    } else if (cmdLower === "exit" || cmdLower === "quit") {
      onClose();
      return;
    } else {
      playError();
      output = (
        <p className="text-xs md:text-sm font-mono text-red-400">
          Command not recognized: '<span className="text-white">{trimmed}</span>'. Type '<span className="text-yellow-400 font-bold">help</span>' for command list.
        </p>
      );
    }

    setHistory((prev) => [
      ...prev,
      { id: String(Date.now()), command: rawCmd, output },
    ]);
    setInputVal("");
  };

  const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    playKeypress();
    if (e.key === "Enter") {
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = cmdHistoryIndex === -1 ? cmdHistory.length - 1 : Math.max(0, cmdHistoryIndex - 1);
        setCmdHistoryIndex(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdHistoryIndex !== -1) {
        const nextIdx = cmdHistoryIndex + 1;
        if (nextIdx >= cmdHistory.length) {
          setCmdHistoryIndex(-1);
          setInputVal("");
        } else {
          setCmdHistoryIndex(nextIdx);
          setInputVal(cmdHistory[nextIdx]);
        }
      }
    }
  };

  // Dynamic theme styles
  const themeClasses = {
    green: "border-terminal-green text-terminal-green shadow-[0_0_30px_rgba(0,255,65,0.15)]",
    amber: "border-amber-500 text-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.15)]",
    cyan: "border-cyan-500 text-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.15)]",
  }[theme];

  const themeTextClass = {
    green: "text-terminal-green",
    amber: "text-amber-400",
    cyan: "text-cyan-400",
  }[theme];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="System Terminal Easter Egg"
      className="fixed inset-0 z-[1000] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-sm transition-all"
    >
      <div
        className={`w-full bg-[#050505] border-2 rounded-xl flex flex-col overflow-hidden transition-all duration-300 ${themeClasses} ${
          isExpanded ? "h-[96vh] max-w-[98vw]" : "h-[80vh] max-w-4xl"
        }`}
      >
        {/* Title Bar */}
        <div className="bg-[#111] px-4 py-2.5 border-b border-gray-800 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <div className={`p-1 rounded bg-black/60 border ${themeTextClass} border-current`}>
              <TerminalIcon size={14} />
            </div>
            <span className="font-terminal text-lg md:text-xl font-bold tracking-wider text-gray-200">
              TERMINAL_SHELL // ANDRII_OS_v2.04
            </span>
            {isMatrixOverdrive && (
              <span className="text-[10px] px-2 py-0.5 rounded bg-terminal-green/20 text-terminal-green border border-terminal-green font-mono flex items-center gap-1 animate-pulse">
                <Sparkles size={10} /> MATRIX_OVERDRIVE
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsExpanded(!isExpanded);
                playConfirm();
                haptic("confirm");
              }}
              aria-label={isExpanded ? "Minimize terminal size" : "Maximize terminal size"}
              className="text-gray-400 hover:text-white p-1 rounded hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-terminal-green"
            >
              {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
            <button
              onClick={() => {
                onClose();
                playConfirm();
                haptic("confirm");
              }}
              aria-label="Close terminal modal"
              className="text-gray-400 hover:text-red-400 p-1 rounded hover:bg-red-500/10 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-400"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Output area */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto custom-scrollbar font-mono text-sm leading-relaxed space-y-3 bg-[#030303]">
          {history.map((item) => (
            <div key={item.id} className="space-y-1">
              {item.command && (
                <div className="flex items-center gap-2 text-gray-400">
                  <span className={themeTextClass}>visitor@andrii-os:~$</span>
                  <span className="text-white font-bold">{item.command}</span>
                </div>
              )}
              {item.output && <div className="pl-0 sm:pl-2">{item.output}</div>}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input prompt footer */}
        <div className="p-3 md:p-4 bg-[#0a0a0a] border-t border-gray-800 flex items-center gap-2 font-mono">
          <span className={`${themeTextClass} text-xs md:text-sm font-bold shrink-0`}>
            visitor@andrii-os:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDownInput}
            placeholder="Type 'help' or command..."
            aria-label="Terminal Command Input"
            className="flex-1 bg-transparent border-none text-white focus:outline-none focus:ring-0 text-xs md:text-sm font-mono placeholder:text-gray-600"
            autoFocus
          />
          <button
            onClick={() => handleCommand(inputVal)}
            className={`px-3 py-1 rounded text-xs font-bold font-mono border transition-all ${themeTextClass} border-current hover:bg-white/10`}
          >
            EXEC
          </button>
        </div>
      </div>
    </div>
  );
}
