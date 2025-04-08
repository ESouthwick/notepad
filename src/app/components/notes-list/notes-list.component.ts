import {Component, EventEmitter, Output} from '@angular/core';
import {Note} from '../../model/note.model';
import {NoteService} from '../../services/note.service';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from '@angular/material/card';
import {NgForOf, SlicePipe} from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-notes-list',
  imports: [
    MatCardActions,
    MatCardContent,
    MatCardTitle,
    MatButton,
    NgForOf,
    MatCard,
    MatIconButton,
    MatIcon,
    SlicePipe
  ],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.css'
})
export class NotesListComponent {
  @Output() edit = new EventEmitter<Note>();
  @Output() create = new EventEmitter<void>();

  // @ts-ignore
  notes$ = this.noteService.notes$;
  categories: string[] = [];
  notesByCategory: { [key: string]: Note[] } = {};

  constructor(private noteService: NoteService) {
    this.notes$.subscribe(notes => {
      this.categories = [...new Set(notes.map(n => n.category))];
    });
  }

  // getNotesByCategory(category: string): Note[] {
  //   return this.noteService.notes$.value.filter(n => n.category === category);
  // }

  createNote() {
    this.create.emit();
  }

  editNote(note: Note) {
    this.edit.emit(note);
  }

  deleteNote(id: string) {
    this.noteService.deleteNote(id);
  }
}
