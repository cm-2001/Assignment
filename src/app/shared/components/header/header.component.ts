import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { TitleService } from '../../../core/services/title.service';

@Component({
  selector: 'app-header',
  template: `
    <header class="header">
        <div class="header-left">
            <div class="breadcrumbs">
              @for(crumb of titleService.breadcrumbs(); track crumb.label; let last = $last){
                <a [routerLink]="crumb.url" class="breadcrumb-link">{{ crumb.label }}</a>
                @if(!last){
                  <span class="breadcrumb-separator">/</span>
                }
              }
            </div>
            <h1 class="page-title">{{ titleService.title() }}</h1>
            <p class="page-subtitle">{{ titleService.subtitle() }}</p>
        </div>
        <div class="header-right">
            <input type="text" class="search-bar" placeholder="Search...">
            <a class="icon-button" routerLink="/billing">
                <svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M17 18a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2a2 2 0 0 1 2 2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1V2m6 16a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2a2 2 0 0 1 2 2m9-7l3-5.4A.25.25 0 0 0 20.25 4H6.83l.94 2H18v.01Z"/></svg>
                @if(cartService.cartCount() > 0){
                  <span class="cart-badge">{{ cartService.cartCount() }}</span>
                }
            </a>
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
    .breadcrumbs {
      font-size: .875rem;
      color: var(--text-secondary);
      margin-bottom: var(--space-xs);
    }
    .breadcrumb-link {
      color: var(--text-secondary);
      text-decoration: none;
      transition: color var(--transition-fast);
    }
    .breadcrumb-link:hover {
      color: var(--brand-primary);
    }
    .breadcrumb-separator {
      margin: 0 var(--space-xs);
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
        position: relative;
        display: grid;
        place-items: center;
        width: 40px;
        height: 40px;
        border-radius: var(--rounded-full);
        background-color: var(--background-main);
        color: var(--text-secondary);
        cursor: pointer;
        transition: all var(--transition-normal);
        text-decoration: none;
    }
    .icon-button:hover {
        background-color: var(--brand-primary);
        color: var(--text-light);
    }
    .icon {
        width: 1.25rem;
        height: 1.25rem;
    }
    .cart-badge {
      position: absolute;
      top: -5px;
      right: -5px;
      background-color: var(--error);
      color: var(--text-light);
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: .75rem;
      font-weight: 600;
    }
    .profile-avatar img {
        width: 40px;
        height: 40px;
        border-radius: var(--rounded-full);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink]
})
export class HeaderComponent {
  cartService = inject(CartService);
  titleService = inject(TitleService);
}
