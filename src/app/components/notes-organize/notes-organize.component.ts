import { Component } from '@angular/core';
import {NoteService} from '../../services/note.service';
import {CdkDrag, CdkDragDrop, CdkDropList} from '@angular/cdk/drag-drop';
import {NgForOf} from '@angular/common';
import {Note} from '../../model/note.model';

@Component({
  selector: 'app-notes-organize',
  imports: [
    CdkDropList,
    CdkDrag,
    NgForOf
  ],
  templateUrl: './notes-organize.component.html',
  styleUrl: './notes-organize.component.scss'
})
export class NotesOrganizeComponent {
 notes: Note[] = [
   {id: '1', title: 'first', content: 'this is a note', category: 'all', updatedAt: new Date()},
   {id: '2', title: 'second', content: 'this is another note', category: 'specific', updatedAt: new Date()}
 ]
  constructor(private noteService: NoteService) {}

  drop(event: CdkDragDrop<any[]>) {
    // const notes = [...this.noteService.notes$.value];
    // moveItemInArray(notes, event.previousIndex, event.currentIndex);
    // this.noteService['notes'] = notes; // Direct update (bypass readonly)
    this.noteService['updateStorage'](); // Call private method
  }
}
