import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterLink, ActivatedRoute } from "@angular/router";
import { AfterViewInit } from '@angular/core';
import { Contact } from "../contact/contact";

@Component({
  selector: 'app-home',
  imports: [CommonModule, TranslateModule, RouterLink, Contact],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  projects = signal<any[]>([]);
  cv_url = 'https://drive.google.com/file/d/1fzCCmoOhTm7OK5ifJZAymEbt-wOSyUbX/view';

  constructor(
    private translate: TranslateService, 
    private route: ActivatedRoute
  ){
    this.translate
      .stream('projectsList')
      .subscribe((projects) => {
        this.projects.set(projects.slice(0, 6));
      });
  }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (!fragment) return;

      setTimeout(() => {
        const element = document.getElementById(fragment);
        if (!element) return;

        const yOffset = 100;
        const y = element.getBoundingClientRect().top + window.scrollY - yOffset;

        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      });
    });
  }
}
