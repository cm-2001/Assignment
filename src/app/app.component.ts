import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, switchMap } from 'rxjs/operators';
import { TitleService } from './core/services/title.service';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  template: `<router-outlet />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private router = inject(Router);
  private titleService = inject(TitleService);
  private pageTitle = inject(Title);
  private route = inject(ActivatedRoute);

  constructor() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => {
        let child = this.route.firstChild;
        while (child?.firstChild) {
          child = child.firstChild;
        }
        return child;
      }),
      filter((route): route is ActivatedRoute => !!route),
      switchMap(route => route.data),
      map(data => data['title'] || 'Dashboard')
    ).subscribe(title => {
      this.pageTitle.setTitle(`CRM - ${title}`);
      this.titleService.setTitle(title);
      this.titleService.setSubtitle(`Welcome to the ${title} page`);
    });
  }
}