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
    const browserLang = this.translate.getBrowserLang();
    const initialLang = savedLang || 
      (browserLang?.match(/es|en/) ? browserLang : 'es');
    
    this.translate.setDefaultLang('es');
    this.setLanguage(initialLang);

    // Persistir cambios automáticamente
    effect(() => {
      const lang = this.currentLang();
      localStorage.setItem('lang', lang);
    });
  }

  setLanguage(lang: string) {
    if (this.availableLanguages.includes(lang)) {
      this.translate.use(lang);
      this.currentLang.set(lang);
    }
  }

  toggleLanguage() {
    const newLang = this.currentLang() === 'es' ? 'en' : 'es';
    this.setLanguage(newLang);
  }
}
