import { NgClass } from '@angular/common';
import { Component, HostListener, inject, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Language } from '../../core/services/language';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [NgClass, CommonModule, TranslateModule, RouterLink],
  templateUrl: './header.html',
})
export class Header {
  languageService = inject(Language);
  isDark = signal(false);
  isScrolled = signal(false);

  ngOnInit(): void {
    // Cargar modo oscuro
    const savedTheme = localStorage.getItem('theme');
    const isDarkMode = savedTheme === 'dark';
    
    this.isDark.set(isDarkMode);
    
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }

  toggleTheme() {
    this.isDark.set(!this.isDark());
    const html = document.documentElement;
    if (this.isDark()) {
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

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 0);
  }
}
