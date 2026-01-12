import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollSpy {
  activeSection = signal<string>('home');

  observeSections() {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            if (id) {
              this.activeSection.set(id);
            }
          }
        });
      },
      {
        threshold: 0.5, // 30% de la sección visible
        rootMargin: '-20px 0px -20px 0px'
      }
    );

    // Observar secciones
    const sections = ['home', 'about', 'projects', 'skills', 'contact'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });
  }
}
