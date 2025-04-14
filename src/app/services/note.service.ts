import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Note} from '../model/note.model';

@Injectable({
  providedIn: 'root'
})

export class NoteService {
  private defaultNote: Note = {id: '', title: '', content: '', category: '', updatedAt: new Date()};
  private notes: Note[] = [
    {id: '1', title: 'first', content: 'this is a note', category: 'Play', updatedAt: new Date()},
    {id: '2', title: 'second', content: 'this is another note', category: 'Work', updatedAt: new Date()},
    {id: '3', title: 'third', content: 'this is box', category: 'Play', updatedAt: new Date()},
  ];
  private notesSubject = new BehaviorSubject<Note[]>(this.notes);
  isEdit = false;

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

  private updateStorage() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
    this.notesSubject.next(this.notes);
  }
}
