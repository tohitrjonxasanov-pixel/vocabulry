import { Book, Unit, Category } from "./data";

export interface HistoryItem {
  id: string;
  date: string;
  bookTitle: string;
  unitTitle: string;
  category: string;
  totalWords: number;
  mistakeWords: number;
  percentage: number;
}

export type ViewState = 
  | "home" 
  | "unitList" 
  | "categoryMenu" 
  | "flashcards" 
  | "quiz" 
  | "sentenceQuiz"
  | "results" 
  | "history";

export type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export interface SearchWordItem {
  id: string;
  en: string;
  uz: string;
  bookId: string;
  bookTitle: string;
  unitId: string;
  unitTitle: string;
  categoryName?: string;
  rawUnit: Unit;
}
