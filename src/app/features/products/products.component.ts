import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MockDataService } from '../../core/services/mock-data.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-products',
  template: `
    <div class="product-list">
      <h2>Product List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          @for(product of products(); track product.id){
            <tr>
              <td>{{ product.name }}</td>
              <td>{{ product.category }}</td>
              <td>{{ product.price | currency:'USD' }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .product-list {
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
  imports: [CurrencyPipe]
})
export class ProductsComponent {
  private dataService = inject(MockDataService);
  products = this.dataService.getProducts();
}
