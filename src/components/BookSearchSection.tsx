import { useState, useMemo } from "react";
import { 
  Search, 
  X, 
  Volume2, 
  BookOpen, 
  Layers, 
  ChevronRight, 
  ArrowRight,
  List
} from "lucide-react";
import { Book, Unit } from "../data";
import { textMatches, speakWord } from "../utils/search";

interface BookSearchSectionProps {
  book: Book;
  onSelectUnit: (unit: Unit) => void;
  onSelectWordInBook: (unit: Unit, categoryName?: string) => void;
}

interface MatchedBookWord {
  id: string;
  en: string;
  uz: string;
  unit: Unit;
  categoryName?: string;
}

export default function BookSearchSection({
  book,
  onSelectUnit,
  onSelectWordInBook
}: BookSearchSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"words" | "units">("words");

  // Flatten all words in this book
  const allBookWords = useMemo(() => {
    const words: MatchedBookWord[] = [];
    book.units.forEach((unit) => {
      if (unit.categories && unit.categories.length > 0) {
        unit.categories.forEach((cat) => {
          cat.words.forEach(([en, uz], idx) => {
            words.push({
              id: `${unit.id}-${cat.name}-${idx}-${en}`,
              en,
              uz,
              unit,
              categoryName: cat.name
            });
          });
        });
      } else if (unit.words && unit.words.length > 0) {
        unit.words.forEach(([en, uz], idx) => {
          words.push({
            id: `${unit.id}-all-${idx}-${en}`,
            en,
            uz,
            unit
          });
        });
      }
    });
    return words;
  }, [book]);

  // Matched words
  const matchedWords = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return allBookWords.filter(
      (w) => textMatches(w.en, searchQuery) || textMatches(w.uz, searchQuery)
    );
  }, [allBookWords, searchQuery]);

  // Matched units (title matches OR contains matching word)
  const matchedUnits = useMemo(() => {
    if (!searchQuery.trim()) return book.units;
    return book.units.filter((unit) => {
      // Check unit title
      if (textMatches(unit.title, searchQuery)) return true;
      // Check words in unit
      if (unit.categories) {
        return unit.categories.some((cat) =>
          cat.words.some(([en, uz]) => textMatches(en, searchQuery) || textMatches(uz, searchQuery))
        );
      }
      if (unit.words) {
        return unit.words.some(([en, uz]) => textMatches(en, searchQuery) || textMatches(uz, searchQuery));
      }
      return false;
    });
  }, [book, searchQuery]);

  const isSearching = searchQuery.trim().length > 0;

  return (
    <div className="space-y-4">
      {/* Book Search Input */}
      <div className="relative">
        <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 focus-within:border-[#6366f1] focus-within:ring-2 focus-within:ring-[#6366f1]/20 transition-all">
          <Search size={16} className="text-[#818cf8] shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`"${book.title}" ichidan so'z yoki unit qidirish...`}
            className="w-full bg-transparent text-sm text-white placeholder-[#94a3b8]/70 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="p-1 rounded text-[#94a3b8] hover:text-white hover:bg-white/10 transition-colors shrink-0"
              title="Tozalash"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* If search query is active, show tabs and results */}
      {isSearching ? (
        <div className="space-y-3">
          {/* Tabs for Words vs Units */}
          <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("words")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "words"
                    ? "bg-[#6366f1] text-white shadow-[0_0_10px_rgba(99,102,241,0.3)]"
                    : "bg-white/5 text-[#94a3b8] hover:text-white hover:bg-white/10"
                }`}
              >
                Topilgan so'zlar ({matchedWords.length})
              </button>
              <button
                onClick={() => setActiveTab("units")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "units"
                    ? "bg-[#6366f1] text-white shadow-[0_0_10px_rgba(99,102,241,0.3)]"
                    : "bg-white/5 text-[#94a3b8] hover:text-white hover:bg-white/10"
                }`}
              >
                Mos bo'limlar ({matchedUnits.length})
              </button>
            </div>

            <div className="text-[11px] font-mono text-[#94a3b8]">
              "{searchQuery}"
            </div>
          </div>

          {/* TAB 1: Matched Words in this Book */}
          {activeTab === "words" && (
            <div className="space-y-2">
              {matchedWords.length > 0 ? (
                <div className="grid grid-cols-1 gap-2 max-h-[480px] overflow-y-auto pr-1">
                  {matchedWords.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => onSelectWordInBook(item.unit, item.categoryName)}
                      className="group bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#6366f1]/30 p-3 rounded-xl flex items-center justify-between gap-3 transition-all cursor-pointer"
                    >
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white tracking-wide">
                            {item.en}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              speakWord(item.en);
                            }}
                            className="p-1 rounded-md text-[#818cf8] hover:text-white hover:bg-[#6366f1]/20 transition-colors"
                            title="Talaffuz"
                          >
                            <Volume2 size={14} />
                          </button>
                        </div>
                        <p className="text-xs text-slate-300 leading-snug truncate">
                          {item.uz}
                        </p>
                        <div className="flex items-center gap-2 pt-0.5 text-[10px] font-mono text-[#94a3b8]">
                          <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5">
                            {item.unit.title}
                          </span>
                          {item.categoryName && (
                            <span className="bg-[#6366f1]/10 px-2 py-0.5 rounded border border-[#6366f1]/20 text-[#818cf8]">
                              {item.categoryName}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-1 text-xs text-[#818cf8] group-hover:text-white group-hover:translate-x-0.5 transition-all">
                        <span>O'tish</span>
                        <ChevronRight size={14} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-[#94a3b8] bg-white/3 rounded-xl border border-white/5">
                  Ushbu kitob ichida "{searchQuery}" so'zi topilmadi.
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Matched Units in this Book */}
          {activeTab === "units" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {matchedUnits.length > 0 ? (
                matchedUnits.map((unit) => {
                  let wordCount = 0;
                  if (unit.categories) {
                    unit.categories.forEach((cat) => (wordCount += cat.words.length));
                  } else if (unit.words) {
                    wordCount = unit.words.length;
                  }
                  const hasCategories = !!(unit.categories && unit.categories.length > 0);

                  return (
                    <div
                      key={unit.id}
                      onClick={() => onSelectUnit(unit)}
                      className="group bg-white/5 hover:bg-white/12 border border-white/5 hover:border-white/10 p-4 rounded-xl cursor-pointer transition-all duration-200 flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium text-white group-hover:text-[#818cf8] transition-colors">
                          {unit.title}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-[#94a3b8]">
                          <span>{wordCount} ta so'z</span>
                          {hasCategories && (
                            <>
                              <span className="text-white/10">•</span>
                              <span className="flex items-center gap-1 text-[#818cf8]">
                                <Layers className="w-3 h-3" /> {unit.categories?.length} guruh
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-black/30 border border-white/5 flex items-center justify-center text-[#94a3b8] group-hover:bg-[#6366f1] group-hover:text-white transition-all shrink-0">
                        <ChevronRight size={14} />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full py-8 text-center text-xs text-[#94a3b8] bg-white/3 rounded-xl border border-white/5">
                  Mos bo'lim topilmadi.
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* When not searching, render standard unit list */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="units-list-grid">
          {book.units.map((unit) => {
            let wordCount = 0;
            if (unit.categories) {
              unit.categories.forEach((cat) => (wordCount += cat.words.length));
            } else if (unit.words) {
              wordCount = unit.words.length;
            }
            const hasCategories = !!(unit.categories && unit.categories.length > 0);

            return (
              <div
                key={unit.id}
                onClick={() => onSelectUnit(unit)}
                className="group bg-white/5 hover:bg-white/12 border border-white/5 hover:border-white/10 hover:-translate-y-0.5 p-4 rounded-xl cursor-pointer transition-all duration-300 flex items-center justify-between gap-4"
                id={`unit-item-${unit.id}`}
              >
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-[#f8fafc] group-hover:text-[#818cf8] transition-colors">
                    {unit.title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-[#94a3b8]">
                    <span>{wordCount} ta so'z</span>
                    {hasCategories && (
                      <>
                        <span className="text-white/10">•</span>
                        <span className="flex items-center gap-1 text-[#818cf8]">
                          <Layers className="w-3 h-3" /> {unit.categories?.length} guruh
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="w-8 h-8 rounded-lg bg-black/30 border border-white/5 flex items-center justify-center text-[#94a3b8] group-hover:bg-[#6366f1] group-hover:text-white group-hover:shadow-[0_0_10px_rgba(99,102,241,0.4)] transition-all shrink-0">
                  <ChevronRight size={14} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
