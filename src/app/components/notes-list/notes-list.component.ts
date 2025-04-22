import {Component, OnDestroy} from '@angular/core';
import {CategorizedNotes, Note} from '../../model/note.model';
import {NoteService} from '../../services/note.service';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from '@angular/material/card';
import {AsyncPipe, SlicePipe} from '@angular/common';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Observable, Subscription} from 'rxjs';
import {Theme, ThemeService} from '../../services/theme.service';
import {SidenavService} from '../../services/sidepanel.service';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDropList,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-notes-list',
  imports: [
    MatCardActions,
    MatCardContent,
    MatCardTitle,
    MatCard,
    MatIconButton,
    MatIcon,
    SlicePipe,
    AsyncPipe,
    CdkDrag,
    CdkDropList,
    CdkDragHandle
  ],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss'
})
export class NotesListComponent implements OnDestroy{
  notes: Note[] = [];
  private subs: Subscription;
  categories: string[] = ['Play', 'Work', 'Family', 'Home'];
  categorizedNotes: CategorizedNotes = { Play: [], Work: [], Family: [], Home: [] };
  dropListIds = this.categories.map(c => `${c}-drop-list`);
  theme$: Observable<Theme>;

  constructor(
    private noteService: NoteService,
    private sidenavService: SidenavService,
    private themeService: ThemeService
  ) {
    this.theme$ = this.themeService.theme$;

    this.subs = this.noteService.categorizedNotes$.subscribe((notes) => {
      this.categorizedNotes = notes;
    });
  }

  editNote(note: Note) {
    this.noteService.setEdit(true);
    this.sidenavService.openSidenav(note);
  }

  deleteNote(id: string) {
    this.noteService.deleteNote(id);
  }

  drop(event: CdkDragDrop<Note[]>, category: string): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const note = event.previousContainer.data[event.previousIndex];
      note.category = event.container.id;
      note.updatedAt = new Date();
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.noteService.updateNote({ ...note, category, updatedAt: new Date() });
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
