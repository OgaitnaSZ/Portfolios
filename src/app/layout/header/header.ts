import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Language } from '../../core/services/language';

@Component({
  selector: 'app-header',
  imports: [NgClass, CommonModule, TranslateModule],
  templateUrl: './header.html',
})
export class Header {
  languageService = inject(Language);
  isDark: boolean = false;

  ngOnInit(): void {
    // Cargar modo oscuro
    this.isDark = localStorage.getItem('theme') === 'dark';
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    const html = document.documentElement;
    if (this.isDark) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  onLanguageChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.languageService.setLanguage(target.value);
  }
}
