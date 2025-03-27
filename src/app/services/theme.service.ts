// src/app/services/theme.service.ts
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = false;

  constructor(private storage: Storage) {
    this.storage.create();
    
    // Detección del tema del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = prefersDark.matches;
    prefersDark.addListener((mediaQuery) => {
      this.setTheme(mediaQuery.matches);
    });
    
    this.loadThemePreference();
  }

  async loadThemePreference() {
    const savedTheme = await this.storage.get('darkMode');
    this.darkMode = savedTheme || false;
    this.setTheme(this.darkMode);
  }

  setTheme(dark: boolean) {
    this.darkMode = dark;
    document.body.classList.toggle('dark', dark);
    
    // Actualiza variables CSS
    const root = document.documentElement;
    if (dark) {
      root.style.setProperty('--app-background', '#1e1e1e');
      root.style.setProperty('--app-text-color', '#ffffff');
      root.style.setProperty('--app-light-off', '#515151');
      root.style.setProperty('--app-elevator-inactive', '#515151');
      root.style.setProperty('--app-card', '#4e4e4e');

      
    } else {
      root.style.setProperty('--app-background', 'white');
      root.style.setProperty('--app-text-color', 'black');
      root.style.setProperty('--app-light-off', '#d40000');
      root.style.setProperty('--app-elevator-inactive', '#d40000');
      root.style.setProperty('--app-card', '#ffffff');


    }
    
    this.storage.set('darkMode', dark);
  }

  toggleTheme() {
    this.setTheme(!this.darkMode);
  }

  isDarkMode() {
    return this.darkMode;
  }
}