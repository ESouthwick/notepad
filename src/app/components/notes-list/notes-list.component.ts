import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NoteService } from '../../services/note.service';
import { Note } from '../../model/note.model';
import { MatCard, MatCardActions, MatCardContent, MatCardTitle } from '@angular/material/card';
import { AsyncPipe } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { Theme, ThemeService } from '../../services/theme.service';
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    DragDropModule,
    MatCardActions,
    MatCardContent,
    MatCardTitle,
    MatIconButton,
    MatIcon,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatTooltipModule
  ],
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;

  notes: Note[] = [];
  categories: string[] = [];
  categorizedNotes: { [key: string]: Note[] } = {};
  viewMode: 'cards' | 'table' = 'cards';

  // Table view properties
  displayedColumns: string[] = ['title', 'content', 'category', 'updatedAt', 'actions'];
  filteredNotes: Note[] = [];
  searchQuery: string = '';

  constructor(
    private noteService: NoteService,
    private themeService: ThemeService
  ) {
    this.categories = this.noteService.categories;
  }

  ngOnInit(): void {
    this.loadNotes();
  }

  ngAfterViewInit() {
    if (this.sort) {
      this.sort.sortChange.subscribe(() => {
        this.applyFilters();
      });
    }
  }

  loadNotes() {
    this.noteService.categorizedNotes$.subscribe(notes => {
      this.categorizedNotes = notes;
      this.notes = Object.values(notes).flat();
      this.filteredNotes = this.notes;
      this.categories = [...new Set(this.notes.map(note => note.category))];
    });
  }

  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'cards' ? 'table' : 'cards';
  }

  applyFilters() {
    let filtered = this.notes.filter(note => {
      const searchLower = this.searchQuery.toLowerCase();
      return !this.searchQuery ||
        note.title.toLowerCase().includes(searchLower) ||
        note.content.toLowerCase().includes(searchLower) ||
        note.category.toLowerCase().includes(searchLower);
    });

    if (this.sort && this.sort.active) {
      filtered = [...filtered].sort((a, b) => {
        const isAsc = this.sort.direction === 'asc';
        switch (this.sort.active) {
          case 'title':
            return this.compare(a.title, b.title, isAsc);
          case 'content':
            return this.compare(a.content, b.content, isAsc);
          case 'category':
            return this.compare(a.category, b.category, isAsc);
          case 'updatedAt':
            return this.compare(new Date(a.updatedAt).getTime(), new Date(b.updatedAt).getTime(), isAsc);
          default:
            return 0;
        }
      });
    }

    this.filteredNotes = filtered;
  }

  private compare(a: any, b: any, isAsc: boolean) {
    if (a === null || a === undefined) return isAsc ? -1 : 1;
    if (b === null || b === undefined) return isAsc ? 1 : -1;
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  getCategoryNotes(category: string): Note[] {
    return this.categorizedNotes[category] || [];
  }

  getNoteId(note: Note): string {
    return note._id || note.id || '';
  }

  deleteNote(note: Note): void {
    const id = this.getNoteId(note);
    if (!id) {
      console.error('Cannot delete note: No ID found');
      return;
    }

    if (confirm('Are you sure you want to delete this note?')) {
      this.noteService.deleteNote(id).subscribe({
        next: () => {
          console.log('Note deleted successfully');
        },
        error: (error: Error) => {
          console.error('Error deleting note:', error);
        }
      });
    }
  }

  drop(event: CdkDragDrop<Note[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const note = event.container.data[event.currentIndex];
      const newCategory = event.container.id;

      const updatedNote: Note = {
        ...note,
        category: newCategory,
        updatedAt: new Date()
      };

      this.noteService.updateNote(updatedNote).subscribe({
        next: () => {
          console.log('Note category updated successfully');
        },
        error: (error: Error) => {
          console.error('Error updating note category:', error);
          transferArrayItem(
            event.container.data,
            event.previousContainer.data,
            event.currentIndex,
            event.previousIndex
          );
        }
      });
    }
  }

  setTheme(theme: Theme) {
    this.themeService.setTheme(theme);
  }
}
