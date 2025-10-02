import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MockDataService } from '../../core/services/mock-data.service';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-billing',
  template: `
    <div class="billing-container">
      <div class="product-grid">
        @for(product of products(); track product.id){
          <div class="product-card" (click)="addToCart(product)">
            <p>{{ product.name }}</p>
            <p>{{ product.price | currency:'USD' }}</p>
          </div>
        }
      </div>
      <div class="cart-summary">
        <h2>Cart</h2>
        @for(item of cart(); track item.product.id){
          <div class="cart-item">
            <p>{{ item.product.name }} ({{ item.quantity }})</p>
            <p>{{ (item.product.price * item.quantity) | currency:'USD' }}</p>
            <button (click)="removeFromCart(item.product.id)">Remove</button>
          </div>
        }
        <div class="cart-total">
          <h3>Total: {{ total() | currency:'USD' }}</h3>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .billing-container {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 20px;
    }
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 10px;
    }
    .product-card {
      border: 1px solid #eee;
      padding: 10px;
      cursor: pointer;
      text-align: center;
    }
    .product-card:hover {
      border-color: #ccc;
    }
    .cart-summary {
      background-color: #f8f8f8;
      padding: 20px;
      border-radius: 8px;
    }
    .cart-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .cart-total {
      margin-top: 20px;
      text-align: right;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe]
})
export class BillingComponent {
  private dataService = inject(MockDataService);
  products = this.dataService.getProducts();
  cart = signal<{ product: Product, quantity: number }[]>([]);
  total = signal(0);

  addToCart(product: Product) {
    const existingItem = this.cart().find(item => item.product.id === product.id);
    if (existingItem) {
      this.cart.update(currentCart => 
        currentCart.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      this.cart.update(currentCart => [...currentCart, { product, quantity: 1 }]);
    }
    this.calculateTotal();
  }

  removeFromCart(productId: string) {
    this.cart.update(currentCart => currentCart.filter(item => item.product.id !== productId));
    this.calculateTotal();
  }

  calculateTotal() {
    const newTotal = this.cart().reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    this.total.set(newTotal);
  }
}
