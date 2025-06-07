import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark' | 'purple';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme = new BehaviorSubject<Theme>('light');
  currentTheme$ = this.currentTheme.asObservable();

  private readonly themes = {
    light: {
      '--background-color': '#f5f5f5',
      '--surface-color': '#ffffff',
      '--card-color': '#ffffff',
      '--text-color': '#000000',
      '--text-secondary': '#666666',
      '--hover-color': '#f0f0f0',
      '--border-color': '#e0e0e0'
    },
    dark: {
      '--background-color': '#121212',
      '--surface-color': '#1e1e1e',
      '--card-color': '#2d2d2d',
      '--text-color': '#ffffff',
      '--text-secondary': '#b0b0b0',
      '--hover-color': '#2a2a2a',
      '--border-color': '#404040'
    },
    purple: {
      '--background-color': '#f8ddfb',
      '--surface-color': '#ffffff',
      '--card-color': '#f3d6fb',
      '--text-color': '#000000',
      '--text-secondary': '#9c9a9a',
      '--hover-color': '#e1bee7',
      '--border-color': '#ce93d8'
    }
  };

  constructor() {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      this.setTheme(savedTheme);
    }
  }

  setTheme(theme: Theme) {
    this.currentTheme.next(theme);
    localStorage.setItem('theme', theme);

    const themeColors = this.themes[theme];
    Object.entries(themeColors).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value);
    });
  }

  getCurrentTheme(): Theme {
    return this.currentTheme.value;
  }
}
