import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {CategorizedNotes, Note} from '../model/note.model';

@Injectable({
  providedIn: 'root'
})

export class NoteService {
  private defaultNote: Note = {
    id: '',
    title: '',
    content: '',
    category: '',
    updatedAt: new Date()};
  private notes: Note[] = [];
  private notesSubject = new BehaviorSubject<Note[]>(this.notes);
  notes$ = this.notesSubject.asObservable().pipe(
    map(notes => notes.filter(note => note != null))
  );

  categories: string[] = ['Play', 'Work', 'Family', 'Home'];
  categories$ = new BehaviorSubject<string[]>(this.categories).asObservable();
  categorizedNotes$: Observable<CategorizedNotes> = this.notesSubject.asObservable().pipe(
    map(notes => {
      const categorized: CategorizedNotes = {Play: [], Work: [], Family: [], Home: []};
      notes.forEach(note => {
        if(note && this.categories.includes(note.category)){
          categorized[note.category].push(note);
        }
      });
      return categorized;
    })
  );

  constructor() {
    const stored = localStorage.getItem('notes');
    if (stored) {
      this.notes = JSON.parse(stored).map((note: any) => ({
        ...note,
        updatedAt: new Date(note.updatedAt)
      }));
      this.notesSubject.next(this.notes);
    }
  }

  saveNote(note: Note) {
    const existing = this.notes.find(n => n.id === note.id);
    if (existing) {
      Object.assign(existing, note, { updatedAt: new Date() });
    } else {
      this.notes.push({ ...note, id: crypto.randomUUID(), updatedAt: new Date() });
    }
    this.updateStorage();
  }

  deleteNote(id: string) {
    this.notes = this.notes.filter(n => n.id !== id);
    this.updateStorage();
  }

  getDefaultNote(){
    return this.defaultNote;
  }

  updateNote(updatedNote: Note): void {
    if (!['Play', 'Work', 'Family', 'Home'].includes(updatedNote.category)) {
      updatedNote.category = 'Other';
    }
    const notes = this.notesSubject.getValue();
    const index = notes.findIndex(note => note.id === updatedNote.id);
    if (index !== -1) {
      notes[index] = { ...updatedNote, updatedAt: new Date() };
      this.notesSubject.next([...notes]);
    }
  }

  private updateStorage() {
    const serializedNotes = this.notes
      .map( note => ({
        ...note,
        updatedAt: note.updatedAt.toISOString()
      }));
    localStorage.setItem('notes', JSON.stringify(this.notes));
    this.notesSubject.next(this.notes);
  }
}
