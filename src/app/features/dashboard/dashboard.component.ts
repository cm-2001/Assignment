import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { computed } from '@angular/core';
import { MockDataService } from '../../core/services/mock-data.service';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="grid-container">
        <div class="summary-card">
            <div class="card-icon revenue">
                <svg viewBox="0 0 24 24"><path fill="currentColor" d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
            </div>
            <div class="card-info">
                <p class="card-title">Total Revenue</p>
                <p class="card-value">{{ totalRevenue() | currency:'USD':'symbol':'1.0-0' }}</p>
            </div>
        </div>

        <div class="summary-card">
            <div class="card-icon orders">
                <svg viewBox="0 0 24 24"><path fill="currentColor" d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
            </div>
            <div class="card-info">
                <p class="card-title">Total Orders</p>
                <p class="card-value">{{ totalOrders() }}</p>
            </div>
        </div>

        <div class="summary-card">
            <div class="card-icon pending">
                <svg viewBox="0 0 24 24"><path fill="currentColor" d="M18 2H6v6l4 4-4 4v6h12V16l-4-4 4-4V2zm-2 14.5V20H8v-3.5l4-4 4 4zM16 6H8v3.5l4 4 4-4V6z"/></svg>
            </div>
            <div class="card-info">
                <p class="card-title">Pending Orders</p>
                <p class="card-value">{{ pendingOrders() }}</p>
            </div>
        </div>

      <div class="details-card recent-orders">
        <h3 class="card-header">Recent Orders</h3>
        <ul class="data-list">
          @for(order of recentOrders(); track order.id){
            <li class="data-list-item">
                <div class="item-main">
                    <p class="item-title">{{ order.customerName }}</p>
                    <p class="item-subtitle">{{ order.date | date:'mediumDate' }}</p>
                </div>
                <div class="item-aside">
                    <p class="item-value">{{ order.total | currency:'USD' }}</p>
                    <span class="status-badge" [class]="order.status">{{ order.status }}</span>
                </div>
            </li>
          }
        </ul>
      </div>

      <div class="details-card top-products">
        <h3 class="card-header">Top Selling Products</h3>
        <ul class="data-list">
          @for(product of topProducts(); track product.id){
            <li class="data-list-item">
                <div class="item-main">
                    <p class="item-title">{{ product.name }}</p>
                    <p class="item-subtitle">{{product.category}}</p>
                </div>
                <p class="item-value">{{ product.price | currency:'USD' }}</p>
            </li>
          }
        </ul>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding: var(--space-xl);
    }
    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: var(--space-xl);
    }
    .summary-card {
      display: flex;
      align-items: center;
      gap: var(--space-lg);
      background-color: var(--background-card);
      padding: var(--space-xl);
      border-radius: var(--rounded-xl);
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-md);
      transition: all var(--transition-slow);
    }
    .summary-card:hover {
        transform: translateY(-8px);
        box-shadow: var(--shadow-xl);
    }
    .card-icon {
        display: grid;
        place-items: center;
        width: 64px;
        height: 64px;
        border-radius: var(--rounded-full);
        color: #fff;
    }
    .card-icon.revenue { background: linear-gradient(45deg, #2ECC71, #27AE60); }
    .card-icon.orders { background: linear-gradient(45deg, #3498DB, #2980B9); }
    .card-icon.pending { background: linear-gradient(45deg, #F39C12, #E67E22); }
    .card-icon svg {
        width: 2.5rem;
        height: 2.5rem;
    }
    .card-info .card-title {
        font-size: 1.1rem;
        font-weight: 500;
        color: var(--text-secondary);
        margin: 0;
    }
    .card-info .card-value {
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--text-primary);
        margin: 0;
    }
    .details-card {
        background-color: var(--background-card);
        border-radius: var(--rounded-xl);
        border: 1px solid var(--border-color);
        box-shadow: var(--shadow-md);
        padding: var(--space-xl);
    }
    .recent-orders { grid-column: 1 / -1; }
    .top-products { grid-column: 1 / -1; }
    @media (min-width: 1280px) {
        .recent-orders { grid-column: span 2; }
        .top-products { grid-column: span 1; }
    }
    .card-header {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--text-primary);
        margin: 0 0 var(--space-lg) 0;
        border-bottom: 2px solid var(--border-color);
        padding-bottom: var(--space-lg);
    }
    .data-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .data-list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-lg) 0;
        border-bottom: 1px solid var(--border-color);
        transition: background-color var(--transition-fast);
    }
    .data-list-item:hover { 
      background-color: var(--background-hover); 
    }
    .data-list-item:last-child { border-bottom: none; }
    .item-main { flex: 1; }
    .item-title { font-weight: 600; font-size: 1.1rem; margin: 0; }
    .item-subtitle { font-size: 0.9rem; color: var(--text-secondary); margin: 0; }
    .item-value { font-weight: 700; font-size: 1.2rem; }
    .item-aside {
        display: flex;
        align-items: center;
        gap: var(--space-lg);
    }
    .status-badge {
        display: inline-block;
        padding: 6px 14px;
        border-radius: var(--rounded-full);
        font-size: 0.8rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    .status-badge.completed {
        background-color: var(--success-bg);
        color: var(--success-text);
    }
    .status-badge.pending {
        background-color: var(--warning-bg);
        color: var(--warning-text);
    }
    .status-badge.cancelled {
        background-color: var(--danger-bg);
        color: var(--danger-text);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, DatePipe]
})
export class DashboardComponent {
  private dataService = inject(MockDataService);

  private orders = this.dataService.getOrders();
  private products = this.dataService.getProducts();

  totalOrders = computed(() => this.orders().length);
  totalRevenue = computed(() => this.orders()
    .filter(order => order.status === 'completed')
    .reduce((sum, order) => sum + order.total, 0)
  );
  pendingOrders = computed(() => this.orders().filter(order => order.status === 'pending').length);

  recentOrders = computed(() => this.orders().slice(0, 5));
  topProducts = computed(() => this.products().sort((a,b) => b.sales - a.sales).slice(0, 5));

}
