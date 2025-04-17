import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Note} from '../model/note.model';


@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private selectedNoteSubject = new BehaviorSubject<Note | null>(null);
  selectedNote$: Observable<Note | null> = this.selectedNoteSubject.asObservable();

  private sidenavOpenSubject = new BehaviorSubject<boolean>(false);
  sidenavOpen$: Observable<boolean> = this.sidenavOpenSubject.asObservable();

  openSidenav(note: Note): void {
    console.log('SidenavService: Opening sidenav with note', note);
    this.selectedNoteSubject.next({...note});
    this.sidenavOpenSubject.next(true);
  }

  closeSidenav(): void {
    this.selectedNoteSubject.next(null);
    this.sidenavOpenSubject.next(false);
  }
}
