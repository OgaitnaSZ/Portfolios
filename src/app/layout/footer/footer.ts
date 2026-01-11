import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-footer',
  imports: [TranslateModule, CommonModule, RouterLink],
  templateUrl: './footer.html'
})
export class Footer {
  currentYear = new Date().getFullYear();
}
