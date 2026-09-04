import { useState, useMemo, useEffect } from "react";
import { 
  ArrowLeft, 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Sparkles,
  Lightbulb,
  Award,
  BookOpen,
  SlidersHorizontal
} from "lucide-react";
import { getSentenceForWord, SentenceExample, CEFR_LEVEL_META } from "../utils/sentenceContext";
import { speakWord } from "../utils/search";
import { CEFRLevel } from "../types";

interface SentenceQuizItem {
  id: string;
  word: [string, string]; // [en, uz]
  originalIndex: number;
}

interface SentenceQuizViewProps {
  words: [string, string][];
  unitTitle: string;
  bookTitle: string;
  categoryTitle: string;
  allUnitWords: [string, string][];
  initialLevel?: CEFRLevel;
  onBack: () => void;
  onSaveHistory?: (stats: {
    totalWords: number;
    mistakeWords: number;
    percentage: number;
    level: CEFRLevel;
  }) => void;
}

const ALL_LEVELS: CEFRLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

export default function SentenceQuizView({
  words,
  unitTitle,
  bookTitle,
  categoryTitle,
  allUnitWords,
  initialLevel = "A1",
  onBack,
  onSaveHistory
}: SentenceQuizViewProps) {
  // Current CEFR Level for sentences (default to A1 as requested for accessible beginner sentences)
  const [level, setLevel] = useState<CEFRLevel>(initialLevel);

  // Queue of questions to answer
  const [queue, setQueue] = useState<SentenceQuizItem[]>(() => {
    const initial = words.map((w, idx) => ({
      id: `${w[0]}-${idx}-${Date.now()}`,
      word: w,
      originalIndex: idx
    }));
    // Shuffle initial queue
    const shuffled = [...initial];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  });

  const totalUniqueCount = words.length;

  // Track attempts per English word to serve a NEW sentence each time
  const [attemptCounts, setAttemptCounts] = useState<Record<string, number>>({});
  // Track if answered correctly on first try
  const [firstTryStatus, setFirstTryStatus] = useState<Record<string, boolean>>({});
  // Track total mistakes count
  const [mistakeList, setMistakeList] = useState<string[]>([]);
  // Consecutive correct answers streak
  const [streak, setStreak] = useState(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Current item and sentence
  const currentItem = queue[currentIndex] || null;
  const targetEn = currentItem ? currentItem.word[0] : "";
  const targetUz = currentItem ? currentItem.word[1] : "";

  // The sentence example generated for this attempt and chosen level
  const currentSentence: SentenceExample | null = useMemo(() => {
    if (!currentItem) return null;
    const attempt = attemptCounts[targetEn] || 0;
    return getSentenceForWord(targetEn, targetUz, attempt, level);
  }, [currentItem, targetEn, targetUz, attemptCounts, level]);

  // Generate 4 multiple choice options for current word
  const options = useMemo(() => {
    if (!currentItem) return [];
    const correct = currentItem.word[0];

    // Pool of potential distractors
    const pool = allUnitWords.length >= 4 ? allUnitWords : words;
    const otherWords = pool
      .map((w) => w[0])
      .filter((w) => w.toLowerCase() !== correct.toLowerCase());

    const uniqueOthers = Array.from(new Set(otherWords));
    // Shuffle distractors
    for (let i = uniqueOthers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [uniqueOthers[i], uniqueOthers[j]] = [uniqueOthers[j], uniqueOthers[i]];
    }

    const distractors = uniqueOthers.slice(0, 3);
    const combined = [correct, ...distractors];

    // Shuffle final 4 options
    for (let i = combined.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [combined[i], combined[j]] = [combined[j], combined[i]];
    }

    return combined;
  }, [currentItem, allUnitWords, words]);

  // Handle user selecting an option
  const handleSelectOption = (option: string) => {
    if (selectedOption !== null || !currentItem || !currentSentence) return;

    setSelectedOption(option);
    setIsAnswerChecked(true);

    const isCorrect = option.trim().toLowerCase() === targetEn.trim().toLowerCase();

    if (isCorrect) {
      setStreak((prev) => prev + 1);
      if (firstTryStatus[targetEn] === undefined) {
        setFirstTryStatus((prev) => ({ ...prev, [targetEn]: true }));
      }
      speakWord(targetEn);
    } else {
      setStreak(0);
      if (firstTryStatus[targetEn] === undefined) {
        setFirstTryStatus((prev) => ({ ...prev, [targetEn]: false }));
      }
      if (!mistakeList.includes(targetEn)) {
        setMistakeList((prev) => [...prev, targetEn]);
      }

      // REQUEUE LOGIC: Increment attempt count so when re-asked, IT GETS A NEW SENTENCE AT THIS LEVEL
      setAttemptCounts((prev) => ({
        ...prev,
        [targetEn]: (prev[targetEn] || 0) + 1
      }));

      setQueue((prevQueue) => {
        const remainingQueue = [...prevQueue];
        const newItem: SentenceQuizItem = {
          id: `${currentItem.word[0]}-retry-${Date.now()}-${Math.random()}`,
          word: currentItem.word,
          originalIndex: currentItem.originalIndex
        };
        const insertPosition = Math.min(
          remainingQueue.length,
          currentIndex + 3
        );
        remainingQueue.splice(insertPosition, 0, newItem);
        return remainingQueue;
      });
    }
  };

  // Move to next question or complete quiz
  const handleNext = () => {
    if (currentIndex + 1 < queue.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setIsCompleted(true);
      if (onSaveHistory) {
        const correctCount = Object.values(firstTryStatus).filter(Boolean).length;
        const total = totalUniqueCount;
        const percentage = Math.round((correctCount / Math.max(total, 1)) * 100);
        onSaveHistory({
          totalWords: total,
          mistakeWords: mistakeList.length,
          percentage,
          level
        });
      }
    }
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCompleted) return;

      if (!isAnswerChecked) {
        const num = parseInt(e.key);
        if (num >= 1 && num <= options.length) {
          handleSelectOption(options[num - 1]);
        }
      } else {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleNext();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [options, isAnswerChecked, isCompleted, selectedOption]);

  // Restart Quiz
  const handleRestart = () => {
    const initial = words.map((w, idx) => ({
      id: `${w[0]}-${idx}-${Date.now()}`,
      word: w,
      originalIndex: idx
    }));
    const shuffled = [...initial];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setQueue(shuffled);
    setAttemptCounts({});
    setFirstTryStatus({});
    setMistakeList([]);
    setStreak(0);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setIsCompleted(false);
  };

  const correctFirstTryCount = useMemo(() => {
    return Object.values(firstTryStatus).filter(Boolean).length;
  }, [firstTryStatus]);

  const scorePercentage = Math.round((correctFirstTryCount / Math.max(totalUniqueCount, 1)) * 100);

  // SUMMARY SCREEN
  if (isCompleted) {
    return (
      <div className="w-full max-w-xl mx-auto space-y-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-[#6366f1]/20 text-[#818cf8] mx-auto flex items-center justify-center">
            <Award size={32} />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6366f1]/20 border border-[#6366f1]/30 text-xs font-mono font-bold text-[#818cf8] mb-2">
              <span>Daraja: {level} ({CEFR_LEVEL_META[level].nameUz})</span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">
              Test muvaffaqiyatli yakunlandi!
            </h2>
            <p className="text-xs text-[#94a3b8] mt-1">
              {unitTitle} — {categoryTitle}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="bg-black/30 p-3 rounded-xl border border-white/5">
              <div className="text-[11px] text-[#94a3b8]">Jami so'zlar</div>
              <div className="text-lg font-bold font-mono text-white mt-0.5">
                {totalUniqueCount} ta
              </div>
            </div>
            <div className="bg-black/30 p-3 rounded-xl border border-white/5">
              <div className="text-[11px] text-[#94a3b8]">1-urinishda to'g'ri</div>
              <div className="text-lg font-bold font-mono text-emerald-400 mt-0.5">
                {correctFirstTryCount} ta
              </div>
            </div>
            <div className="bg-black/30 p-3 rounded-xl border border-white/5">
              <div className="text-[11px] text-[#94a3b8]">O'zlashtirish</div>
              <div className="text-lg font-bold font-mono text-[#818cf8] mt-0.5">
                {scorePercentage}%
              </div>
            </div>
          </div>

          {mistakeList.length > 0 && (
            <div className="text-left bg-black/20 p-4 rounded-xl border border-white/5 space-y-2 mt-3">
              <div className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                <Lightbulb size={14} />
                <span>Yangi gap kontekstida mustahkamlangan so'zlar ({mistakeList.length}):</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {mistakeList.map((item) => (
                  <span
                    key={item}
                    className="text-xs bg-white/5 border border-white/10 text-slate-200 px-2.5 py-1 rounded-lg"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
            <button
              onClick={handleRestart}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#6366f1] hover:bg-[#4f46e5] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-lg"
            >
              <RotateCcw size={15} />
              <span>Qaytadan boshlash</span>
            </button>
            <button
              onClick={onBack}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-all"
            >
              Bo'limga qaytish
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentItem || !currentSentence) return null;

  const isCurrentCorrect = selectedOption?.trim().toLowerCase() === targetEn.trim().toLowerCase();
  const currentAttempt = attemptCounts[targetEn] || 0;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4" id="sentence-quiz-view">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-3 bg-white/5 border border-white/10 p-3.5 rounded-2xl">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-[#94a3b8] hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/5 transition-all"
        >
          <ArrowLeft size={14} /> Chiqish
        </button>

        <div className="text-center">
          <div className="text-xs font-bold text-white">
            Savol {currentIndex + 1} / {queue.length}
          </div>
          <div className="text-[10px] text-[#818cf8] font-mono">
            {unitTitle}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {streak > 1 && (
            <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-lg">
              🔥 {streak}
            </div>
          )}
          <div className="text-xs text-[#94a3b8] font-mono hidden sm:inline">
            Jami: {totalUniqueCount}
          </div>
        </div>
      </div>

      {/* Interactive CEFR Level Selector (A1, A2, B1, B2, C1, C2) */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-3.5 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
            <SlidersHorizontal size={14} className="text-[#818cf8]" />
            <span>Gaplar darajasi (Level):</span>
          </div>
          <span className="text-[11px] text-[#818cf8] font-mono">
            {level} — {CEFR_LEVEL_META[level].nameUz}
          </span>
        </div>

        {/* 6 Level Pills */}
        <div className="grid grid-cols-6 gap-1.5">
          {ALL_LEVELS.map((lvl) => {
            const isActive = level === lvl;
            const meta = CEFR_LEVEL_META[lvl];
            return (
              <button
                key={lvl}
                type="button"
                onClick={() => {
                  setLevel(lvl);
                }}
                className={`py-2 px-1 rounded-xl text-center transition-all cursor-pointer border ${
                  isActive
                    ? "bg-[#6366f1] text-white border-white/20 font-bold shadow-[0_0_15px_rgba(99,102,241,0.4)] scale-[1.02]"
                    : "bg-black/30 hover:bg-white/10 text-slate-300 border-white/5 hover:border-white/15 text-xs font-medium"
                }`}
                title={`${lvl}: ${meta.nameUz} — ${meta.desc}`}
              >
                <div className="text-xs font-mono">{lvl}</div>
                <div className="text-[9px] opacity-80 truncate hidden sm:block">
                  {meta.nameUz}
                </div>
              </button>
            );
          })}
        </div>

        <div className="text-[11px] text-[#94a3b8] flex items-center justify-between pt-0.5">
          <span>{CEFR_LEVEL_META[level].desc}</span>
          <span className="text-[10px] opacity-70">Istalgan payt almashtirish mumkin</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-[#6366f1] to-[#818cf8] h-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / queue.length) * 100}%` }}
        />
      </div>

      {/* Main Sentence Card */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-7 space-y-5 shadow-xl relative overflow-hidden">
        {/* Status badges: Level and Attempt */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[#6366f1]/20 border border-[#6366f1]/40 text-[11px] font-mono font-bold text-[#818cf8]">
            {level} daraja
          </span>

          {currentAttempt > 0 && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-[11px] text-amber-300 font-medium">
              <Sparkles size={13} />
              <span>Qayta so'rov: yangi gap berildi</span>
            </div>
          )}
        </div>

        {/* English Sentence with Interactive Blank */}
        <div className="text-lg sm:text-xl md:text-2xl text-white font-medium leading-relaxed tracking-wide">
          <span>{currentSentence.before}</span>
          
          {/* THE BLANK BOX */}
          <span
            className={`inline-block mx-1.5 px-3 py-1 rounded-xl font-bold transition-all border ${
              !isAnswerChecked
                ? "bg-[#6366f1]/20 border-[#6366f1]/40 text-[#818cf8] animate-pulse shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                : isCurrentCorrect
                ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                : "bg-red-500/20 border-red-500 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
            }`}
          >
            {!isAnswerChecked ? (
              <span className="font-mono tracking-widest px-2">. . . . . .</span>
            ) : isCurrentCorrect ? (
              <span className="flex items-center gap-1.5">
                {targetEn} <CheckCircle2 size={16} className="inline text-emerald-400" />
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <span className="line-through opacity-70">{selectedOption}</span>
                <span className="text-emerald-300 ml-1 underline">{targetEn}</span>
              </span>
            )}
          </span>

          <span>{currentSentence.after}</span>
        </div>

        {/* Uzbek Translation Reveal (Appears when answered) */}
        {isAnswerChecked && (
          <div className="pt-4 border-t border-white/10 space-y-3 animate-fadeIn">
            <div className="bg-black/30 rounded-xl p-4 border border-white/5 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase text-[#818cf8] tracking-wider font-semibold">
                  Gapning o'zbekcha tarjimasi ({level}):
                </span>
                <button
                  type="button"
                  onClick={() => speakWord(currentSentence.fullEn)}
                  className="flex items-center gap-1.5 text-xs text-[#818cf8] hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-lg transition-all"
                  title="To'liq gapni tinglash"
                >
                  <Volume2 size={14} />
                  <span>Tinglash</span>
                </button>
              </div>
              <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
                "{currentSentence.uz}"
              </p>
              <div className="text-[11px] text-[#94a3b8] pt-1">
                Kalit so'z: <span className="text-white font-bold">{targetEn}</span> — {targetUz}
              </div>
            </div>

            {/* Explanatory feedback banner */}
            {!isCurrentCorrect && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-200">
                <Lightbulb size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Xato bo'ldi.</span> To'g'ri so'z: <strong className="text-amber-300">{targetEn}</strong>. 
                  Ushbu so'zni xotirangizda mustahkamlash uchun u dars davomida <strong>boshqa yangi gapda</strong> yana qayta so'raladi!
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 4 Multiple Choice Option Buttons */}
      <div className="space-y-3">
        <div className="text-xs font-semibold text-[#94a3b8] flex items-center justify-between">
          <span>Bo'sh joyga to'g'ri keluvchi so'zni tanlang:</span>
          <span className="text-[10px] font-mono text-[#94a3b8]/70 hidden sm:inline">
            1-4 tugmalarini bosishingiz mumkin
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {options.map((option, idx) => {
            const isSelected = selectedOption === option;
            const isTarget = option.trim().toLowerCase() === targetEn.trim().toLowerCase();

            let btnStyle = "bg-white/5 hover:bg-white/10 border-white/10 text-white hover:border-[#6366f1]/50";

            if (isAnswerChecked) {
              if (isTarget) {
                btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/30";
              } else if (isSelected && !isTarget) {
                btnStyle = "bg-red-500/20 border-red-500 text-red-200 ring-2 ring-red-500/30";
              } else {
                btnStyle = "bg-black/20 border-white/5 text-[#94a3b8] opacity-50";
              }
            }

            return (
              <button
                key={option}
                type="button"
                disabled={isAnswerChecked}
                onClick={() => handleSelectOption(option)}
                className={`p-4 rounded-xl border text-left flex items-center justify-between gap-3 transition-all duration-200 cursor-pointer ${btnStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-xs font-mono text-[#818cf8] font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-sm sm:text-base font-semibold tracking-wide">
                    {option}
                  </span>
                </div>

                {isAnswerChecked && isTarget && (
                  <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                )}
                {isAnswerChecked && isSelected && !isTarget && (
                  <XCircle size={18} className="text-red-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Action / Next Button */}
      {isAnswerChecked && (
        <div className="pt-2 animate-fadeIn">
          <button
            type="button"
            onClick={handleNext}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#4f46e5] hover:from-[#4f46e5] hover:to-[#4338ca] text-white text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] cursor-pointer"
            id="sentence-quiz-next-btn"
          >
            <span>{currentIndex + 1 < queue.length ? "Keyingi gap" : "Natijalarni ko'rish"}</span>
            <ArrowRight size={16} />
            <kbd className="ml-2 text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono hidden sm:inline">
              Enter ↵
            </kbd>
          </button>
        </div>
      )}
    </div>
  );
}
