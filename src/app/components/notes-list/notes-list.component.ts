import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Note} from '../../model/note.model';
import {NoteService} from '../../services/note.service';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from '@angular/material/card';
import {AsyncPipe, NgForOf, SlicePipe} from '@angular/common';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Observable, Subscription} from 'rxjs';
import {Theme, ThemeService} from '../../services/theme.service';
import {SidenavService} from '../../services/sidepanel.service';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';

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
    AsyncPipe,
    CdkDrag,
    CdkDropList
  ],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss'
})
export class NotesListComponent{

  notes: Note[] = [];
  private subs: Subscription;

  categories: string[] = [];
  theme$: Observable<Theme>;

  constructor(
    private noteService: NoteService,
    private sidenavService: SidenavService,
    private themeService: ThemeService
  ) {
    this.theme$ = this.themeService.theme$;

    this.subs = this.noteService.notes$.subscribe((notes) => {
      this.notes = notes;
      this.categories = [...new Set(this.notes.map(n => n.category))];
    });
  }

  getNotesByCategory(category: string): Note[] {
    return this.notes.filter(n => n.category === category);
  }

  editNote(note: Note) {
    this.noteService.setEdit(true);
    this.sidenavService.openSidenav(note);
  }

  deleteNote(id: string) {
    this.noteService.deleteNote(id);
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.notes, event.previousIndex, event.currentIndex);
    this.noteService['notes'] = this.notes; // Direct update (bypass readonly)
    this.noteService['updateStorage'](); // Call private method
  }

}
