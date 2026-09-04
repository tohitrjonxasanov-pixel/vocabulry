import { Book } from "../data";
import { SearchWordItem } from "../types";

export const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[ʻʼ'`’‘]/g, "'")
    .trim();
};

export const textMatches = (source: string, query: string): boolean => {
  if (!query.trim()) return true;
  const normSource = normalizeText(source);
  const normQuery = normalizeText(query);
  
  if (normSource.includes(normQuery)) return true;
  
  // Test without apostrophes for flexible Uzbek search
  const plainSource = normSource.replace(/'/g, "");
  const plainQuery = normQuery.replace(/'/g, "");
  return plainSource.includes(plainQuery);
};

export const speakWord = (text: string): void => {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/\(.*?\)/g, "").trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis error:", e);
    }
  }
};

export const buildAllIndexedWords = (books: Book[]): SearchWordItem[] => {
  const list: SearchWordItem[] = [];
  
  books.forEach((book) => {
    book.units.forEach((unit) => {
      if (unit.categories && unit.categories.length > 0) {
        unit.categories.forEach((cat) => {
          cat.words.forEach(([en, uz], idx) => {
            list.push({
              id: `${book.id}-${unit.id}-${cat.name}-${idx}-${en}`,
              en,
              uz,
              bookId: book.id,
              bookTitle: book.title,
              unitId: unit.id,
              unitTitle: unit.title,
              categoryName: cat.name,
              rawUnit: unit
            });
          });
        });
      } else if (unit.words && unit.words.length > 0) {
        unit.words.forEach(([en, uz], idx) => {
          list.push({
            id: `${book.id}-${unit.id}-all-${idx}-${en}`,
            en,
            uz,
            bookId: book.id,
            bookTitle: book.title,
            unitId: unit.id,
            unitTitle: unit.title,
            rawUnit: unit
          });
        });
      }
    });
  });

  return list;
};
