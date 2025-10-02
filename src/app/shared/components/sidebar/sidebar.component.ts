import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="sidebar-nav">
      <div class="logo">
        <a routerLink="/">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="var(--brand-primary)"/>
            <path d="M12 11.55C9.64 9.35 6.48 8 3 8v1.5c3.54 0 6.6 2.36 7.95 5.45C11.32 13.65 11 12.85 11 12c0-.55.12-1.08.34-1.57C11.56 10.15 11.78 9.85 12 9.55c.22-.3.44-.6.66-.88.22-.28.46-.55.71-.8.25-.25.51-.48.78-.7.27-.22.56-.43.85-.62.29-.19.6-.37.91-.53.31-.16.63-.3.96-.42.33-.12.67-.22 1.01-.3.34-.08.69-.14 1.04-.18.35-.04.7-.06 1.06-.06v-1.5c-3.48 0-6.64 1.35-8.99 3.55z" fill="var(--brand-primary)"/>
        </svg>
          <span class="logo-text">Restau POS</span>
        </a>
      </div>
      <ul>
        <li>
          <a routerLink="/dashboard" routerLinkActive="active">
            <svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" /></svg>
            <span>Dashboard</span>
          </a>
        </li>
        <li>
          <a routerLink="/products" routerLinkActive="active">
            <svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M18,6H16V4A2,2 0 0,0 14,2H10A2,2 0 0,0 8,4V6H6A2,2 0 0,0 4,8V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8A2,2 0 0,0 18,6M10,4H14V6H10V4Z" /></svg>
            <span>Products</span>
          </a>
        </li>
        <li>
          <a routerLink="/orders" routerLinkActive="active">
            <svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M19.5,3.5L18,2L14.5,5.5L11,2L9.5,3.5L13,7L9.5,10.5L11,12L14.5,8.5L18,12L19.5,10.5L16,7L19.5,3.5M17.5,14H6.5A2.5,2.5 0 0,0 4,16.5A2.5,2.5 0 0,0 6.5,19H17.5A2.5,2.5 0 0,0 20,16.5A2.5,2.5 0 0,0 17.5,14M6.5,17.5A1,1 0 0,1 5.5,16.5A1,1 0 0,1 6.5,15.5H17.5A1,1 0 0,1 18.5,16.5A1,1 0 0,1 17.5,17.5H6.5Z" /></svg>
            <span>Orders</span>
          </a>
        </li>
        <li>
          <a routerLink="/customers" routerLinkActive="active">
            <svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" /></svg>
            <span>Customers</span>
          </a>
        </li>
        <li>
          <a routerLink="/billing" routerLinkActive="active">
            <svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M20,8H4V6H20V8M20,12H4V10H20V12M20,16H4V14H20V16M22,4H2A2,2 0 0,0 0,6V18A2,2 0 0,0 2,20H22A2,2 0 0,0 24,18V6A2,2 0 0,0 22,4Z" /></svg>
            <span>Billing</span>
          </a>
        </li>
      </ul>
      <div class="sidebar-footer">
        <a routerLink="/settings" routerLinkActive="active">
            <svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M12,2C15.87,2 19.11,3.26 21.36,5.64L19.95,7.05C18.1,5.08 15.2,4 12,4C8.8,4 5.9,5.08 4.05,7.05L2.64,5.64C4.89,3.26 8.13,2 12,2M12,20C15.2,20 18.1,18.92 19.95,16.95L21.36,18.36C19.11,20.74 15.87,22 12,22C8.13,22 4.89,20.74 2.64,18.36L4.05,16.95C5.9,18.92 8.8,20 12,20Z" /></svg>
            <span>Settings</span>
        </a>
      </div>
    </nav>
  `,
  styles: [`
    :host {
      display: block;
      width: 260px;
      background: var(--background-card);
      color: var(--text-primary);
      height: 100vh;
      box-shadow: var(--shadow-md);
      display: flex;
      flex-direction: column;
      border-right: 1px solid var(--border-color);
    }
    .sidebar-nav {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: var(--space-lg) var(--space-md);
    }
    .logo {
      margin-bottom: var(--space-xl);
      padding-inline: var(--space-sm);
    }
    .logo a {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      color: var(--text-primary);
      font-size: 1.5rem;
      font-family: var(--font-heading);
      font-weight: 700;
      text-decoration: none;
    }
    .logo .logo-text {
        background: -webkit-linear-gradient(45deg, var(--brand-primary), var(--accent-gold));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    ul {
      list-style-type: none;
      flex-grow: 1;
    }
    li {
      margin-bottom: var(--space-sm);
    }
    a {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      padding: var(--space-sm) var(--space-md);
      color: var(--text-secondary);
      text-decoration: none;
      border-radius: var(--rounded-md);
      transition: all var(--transition-normal);
      font-weight: 500;
    }
    a:hover {
      background-color: var(--background-main);
      color: var(--brand-primary);
    }
    a.active {
      background-color: var(--brand-primary);
      color: var(--text-light);
      font-weight: 600;
      box-shadow: var(--shadow-sm);
    }
    .icon {
      width: 1.5rem;
      height: 1.5rem;
    }
    .sidebar-footer {
        margin-top: auto;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {}
