import { Injectable, signal, effect } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class Language {
  currentLang = signal<string>('es');
  availableLanguages = ['es', 'en'];

  constructor(private translate: TranslateService) {
    // Configurar idioma inicial
    const savedLang = localStorage.getItem('lang');

    const browserLang =
      this.translate.getBrowserCultureLang()?.split('-')[0] ||
      this.translate.getBrowserLang();

    const initialLang =
      savedLang && this.availableLanguages.includes(savedLang)
        ? savedLang
        : this.availableLanguages.includes(browserLang!)
          ? browserLang!
          : 'es';
    
    this.translate.setDefaultLang('es');
    this.setLanguage(initialLang);

    // Persistir cambios automáticamente
    effect(() => {
      localStorage.setItem('lang', this.currentLang());
    });
  }

  setLanguage(lang: string) {
    if (this.availableLanguages.includes(lang)) {
      this.translate.use(lang);
      this.currentLang.set(lang);
    }
  }

  toggleLanguage() {
    this.setLanguage(this.currentLang() === 'es' ? 'en' : 'es');
  }
}
