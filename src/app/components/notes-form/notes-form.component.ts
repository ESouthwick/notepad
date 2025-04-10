import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category, Note} from '../../model/note.model';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';

@Component({
  selector: 'app-notes-form',
  imports: [
    MatFormField,
    MatLabel,
    FormsModule,
    MatInput,
    MatButton,
    MatSelect,
    MatOption
  ],
  templateUrl: './notes-form.component.html',
  styleUrl: './notes-form.component.scss'
})
export class NotesFormComponent implements OnInit{
  @Input() note: Note = { id: '', title: '', content: '', category: '', updatedAt: new Date() };
  @Output() save = new EventEmitter<Note>();
  @Output() close = new EventEmitter<void>();

  section: Category[] = [
    {value: 'Work'},
    {value: 'Play'},
    {value: 'Family'},
    {value: 'Home'}
  ];

  ngOnInit(): void {
    console.log(this.note);
  }

  onSave() {
    this.save.emit({ ...this.note });
  }


}
