import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterLink } from "@angular/router";
import { Contact } from "../contact/contact";

@Component({
  selector: 'app-home',
  imports: [CommonModule, TranslateModule, RouterLink, Contact],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  projects = signal<any[]>([]);
  cv_url = '';

  constructor(
    private translate: TranslateService
  ) {
    effect(() => {
      this.translate
        .get('projectsList')
        .subscribe((projects) => {
          this.projects.set(projects);
        });
    });
  }
}
