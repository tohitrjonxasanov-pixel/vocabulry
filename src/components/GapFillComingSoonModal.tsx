import { motion, AnimatePresence } from "motion/react";
import { Clock, X, Info } from "lucide-react";

interface GapFillComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  level?: string;
}

export default function GapFillComingSoonModal({
  isOpen,
  onClose,
  level = "B2",
}: GapFillComingSoonModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: 0.2 }}
            className="bg-[#181c40] border border-[#6366f1]/30 rounded-2xl max-w-md w-full p-6 text-white shadow-2xl relative overflow-hidden"
            id="gap-fill-coming-soon-modal"
          >
            {/* Background ambient glow */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#6366f1]/20 rounded-full blur-2xl pointer-events-none" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#94a3b8] hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-lg transition-colors cursor-pointer"
              id="modal-close-icon-btn"
              title="Yopish"
            >
              <X size={16} />
            </button>

            {/* Modal header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#6366f1]/20 border border-[#6366f1]/30 flex items-center justify-center text-[#818cf8] shadow-inner">
                <Clock size={24} />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[#6366f1]/20 text-[#818cf8] border border-[#6366f1]/30">
                  Kutilayotgan imkoniyat
                </span>
                <h3 className="text-lg font-bold font-display text-white mt-1">
                  Gap to'ldirish {level ? `(${level})` : ""}
                </h3>
              </div>
            </div>

            {/* Notice Callout */}
            <div className="space-y-3 text-sm text-slate-300 leading-relaxed border-t border-b border-white/10 py-4 my-2">
              <div className="p-3 bg-[#5b5ff5]/15 border border-[#5b5ff5]/30 rounded-xl text-white flex items-center gap-2.5 font-medium text-xs sm:text-sm shadow-sm">
                <Info size={18} className="text-[#818cf8] shrink-0" />
                <span className="font-semibold text-emerald-300">
                  Bu funksiya yaqin kunlarda qo'shiladi
                </span>
              </div>

              <p className="text-xs text-[#94a3b8] leading-relaxed">
                Gap kontekstida tushirib qoldirilgan so'zni topish (Fill in the blanks) mashqi hozirda ishlab chiqilmoqda. 
                {level ? ` Siz tanlagan ${level} darajasi va boshqa barcha darajalar (A1–C2)` : " Barcha darajalar (A1–C2)"} bo'yicha namunaviy gaplar va testlar yaqin kunlarda to'liq qo'shiladi!
              </p>
            </div>

            {/* Modal Action Button */}
            <div className="mt-5 flex justify-end">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#5b5ff5] hover:bg-[#4d51eb] active:scale-[0.98] text-white text-xs font-semibold rounded-xl shadow-md transition-all cursor-pointer"
                id="modal-confirm-btn"
              >
                Tushundim
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
