import {Component, EventEmitter, Output} from '@angular/core';
import {Note} from '../../model/note.model';
import {NoteService} from '../../services/note.service';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from '@angular/material/card';
import {AsyncPipe, NgForOf, SlicePipe} from '@angular/common';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Observable, Subscription} from 'rxjs';
import {Theme, ThemeService} from '../../services/theme.service';

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
    SlicePipe,
    AsyncPipe
  ],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss'
})
export class NotesListComponent {
  @Output() edit = new EventEmitter<Note>();
  @Output() create = new EventEmitter<void>();

  notes: Note[] = [];
  private subscription: Subscription;

  categories: string[] = [];
  theme$: Observable<Theme>;

  constructor(
    private noteService: NoteService,
    private themeService: ThemeService
  ) {
    this.theme$ = this.themeService.theme$;

    this.subscription = this.noteService.notes$.subscribe((notes) => {
      this.notes = notes;
      this.categories = [...new Set(this.notes.map(n => n.category))];
    });
  }

  getNotesByCategory(category: string): Note[] {
    return this.notes.filter(n => n.category === category);
  }

  editNote(note: Note) {
    console.log("edit");
    this.edit.emit(note);
  }

  deleteNote(id: string) {
    this.noteService.deleteNote(id);
  }

}
