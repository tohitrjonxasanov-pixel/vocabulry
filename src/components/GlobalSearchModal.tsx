import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  X, 
  Volume2, 
  ArrowRight, 
  BookOpen, 
  Layers, 
  Sparkles,
  Command
} from "lucide-react";
import { SearchWordItem } from "../types";
import { textMatches, speakWord } from "../utils/search";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  indexedWords: SearchWordItem[];
  onSelectWord: (item: SearchWordItem) => void;
}

const POPULAR_SEARCHES = [
  "challenge",
  "ancient",
  "opponent",
  "give up",
  "afraid",
  "pattern",
  "solve",
  "referee",
  "agree",
  "take up"
];

function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <span>{text}</span>;
  const normQuery = query.toLowerCase().replace(/[ʻʼ'`’‘]/g, "'");
  const normText = text.toLowerCase().replace(/[ʻʼ'`’‘]/g, "'");
  const idx = normText.indexOf(normQuery);
  if (idx === -1) return <span>{text}</span>;

  const before = text.slice(0, idx);
  const matched = text.slice(idx, idx + query.length);
  const after = text.slice(idx + query.length);

  return (
    <span>
      {before}
      <mark className="bg-[#6366f1]/40 text-white font-medium rounded px-0.5 py-0.2">{matched}</mark>
      {after}
    </span>
  );
}

export default function GlobalSearchModal({
  isOpen,
  onClose,
  indexedWords,
  onSelectWord
}: GlobalSearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedBookFilter, setSelectedBookFilter] = useState<string>("all");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery("");
      setSelectedBookFilter("all");
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Filtered results
  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];

    return indexedWords.filter((item) => {
      if (selectedBookFilter !== "all" && item.bookId !== selectedBookFilter) {
        return false;
      }
      return textMatches(item.en, query) || textMatches(item.uz, query);
    });
  }, [query, selectedBookFilter, indexedWords]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 md:pt-20 px-3 sm:px-4 bg-black/70 backdrop-blur-md">
        {/* Backdrop click */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -15 }}
          transition={{ duration: 0.18 }}
          className="relative w-full max-w-2xl bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden z-10"
        >
          {/* Search Header */}
          <div className="p-4 border-b border-white/10 bg-slate-900/80">
            <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 focus-within:border-[#6366f1] focus-within:ring-2 focus-within:ring-[#6366f1]/20 transition-all">
              <Search size={18} className="text-[#818cf8] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Inglizcha so'z yoki o'zbekcha ma'nosini yozing..."
                className="w-full bg-transparent text-sm md:text-base text-white placeholder-[#94a3b8]/70 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 rounded-md text-[#94a3b8] hover:text-white hover:bg-white/10 transition-colors shrink-0"
                  title="Tozalash"
                >
                  <X size={16} />
                </button>
              )}
              <button
                onClick={onClose}
                className="text-xs text-[#94a3b8] hover:text-white px-2 py-1 rounded bg-white/5 border border-white/5 shrink-0 hidden sm:block"
              >
                ESC
              </button>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 mt-3 text-xs overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[#94a3b8] font-mono text-[11px] shrink-0">Kitob:</span>
              <button
                onClick={() => setSelectedBookFilter("all")}
                className={`px-2.5 py-1 rounded-lg border transition-all shrink-0 ${
                  selectedBookFilter === "all"
                    ? "bg-[#6366f1]/25 border-[#6366f1] text-white font-medium"
                    : "bg-white/5 border-white/5 text-[#94a3b8] hover:text-white hover:bg-white/10"
                }`}
              >
                Barchasi ({indexedWords.length})
              </button>
              <button
                onClick={() => setSelectedBookFilter("destination-b1")}
                className={`px-2.5 py-1 rounded-lg border transition-all shrink-0 ${
                  selectedBookFilter === "destination-b1"
                    ? "bg-[#6366f1]/25 border-[#6366f1] text-white font-medium"
                    : "bg-white/5 border-white/5 text-[#94a3b8] hover:text-white hover:bg-white/10"
                }`}
              >
                Destination B1
              </button>
              <button
                onClick={() => setSelectedBookFilter("4000-essential")}
                className={`px-2.5 py-1 rounded-lg border transition-all shrink-0 ${
                  selectedBookFilter === "4000-essential"
                    ? "bg-[#6366f1]/25 border-[#6366f1] text-white font-medium"
                    : "bg-white/5 border-white/5 text-[#94a3b8] hover:text-white hover:bg-white/10"
                }`}
              >
                4000 Essential
              </button>
            </div>
          </div>

          {/* Search Body / Results list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5 divide-y divide-white/5">
            {query.trim() ? (
              filteredResults.length > 0 ? (
                <>
                  <div className="text-[11px] font-mono text-[#818cf8] uppercase tracking-wider px-1 pb-1">
                    {filteredResults.length} ta so'z topildi
                  </div>
                  <div className="space-y-2 pt-2">
                    {filteredResults.map((item) => (
                      <div
                        key={item.id}
                        className="group bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#6366f1]/30 p-3.5 rounded-xl flex items-center justify-between gap-3 transition-all cursor-pointer"
                        onClick={() => onSelectWord(item)}
                      >
                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-base font-bold text-white tracking-wide">
                              <HighlightedText text={item.en} query={query} />
                            </h4>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                speakWord(item.en);
                              }}
                              className="p-1 rounded-md text-[#818cf8] hover:text-white hover:bg-[#6366f1]/20 transition-colors"
                              title="Talaffuzni tinglash"
                            >
                              <Volume2 size={15} />
                            </button>
                          </div>
                          
                          <p className="text-xs text-slate-300 leading-relaxed">
                            <HighlightedText text={item.uz} query={query} />
                          </p>

                          {/* Location Badges */}
                          <div className="flex items-center gap-1.5 pt-1 text-[10px] font-mono text-[#94a3b8] flex-wrap">
                            <span className="inline-flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded border border-white/5 text-indigo-300">
                              <BookOpen size={10} /> {item.bookTitle}
                            </span>
                            <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5">
                              {item.unitTitle}
                            </span>
                            {item.categoryName && (
                              <span className="inline-flex items-center gap-1 bg-[#6366f1]/10 px-2 py-0.5 rounded border border-[#6366f1]/20 text-[#818cf8]">
                                <Layers size={10} /> {item.categoryName}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Action jump button */}
                        <div className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#6366f1]/20 border border-[#6366f1]/30 text-[#818cf8] group-hover:bg-[#6366f1] group-hover:text-white text-xs font-semibold transition-all">
                          <span>Bo'limga</span>
                          <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="py-12 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/5 flex items-center justify-center mx-auto text-[#94a3b8]">
                    <Search size={22} />
                  </div>
                  <h4 className="text-sm font-semibold text-white">Hech narsa topilmadi</h4>
                  <p className="text-xs text-[#94a3b8] max-w-sm mx-auto">
                    "<span className="text-[#818cf8]">{query}</span>" bo'yicha hech qanday so'z topilmadi. Qidiruv so'zini to'g'ri yozganingizni tekshirib ko'ring.
                  </p>
                </div>
              )
            ) : (
              /* When empty: show hints and popular searches */
              <div className="py-6 space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#818cf8] uppercase tracking-wider">
                    <Sparkles size={12} />
                    <span>Tezkor qidiruv namunalari:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_SEARCHES.map((word) => (
                      <button
                        key={word}
                        onClick={() => setQuery(word)}
                        className="px-3 py-1.5 rounded-lg text-xs bg-white/5 border border-white/5 text-slate-300 hover:text-white hover:bg-[#6366f1]/20 hover:border-[#6366f1]/30 transition-all font-mono"
                      >
                        {word}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/3 border border-white/5 space-y-2 text-xs text-[#94a3b8]">
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <BookOpen size={14} className="text-[#6366f1]" />
                    Barcha kitoblar bo'yicha umumiy lug'at bazasi:
                  </div>
                  <p className="leading-relaxed">
                    Siz ushbu qidiruv orqali <span className="text-[#818cf8] font-bold">Destination B1</span> va <span className="text-[#818cf8] font-bold">4000 Essential English Words</span> kitoblaridagi jami {indexedWords.length} dan ortiq so'zlarni ham inglizcha, ham o'zbekcha ma'nosi bo'yicha tezda topishingiz mumkin.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="p-3 border-t border-white/10 bg-slate-900/60 flex items-center justify-between text-[11px] text-[#94a3b8] font-mono">
            <div className="flex items-center gap-1">
              <Command size={12} />
              <span>Qidiruv oynasini ochish: <kbd className="bg-white/10 px-1 py-0.5 rounded text-white">Ctrl+K</kbd></span>
            </div>
            <span>Jami {indexedWords.length} ta so'z</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
