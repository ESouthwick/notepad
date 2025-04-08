import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Note} from '../../model/note.model';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-notes-form',
  imports: [
    MatFormField,
    MatLabel,
    FormsModule,
    MatInput,
    MatButton
  ],
  templateUrl: './notes-form.component.html',
  styleUrl: './notes-form.component.css'
})
export class NotesFormComponent {
  @Input() note: Note = { id: '', title: '', content: '', category: '', updatedAt: new Date() };
  @Output() save = new EventEmitter<Note>();
  @Output() close = new EventEmitter<void>();

  onSave() {
    this.save.emit({ ...this.note });
  }
}
