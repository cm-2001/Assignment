import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MockDataService } from '../../core/services/mock-data.service';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-orders',
  template: `
    <div class="order-list">
      <h2>Order List</h2>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          @for(order of orders(); track order.id){
            <tr>
              <td>{{ order.customerName }}</td>
              <td>{{ order.total | currency:'USD' }}</td>
              <td>{{ order.status }}</td>
              <td>{{ order.date | date:'short' }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .order-list {
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #eee;
    }
    th {
      background-color: #f8f8f8;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, DatePipe]
})
export class OrdersComponent {
  private dataService = inject(MockDataService);
  orders = this.dataService.getOrders();
}
