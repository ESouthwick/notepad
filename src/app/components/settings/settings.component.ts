import { Component } from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';

@Component({
  selector: 'app-settings',
  imports: [
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  displayMode = 'normal';

  updateDisplayMode(mode: string) {
    document.querySelector('mat-sidenav-container')?.classList.remove('normal', 'dark', 'high-contrast');
    document.querySelector('mat-sidenav-container')?.classList.add(mode);
  }
}
