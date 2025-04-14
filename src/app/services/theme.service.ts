import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'light' | 'dark' | 'midnight';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<Theme>('light');
  theme$: Observable<Theme> = this.themeSubject.asObservable();

  constructor() {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && ['light', 'dark', 'midnight'].includes(savedTheme)) {
      this.setTheme(savedTheme);
    } else {
      this.setTheme('light');
    }
  }

  setTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  getCurrentTheme(): Theme {
    return this.themeSubject.getValue();
  }
}
