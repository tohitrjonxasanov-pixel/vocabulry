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
  | "results" 
  | "history";

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
