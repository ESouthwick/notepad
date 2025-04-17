import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {NotesFormComponent} from './components/notes-form/notes-form.component';
import {NoteService} from './services/note.service';
import {Note} from './model/note.model';
import {MatButtonModule} from '@angular/material/button';
import {Theme, ThemeService} from './services/theme.service';
import {Observable, Subscription} from 'rxjs';
import {SidenavService} from './services/sidepanel.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbar,
    MatSidenavModule,
    NotesFormComponent,
    RouterLink,
    MatButtonModule,
    AsyncPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy{
  @ViewChild('sidenav') sidenav!: MatSidenav;
  private subs = new Subscription();

  sidenavOpen = false;
  selectedNote: Note = {id: '', title: '', content: '', category: '', updatedAt: new Date()};
  theme$: Observable<Theme>;

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
      this.sidenavService.sidenavOpen$.subscribe(isOpen => {
        if(isOpen){
          this.sidenav.open();
        }
        else{
          if(this.sidenav){
            this.sidenav.close();
          }
        }
        this.cdr.detectChanges();
      })
    )

    this.subs.add(
      this.sidenavService.selectedNote$.subscribe(note => {

        this.selectedNote = <Note>note;
        this.cdr.detectChanges();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  saveNote(note: Note) {
    this.noteService.saveNote(note);
    this.sidenavService.closeSidenav();
  }

  createNote() {
      this.noteService.setEdit(true);
      this.sidenavService.openSidenav(this.noteService.getDefaultNote());
  }

  closeSidenav() {
    this.sidenavOpen = false;
    this.selectedNote = this.noteService.getDefaultNote();
  }
}
