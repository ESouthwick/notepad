import { Component } from '@angular/core';
import {NoteService} from '../../services/note.service';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {AsyncPipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-notes-organize',
  imports: [
    CdkDropList,
    CdkDrag,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './notes-organize.component.html',
  styleUrl: './notes-organize.component.css'
})
export class NotesOrganizeComponent {

  // @ts-ignore
  notes$ = this.noteService.notes$;

  constructor(private noteService: NoteService) {}

  drop(event: CdkDragDrop<any[]>) {
    // const notes = [...this.noteService.notes$.value];
    // moveItemInArray(notes, event.previousIndex, event.currentIndex);
    // this.noteService['notes'] = notes; // Direct update (bypass readonly)
    this.noteService['updateStorage'](); // Call private method
  }
}
