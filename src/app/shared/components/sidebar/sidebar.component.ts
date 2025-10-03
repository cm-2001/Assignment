import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="sidebar-nav">
      <div class="logo">
        <a routerLink="/">
            <svg fill="none" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M24 6c-9.94 0-18 8.06-18 18s8.06 18 18 18 18-8.06 18-18S33.94 6 24 6Z" fill="#22c55e"/><path d="M31.5 16.5c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5Zm0 6c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5Z" fill="#fff"/><path d="M16.5 25.5c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5Zm0 6c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5Z" fill="#fff"/><path d="M24 3C12.95 3 3 12.95 3 24s9.95 21 21 21 21-9.95 21-21S35.05 3 24 3Zm0 36c-8.28 0-15-6.72-15-15S15.72 9 24 9s15 6.72 15 15-6.72 15-15 15Zm-6-16.5c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5-3.5-1.57-3.5-3.5Zm12.5-3c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5Z" fill="#16a34a"/></svg>
          <span class="logo-text">Restaurant POS System</span>
        </a>
      </div>
      <ul>
        <li>
          <a routerLink="/dashboard" routerLinkActive="active">
            <svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
            <span>Dashboard</span>
          </a>
        </li>
        <li>
          <a routerLink="/products" routerLinkActive="active">
            <svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M18 6h-2V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 4v2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-6-2h4v2h-4V4zm6 14H6V8h2v2h8V8h2v12z"/></svg>
            <span>Products</span>
          </a>
        </li>
        <li>
          <a routerLink="/orders" routerLinkActive="active">
            <svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M7 15h7v2H7v-2zm0-4h10v2H7v-2zm0-4h10v2H7V7zm12 4h-2V9h2v2zm0-4h-2V5h2v2zm-2 8h2v-2h-2v2zM4 22H2V4h2v18z"/></svg>
            <span>Orders</span>
          </a>
        </li>
        <li>
          <a routerLink="/customers" routerLinkActive="active">
            <svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            <span>Customers</span>
          </a>
        </li>
        <li>
          <a routerLink="/billing" routerLinkActive="active">
            <svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M20 8H4V6h16v2zm-2 6H6v-2h12v2zm4-10H2C.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM5 12H3v-2h2v2zm0-4H3V6h2v2z"/></svg>
            <span>Billing</span>
          </a>
        </li>
      </ul>
      <div class="sidebar-footer">
        <a routerLink="/settings" routerLinkActive="active">
            <svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69-.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59-1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/></svg>
            <span>Settings</span>
        </a>
      </div>
    </nav>
  `,
  styles: [`
    :host {
      display: block;
      width: 280px;
      background: var(--background-card);
      color: var(--text-primary);
      height: 100vh;
      box-shadow: var(--shadow-lg);
      display: flex;
      flex-direction: column;
      border-right: 1px solid var(--border-color);
      padding: var(--space-xl) var(--space-lg);
    }
    .sidebar-nav {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .logo {
      margin-bottom: var(--space-2xl);
    }
    .logo a {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      color: var(--text-primary);
      font-size: 1.8rem;
      font-family: var(--font-heading);
      font-weight: 800;
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
      padding: 0;
    }
    li {
      margin-bottom: var(--space-md);
    }
    a {
      display: flex;
      align-items: center;
      gap: var(--space-lg);
      padding: var(--space-md) var(--space-lg);
      color: var(--text-secondary);
      text-decoration: none;
      border-radius: var(--rounded-lg);
      transition: all var(--transition-normal);
      font-weight: 600;
      font-size: 1.1rem;
    }
    a:hover {
      background-color: var(--background-hover);
      color: var(--brand-primary);
    }
    a.active {
      background: var(--brand-primary);
      color: #fff;
      box-shadow: var(--shadow-md);
    }
    a.active .icon {
        color: #fff;
    }
    .icon {
      width: 1.8rem;
      height: 1.8rem;
      color: var(--text-secondary);
      transition: color var(--transition-fast);
    }
    .sidebar-footer {
        margin-top: auto;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {}
