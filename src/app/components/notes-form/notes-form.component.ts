import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category, Note} from '../../model/note.model';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {Observable, Subscription} from 'rxjs';
import {Theme, ThemeService} from '../../services/theme.service';
import {AsyncPipe} from '@angular/common';
import {NoteService} from '../../services/note.service';
import {SidenavService} from '../../services/sidepanel.service';

@Component({
  selector: 'app-notes-form',
  imports: [
    MatFormField,
    MatLabel,
    FormsModule,
    MatInput,
    MatButton,
    MatSelect,
    MatOption,
    AsyncPipe
  ],
  templateUrl: './notes-form.component.html',
  styleUrl: './notes-form.component.scss'
})
export class NotesFormComponent implements OnInit{
  @Input() note: Note = {
    id: '',
    title: '',
    content: '',
    category: '',
    updatedAt: new Date()
  };
  @Output() save = new EventEmitter<Note>();
  @Output() close = new EventEmitter<void>();
  private subs = new Subscription();
  theme$: Observable<Theme>;
  title!: string;
  section: Category[] = [
    {value: 'Work'},
    {value: 'Play'},
    {value: 'Family'},
    {value: 'Home'}
  ];

  constructor(
    private noteService: NoteService,
    private sidenavService: SidenavService,
    private themeService: ThemeService,
    private cdr: ChangeDetectorRef
  ) {
    this.theme$ = this.themeService.theme$;
  }

  ngOnInit(): void {
    this.subs.add(
      this.sidenavService.selectedNote$.subscribe(note => {
        if(note.title === '') {
          this.title = "New Note";
        } else {
          this.title = note.title;
        }
        this.cdr.detectChanges();
      })
    );
  }

  onSave() {
    if(this.note) {
      this.save.emit({...this.note});
      this.note = this.noteService.getDefaultNote();
    }
  }
}
