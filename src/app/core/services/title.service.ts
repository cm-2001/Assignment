import { Injectable, signal } from '@angular/core';

interface Breadcrumb {
  label: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  public title = signal('Dashboard');
  public subtitle = signal('Welcome back!');
  public breadcrumbs = signal<Breadcrumb[]>([{ label: 'Home', url: '/' }]);

  setTitle(title: string) {
    this.title.set(title);
  }

  setSubtitle(subtitle: string) {
    this.subtitle.set(subtitle);
  }

  setBreadcrumbs(breadcrumbs: Breadcrumb[]) {
    this.breadcrumbs.set(breadcrumbs);
  }
}
