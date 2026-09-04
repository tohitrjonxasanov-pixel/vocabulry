import { useState } from "react";
import { BookOpen, ChevronRight, Clock, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import GapFillComingSoonModal from "./GapFillComingSoonModal";

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

interface GapFillSectionProps {
  idPrefix?: string;
  compact?: boolean;
}

export default function GapFillSection({ idPrefix = "home", compact = false }: GapFillSectionProps) {
  const [selectedLevel, setSelectedLevel] = useState<string>("B2");
  const [showNotice, setShowNotice] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleClickStart = () => {
    setShowNotice(true);
    setShowModal(true);
  };

  return (
    <>
      {/* Gap to'ldirish Card matching user mockup */}
      <div 
        id={`${idPrefix}-gap-fill-card`}
        className="relative bg-[#161a3b] hover:bg-[#181d42] border border-[#6366f1]/25 hover:border-[#6366f1]/40 rounded-2xl p-5 md:p-6 transition-all duration-300 shadow-xl overflow-hidden"
      >
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-[#6366f1]/15 rounded-full blur-2xl pointer-events-none -z-0" />

        <div className="relative z-10 flex flex-col justify-between h-full">
          {/* Header Row: Book Icon and "YANGI" Badge */}
          <div className="flex items-start justify-between gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#282d61] text-white flex items-center justify-center shadow-inner">
              <BookOpen size={22} className="text-white" />
            </div>

            <div className="flex items-center gap-1.5">
              <span className="px-3.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#4f46e5] text-white shadow-sm">
                YANGI
              </span>
            </div>
          </div>

          {/* Title and Description */}
          <div className="mt-4">
            <h3 className="text-xl md:text-2xl font-bold font-display text-white tracking-tight">
              Gap to'ldirish
            </h3>
            <p className="text-xs md:text-sm text-[#94a3b8] mt-1 leading-relaxed">
              Gap kontekstida so'zni topish. Darajani tanlang (A1-C2):
            </p>
          </div>

          {/* CEFR Level Selection Pills (A1 - C2) */}
          <div className="grid grid-cols-6 gap-2 mt-4" id={`${idPrefix}-level-pills-container`}>
            {LEVELS.map((level) => {
              const isSelected = selectedLevel === level;
              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSelectedLevel(level)}
                  className={`py-2 px-1 rounded-xl text-xs sm:text-sm font-bold transition-all text-center cursor-pointer ${
                    isSelected
                      ? "bg-[#5b5ff5] text-white shadow-[0_2px_8px_rgba(91,95,245,0.4)] scale-[1.02]"
                      : "bg-[#10142e] hover:bg-[#151a3d] text-[#94a3b8] hover:text-white border border-white/5"
                  }`}
                  id={`${idPrefix}-level-pill-${level}`}
                >
                  {level}
                </button>
              );
            })}
          </div>

          {/* Start Button */}
          <button
            type="button"
            onClick={handleClickStart}
            className="w-full mt-4 py-3.5 px-4 rounded-xl bg-[#5b5ff5] hover:bg-[#4d51eb] active:scale-[0.99] text-white font-semibold flex items-center justify-center gap-2 text-sm shadow-[0_4px_16px_rgba(91,95,245,0.35)] transition-all cursor-pointer"
            id={`${idPrefix}-gap-fill-start-btn`}
          >
            <span>{selectedLevel} darajada boshlash</span>
            <ChevronRight size={16} />
          </button>

          {/* Inline notification: "Bu funksiya yaqin kunlarda qo'shiladi" */}
          <AnimatePresence>
            {showNotice && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="p-3.5 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-200 text-xs flex items-start justify-between gap-3 shadow-md">
                  <div className="flex items-start gap-2.5">
                    <Clock size={16} className="text-[#818cf8] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">
                        Bu funksiya yaqin kunlarda qo'shiladi
                      </p>
                      <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                        <strong>{selectedLevel}</strong> darajasi bo'yicha gap to'ldirish mashqlari bazasi ustida ish olib borilmoqda. Tez orada tayyor bo'ladi!
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowNotice(false)}
                    className="text-slate-400 hover:text-white p-1 transition-colors shrink-0"
                    title="Yopish"
                  >
                    <X size={14} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal Notification Dialog */}
      <GapFillComingSoonModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        level={selectedLevel} 
      />
    </>
  );
}
