import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { MockDataService } from '../../core/services/mock-data.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Order } from '../../core/models/order.model';

@Component({
  selector: 'app-orders',
  template: `
    <div class="page-card">
      <div class="card-header">
        <h2 class="card-title">Orders</h2>
        <div class="header-actions">
          <input type="text" class="search-input" placeholder="Search orders..." [value]="searchTerm()" (input)="searchTerm.set($event.target.value)"/>
          <div class="filter-buttons">
            <button class="filter-btn" [class.active]="filterStatus() === 'all'" (click)="filterStatus.set('all')">All</button>
            <button class="filter-btn" [class.active]="filterStatus() === 'completed'" (click)="filterStatus.set('completed')">Completed</button>
            <button class="filter-btn" [class.active]="filterStatus() === 'pending'" (click)="filterStatus.set('pending')">Pending</button>
            <button class="filter-btn" [class.active]="filterStatus() === 'cancelled'" (click)="filterStatus.set('cancelled')">Cancelled</button>
          </div>
        </div>
      </div>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            @for(order of filteredOrders(); track order.id){
              <tr>
                <td>{{ order.customerName }}</td>
                <td>{{ order.total | currency:'USD' }}</td>
                <td>
                  <span class="status-badge" [class]="order.status">{{ order.status }}</span>
                </td>
                <td>{{ order.date | date:'medium' }}</td>
                <td>
                    <button class="action-btn">View Details</button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .page-card {
        background-color: var(--background-card);
        border-radius: var(--rounded-lg);
        box-shadow: var(--shadow-sm);
        padding: var(--space-lg);
    }
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-lg);
        padding-bottom: var(--space-lg);
        border-bottom: 1px solid var(--border-color);
    }
    .card-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0;
    }
    .header-actions {
        display: flex;
        gap: var(--space-md);
    }
    .search-input {
        font-family: var(--font-body);
        padding: var(--space-sm) var(--space-md);
        border-radius: var(--rounded-md);
        border: 1px solid var(--border-color);
        background-color: var(--background-main);
        min-width: 250px;
    }
    .filter-buttons {
        display: flex;
        background-color: var(--background-main);
        border-radius: var(--rounded-md);
        padding: var(--space-xs);
    }
    .filter-btn {
        background: transparent;
        border: none;
        padding: var(--space-sm) var(--space-md);
        border-radius: var(--rounded-sm);
        cursor: pointer;
        font-weight: 500;
        color: var(--text-secondary);
        transition: all var(--transition-fast);
    }
    .filter-btn.active {
        background-color: var(--background-card);
        color: var(--brand-primary);
        box-shadow: var(--shadow-xs);
    }
    .table-container {
        overflow-x: auto;
    }
    .data-table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
    }
    .data-table th, .data-table td {
        padding: var(--space-md);
        vertical-align: middle;
    }
    .data-table thead {
        background-color: var(--background-main);
    }
    .data-table th {
        font-weight: 600;
        color: var(--text-secondary);
        text-transform: uppercase;
        font-size: .8rem;
        border-bottom: 1px solid var(--border-color);
    }
    .data-table tbody tr {
        border-bottom: 1px solid var(--border-color);
    }
    .data-table tbody tr:last-child { border: none; }
    .status-badge {
        display: inline-block;
        padding: var(--space-xs) var(--space-sm);
        border-radius: var(--rounded-full);
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: capitalize;
    }
    .status-badge.completed { background-color: var(--success); color: var(--text-light); }
    .status-badge.pending { background-color: var(--warning); color: var(--text-light); }
    .status-badge.cancelled { background-color: var(--error); color: var(--text-light); }
    .action-btn {
        background-color: var(--brand-primary);
        color: var(--text-light);
        border: none;
        padding: var(--space-sm) var(--space-md);
        border-radius: var(--rounded-md);
        cursor: pointer;
        transition: all var(--transition-fast);
    }
    .action-btn:hover {
        opacity: .8;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, DatePipe]
})
export class OrdersComponent {
  private dataService = inject(MockDataService);
  private orders = this.dataService.getOrders();

  searchTerm = signal('');
  filterStatus = signal('all');

  filteredOrders = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const status = this.filterStatus();

    return this.orders().filter(order => {
      const termMatch = order.customerName.toLowerCase().includes(term);
      const statusMatch = status === 'all' || order.status === status;
      return termMatch && statusMatch;
    });
  });
}
