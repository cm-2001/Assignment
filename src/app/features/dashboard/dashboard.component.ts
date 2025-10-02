import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { computed } from '@angular/core';
import { MockDataService } from '../../core/services/mock-data.service';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard-summary">
      <div class="summary-card">
        <h3>Total Orders</h3>
        <p>{{ totalOrders() }}</p>
      </div>
      <div class="summary-card">
        <h3>Total Revenue</h3>
        <p>{{ totalRevenue() | currency:'USD' }}</p>
      </div>
      <div class="summary-card">
        <h3>Pending Orders</h3>
        <p>{{ pendingOrders() }}</p>
      </div>
    </div>
    <div class="dashboard-details">
      <div class="recent-orders">
        <h3>Recent Orders</h3>
        <ul>
          @for(order of recentOrders(); track order.id){
            <li>
              <span>{{ order.customerName }}</span>
              <span>{{ order.total | currency:'USD' }}</span>
              <span>{{ order.date | date:'short' }}</span>
            </li>
          }
        </ul>
      </div>
      <div class="top-products">
        <h3>Top Selling Products</h3>
        <ul>
          @for(product of topProducts(); track product.id){
            <li>
              <span>{{ product.name }}</span>
              <span>{{ product.price | currency:'USD' }}</span>
            </li>
          }
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-summary {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
    }
    .summary-card {
      flex: 1;
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    h3 {
      margin-top: 0;
    }
    .dashboard-details {
      display: flex;
      gap: 20px;
    }
    .recent-orders, .top-products {
      flex: 1;
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    li {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
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
  topProducts = computed(() => this.products().slice(0, 5));

}
