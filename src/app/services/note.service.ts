import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Note} from '../model/note.model';

@Injectable({
  providedIn: 'root'
})

export class NoteService {
  private notes: Note[] = [
    {id: '1', title: 'first', content: 'this is a note', category: 'Play', updatedAt: new Date()},
    {id: '2', title: 'second', content: 'this is another note', category: 'Work', updatedAt: new Date()}
  ];
  private notesSubject = new BehaviorSubject<Note[]>(this.notes);

  notes$ = this.notesSubject.asObservable();

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

  getNote(id: string): Note | undefined {
    return this.notes.find(n => n.id === id);
  }

  private updateStorage() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
    this.notesSubject.next(this.notes);
  }
}
