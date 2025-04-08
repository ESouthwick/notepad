import { Routes } from '@angular/router';
import {NotesListComponent} from './components/notes-list/notes-list.component';
import {NotesOrganizeComponent} from './components/notes-organize/notes-organize.component';
import {SettingsComponent} from './components/settings/settings.component';

export const routes: Routes = [

  { path: '', component: NotesListComponent },
  { path: 'organize', component: NotesOrganizeComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', redirectTo: '' }

];
