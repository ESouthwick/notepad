import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../../services/note.service';
import { Note } from '../../model/note.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notes-form',
  templateUrl: './notes-form.component.html',
  styleUrls: ['./notes-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule
  ]
})
export class NotesFormComponent implements OnInit {
  noteForm: FormGroup;
  isEditMode = false;
  categories: string[] = [];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private noteService: NoteService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.noteForm = this.fb.group({
      title: [{ value: '', disabled: false }, Validators.required],
      content: [{ value: '', disabled: false }, Validators.required],
      category: [{ value: '', disabled: false }, Validators.required]
    });
  }

  ngOnInit(): void {
    this.categories = this.noteService.categories;
    const noteId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!noteId;

    if (this.isEditMode && noteId) {
      this.loadNote(noteId);
    }
  }

  private setFormDisabled(disabled: boolean): void {
    if (disabled) {
      this.noteForm.disable();
    } else {
      this.noteForm.enable();
    }
  }

  private loadNote(id: string): void {
    this.isLoading = true;
    this.setFormDisabled(true);
    
    this.noteService.getNoteById(id).subscribe({
      next: (note: Note) => {
        this.noteForm.patchValue({
          title: note.title,
          content: note.content,
          category: note.category
        });
        this.isLoading = false;
        this.setFormDisabled(false);
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.setFormDisabled(false);
        if (error.status === 404) {
          this.snackBar.open('Note not found', 'Close', { duration: 3000 });
          this.router.navigate(['/notes']);
        } else {
          this.snackBar.open('Error loading note', 'Close', { duration: 3000 });
          console.error('Error loading note:', error);
        }
      }
    });
  }

  onSubmit(): void {
    if (this.noteForm.valid) {
      this.isLoading = true;
      this.setFormDisabled(true);
      
      const noteData: Note = {
        ...this.noteForm.value,
        updatedAt: new Date()
      };

      if (this.isEditMode) {
        const noteId = this.route.snapshot.paramMap.get('id');
        if (noteId) {
          noteData._id = noteId;
          this.noteService.updateNote(noteData).subscribe({
            next: () => {
              this.isLoading = false;
              this.setFormDisabled(false);
              this.snackBar.open('Note updated successfully', 'Close', { duration: 3000 });
              this.router.navigate(['/notes']);
            },
            error: (error: HttpErrorResponse) => {
              this.isLoading = false;
              this.setFormDisabled(false);
              this.snackBar.open('Error updating note', 'Close', { duration: 3000 });
              console.error('Error updating note:', error);
            }
          });
        }
      } else {
        this.noteService.createNote(noteData).subscribe({
          next: () => {
            this.isLoading = false;
            this.setFormDisabled(false);
            this.snackBar.open('Note created successfully', 'Close', { duration: 3000 });
            this.router.navigate(['/notes']);
          },
          error: (error: HttpErrorResponse) => {
            this.isLoading = false;
            this.setFormDisabled(false);
            this.snackBar.open('Error creating note', 'Close', { duration: 3000 });
            console.error('Error creating note:', error);
          }
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/notes']);
  }
}
