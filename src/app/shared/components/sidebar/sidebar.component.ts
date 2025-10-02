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
            <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 7L12 12L22 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 12V22" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Admin</span>
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
      width: 240px;
      background: #1a202c; /* Dark background */
      color: #e2e8f0; /* Light text */
      height: 100vh;
      box-shadow: 2px 0 5px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
    }
    .sidebar-nav {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 1.5rem 1rem;
    }
    .logo {
      margin-bottom: 2rem;
      text-align: center;
    }
    .logo a {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      color: #fff;
      font-size: 1.25rem;
      font-weight: 700;
      text-decoration: none;
    }
    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
      flex-grow: 1;
    }
    li {
      margin-bottom: 0.5rem;
    }
    a {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem 1rem;
      color: #a0aec0; /* Lighter text for links */
      text-decoration: none;
      border-radius: 6px;
      transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
      font-weight: 500;
    }
    a:hover {
      background-color: #2d3748; /* Slightly lighter dark on hover */
      color: #fff;
    }
    a.active {
      background-color: #4a5568; /* Active link background */
      color: #fff;
      font-weight: 600;
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
