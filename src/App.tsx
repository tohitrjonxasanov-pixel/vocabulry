import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  History, 
  Trash2, 
  ChevronRight, 
  ArrowLeft, 
  RotateCcw, 
  Shuffle, 
  CheckCircle, 
  XCircle, 
  Award, 
  Layers, 
  ListChecks, 
  Sparkles,
  RefreshCw,
  Frown,
  Smile,
  Calendar,
  Percent,
  Check,
  Search
} from "lucide-react";
import { BOOKS } from "./data";
import { HistoryItem, ViewState, SearchWordItem } from "./types";
import { buildAllIndexedWords } from "./utils/search";
import GlobalSearchModal from "./components/GlobalSearchModal";
import BookSearchSection from "./components/BookSearchSection";
import UnitWordSearch from "./components/UnitWordSearch";
import GapFillSection from "./components/GapFillSection";
import GapFillComingSoonModal from "./components/GapFillComingSoonModal";

const STORAGE_KEY = "vocabulary_app_history_logs_v1";

// Persistent storage helpers with strict try/catch
const getStorageHistory = (): HistoryItem[] => {
  try {
    if (typeof window !== "undefined" && (window as any).storage) {
      const data = (window as any).storage.get(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    }
  } catch (error) {
    console.error("Storage read error:", error);
  }
  // Local storage fallback for redundancy/dev
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

const saveStorageHistory = (logs: HistoryItem[]) => {
  try {
    if (typeof window !== "undefined" && (window as any).storage) {
      (window as any).storage.set(STORAGE_KEY, JSON.stringify(logs));
    }
  } catch (error) {
    console.error("Storage write error:", error);
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  } catch (e) {
    // ignore
  }
};

const clearStorageHistory = () => {
  try {
    if (typeof window !== "undefined" && (window as any).storage) {
      (window as any).storage.delete(STORAGE_KEY);
    }
  } catch (error) {
    console.error("Storage delete error:", error);
  }
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    // ignore
  }
};

export default function App() {
  // Navigation / View State
  const [currentView, setCurrentView] = useState<ViewState>("home");
  const [selectedBook, setSelectedBook] = useState<typeof BOOKS[0] | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<any | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);

  // General App State
  const [historyLogs, setHistoryLogs] = useState<HistoryItem[]>([]);
  const [wordsToLearn, setWordsToLearn] = useState<[string, string][]>([]);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
  const [isGapFillCategoryModalOpen, setIsGapFillCategoryModalOpen] = useState(false);

  // Global search index built once from all books
  const indexedWords = useMemo(() => buildAllIndexedWords(BOOKS), []);

  // Keyboard shortcut (Ctrl+K or Cmd+K) to toggle global search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsGlobalSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  
  // Flashcard state
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Quiz state
  const [quizQueue, setQuizQueue] = useState<{ word: [string, string]; originalIndex: number }[]>([]);
  const [quizTotalUnique, setQuizTotalUnique] = useState(0);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  
  // Mistakes track (word -> count)
  const [quizMistakes, setQuizMistakes] = useState<Record<string, number>>({});
  // If the word was correctly solved on the first attempt
  const [quizFirstTryCorrect, setQuizFirstTryCorrect] = useState<Record<string, boolean>>({});
  
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [quizOptions, setQuizOptions] = useState<string[]>([]);

  // Results state (computed or stored locally to show on Results page)
  const [resultsTotal, setResultsTotal] = useState(0);
  const [resultsMistakeCount, setResultsMistakeCount] = useState(0);
  const [resultsPercentage, setResultsPercentage] = useState(0);
  const [resultsMistakesList, setResultsMistakeList] = useState<{ en: string; uz: string; count: number }[]>([]);

  // Load history on startup
  useEffect(() => {
    setHistoryLogs(getStorageHistory());
  }, []);

  // Sync back history changes
  const updateHistory = (newLogs: HistoryItem[]) => {
    setHistoryLogs(newLogs);
    saveStorageHistory(newLogs);
  };

  const handleClearHistory = () => {
    if (confirm("Haqiqatdan ham barcha natijalar tarixini o'chirmoqchisiz?")) {
      clearStorageHistory();
      setHistoryLogs([]);
    }
  };

  // Helper: Go back to previous logical view
  const handleBack = () => {
    if (currentView === "unitList") {
      setCurrentView("home");
      setSelectedBook(null);
    } else if (currentView === "categoryMenu") {
      setCurrentView("unitList");
      setSelectedUnit(null);
    } else if (currentView === "flashcards" || currentView === "quiz" || currentView === "results") {
      if (selectedUnitHasCategories) {
        setCurrentView("categoryMenu");
      } else {
        setCurrentView("unitList");
        setSelectedUnit(null);
      }
    } else if (currentView === "history") {
      setCurrentView("home");
    }
  };

  const changeView = (view: ViewState) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectBook = (book: typeof BOOKS[0]) => {
    setSelectedBook(book);
    changeView("unitList");
  };

  const selectedUnitHasCategories = useMemo(() => {
    return !!(selectedUnit && selectedUnit.categories && selectedUnit.categories.length > 0);
  }, [selectedUnit]);

  const selectUnit = (unit: any) => {
    setSelectedUnit(unit);
    if (unit.categories && unit.categories.length > 0) {
      // Default select the first category
      const firstCat = unit.categories[0];
      setWordsToLearn(firstCat.words);
      setSelectedCategory(firstCat);
      changeView("categoryMenu");
    } else {
      // Direct words (4000 Essential English Words format)
      const words = unit.words || [];
      setWordsToLearn(words);
      setSelectedCategory({ name: "Barchasi", words });
      changeView("categoryMenu");
    }
  };

  const selectCategory = (categoryName: string) => {
    if (!selectedUnit) return;
    if (categoryName === "All") {
      // Gather all words in unit
      let allWords: [string, string][] = [];
      if (selectedUnit.categories) {
        selectedUnit.categories.forEach((cat: any) => {
          allWords = [...allWords, ...cat.words];
        });
      } else {
        allWords = selectedUnit.words || [];
      }
      setWordsToLearn(allWords);
      setSelectedCategory({ name: "Barchasi (All)", words: allWords });
    } else {
      const catObj = selectedUnit.categories.find((c: any) => c.name === categoryName);
      if (catObj) {
        setWordsToLearn(catObj.words);
        setSelectedCategory(catObj);
      }
    }
  };

  const handleSelectWordInBook = (unit: any, categoryName?: string) => {
    setSelectedUnit(unit);
    if (unit.categories && unit.categories.length > 0) {
      if (categoryName) {
        const catObj = unit.categories.find((c: any) => c.name === categoryName);
        if (catObj) {
          setWordsToLearn(catObj.words);
          setSelectedCategory(catObj);
        } else {
          setWordsToLearn(unit.categories[0].words);
          setSelectedCategory(unit.categories[0]);
        }
      } else {
        setWordsToLearn(unit.categories[0].words);
        setSelectedCategory(unit.categories[0]);
      }
    } else {
      const words = unit.words || [];
      setWordsToLearn(words);
      setSelectedCategory({ name: "Barchasi", words });
    }
    changeView("categoryMenu");
  };

  const handleSelectWordFromGlobalSearch = (item: SearchWordItem) => {
    setIsGlobalSearchOpen(false);
    const targetBook = BOOKS.find((b) => b.id === item.bookId);
    if (targetBook) {
      setSelectedBook(targetBook);
    }
    handleSelectWordInBook(item.rawUnit, item.categoryName);
  };

  const startFlashcards = (customWords?: [string, string][]) => {
    if (customWords) {
      setWordsToLearn(customWords);
    }
    setCurrentCardIndex(0);
    setIsFlipped(false);
    changeView("flashcards");
  };

  const handlePracticeFilteredWords = (customWords: [string, string][], mode: "flashcards" | "quiz") => {
    if (customWords.length === 0) return;
    setWordsToLearn(customWords);
    if (mode === "flashcards") {
      startFlashcards(customWords);
    } else {
      startQuiz(customWords);
    }
  };

  // Helper to shuffle array
  const shuffleArray = <T,>(arr: T[]): T[] => {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  const shuffleCards = () => {
    setWordsToLearn(prev => shuffleArray(prev));
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  // Helper: Generates random multiple choices for UZ translation
  const generateQuizOptions = (correctUz: string) => {
    // Gather words from the CURRENT selected unit to pick random distractors
    let candidateWords: [string, string][] = [];
    if (selectedUnit) {
      if (selectedUnit.categories) {
        selectedUnit.categories.forEach((cat: any) => {
          candidateWords = [...candidateWords, ...cat.words];
        });
      } else {
        candidateWords = selectedUnit.words || [];
      }
    }

    // Fallback to all words if current unit has too few words (less than 4)
    if (candidateWords.length < 4) {
      candidateWords = BOOKS.flatMap(b => b.units.flatMap(u => {
        if (u.categories) {
          return u.categories.flatMap((c: any) => c.words);
        }
        return u.words || [];
      }));
    }

    const wrongOptions = candidateWords
      .map(w => w[1])
      .filter(uz => uz !== correctUz && uz.trim() !== "");

    const uniqueWrongOptions = Array.from(new Set(wrongOptions));
    const shuffledWrong = shuffleArray(uniqueWrongOptions);
    const selectedWrong = shuffledWrong.slice(0, 3);
    const finalOptions = shuffleArray([correctUz, ...selectedWrong]);
    
    // Ensure exactly 4 options
    while (finalOptions.length < 4) {
      finalOptions.push("Boshqa variant " + finalOptions.length);
    }
    return finalOptions;
  };

  // Starts the interactive Quiz
  const startQuiz = (customWords?: [string, string][]) => {
    const words = customWords || wordsToLearn;
    if (words.length === 0) return;
    
    // Set up queue with structured items
    const initialQueue = words.map((w, index) => ({
      word: w,
      originalIndex: index
    }));
    
    // Shuffle the queue initially
    const shuffledQueue = shuffleArray(initialQueue);
    
    setQuizQueue(shuffledQueue);
    setQuizTotalUnique(shuffledQueue.length);
    setCurrentQuizIndex(0);
    setQuizMistakes({});
    setQuizFirstTryCorrect({});
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);

    // Set options for the first question
    const firstQuestion = shuffledQueue[0] as { word: [string, string]; originalIndex: number };
    const options = generateQuizOptions(firstQuestion.word[1]);
    setQuizOptions(options);
    
    changeView("quiz");
  };

  // Handles User Submitting an Answer
  const handleAnswerSelection = (option: string) => {
    if (selectedAnswer !== null) return; // already answered, waiting for next
    
    const currentQuestion = quizQueue[currentQuizIndex];
    const correctUz = currentQuestion.word[1];
    const isCorrect = option === correctUz;

    setSelectedAnswer(option);
    setIsAnswerCorrect(isCorrect);

    const wordKeyEn = currentQuestion.word[0];

    if (isCorrect) {
      // If it hasn't been flagged as wrong yet, it's correct on the first try
      if (quizFirstTryCorrect[wordKeyEn] === undefined) {
        setQuizFirstTryCorrect(prev => ({ ...prev, [wordKeyEn]: true }));
      }
    } else {
      // Flag as incorrect on first try
      if (quizFirstTryCorrect[wordKeyEn] === undefined) {
        setQuizFirstTryCorrect(prev => ({ ...prev, [wordKeyEn]: false }));
      }
      
      // Increment mistake count for this word
      setQuizMistakes(prev => ({
        ...prev,
        [wordKeyEn]: (prev[wordKeyEn] || 0) + 1
      }));
    }
  };

  // Navigates to the next question in the queue, or requeues the wrong answer
  const handleNextQuizQuestion = () => {
    const currentQuestion = quizQueue[currentQuizIndex];
    const wasCorrect = isAnswerCorrect;

    setSelectedAnswer(null);
    setIsAnswerCorrect(null);

    let newQueue = [...quizQueue];

    if (!wasCorrect) {
      // Strictly requeue the current question 2 to 4 positions later
      // Generate a random shift between 2 and 4
      const shift = Math.floor(Math.random() * 3) + 2; // 2, 3, or 4
      const targetPos = Math.min(currentQuizIndex + shift + 1, newQueue.length);
      
      const itemToRequeue = { ...currentQuestion };
      // Insert back at target position
      newQueue.splice(targetPos, 0, itemToRequeue);
      setQuizQueue(newQueue);
    }

    const nextIndex = currentQuizIndex + 1;
    if (nextIndex >= newQueue.length) {
      // Quiz completed!
      handleQuizCompletion();
    } else {
      setCurrentQuizIndex(nextIndex);
      // Prepare options for the next question
      const nextQuestion = newQueue[nextIndex];
      const options = generateQuizOptions(nextQuestion.word[1]);
      setQuizOptions(options);
    }
  };

  const handleQuizCompletion = () => {
    const totalWordsCount = wordsToLearn.length;
    
    // Mistake words count is how many UNIQUE words had AT LEAST one mistake
    const mistakeWordsList = Object.keys(quizMistakes).filter(k => quizMistakes[k] > 0);
    const mistakeWordsCount = mistakeWordsList.length;
    
    const firstTryCorrectCount = totalWordsCount - mistakeWordsCount;
    const finalPercentage = Math.round((firstTryCorrectCount / totalWordsCount) * 100);

    // List of words that were missed with their mistake count
    const mistakesBreakdown = mistakeWordsList.map(enKey => {
      const matchWord = wordsToLearn.find(w => w[0] === enKey);
      return {
        en: enKey,
        uz: matchWord ? matchWord[1] : "",
        count: quizMistakes[enKey]
      };
    });

    setResultsTotal(totalWordsCount);
    setResultsMistakeCount(mistakeWordsCount);
    setResultsPercentage(finalPercentage);
    setResultsMistakeList(mistakesBreakdown);

    // Save to history list
    const dateStr = new Date().toLocaleString("uz-UZ", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });

    const newHistoryItem: HistoryItem = {
      id: Math.random().toString(36).substring(2, 9),
      date: dateStr,
      bookTitle: selectedBook?.title || "Noma'lum Kitob",
      unitTitle: selectedUnit?.title || "Noma'lum Unit",
      category: selectedCategory?.name || "Barchasi",
      totalWords: totalWordsCount,
      mistakeWords: mistakeWordsCount,
      percentage: finalPercentage
    };

    const updatedLogs = [newHistoryItem, ...historyLogs];
    updateHistory(updatedLogs);

    changeView("results");
  };

  // Average accuracy score
  const avgAccuracy = useMemo(() => {
    if (historyLogs.length === 0) return 0;
    const sum = historyLogs.reduce((acc, curr) => acc + curr.percentage, 0);
    return Math.round(sum / historyLogs.length);
  }, [historyLogs]);

  // Color helper for progress
  const getPercentageColor = (percentage: number) => {
    if (percentage >= 80) return "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
    if (percentage >= 50) return "text-amber-400 border-amber-500/30 bg-amber-500/10";
    return "text-rose-400 border-rose-500/30 bg-rose-500/10";
  };

  const getPercentageBarColor = (percentage: number) => {
    if (percentage >= 80) return "bg-emerald-500";
    if (percentage >= 50) return "bg-amber-500";
    return "bg-rose-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e1b4b] text-[#f8fafc] flex flex-col font-sans selection:bg-[#6366f1]/40 selection:text-white antialiased relative">
      {/* Premium Ambient Light Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#6366f1]/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#6366f1]/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Top Banner / Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0f172a]/70 border-b border-white/10 px-4 py-4 md:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div 
            onClick={() => {
              setSelectedBook(null);
              setSelectedUnit(null);
              setSelectedCategory(null);
              changeView("home");
            }} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#6366f1] flex items-center justify-center text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] group-hover:scale-105 transition-transform duration-200">
              <BookOpen size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg md:text-xl tracking-tight text-[#f8fafc]">
                Ingliz Tili Lug'at
              </h1>
              <p className="text-[10px] text-[#94a3b8] font-mono tracking-wider uppercase">Fleshkarta &amp; Aqlli Test</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsGlobalSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs bg-white/5 border border-white/10 text-[#94a3b8] hover:text-white hover:bg-white/10 transition-all duration-200"
              id="header-global-search-btn"
              title="So'z qidirish (Ctrl+K)"
            >
              <Search size={14} className="text-[#818cf8]" />
              <span className="hidden sm:inline">Qidiruv</span>
              <kbd className="hidden md:inline text-[10px] bg-white/10 px-1.5 py-0.5 rounded font-mono text-[#818cf8]">
                Ctrl+K
              </kbd>
            </button>

            {currentView !== "history" && (
              <button 
                onClick={() => changeView("history")}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs bg-white/5 border border-white/5 text-[#94a3b8] hover:text-[#f8fafc] hover:bg-white/12 transition-all duration-200"
                id="header-history-btn"
              >
                <History size={14} />
                <span className="hidden sm:inline">Natijalar tarixi</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8 flex flex-col justify-start relative z-10">
        <AnimatePresence mode="wait">
          
          {/* HOME VIEW */}
          {currentView === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-8 w-full"
            >
              {/* Promo Banner / Welcome Hero */}
              <div className="bg-white/5 border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#6366f1]/10 rounded-full blur-xl" />
                <div className="space-y-3 max-w-lg">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#6366f1]/10 text-[#818cf8] border border-[#6366f1]/20 tracking-wider font-mono uppercase">
                    <Sparkles size={11} /> Requeue-mantiqli darslik
                  </span>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-[#f8fafc] tracking-tight">
                    Lug'atlarni mutlaqo unutilmas qilib yodlang!
                  </h2>
                  <p className="text-xs md:text-sm text-[#94a3b8] leading-relaxed">
                    Xato qilingan so'zlar siz to'g'ri topmaguningizcha tasodifiy ravishda qayta so'raladigan intellektual algoritm.
                  </p>
                </div>
                
                {/* Stats Widget */}
                <div className="flex gap-3 w-full md:w-auto shrink-0">
                  <div className="flex-1 md:flex-initial bg-black/30 border border-white/5 p-4 rounded-xl text-center min-w-[110px]">
                    <div className="text-[10px] text-[#94a3b8] font-mono uppercase">Urinishlar</div>
                    <div className="text-2xl font-bold font-display text-[#6366f1] mt-1">{historyLogs.length}</div>
                  </div>
                  <div className="flex-1 md:flex-initial bg-black/30 border border-white/5 p-4 rounded-xl text-center min-w-[110px]">
                    <div className="text-[10px] text-[#94a3b8] font-mono uppercase">O'rt. Natija</div>
                    <div className="text-2xl font-bold font-display text-[#818cf8] mt-1">{avgAccuracy}%</div>
                  </div>
                </div>
              </div>

              {/* Quick Search Trigger on Home */}
              <div 
                onClick={() => setIsGlobalSearchOpen(true)}
                className="group bg-white/5 hover:bg-white/8 border border-white/10 hover:border-[#6366f1]/40 rounded-2xl p-4 flex items-center justify-between gap-3 cursor-pointer transition-all duration-200 shadow-md"
                id="home-global-search-card"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#6366f1]/20 text-[#818cf8] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#6366f1] group-hover:text-white transition-all">
                    <Search size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-[#818cf8] transition-colors flex items-center gap-2">
                      Barcha kitoblar bo'yicha so'z qidirish
                    </h4>
                    <p className="text-xs text-[#94a3b8]">
                      Jami {indexedWords.length} ta so'z va iboralar orasidan tezkor qidiruv...
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#818cf8] hidden sm:inline group-hover:translate-x-0.5 transition-transform">
                    Qidirish &rarr;
                  </span>
                  <kbd className="text-[11px] bg-white/10 border border-white/10 px-2 py-1 rounded font-mono text-slate-300 hidden md:inline">
                    Ctrl+K
                  </kbd>
                </div>
              </div>

              {/* Featured Section: Gap to'ldirish (Matching requested mockup) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold tracking-wider text-[#94a3b8] uppercase font-mono">
                    Interaktiv mashq rejimi:
                  </h3>
                </div>
                <GapFillSection idPrefix="home" />
              </div>

              {/* Books Selection Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold tracking-wider text-[#94a3b8] uppercase font-mono">Yodlash uchun kitobni tanlang:</h3>
                  {historyLogs.length > 0 && (
                    <button
                      onClick={() => changeView("history")}
                      className="text-xs text-[#818cf8] hover:text-[#6366f1] flex items-center gap-0.5 transition-colors"
                    >
                      Batafsil tarix <ChevronRight size={14} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {BOOKS.map((book) => {
                    const isB1 = book.id === "destination-b1";
                    
                    // Count total words in book
                    let totalWords = 0;
                    book.units.forEach(u => {
                      if (u.categories) {
                        u.categories.forEach(c => totalWords += c.words.length);
                      } else if (u.words) {
                        totalWords += u.words.length;
                      }
                    });

                    return (
                      <div 
                        key={book.id}
                        onClick={() => selectBook(book)}
                        className="group bg-white/5 hover:bg-white/12 border border-white/5 hover:border-white/10 hover:-translate-y-0.5 p-6 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between h-52 relative overflow-hidden shadow-lg"
                        id={`book-card-${book.id}`}
                      >
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#6366f1]/10 to-transparent rounded-bl-full" />
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              isB1 ? 'bg-[#6366f1]/20 text-[#818cf8]' : 'bg-[#6366f1]/10 text-indigo-300'
                            }`}>
                              <BookOpen size={20} />
                            </div>
                            <h4 className="font-display font-bold text-lg text-[#f8fafc] group-hover:text-[#818cf8] transition-colors">
                              {book.title}
                            </h4>
                          </div>
                          
                          <p className="text-xs text-[#94a3b8] leading-relaxed line-clamp-3">
                            {book.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-4 text-xs">
                          <span className="text-[#94a3b8] font-mono">
                            {book.units.length} ta Unit • {totalWords} ta so'z
                          </span>
                          <span className="font-semibold text-[#818cf8] flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                            Tanlash <ChevronRight size={14} />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick direct history log preview if exists */}
              {historyLogs.length > 0 && (
                <div className="bg-white/3 border border-white/5 rounded-xl p-4 space-y-3">
                  <div className="text-xs font-mono text-[#94a3b8] uppercase">Oxirgi urinish natijasi:</div>
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <div className="space-y-1">
                      <div className="font-semibold text-slate-200">{historyLogs[0].bookTitle}</div>
                      <div className="text-xs text-[#94a3b8]">{historyLogs[0].unitTitle} • {historyLogs[0].category}</div>
                    </div>
                    <div className={`px-2.5 py-1 rounded-lg border font-mono font-bold text-xs ${getPercentageColor(historyLogs[0].percentage)}`}>
                      {historyLogs[0].percentage}%
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* UNIT LIST VIEW */}
          {currentView === "unitList" && selectedBook && (
            <motion.div
              key="unitList"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              className="space-y-6 w-full"
            >
              {/* Back controls */}
              <div className="flex items-center justify-between">
                <button 
                  onClick={handleBack}
                  className="flex items-center gap-1 text-xs text-[#94a3b8] hover:text-[#f8fafc] bg-white/5 border border-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-all"
                  id="btn-back-to-home"
                >
                  <ArrowLeft size={14} />
                  <span>Ortga</span>
                </button>
                <div className="text-xs text-[#94a3b8] font-mono">
                  Bosh sahifa / {selectedBook.title}
                </div>
              </div>

              {/* Title Area */}
              <div className="bg-white/5 border border-white/5 p-5 rounded-2xl space-y-1">
                <h2 className="text-lg font-display font-bold text-[#f8fafc] flex items-center gap-2">
                  <BookOpen className="text-[#6366f1]" size={18} />
                  {selectedBook.title} — Bo'limlar
                </h2>
                <p className="text-xs text-[#94a3b8] leading-relaxed">
                  Yodlamoqchi bo'lgan Unitni tanlang. Har bir Unit oxirida fleshkarta yoki requeue testi mavjud.
                </p>
              </div>

              {/* Book-level search & units list */}
              <BookSearchSection
                book={selectedBook}
                onSelectUnit={selectUnit}
                onSelectWordInBook={handleSelectWordInBook}
              />
            </motion.div>
          )}

          {/* CATEGORY MENU VIEW */}
          {currentView === "categoryMenu" && selectedBook && selectedUnit && (
            <motion.div
              key="categoryMenu"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-6 w-full"
            >
              {/* Back controls */}
              <div className="flex items-center justify-between">
                <button 
                  onClick={handleBack}
                  className="flex items-center gap-1 text-xs text-[#94a3b8] hover:text-[#f8fafc] bg-white/5 border border-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-all"
                >
                  <ArrowLeft size={14} /> Ortga
                </button>
                <div className="text-xs text-[#94a3b8] font-mono">
                  {selectedBook.title} / {selectedUnit.title}
                </div>
              </div>

              {/* Title details */}
              <div className="bg-white/5 border border-white/5 p-6 rounded-2xl space-y-2 shadow-lg">
                <div className="text-[10px] text-[#818cf8] font-mono tracking-widest uppercase">Bo'lim tafsilotlari</div>
                <h2 className="text-xl font-display font-bold text-[#f8fafc]">{selectedUnit.title}</h2>
                <p className="text-xs text-[#94a3b8] leading-relaxed">
                  Fleshkartalar yordamida so'zlarni vizual takrorlang yoki test rejimidan foydalanib o'z bilimingizni sinab ko'ring.
                </p>
              </div>

              {/* Categories selector: visible if unit has sub-categories */}
              {selectedUnitHasCategories ? (
                <div className="space-y-3 bg-white/3 p-4 rounded-xl border border-white/5">
                  <label className="text-xs font-semibold text-[#94a3b8] block font-mono">Guruhni (Category) tanlang:</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <button
                      onClick={() => selectCategory("All")}
                      className={`px-3 py-2.5 rounded-lg text-xs font-semibold border transition-all text-left flex flex-col justify-between gap-1.5 ${
                        selectedCategory?.name === "Barchasi (All)" || selectedCategory?.name === "All (Barchasi)"
                          ? "bg-[#6366f1]/20 border-[#6366f1] text-[#f8fafc] shadow-[0_0_10px_rgba(99,102,241,0.2)]"
                          : "bg-black/30 border-white/5 text-[#94a3b8] hover:text-[#f8fafc] hover:bg-white/10 hover:border-white/10"
                      }`}
                    >
                      <span className="font-semibold">Barchasi (All)</span>
                      <span className="text-[10px] font-mono text-[#94a3b8]/60">
                        {selectedUnit.categories.reduce((acc: number, c: any) => acc + c.words.length, 0)} ta so'z
                      </span>
                    </button>

                    {selectedUnit.categories.map((cat: any) => (
                      <button
                        key={cat.name}
                        onClick={() => selectCategory(cat.name)}
                        className={`px-3 py-2.5 rounded-lg text-xs font-semibold border transition-all text-left flex flex-col justify-between gap-1.5 ${
                          selectedCategory?.name === cat.name
                            ? "bg-[#6366f1]/20 border-[#6366f1] text-[#f8fafc] shadow-[0_0_10px_rgba(99,102,241,0.2)]"
                            : "bg-black/30 border-white/5 text-[#94a3b8] hover:text-[#f8fafc] hover:bg-white/10 hover:border-white/10"
                        }`}
                      >
                        <span className="truncate w-full">{cat.name}</span>
                        <span className="text-[10px] font-mono text-[#94a3b8]/60">{cat.words.length} ta so'z</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Unit-level fast search and filter field */}
              <UnitWordSearch
                unit={selectedUnit}
                selectedCategoryName={selectedCategory?.name || "Barchasi"}
                onSelectCategory={selectCategory}
                onPracticeFiltered={handlePracticeFilteredWords}
              />

              {/* Status info bar */}
              <div className="bg-white/5 border border-white/5 p-4 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <div className="text-[#94a3b8]">Tanlangan to'plam:</div>
                  <div className="font-semibold text-slate-200 mt-0.5">
                    {selectedCategory?.name || "Barchasi"}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[#94a3b8]">So'zlar soni:</div>
                  <div className="font-bold font-mono text-[#6366f1] text-sm mt-0.5">
                    {wordsToLearn.length} ta
                  </div>
                </div>
              </div>

              {/* Play Mode Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                {/* Flashcards option */}
                <button
                  onClick={startFlashcards}
                  disabled={wordsToLearn.length === 0}
                  className="group bg-white/5 hover:bg-white/12 border border-white/5 hover:border-white/10 p-5 rounded-2xl flex items-center gap-3.5 transition-all text-left cursor-pointer active:scale-98 shadow-md"
                  id="btn-start-flashcards"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#6366f1]/20 text-[#818cf8] flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-[#818cf8] text-sm">Fleshkarta rejimi</h3>
                    <p className="text-xs text-[#94a3b8] mt-0.5 leading-tight">Flip-card interfeysi bilan vizual eslash.</p>
                  </div>
                </button>

                {/* Quiz option */}
                <button
                  onClick={startQuiz}
                  disabled={wordsToLearn.length === 0}
                  className="group bg-white/5 hover:bg-white/12 border border-white/5 hover:border-white/10 p-5 rounded-2xl flex items-center gap-3.5 transition-all text-left cursor-pointer active:scale-98 shadow-md"
                  id="btn-start-quiz"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#6366f1]/20 text-[#818cf8] flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                    <ListChecks className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-[#818cf8] text-sm">Test sinovi (Quiz)</h3>
                    <p className="text-xs text-[#94a3b8] mt-0.5 leading-tight">Xatolarni darsda qayta so'raydigan test.</p>
                  </div>
                </button>

                {/* Gap to'ldirish option (New) */}
                <button
                  onClick={() => setIsGapFillCategoryModalOpen(true)}
                  className="group bg-white/5 hover:bg-white/12 border border-white/5 hover:border-[#6366f1]/40 p-5 rounded-2xl flex items-center gap-3.5 transition-all text-left cursor-pointer active:scale-98 shadow-md relative overflow-hidden"
                  id="btn-category-gap-fill"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#6366f1]/20 text-[#818cf8] flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white group-hover:text-[#818cf8] text-sm">Gap to'ldirish</h3>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#4f46e5] text-white">YANGI</span>
                    </div>
                    <p className="text-xs text-[#94a3b8] mt-0.5 leading-tight">Kontekstda so'zni topish (Tez kunda).</p>
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {/* FLASHCARDS VIEW */}
          {currentView === "flashcards" && selectedBook && selectedUnit && wordsToLearn.length > 0 && (
            <motion.div
              key="flashcards"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6 w-full max-w-md mx-auto"
            >
              {/* Back & shuffle controls */}
              <div className="flex items-center justify-between text-xs">
                <button 
                  onClick={handleBack}
                  className="flex items-center gap-1 text-[#94a3b8] hover:text-[#f8fafc] bg-white/5 border border-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-all"
                >
                  <ArrowLeft size={14} /> Chiqish
                </button>

                <button 
                  onClick={shuffleCards}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[#94a3b8] hover:text-[#f8fafc] hover:bg-white/10 transition-all"
                >
                  <Shuffle size={12} />
                  <span>Aralashtirish</span>
                </button>
              </div>

              {/* Progress gauge */}
              <div className="space-y-2">
                <div className="flex justify-between text-[11px] text-[#94a3b8] font-mono">
                  <span>Takrorlash progressi</span>
                  <span>{currentCardIndex + 1} / {wordsToLearn.length}</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#6366f1] h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${((currentCardIndex + 1) / wordsToLearn.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Visual Card */}
              <div 
                onClick={() => setIsFlipped(!isFlipped)}
                className="w-full aspect-[4/3] relative cursor-pointer group perspective"
                id="interactive-flashcard"
              >
                <div 
                  className={`w-full h-full duration-500 preserve-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}
                >
                  {/* FRONT: ENGLISH */}
                  <div className="absolute inset-0 w-full h-full rounded-2xl bg-white/5 border border-white/10 p-8 flex flex-col justify-between backface-hidden shadow-2xl">
                    <div className="flex justify-between items-center text-[10px] text-[#818cf8] font-mono uppercase tracking-wider">
                      <span>English Word</span>
                      <span className="flex items-center gap-1 bg-[#6366f1]/15 px-2 py-0.5 rounded-full border border-[#6366f1]/20 text-[#818cf8]">
                        <Sparkles size={10} /> inglizcha
                      </span>
                    </div>

                    <div className="text-center">
                      <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight break-words">
                        {wordsToLearn[currentCardIndex][0]}
                      </h2>
                    </div>

                    <div className="text-center text-[10px] text-[#94a3b8]/60 font-mono">
                      Tarjimani ko'rish uchun kartani bosing
                    </div>
                  </div>

                  {/* BACK: UZBEK */}
                  <div className="absolute inset-0 w-full h-full rounded-2xl bg-[#6366f1]/10 border border-[#6366f1]/30 p-8 flex flex-col justify-between backface-hidden rotate-y-180 shadow-2xl">
                    <div className="flex justify-between items-center text-[10px] text-[#818cf8] font-mono uppercase tracking-wider">
                      <span>Uzbek Tarjimasi</span>
                      <span className="bg-[#6366f1]/20 px-2 py-0.5 rounded-full border border-[#6366f1]/30 text-[#818cf8]">o'zbekcha</span>
                    </div>

                    <div className="text-center">
                      <h2 className="text-2xl md:text-3xl font-sans font-semibold text-white tracking-tight break-words leading-relaxed">
                        {wordsToLearn[currentCardIndex][1]}
                      </h2>
                    </div>

                    <div className="text-center text-[10px] text-[#94a3b8]/60 font-mono">
                      Inglizcha so'zni ko'rish uchun qayta bosing
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Navigators */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setIsFlipped(false);
                    setCurrentCardIndex(prev => Math.max(0, prev - 1));
                  }}
                  disabled={currentCardIndex === 0}
                  className="flex-1 bg-white/5 hover:bg-white/10 disabled:opacity-30 border border-white/5 text-[#94a3b8] hover:text-[#f8fafc] py-3 rounded-xl text-xs font-semibold transition-all active:scale-98"
                  id="btn-prev-card"
                >
                  Oldingi so'z
                </button>

                <button
                  onClick={() => {
                    setIsFlipped(false);
                    setCurrentCardIndex(prev => Math.min(wordsToLearn.length - 1, prev + 1));
                  }}
                  disabled={currentCardIndex === wordsToLearn.length - 1}
                  className="flex-1 bg-[#6366f1] hover:bg-[#5052d4] disabled:opacity-30 text-white py-3 rounded-xl text-xs font-semibold shadow-[0_4px_15px_rgba(99,102,241,0.4)] transition-all active:scale-98"
                  id="btn-next-card"
                >
                  Keyingi so'z
                </button>
              </div>
            </motion.div>
          )}

          {/* QUIZ (TEST) VIEW */}
          {currentView === "quiz" && selectedBook && selectedUnit && quizQueue.length > 0 && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              className="space-y-6 w-full max-w-md mx-auto"
            >
              {/* Status information */}
              <div className="flex items-center justify-between text-xs">
                <button 
                  onClick={handleBack}
                  className="flex items-center gap-1 text-[#94a3b8] hover:text-[#f8fafc] bg-white/5 border border-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-all"
                  id="btn-quiz-exit"
                >
                  <ArrowLeft size={14} /> Chiqish
                </button>

                <div className="font-mono text-[#94a3b8]">
                  Birinchi urinishda topilganlar: <span className="text-[#818cf8] font-bold">{Object.values(quizFirstTryCorrect).filter(Boolean).length}</span> / {quizTotalUnique}
                </div>
              </div>

              {/* Progress bar representing unique correct-flagged words */}
              <div className="space-y-2">
                <div className="flex justify-between text-[11px] text-[#94a3b8] font-mono">
                  <span>To'g'ri yakunlangan so'zlar:</span>
                  <span>{Object.keys(quizFirstTryCorrect).length} / {quizTotalUnique}</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#6366f1] h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${(Object.keys(quizFirstTryCorrect).length / quizTotalUnique) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Screen */}
              <div className="bg-white/5 border border-white/5 p-7 rounded-2xl text-center space-y-3 shadow-xl">
                <span className="text-[10px] text-[#6366f1] font-mono tracking-widest uppercase">EN → UZ SAVOL</span>
                <h3 className="text-3xl font-sans font-bold text-white tracking-tight break-words">
                  {quizQueue[currentQuizIndex].word[0]}
                </h3>
                <p className="text-xs text-[#94a3b8]">Ushbu inglizcha so'zning o'zbekcha tarjimasini tanlang:</p>
              </div>

              {/* Choices list */}
              <div className="grid grid-cols-1 gap-2" id="quiz-choices-container">
                {quizOptions.map((option, index) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrectAnswer = option === quizQueue[currentQuizIndex].word[1];

                  let choiceStyle = "bg-white/5 hover:bg-white/12 border-white/5 hover:border-white/10 text-[#94a3b8] hover:text-[#f8fafc]";
                  let iconElement = null;

                  if (selectedAnswer !== null) {
                    if (isCorrectAnswer) {
                      choiceStyle = "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 shadow-[0_0_10px_rgba(34,197,94,0.15)]";
                      iconElement = <CheckCircle size={15} className="text-emerald-400 shrink-0" />;
                    } else if (isSelected) {
                      choiceStyle = "bg-rose-500/10 border-rose-500/30 text-rose-300 shadow-[0_0_10px_rgba(239,68,68,0.15)]";
                      iconElement = <XCircle size={15} className="text-rose-400 shrink-0" />;
                    } else {
                      choiceStyle = "bg-black/20 opacity-40 border-white/3 text-[#94a3b8]/60";
                    }
                  }

                  return (
                    <button
                      key={`${option}-${index}`}
                      onClick={() => handleAnswerSelection(option)}
                      disabled={selectedAnswer !== null}
                      className={`w-full p-4 rounded-xl text-xs md:text-sm font-semibold border text-left flex items-center justify-between gap-3 transition-all duration-200 ${choiceStyle}`}
                      id={`choice-btn-${index}`}
                    >
                      <span>{option}</span>
                      {iconElement}
                    </button>
                  );
                })}
              </div>

              {/* Feedback and proceed button */}
              {selectedAnswer !== null && (
                <motion.div 
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
                    isAnswerCorrect 
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
                      : "bg-rose-500/10 border-rose-500/20 text-rose-300"
                  }`}>
                    {isAnswerCorrect ? (
                      <p>✨ <strong>To'g'ri javob!</strong> Keyingi savolga o'tishingiz mumkin.</p>
                    ) : (
                      <div className="space-y-1">
                        <p>❌ <strong>Xato!</strong> To'g'ri javob: <span className="font-bold text-white">{quizQueue[currentQuizIndex].word[1]}</span></p>
                        <p className="opacity-90 text-[11px]">Ushbu so'z xotirangizni charxlar uchun 2–4 savoldan so'ng yana ko'rsatiladi.</p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleNextQuizQuestion}
                    className="w-full py-3.5 bg-[#6366f1] hover:bg-[#5052d4] text-white text-xs md:text-sm font-semibold rounded-xl transition-all active:scale-98 shadow-[0_4px_15px_rgba(99,102,241,0.4)] cursor-pointer"
                    id="next-question-btn"
                  >
                    Keyingi savol
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* RESULTS VIEW */}
          {currentView === "results" && selectedBook && selectedUnit && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6 w-full max-w-md mx-auto"
            >
              {/* Badge celebration */}
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-[#6366f1] mx-auto flex items-center justify-center text-slate-950 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                  <Award size={32} className="text-white" />
                </div>
                <h2 className="text-2xl font-display font-bold text-white tracking-tight">
                  Test sinovi yakunlandi!
                </h2>
                <p className="text-xs text-[#94a3b8]">
                  {selectedBook.title} • {selectedUnit.title}
                </p>
              </div>

              {/* Big Score Card */}
              <div className="bg-white/5 border border-white/5 p-6 rounded-2xl text-center space-y-4 relative overflow-hidden shadow-xl">
                <div className={`absolute top-0 left-0 w-full h-1 ${getPercentageBarColor(resultsPercentage)}`} />
                <div className="text-xs text-[#94a3b8] font-mono tracking-wider uppercase">Birinchi urinishdagi aniqlik</div>
                
                <div className={`text-5xl font-display font-black tracking-tight ${
                  resultsPercentage >= 80 ? 'text-emerald-400' : resultsPercentage >= 50 ? 'text-amber-400' : 'text-rose-400'
                }`}>
                  {resultsPercentage}%
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 text-xs text-slate-300">
                  <div className="space-y-0.5 border-r border-white/5">
                    <div className="text-[#94a3b8] font-mono">Jami so'zlar:</div>
                    <div className="font-bold text-white text-base font-mono">{resultsTotal}</div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[#94a3b8] font-mono">Xato topilganlar:</div>
                    <div className="font-bold text-white text-base font-mono">{resultsMistakeCount}</div>
                  </div>
                </div>
              </div>

              {/* Mistake analysis list */}
              {resultsMistakesList.length > 0 ? (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-semibold font-mono tracking-wider text-[#94a3b8] uppercase">Xato qilingan so'zlar tahlili:</h4>
                  <div className="bg-white/3 border border-white/5 rounded-xl divide-y divide-white/5 overflow-hidden">
                    {resultsMistakesList.map((item) => (
                      <div key={item.en} className="p-3.5 flex items-center justify-between text-xs sm:text-sm">
                        <div className="space-y-0.5">
                          <div className="font-bold text-white">{item.en}</div>
                          <div className="text-[#94a3b8] text-xs">{item.uz}</div>
                        </div>
                        <div className="px-2.5 py-1 rounded bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs font-mono font-semibold">
                          {item.count} marta xato
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl text-center text-xs text-emerald-300 flex items-center gap-2 justify-center">
                  <Check size={16} /> Barcha so'zlarni birinchi urinishda mukammal topdingiz!
                </div>
              )}

              {/* Controls */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    // restart test
                    startQuiz();
                  }}
                  className="flex-1 py-3 px-4 bg-white/5 border border-white/5 text-[#94a3b8] hover:text-[#f8fafc] rounded-xl text-xs font-semibold transition-all active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer"
                  id="btn-quiz-retry"
                >
                  <RotateCcw size={14} /> Qayta urinish
                </button>

                <button
                  onClick={() => {
                    if (selectedUnitHasCategories) {
                      changeView("categoryMenu");
                    } else {
                      changeView("unitList");
                    }
                  }}
                  className="flex-1 py-3 px-4 bg-[#6366f1] hover:bg-[#5052d4] text-white rounded-xl text-xs font-semibold shadow-[0_4px_15px_rgba(99,102,241,0.4)] transition-all active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer"
                  id="btn-quiz-menu"
                >
                  Menyuga qaytish
                </button>
              </div>
            </motion.div>
          )}

          {/* HISTORY LOGS VIEW */}
          {currentView === "history" && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6 w-full"
            >
              {/* Back out */}
              <div className="flex items-center justify-between">
                <button 
                  onClick={handleBack}
                  className="flex items-center gap-1 text-xs text-[#94a3b8] hover:text-[#f8fafc] bg-white/5 border border-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-all"
                >
                  <ArrowLeft size={14} /> Asosiy sahifa
                </button>

                {historyLogs.length > 0 && (
                  <button 
                    onClick={handleClearHistory}
                    className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/25 px-3 py-1.5 rounded-lg transition-all"
                    id="btn-clear-history"
                  >
                    <Trash2 size={13} />
                    <span>Tarixni tozalash</span>
                  </button>
                )}
              </div>

              {/* Title Section */}
              <div className="bg-white/5 border border-white/5 p-5 rounded-2xl flex items-center justify-between gap-4 shadow-lg">
                <div className="space-y-1">
                  <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
                    <History className="text-[#818cf8]" size={18} />
                    Natijalar tarixi
                  </h2>
                  <p className="text-xs text-[#94a3b8] leading-relaxed">
                    Siz tomondan bajarilgan barcha testlarning birinchi urinishdagi natijalari:
                  </p>
                </div>
                
                <div className="shrink-0 bg-black/30 px-3 py-2 rounded-lg border border-white/5 text-center">
                  <div className="text-[10px] font-mono text-[#94a3b8]">Sinovlar soni</div>
                  <div className="text-xl font-bold font-display text-[#6366f1] mt-0.5">{historyLogs.length} ta</div>
                </div>
              </div>

              {/* History list */}
              {historyLogs.length > 0 ? (
                <div className="space-y-3" id="history-items-container">
                  {historyLogs.map((log) => (
                    <div 
                      key={log.id} 
                      className="bg-white/5 border border-white/5 hover:border-white/10 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:-translate-y-0.5 duration-200"
                    >
                      <div className="space-y-1.5">
                        <div className="text-xs text-[#94a3b8] font-mono flex items-center gap-1.5">
                          <Calendar size={12} className="text-[#818cf8]" />
                          <span>{log.date}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-white leading-snug">
                          {log.bookTitle}
                        </h4>
                        <div className="text-xs text-slate-300">
                          {log.unitTitle} {log.category && `• ${log.category}`}
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5">
                        <div className="text-left sm:text-right space-y-0.5">
                          <div className="text-[10px] font-mono text-[#94a3b8] uppercase">Tafsilotlar</div>
                          <div className="text-xs text-slate-300">
                            {log.totalWords} so'zdan {log.mistakeWords} ta xato
                          </div>
                        </div>

                        <div className={`px-3 py-1.5 rounded-lg border font-mono font-bold text-sm tracking-tight text-center min-w-[64px] ${getPercentageColor(log.percentage)}`}>
                          {log.percentage}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border border-dashed border-white/10 rounded-2xl p-12 text-center space-y-3 max-w-sm mx-auto">
                  <History className="text-[#94a3b8]/60 mx-auto" size={40} />
                  <div className="space-y-1">
                    <h4 className="font-semibold text-[#94a3b8]">Natijalar topilmadi</h4>
                    <p className="text-xs text-[#94a3b8]/60 leading-relaxed">
                      Siz hali test topshirmagansiz. Test tugagach natijalar bu yerda avtomatik ravishda saqlanadi.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Persistent global stats footer or note */}
      <footer className="border-t border-white/5 py-6 px-4 text-center mt-auto text-xs text-[#94a3b8]/50 font-mono">
        <p>© 2026 Ingliz tili lug'at o'rganish va aqlli test dasturi.</p>
        <p className="mt-1">Xotirani charxlovchi requeue algoritmi bilan.</p>
      </footer>

      {/* Global Search Modal across all books & units */}
      <GlobalSearchModal
        isOpen={isGlobalSearchOpen}
        onClose={() => setIsGlobalSearchOpen(false)}
        indexedWords={indexedWords}
        onSelectWord={handleSelectWordFromGlobalSearch}
      />

      {/* Gap to'ldirish coming soon modal for Category Menu */}
      <GapFillComingSoonModal
        isOpen={isGapFillCategoryModalOpen}
        onClose={() => setIsGapFillCategoryModalOpen(false)}
        level={selectedBook?.id === "destination-b1" ? "B1" : "A1-C2"}
      />
    </div>
  );
}
