import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Note} from '../model/note.model';


@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private defaultNote: Note = {id: '', title: '', content: '', category: '', updatedAt: new Date()};
  private selectedNoteSubject = new BehaviorSubject<Note>(this.defaultNote);
  selectedNote$: Observable<Note> = this.selectedNoteSubject.asObservable();

  private sidenavOpenSubject = new BehaviorSubject<boolean>(false);
  sidenavOpen$: Observable<boolean> = this.sidenavOpenSubject.asObservable();

  openSidenav(note: Note): void {
    this.selectedNoteSubject.next({...note});
    this.sidenavOpenSubject.next(true);
  }

  closeSidenav(): void {
    this.selectedNoteSubject.next(this.defaultNote);
    this.sidenavOpenSubject.next(false);
  }
}
