import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NgClass} from '@angular/common';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {MatListItem} from '@angular/material/list';
import {NotesFormComponent} from './components/notes-form/notes-form.component';
import {NoteService} from './services/note.service';
import {Note} from './model/note.model';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgClass, MatSidenavContainer, MatToolbar, MatSidenav, MatSidenavContent, NotesFormComponent, MatListItem, RouterLink, MatButton, MatButton, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  sidenavOpen = false;
  selectedNote: Note = {id: '', title: '', content: '', category: '', updatedAt: new Date()};
  displayMode = 'normal'; // Default mode

  constructor(private noteService: NoteService) {
    this.displayMode = localStorage.getItem('displayMode') || 'normal';
  }

  openSidenav(note?: Note) {
    // this.selectedNote = note;
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
    // this.selectedNote = undefined;
  }
}
