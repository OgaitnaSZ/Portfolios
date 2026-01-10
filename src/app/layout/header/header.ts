import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [NgClass],
  templateUrl: './header.html',
})
export class Header {
  isDark: boolean = false;

  ngOnInit(): void {
    // Cargar modo oscuro
    this.isDark = localStorage.getItem('theme') === 'dark';
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    const html = document.documentElement;
    if (this.isDark) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
}
