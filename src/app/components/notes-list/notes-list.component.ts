import {Component, EventEmitter, Output} from '@angular/core';
import {Note} from '../../model/note.model';
import {NoteService} from '../../services/note.service';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from '@angular/material/card';
import {NgForOf, SlicePipe} from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {BehaviorSubject} from 'rxjs';

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
    MatIcon
  ],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss'
})
export class NotesListComponent {
  @Output() edit = new EventEmitter<Note>();
  @Output() create = new EventEmitter<void>();

  categories: string[] = [];

  constructor(private noteService: NoteService) {

  }

  createNote() {
    this.create.emit();
  }

}
