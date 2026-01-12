import { NgClass, NgStyle  } from '@angular/common';
import { Component, effect, HostListener, inject, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Language } from '../../core/services/language';
import { filter } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { ScrollSpy } from '../../core/services/scroll-spy';

@Component({
  selector: 'app-header',
  imports: [NgClass, NgStyle, CommonModule, TranslateModule],
  templateUrl: './header.html',
})
export class Header {
  languageService = inject(Language);
  isDark = signal(false);
  isScrolled = signal(false);
  currentRoute = signal('/');

  scrollSpy = inject(ScrollSpy);
  router = inject(Router);

  constructor() {
    // Cargar tema guardado
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      this.isDark.set(savedTheme === 'dark');
    }

    // Auto-sincronizar con el DOM
    effect(() => {
      const html = document.documentElement;
      if (this.isDark()) {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    });

    // Detectar cambios de ruta
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute.set(event.urlAfterRedirects);
      });
  }

  ngOnInit(): void {
    this.currentRoute.set(this.router.url);
    
    // Iniciar scroll spy solo si estamos en home
    if (this.currentRoute() === '/') {
      setTimeout(() => this.scrollSpy.observeSections(), 100);
    }
  }

  toggleTheme() {
    this.isDark.update((current) => !current);
  }

  onLanguageChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.languageService.setLanguage(target.value);
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 0);
  }

  isActive(section: string): boolean {
    const route = this.currentRoute();
    const activeSection = this.scrollSpy.activeSection();

    switch (section) {
      case 'home':
        return route === '/' && activeSection === 'home';
      
      case 'about':
        return route === '/' && activeSection === 'about';
      
      case 'projects':
        return route === '/' && activeSection === 'projects' || route === '/projects';
      
      case 'skills':
        return route === '/' && activeSection === 'skills';
      
      case 'contact':
        return route === '/' && activeSection === 'contact';
      
      default:
        return false;
    }
  }

  scrollToSection(sectionId: string, event?: Event) {
    if (this.currentRoute() !== '/') {
      // Si no estamos en home, navegar primero
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          this.scrollTo(sectionId);
        }, 100);
      });
    } else {
      event?.preventDefault();
      this.scrollTo(sectionId);
    }
  }

  private scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
