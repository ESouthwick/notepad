import {Routes} from '@angular/router';
import {NotesListComponent} from './components/notes-list/notes-list.component';
import {NotesFormComponent} from './components/notes-form/notes-form.component';
import {SettingsComponent} from './components/settings/settings.component';

export const routes: Routes = [

  { path: '', component: NotesListComponent },
  { path: 'new', component: NotesFormComponent },
  { path: 'edit/:id', component: NotesFormComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', redirectTo: '' }

];
