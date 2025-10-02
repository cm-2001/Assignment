import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header class="header">
        <div class="header-left">
            <h1 class="page-title">Dashboard</h1>
            <p class="page-subtitle">Welcome back, Admin!</p>
        </div>
        <div class="header-right">
            <input type="text" class="search-bar" placeholder="Search...">
            <div class="icon-button">
                <svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M10 2a8 8 0 1 0 5.29 14.29l3.71 3.71 1.41-1.41-3.71-3.71A8 8 0 0 0 10 2zm0 2a6 6 0 1 1-6 6 6 6 0 0 1 6-6z"/></svg>
            </div>
            <div class="icon-button">
                <svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12 22a2 2 0 0 1-2-2h4a2 2 0 0 1-2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4a1.5 1.5 0 0 0-3 0v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
            </div>
            <div class="profile-avatar">
                <img src="https://i.pravatar.cc/40" alt="User Avatar">
            </div>
        </div>
    </header>
  `,
  styles: [`
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-lg) var(--space-xl);
      background-color: var(--background-card);
      border-bottom: 1px solid var(--border-color);
    }
    .header-left {
        flex: 1;
    }
    .page-title {
        font-family: var(--font-heading);
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--text-primary);
        margin: 0;
    }
    .page-subtitle {
        font-size: 1rem;
        color: var(--text-secondary);
        margin: 0;
    }
    .header-right {
        display: flex;
        align-items: center;
        gap: var(--space-lg);
    }
    .search-bar {
        font-family: var(--font-body);
        font-size: 1rem;
        padding: var(--space-sm) var(--space-md);
        border-radius: var(--rounded-full);
        border: 1px solid var(--border-color);
        background-color: var(--background-main);
        width: 250px;
        transition: all var(--transition-normal);
    }
    .search-bar:focus {
        outline: none;
        border-color: var(--brand-primary);
        box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.2);
    }
    .icon-button {
        display: grid;
        place-items: center;
        width: 40px;
        height: 40px;
        border-radius: var(--rounded-full);
        background-color: var(--background-main);
        color: var(--text-secondary);
        cursor: pointer;
        transition: all var(--transition-normal);
    }
    .icon-button:hover {
        background-color: var(--brand-primary);
        color: var(--text-light);
    }
    .icon {
        width: 1.25rem;
        height: 1.25rem;
    }
    .profile-avatar img {
        width: 40px;
        height: 40px;
        border-radius: var(--rounded-full);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
