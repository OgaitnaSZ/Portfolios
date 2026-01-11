import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [TranslateModule, CommonModule],
  templateUrl: './footer.html'
})
export class Footer {
}
