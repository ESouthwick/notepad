export interface Note {
  _id?: string;
  id?: string;  // For backward compatibility
  title: string;
  content: string;
  category: string;
  createdAt?: Date;
  updatedAt: Date;
}

export interface CategorizedNotes {
  [category: string]: Note[];
}

export interface Category {
  value: string;
}
