import { ChangeDetectionStrategy, Component, computed, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';
import { TitleService } from '../../../core/services/title.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  template: `
    <header class="header">
      <div class="header-left">
        <button (click)="toggleSidebar.emit()" class="menu-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="title-section">
          <h2>{{ title() }}</h2>
          <p>{{ subtitle() }}</p>
        </div>
      </div>
      <div class="header-right">
        <div class="cart-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          @if (cartCount() > 0) {
            <span class="cart-badge">{{ cartCount() }}</span>
          }
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.5rem;
      background-color: #fff;
      border-bottom: 1px solid #e0e0e0;
    }
    .header-left {
      display: flex;
      align-items: center;
    }
    .menu-btn {
      background: none;
      border: none;
      cursor: pointer;
      margin-right: 1rem;
    }
    .title-section h2 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
    }
    .title-section p {
      margin: 0;
      color: #666;
    }
    .header-right {
      display: flex;
      align-items: center;
    }
    .cart-icon {
      position: relative;
      margin-right: 1.5rem;
    }
    .cart-badge {
      position: absolute;
      top: -5px;
      right: -10px;
      background-color: #f44336;
      color: #fff;
      border-radius: 50%;
      padding: 0.25rem;
      font-size: 0.75rem;
      min-width: 20px;
      text-align: center;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  toggleSidebar = output();
  private cartService = inject(CartService);
  private titleSvc = inject(TitleService);

  title = this.titleSvc.title;
  subtitle = this.titleSvc.subtitle;
  cartCount = computed(() => this.cartService.cart().reduce((acc, item) => acc + item.quantity, 0));
}
