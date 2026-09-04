import { useState, useMemo } from "react";
import { 
  Search, 
  X, 
  Volume2, 
  Layers, 
  BookOpen, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  Layers as LayersIcon,
  Play,
  ListChecks,
  Check
} from "lucide-react";
import { Unit } from "../data";
import { textMatches, speakWord } from "../utils/search";

interface UnitWordSearchProps {
  unit: Unit;
  selectedCategoryName: string;
  onSelectCategory?: (categoryName: string) => void;
  onPracticeFiltered?: (words: [string, string][], mode: "flashcards" | "quiz") => void;
}

interface UnitWordDisplay {
  id: string;
  en: string;
  uz: string;
  categoryName?: string;
  pair: [string, string];
}

function HighlightedMatch({ text, query }: { text: string; query: string }) {
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
      <mark className="bg-[#6366f1]/40 text-white font-medium rounded px-0.5">{matched}</mark>
      {after}
    </span>
  );
}

export default function UnitWordSearch({
  unit,
  selectedCategoryName,
  onSelectCategory,
  onPracticeFiltered
}: UnitWordSearchProps) {
  const [filterQuery, setFilterQuery] = useState("");
  const [isListExpanded, setIsListExpanded] = useState(true);

  // Flatten all words for this unit
  const allUnitWords = useMemo(() => {
    const list: UnitWordDisplay[] = [];

    if (unit.categories && unit.categories.length > 0) {
      unit.categories.forEach((cat) => {
        cat.words.forEach(([en, uz], idx) => {
          list.push({
            id: `${unit.id}-${cat.name}-${idx}-${en}`,
            en,
            uz,
            categoryName: cat.name,
            pair: [en, uz]
          });
        });
      });
    } else if (unit.words && unit.words.length > 0) {
      unit.words.forEach(([en, uz], idx) => {
        list.push({
          id: `${unit.id}-direct-${idx}-${en}`,
          en,
          uz,
          pair: [en, uz]
        });
      });
    }

    return list;
  }, [unit]);

  // Words filtered by selected category first (if a specific category is chosen)
  const categoryScopedWords = useMemo(() => {
    if (!unit.categories || unit.categories.length === 0) {
      return allUnitWords;
    }
    const isAll = 
      selectedCategoryName === "Barchasi (All)" || 
      selectedCategoryName === "All (Barchasi)" ||
      selectedCategoryName === "All" || 
      selectedCategoryName === "Barchasi";

    if (isAll) {
      return allUnitWords;
    }
    return allUnitWords.filter((w) => w.categoryName === selectedCategoryName);
  }, [allUnitWords, selectedCategoryName, unit.categories]);

  // Search/filter query applied
  const filteredWords = useMemo(() => {
    if (!filterQuery.trim()) return categoryScopedWords;
    return categoryScopedWords.filter(
      (w) => textMatches(w.en, filterQuery) || textMatches(w.uz, filterQuery)
    );
  }, [categoryScopedWords, filterQuery]);

  const isFiltering = filterQuery.trim().length > 0;
  const filteredPairs: [string, string][] = useMemo(() => {
    return filteredWords.map((w) => w.pair);
  }, [filteredWords]);

  return (
    <div 
      className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 space-y-4 shadow-lg transition-all"
      id="unit-word-filter-section"
    >
      {/* Header with Title and Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#6366f1]/20 text-[#818cf8] flex items-center justify-center shrink-0">
            <Search size={16} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              Unit so'zlarini tezkor qidirish (Filter)
            </h3>
            <p className="text-[11px] text-[#94a3b8]">
              {isFiltering ? (
                <>
                  <span className="text-[#818cf8] font-bold">{filteredWords.length} ta</span> so'z topildi (jami {categoryScopedWords.length} tadan)
                </>
              ) : (
                <>Jami <span className="text-white font-medium">{categoryScopedWords.length} ta</span> so'z mavjud</>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {isFiltering && (
            <button
              onClick={() => setFilterQuery("")}
              className="text-xs text-[#94a3b8] hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-lg border border-white/5 transition-all flex items-center gap-1"
            >
              <X size={12} />
              <span>Filtrni tozalash</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsListExpanded(!isListExpanded)}
            className="flex items-center gap-1 text-xs text-[#818cf8] hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-lg border border-white/5 transition-all"
            title={isListExpanded ? "Ro'yxatni yig'ish" : "Ro'yxatni ochish"}
          >
            <span>{isListExpanded ? "Yig'ish" : "Ko'rsatish"}</span>
            {isListExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>

      {/* Main Search/Filter Input Field */}
      <div className="relative">
        <div className="flex items-center gap-2.5 bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 focus-within:border-[#6366f1] focus-within:ring-2 focus-within:ring-[#6366f1]/20 transition-all">
          <Search size={16} className="text-[#818cf8] shrink-0" />
          <input
            id="unit-filter-input"
            type="text"
            value={filterQuery}
            onChange={(e) => {
              setFilterQuery(e.target.value);
              if (!isListExpanded) setIsListExpanded(true);
            }}
            placeholder="Faqat shu unitdagi so'zni qidiring (masalan: look, take, qoida)..."
            className="w-full bg-transparent text-sm text-white placeholder-[#94a3b8]/60 focus:outline-none"
          />
          {filterQuery && (
            <button
              onClick={() => setFilterQuery("")}
              className="p-1 rounded text-[#94a3b8] hover:text-white hover:bg-white/10 transition-colors shrink-0"
              title="Tozalash"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Action banner when filtering is active: allows practicing only the matching words */}
      {isFiltering && filteredWords.length > 0 && onPracticeFiltered && (
        <div className="bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="text-slate-200">
            Filtr bo'yicha topilgan <span className="font-bold text-[#818cf8]">{filteredWords.length} ta</span> so'zni mashq qilish:
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPracticeFiltered(filteredPairs, "flashcards")}
              className="px-3 py-1.5 rounded-lg bg-[#6366f1] hover:bg-[#4f46e5] text-white font-medium flex items-center gap-1.5 transition-all shadow-sm"
              id="practice-filtered-flashcards-btn"
            >
              <LayersIcon size={13} />
              <span>Fleshkarta ({filteredWords.length})</span>
            </button>
            <button
              onClick={() => onPracticeFiltered(filteredPairs, "quiz")}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium flex items-center gap-1.5 transition-all"
              id="practice-filtered-quiz-btn"
            >
              <ListChecks size={13} />
              <span>Test ({filteredWords.length})</span>
            </button>
          </div>
        </div>
      )}

      {/* Expandable Words List with Instant Highlighting & Pronunciation */}
      {isListExpanded && (
        <div className="space-y-2 pt-1">
          {filteredWords.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[320px] overflow-y-auto pr-1">
              {filteredWords.map((item) => (
                <div
                  key={item.id}
                  className="bg-black/20 hover:bg-white/10 border border-white/5 hover:border-white/15 p-2.5 rounded-xl flex items-center justify-between gap-2.5 transition-all group"
                >
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                        <HighlightedMatch text={item.en} query={filterQuery} />
                      </span>
                      <button
                        type="button"
                        onClick={() => speakWord(item.en)}
                        className="p-1 rounded text-[#818cf8] hover:text-white hover:bg-[#6366f1]/20 transition-colors"
                        title="Talaffuzni tinglash"
                      >
                        <Volume2 size={13} />
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-300 truncate leading-relaxed">
                      <HighlightedMatch text={item.uz} query={filterQuery} />
                    </p>
                  </div>

                  {item.categoryName && (
                    <span 
                      onClick={() => onSelectCategory && onSelectCategory(item.categoryName!)}
                      className="shrink-0 bg-[#6366f1]/10 border border-[#6366f1]/20 text-[#818cf8] hover:text-white text-[9px] font-mono px-2 py-0.5 rounded cursor-pointer transition-colors"
                      title={`"${item.categoryName}" guruhini tanlash`}
                    >
                      {item.categoryName}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-[#94a3b8] bg-black/20 rounded-xl border border-white/5 space-y-1">
              <p className="text-white font-medium">Ushbu unitda mos so'z topilmadi</p>
              <p className="text-[11px]">"{filterQuery}" so'zi bo'yicha natija yo'q. Qidiruv so'zini o'zgartirib ko'ring.</p>
              <button
                onClick={() => setFilterQuery("")}
                className="mt-2 text-[11px] text-[#818cf8] hover:underline"
              >
                Filtrni bekor qilish
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
