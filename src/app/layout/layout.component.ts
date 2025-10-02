import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../shared/components/header/header.component';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';

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
export class LayoutComponent {}
