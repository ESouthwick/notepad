import {Component} from '@angular/core';
import {NoteService} from '../../services/note.service';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {AsyncPipe, NgForOf} from '@angular/common';
import {Note} from '../../model/note.model';
import {Observable, Subscription} from 'rxjs';
import {Theme, ThemeService} from '../../services/theme.service';

@Component({
  selector: 'app-notes-organize',
  imports: [
    CdkDropList,
    CdkDrag,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './notes-organize.component.html',
  styleUrl: './notes-organize.component.scss'
})
export class NotesOrganizeComponent {
  notes: Note[] = [];
  private subscription: Subscription;

  theme$: Observable<Theme>;

  constructor(
    private noteService: NoteService,
    private themeService: ThemeService
  ) {
    this.theme$ = this.themeService.theme$;

    this.subscription = this.noteService.notes$.subscribe((notes) => {
      this.notes = notes;
    });

  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.notes, event.previousIndex, event.currentIndex);
    this.noteService['notes'] = this.notes; // Direct update (bypass readonly)
    this.noteService['updateStorage'](); // Call private method
  }
}
