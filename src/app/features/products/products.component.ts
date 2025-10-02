import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MockDataService } from '../../core/services/mock-data.service';
import { CartService } from '../../core/services/cart.service';
import { ToastService } from '../../core/services/toast.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-products',
  template: `
    <div class="page-card">
      <div class="card-header">
        <h2 class="card-title">Products</h2>
        <div class="header-actions">
          <input type="text" class="search-input" placeholder="Search products..." [value]="searchTerm()" (input)="searchTerm.set($event.target.value)"/>
          <div class="filter-buttons">
            <button class="filter-btn" [class.active]="filterCategory() === 'all'" (click)="filterCategory.set('all')">All</button>
            <button class="filter-btn" [class.active]="filterCategory() === 'Food'" (click)="filterCategory.set('Food')">Food</button>
            <button class="filter-btn" [class.active]="filterCategory() === 'Drinks'" (click)="filterCategory.set('Drinks')">Drinks</button>
          </div>
        </div>
      </div>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            @for(product of filteredProducts(); track product.id){
              <tr>
                <td>{{ product.name }}</td>
                <td>{{ product.category }}</td>
                <td>{{ product.price | currency:'USD' }}</td>
                <td>
                  <button class="action-btn" (click)="addToCart(product)" [disabled]="getCartItemCount(product.id) > 0">
                    @if(getCartItemCount(product.id) > 0){
                      <span>Added ({{ getCartItemCount(product.id) }})</span>
                    } @else {
                      <span>Add to Cart</span>
                    }
                  </button>
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
    .action-btn {
        background-color: var(--brand-primary);
        color: var(--text-light);
        border: none;
        padding: var(--space-sm) var(--space-md);
        border-radius: var(--rounded-md);
        cursor: pointer;
        transition: all var(--transition-fast);
        min-width: 120px;
    }
    .action-btn:hover {
        opacity: .8;
    }
    .action-btn:disabled {
      background-color: var(--background-main);
      color: var(--text-secondary);
      cursor: not-allowed;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe]
})
export class ProductsComponent {
  private dataService = inject(MockDataService);
  private cartService = inject(CartService);
  private toastService = inject(ToastService);

  private products = this.dataService.getProducts();

  searchTerm = signal('');
  filterCategory = signal('all');

  filteredProducts = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const category = this.filterCategory();

    return this.products().filter(product => {
      const termMatch = product.name.toLowerCase().includes(term);
      const categoryMatch = category === 'all' || product.category === category;
      return termMatch && categoryMatch;
    });
  });

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.toastService.show(`Added ${product.name} to cart`, 'success');
  }

  getCartItemCount(productId: string): number {
    const item = this.cartService.cart().find(i => i.product.id === productId);
    return item ? item.quantity : 0;
  }
}
