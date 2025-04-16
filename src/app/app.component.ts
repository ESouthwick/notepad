import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {NotesFormComponent} from './components/notes-form/notes-form.component';
import {NoteService} from './services/note.service';
import {Note} from './model/note.model';
import {MatButtonModule} from '@angular/material/button';
import {Theme, ThemeService} from './services/theme.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSidenavContainer,
    MatToolbar,
    MatSidenav,
    MatSidenavContent,
    NotesFormComponent,
    RouterLink,
    MatButtonModule,
    AsyncPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  sidenavOpen = false;
  selectedNote: Note = {id: '', title: '', content: '', category: '', updatedAt: new Date()};
  theme$: Observable<Theme>;

  constructor(
    private noteService: NoteService,
    private themeService: ThemeService
  ) {
    this.theme$ = this.themeService.theme$;
  }

  openSidenav(note?: Note) {
    if(note) {
      this.selectedNote = note;
      this.noteService.setEdit(true);
    } else{
      this.noteService.setEdit(false);
    }
      this.sidenavOpen = true;
  }

  saveNote(note: Note) {
    this.noteService.saveNote(note);
    this.closeSidenav();
  }

  createNote() {
    this.openSidenav();
  }

  editNote(note: Note) {
    this.openSidenav(note);
  }

  closeSidenav() {
    this.sidenavOpen = false;
    this.selectedNote = this.noteService.getDefaultNote();
  }
}
