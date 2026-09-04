import { useState, useMemo } from "react";
import { 
  Search, 
  X, 
  Volume2, 
  Layers, 
  BookOpen, 
  ChevronDown, 
  ChevronUp,
  Sparkles
} from "lucide-react";
import { Unit } from "../data";
import { textMatches, speakWord } from "../utils/search";

interface UnitWordSearchProps {
  unit: Unit;
  selectedCategoryName: string;
  onSelectCategory?: (categoryName: string) => void;
}

interface UnitWordDisplay {
  id: string;
  en: string;
  uz: string;
  categoryName?: string;
}

export default function UnitWordSearch({
  unit,
  selectedCategoryName,
  onSelectCategory
}: UnitWordSearchProps) {
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);

  // Collect words based on current selected category or all unit words
  const allUnitWords = useMemo(() => {
    const list: UnitWordDisplay[] = [];

    if (unit.categories && unit.categories.length > 0) {
      unit.categories.forEach((cat) => {
        // If a specific category is selected, or if 'All' is selected
        const isCurrentCat = 
          selectedCategoryName === "Barchasi (All)" || 
          selectedCategoryName === "All" ||
          selectedCategoryName === cat.name;

        cat.words.forEach(([en, uz], idx) => {
          list.push({
            id: `${unit.id}-${cat.name}-${idx}-${en}`,
            en,
            uz,
            categoryName: cat.name
          });
        });
      });
    } else if (unit.words && unit.words.length > 0) {
      unit.words.forEach(([en, uz], idx) => {
        list.push({
          id: `${unit.id}-direct-${idx}-${en}`,
          en,
          uz
        });
      });
    }

    return list;
  }, [unit, selectedCategoryName]);

  // Words filtered by selected category first
  const scopedWords = useMemo(() => {
    if (!unit.categories || unit.categories.length === 0) {
      return allUnitWords;
    }
    if (selectedCategoryName === "Barchasi (All)" || selectedCategoryName === "All" || selectedCategoryName === "Barchasi") {
      return allUnitWords;
    }
    return allUnitWords.filter((w) => w.categoryName === selectedCategoryName);
  }, [allUnitWords, selectedCategoryName, unit.categories]);

  // Search filtered words
  const filteredWords = useMemo(() => {
    if (!query.trim()) return scopedWords;
    return scopedWords.filter(
      (w) => textMatches(w.en, query) || textMatches(w.uz, query)
    );
  }, [scopedWords, query]);

  return (
    <div className="bg-white/3 border border-white/5 rounded-2xl p-4 md:p-5 space-y-4">
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <BookOpen className="text-[#6366f1] shrink-0" size={18} />
          <div>
            <h3 className="text-sm font-semibold text-white">
              Unit so'zlari va qidiruv
            </h3>
            <p className="text-[11px] text-[#94a3b8]">
              {scopedWords.length} ta so'zdan {query ? `${filteredWords.length} tasi ko'rsatilmoqda` : "barchasi"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="self-start sm:self-auto flex items-center gap-1.5 text-xs text-[#818cf8] hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-lg transition-all"
        >
          <span>{isExpanded ? "Yig'ish" : "So'zlarni ko'rish"}</span>
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="flex items-center gap-2.5 bg-black/30 border border-white/10 rounded-xl px-3.5 py-2 focus-within:border-[#6366f1] focus-within:ring-2 focus-within:ring-[#6366f1]/20 transition-all">
          <Search size={15} className="text-[#818cf8] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (!isExpanded) setIsExpanded(true);
            }}
            placeholder="Ushbu unit ichidan so'z qidirish (inglizcha yoki o'zbekcha)..."
            className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-[#94a3b8]/70 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded text-[#94a3b8] hover:text-white hover:bg-white/10 transition-colors shrink-0"
              title="Tozalash"
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Word List Table / Grid */}
      {isExpanded && (
        <div className="space-y-2">
          {filteredWords.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[340px] overflow-y-auto pr-1">
              {filteredWords.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 p-2.5 rounded-xl flex items-center justify-between gap-2.5 transition-all group"
                >
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                        {item.en}
                      </span>
                      <button
                        type="button"
                        onClick={() => speakWord(item.en)}
                        className="p-1 rounded text-[#818cf8] hover:text-white hover:bg-[#6366f1]/20 transition-colors"
                        title="Talaffuz"
                      >
                        <Volume2 size={13} />
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-300 truncate leading-relaxed">
                      {item.uz}
                    </p>
                  </div>

                  {item.categoryName && (
                    <span className="shrink-0 bg-[#6366f1]/10 border border-[#6366f1]/20 text-[#818cf8] text-[9px] font-mono px-1.5 py-0.5 rounded">
                      {item.categoryName}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center text-xs text-[#94a3b8] bg-white/2 rounded-xl border border-white/5">
              "{query}" bo'yicha ushbu bo'limda so'z topilmadi.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
