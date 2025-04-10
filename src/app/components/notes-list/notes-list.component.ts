import {Component, EventEmitter, Output} from '@angular/core';
import {Note} from '../../model/note.model';
import {NoteService} from '../../services/note.service';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from '@angular/material/card';
import {NgForOf, SlicePipe} from '@angular/common';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-notes-list',
  imports: [
    MatCardActions,
    MatCardContent,
    MatCardTitle,
    NgForOf,
    MatCard,
    MatIconButton,
    MatIcon,
    SlicePipe
  ],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss'
})
export class NotesListComponent {
  @Output() edit = new EventEmitter<Note>();
  @Output() create = new EventEmitter<void>();

  notes: Note[] = [
    {id: '1', title: 'first', content: 'this is a note', category: 'Play', updatedAt: new Date()},
    {id: '2', title: 'second', content: 'this is another note', category: 'Work', updatedAt: new Date()}
  ];

  categories: string[] = [];

  constructor(private noteService: NoteService) {
    this.categories = [...new Set(this.notes.map(n => n.category))];
  }

  getNotesByCategory(category: string): Note[] {
    return this.notes.filter(n => n.category === category);
  }

  editNote(note: Note) {
    this.edit.emit(note);
  }

  deleteNote(id: string) {
    this.noteService.deleteNote(id);
  }

}
