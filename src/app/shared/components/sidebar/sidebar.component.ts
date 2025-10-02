import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  template: `
    <nav class="sidebar-nav">
      <ul>
        <li><a routerLink="/dashboard">Dashboard</a></li>
        <li><a routerLink="/billing">Billing</a></li>
        <li><a routerLink="/products">Products</a></li>
        <li><a routerLink="/orders">Orders</a></li>
        <li><a routerLink="/customers">Customers</a></li>
        <li><a routerLink="/settings">Settings</a></li>
      </ul>
    </nav>
  `,
  styles: [`
    .sidebar-nav {
      padding: 20px;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    li {
      margin-bottom: 10px;
    }
    a {
      text-decoration: none;
      color: #333;
      font-weight: bold;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink]
})
export class SidebarComponent {}
