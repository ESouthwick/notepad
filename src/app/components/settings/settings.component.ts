import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { NoteService } from '../../services/note.service';
import { Theme } from '../../services/theme.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FormsModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  newCategory: string = '';
  categories: string[] = [];

  constructor(
    private noteService: NoteService,
    private dialog: MatDialog
  ) {
    this.noteService.categories$.subscribe(categories => {
      this.categories = categories;
    });
  }

  addCategory(): void {
    if (this.newCategory && !this.categories.includes(this.newCategory)) {
      this.categories = [...this.categories, this.newCategory];
      this.noteService.updateCategories(this.categories);
      this.newCategory = '';
    }
  }

  removeCategory(category: string): void {
    if (confirm(`Are you sure you want to remove the "${category}" category? All notes in this category will be moved to "Uncategorized".`)) {
      this.categories = this.categories.filter(c => c !== category);
      this.noteService.updateCategories(this.categories);
    }
  }

  deleteAllNotes(): void {
    if (confirm('Are you sure you want to delete ALL notes? This action cannot be undone.')) {
      this.noteService.deleteAllNotes().subscribe({
        next: () => {
          console.log('All notes deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting all notes:', error);
        }
      });
    }
  }
}
