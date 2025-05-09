import {Component} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {Theme, ThemeService} from '../../services/theme.service';

@Component({
  selector: 'app-settings',
  imports: [
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  theme: Theme;

  constructor(
    private themeService: ThemeService
  ) {
    this.theme = this.themeService.getCurrentTheme();
  }
  setTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
  }
}
