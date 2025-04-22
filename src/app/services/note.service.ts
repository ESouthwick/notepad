import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {CategorizedNotes, Note} from '../model/note.model';

@Injectable({
  providedIn: 'root'
})

export class NoteService {
  private defaultNote: Note = {id: '', title: '', content: '', category: '', updatedAt: new Date()};
  private notes: Note[] = [
    {id: '1', title: 'first', content: 'this is a note', category: 'Play', updatedAt: new Date()},
    {id: '2', title: 'second', content: 'this is another note', category: 'Work', updatedAt: new Date()},
    {id: '3', title: 'third', content: 'this is box', category: 'Play', updatedAt: new Date()},
    {id: '4', title: 'fourth', content: 'this is another note', category: 'Home', updatedAt: new Date()},
  ];
  //issue with the notes being moved into another category and getting the category wiped.
  private notesSubject = new BehaviorSubject<Note[]>(this.notes);

  isEdit = false;

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

  getNotes(): Note[] {
    return this.notes;
  }

  getNote(id: string): Note | undefined {
    return this.notes.find(n => n.id === id);
  }

  getEdit(){
    return this.isEdit;
  }

  setEdit(data: boolean){
    this.isEdit = data;
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
