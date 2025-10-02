import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HeaderComponent } from '../shared/components/header/header.component';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { TitleService } from '../core/services/title.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  template: `
    <div class="layout">
      <app-sidebar />
      <main class="main-content">
        <app-header />
        <div class="content-wrapper">
          <router-outlet />
        </div>
      </main>
    </div>
  `,
  styles: [`
    :host {
        display: block;
    }
    .layout {
      display: flex;
      height: 100vh;
      background-color: var(--background-main);
    }
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }
    .content-wrapper {
      padding: var(--space-xl);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent]
})
export class LayoutComponent implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private titleService = inject(TitleService);
  private browserTitle = inject(Title);

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      map(route => route.snapshot.data)
    ).subscribe(data => {
      const title = data['title'] || 'Dashboard';
      const subtitle = data['subtitle'] || 'Welcome back!';
      const breadcrumbs = data['breadcrumbs'] || [{ label: 'Home', url: '/' }];

      this.browserTitle.setTitle(`${title} | Restaurant POS`);
      this.titleService.setTitle(title, subtitle);
      this.titleService.setBreadcrumbs(breadcrumbs);
    });
  }
}
