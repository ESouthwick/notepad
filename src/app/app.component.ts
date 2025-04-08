import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Note} from './model/note.model';
import {NoteService} from './services/note.service';
import {NgClass} from '@angular/common';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {NotesFormComponent} from './components/notes-form/notes-form.component';
import {MatListItem} from '@angular/material/list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgClass, MatSidenavContainer, MatToolbar, MatSidenav, MatSidenavContent, NotesFormComponent, MatListItem, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  sidenavOpen = false;
  selectedNote!: Note;
  displayMode = 'normal'; // Default mode

  constructor(private noteService: NoteService) {}

  openSidenav(note?: Note) {
    // this.selectedNote = note;
    this.sidenavOpen = true;
  }

  saveNote(note: Note) {
    this.noteService.saveNote(note);
    this.closeSidenav();
  }

  closeSidenav() {
    this.sidenavOpen = false;
    // this.selectedNote = undefined;
  }
}
