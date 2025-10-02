import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../shared/components/header/header.component';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  template: `
    <div class="layout">
      <app-sidebar class="sidebar" />
      <main class="main-content">
        <app-header />
        <div class="content">
          <router-outlet />
        </div>
      </main>
    </div>
  `,
  styles: [`
    .layout {
      display: flex;
      height: 100vh;
    }
    .sidebar {
      width: 250px;
      background-color: #f4f4f4;
    }
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .content {
      padding: 20px;
      flex: 1;
      overflow-y: auto;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent]
})
export class LayoutComponent {}
