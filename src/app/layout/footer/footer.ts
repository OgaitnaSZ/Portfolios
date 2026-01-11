import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Language } from '../../core/services/language';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [TranslateModule, CommonModule],
  templateUrl: './footer.html'
})
export class Footer {
  languageService = inject(Language);
}
