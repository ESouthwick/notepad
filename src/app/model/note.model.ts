export interface Note {
  id: string;
  title: string;
  content: string;
  category: string; // "Personal", "Work", etc
  updatedAt: Date;
}

export interface Category {
  value: string;
}
