import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, tap, forkJoin, of, switchMap} from 'rxjs';
import {CategorizedNotes, Note} from '../model/note.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class NoteService {
  private defaultNote: Note = {
    title: '',
    content: '',
    category: '',
    updatedAt: new Date()
  };
  private notes: Note[] = [];
  private notesSubject = new BehaviorSubject<Note[]>(this.notes);
  notes$ = this.notesSubject.asObservable().pipe(
    map(notes => notes.filter(note => note != null))
  );

  private categoriesSubject = new BehaviorSubject<string[]>(['Play', 'Work', 'Family', 'Home']);
  categories: string[] = this.categoriesSubject.getValue();
  categories$ = this.categoriesSubject.asObservable();
  categorizedNotes$: Observable<CategorizedNotes> = this.notesSubject.asObservable().pipe(
    map(notes => {
      const categorized: CategorizedNotes = {};
      this.categories.forEach(category => {
        categorized[category] = notes.filter(note => note && note.category === category);
      });
      return categorized;
    })
  );

  private apiUrl = 'http://localhost:3000/api/notes';

  constructor(private http: HttpClient) {
    this.loadNotes();
  }

  private loadNotes(): void {
    this.getNotes().subscribe({
      next: (notes) => {
        this.notes = notes;
        this.notesSubject.next(this.notes);
      },
      error: (error: Error) => {
        console.error('Error loading notes:', error);
      }
    });
  }

  getDefaultNote(): Note {
    return {...this.defaultNote};
  }

  // Create a new note
  createNote(note: Note): Observable<Note> {
    console.log('Creating new note:', note);
    return this.http.post<Note>(this.apiUrl, note).pipe(
      tap(() => this.loadNotes())
    );
  }

  // Get all notes
  getNotes(): Observable<Note[]> {
    console.log('Fetching all notes');
    return this.http.get<Note[]>(this.apiUrl);
  }

  // Update a note
  updateNote(note: Note): Observable<Note> {
    console.log('Updating note:', note);
    const id = note._id || note.id;
    if (!id) {
      // If no ID is present, treat it as a new note
      return this.createNote(note);
    }
    return this.http.put<Note>(`${this.apiUrl}/${id}`, note).pipe(
      tap(() => this.loadNotes())
    );
  }

  // Delete a note
  deleteNote(id: string): Observable<void> {
    console.log('Deleting note:', id);
    this.notes = this.notes.filter(n => n.id !== id);
    this.updateStorage();
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadNotes())
    );
  }

  // Get a single note by ID
  getNoteById(id: string): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}/${id}`);
  }

  private updateStorage() {
    const serializedNotes = this.notes
      .map(note => ({
        ...note,
        updatedAt: note.updatedAt.toISOString()
      }));
    localStorage.setItem('notes', JSON.stringify(this.notes));
    this.notesSubject.next(this.notes);
  }

  updateCategories(newCategories: string[]): void {
    this.categoriesSubject.next(newCategories);
    this.categories = newCategories;
  }

  deleteAllNotes(): Observable<void> {
    return this.getNotes().pipe(
      map(notes => notes.map(note => note._id || note.id).filter((id): id is string => !!id)),
      switchMap(ids => {
        if (ids.length === 0) {
          return of(void 0);
        }
        const deleteRequests = ids.map(id => this.deleteNote(id));
        return forkJoin(deleteRequests).pipe(map(() => void 0));
      })
    );
  }
}
