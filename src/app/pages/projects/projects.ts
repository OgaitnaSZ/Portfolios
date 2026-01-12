import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, TranslateModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  selectedCategory = signal<string>('all');
  projects = signal<any[]>([]);

  constructor(private translate: TranslateService) {
    this.translate
      .stream('projectsList')
      .subscribe((projects) => {
        this.projects.set(projects);
      });
  }

  filteredProjects = computed(() => {
    const category = this.selectedCategory();
    if (category === 'all') {
      return this.projects();
    }
    return this.projects().filter(p => p.category === category);
  });

  filterByCategory(category: string) {
    this.selectedCategory.set(category);
  }
}
