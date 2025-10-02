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
                <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-11h2v6h-2v-6zm0-4h2v2h-2V5z"/></svg>
            </div>
            <div class="card-info">
                <p class="card-title">Total Revenue</p>
                <p class="card-value">{{ totalRevenue() | currency:'USD':'symbol':'1.0-0' }}</p>
            </div>
        </div>

        <div class="summary-card">
            <div class="card-icon orders">
                <svg viewBox="0 0 24 24"><path fill="currentColor" d="M18 6h-2V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2h4v2h-4V4z"/></svg>
            </div>
            <div class="card-info">
                <p class="card-title">Total Orders</p>
                <p class="card-value">{{ totalOrders() }}</p>
            </div>
        </div>

        <div class="summary-card">
            <div class="card-icon pending">
                <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/></svg>
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
    }
    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--space-lg);
    }
    .summary-card {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      background-color: var(--background-card);
      padding: var(--space-lg);
      border-radius: var(--rounded-lg);
      box-shadow: var(--shadow-sm);
      transition: all var(--transition-normal);
    }
    .summary-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-lg);
    }
    .card-icon {
        display: grid;
        place-items: center;
        width: 60px;
        height: 60px;
        border-radius: var(--rounded-full);
        color: var(--text-light);
    }
    .card-icon.revenue { background-color: #2ECC71; }
    .card-icon.orders { background-color: #3498DB; }
    .card-icon.pending { background-color: #F39C12; }
    .card-icon svg {
        width: 2rem;
        height: 2rem;
    }
    .card-info .card-title {
        font-size: 1rem;
        color: var(--text-secondary);
        margin: 0;
    }
    .card-info .card-value {
        font-size: 2rem;
        font-weight: 700;
        color: var(--text-primary);
        margin: 0;
    }
    .details-card {
        background-color: var(--background-card);
        border-radius: var(--rounded-lg);
        box-shadow: var(--shadow-sm);
        padding: var(--space-lg);
    }
    .recent-orders { grid-column: 1 / -1; }
    .top-products { grid-column: 1 / -1; }
    @media (min-width: 1024px) {
        .recent-orders { grid-column: span 2; }
        .top-products { grid-column: span 1; }
    }
    .card-header {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-primary);
        margin: 0 0 var(--space-md) 0;
        border-bottom: 1px solid var(--border-color);
        padding-bottom: var(--space-md);
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
        padding: var(--space-md) 0;
        border-bottom: 1px solid var(--border-color);
    }
    .data-list-item:last-child { border-bottom: none; }
    .item-main { flex: 1; }
    .item-title { font-weight: 600; margin: 0; }
    .item-subtitle { font-size: 0.9rem; color: var(--text-secondary); margin: 0; }
    .item-value { font-weight: 600; font-size: 1.1rem; }
    .item-aside {
        display: flex;
        align-items: center;
        gap: var(--space-md);
    }
    .status-badge {
        display: inline-block;
        padding: var(--space-xs) var(--space-sm);
        border-radius: var(--rounded-full);
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: capitalize;
    }
    .status-badge.completed {
        background-color: var(--success);
        color: var(--text-light);
    }
    .status-badge.pending {
        background-color: var(--warning);
        color: var(--text-light);
    }
    .status-badge.shipped {
        background-color: #3498DB;
        color: var(--text-light);
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
