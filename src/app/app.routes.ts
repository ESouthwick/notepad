import {Routes} from '@angular/router';
import {NotesListComponent} from './components/notes-list/notes-list.component';
import {SettingsComponent} from './components/settings/settings.component';

export const routes: Routes = [

  { path: '', component: NotesListComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', redirectTo: '' }

];
