import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { MockDataService } from '../../core/services/mock-data.service';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-billing',
  template: `
    <div class="billing-page">
      <div class="page-card product-selection">
        <div class="card-header">
          <h2 class="card-title">Products</h2>
        </div>
        <div class="product-grid">
          @for(product of products(); track product.id){
            <div class="product-card" (click)="addToCart(product)">
              <div class="product-name">{{ product.name }}</div>
              <div class="product-price">{{ product.price | currency:'USD' }}</div>
            </div>
          }
        </div>
      </div>
      <div class="page-card cart-summary">
        <div class="card-header">
          <h2 class="card-title">Cart</h2>
        </div>
        @if(cart().length === 0){
          <div class="empty-cart">
            <p>Your cart is empty</p>
          </div>
        } @else {
          <div class="cart-items">
            @for(item of cart(); track item.product.id){
              <div class="cart-item">
                <div class="item-details">
                  <p class="item-name">{{ item.product.name }}</p>
                  <p class="item-price">{{ item.product.price | currency:'USD' }}</p>
                </div>
                <div class="item-actions">
                  <button class="quantity-btn" (click)="updateQuantity(item.product.id, item.quantity - 1)">-</button>
                  <span class="item-quantity">{{ item.quantity }}</span>
                  <button class="quantity-btn" (click)="updateQuantity(item.product.id, item.quantity + 1)">+</button>
                  <button class="remove-btn" (click)="removeFromCart(item.product.id)">Remove</button>
                </div>
              </div>
            }
          </div>
          <div class="cart-total">
            <h3 class="total-label">Total:</h3>
            <h3 class="total-amount">{{ total() | currency:'USD' }}</h3>
          </div>
          <div class="cart-actions">
            <button class="clear-btn" (click)="clearCart()">Clear Cart</button>
            <button class="checkout-btn">Checkout</button>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .billing-page {
      display: grid;
      grid-template-columns: 3fr 2fr;
      gap: var(--space-xl);
    }
    .page-card {
        background-color: var(--background-card);
        border-radius: var(--rounded-lg);
        box-shadow: var(--shadow-sm);
        padding: var(--space-lg);
        height: fit-content;
    }
    .card-header {
        margin-bottom: var(--space-lg);
        padding-bottom: var(--space-lg);
        border-bottom: 1px solid var(--border-color);
    }
    .card-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0;
    }
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: var(--space-md);
    }
    .product-card {
      background-color: var(--background-main);
      border-radius: var(--rounded-md);
      padding: var(--space-md);
      cursor: pointer;
      text-align: center;
      transition: all var(--transition-fast);
    }
    .product-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    .product-name { font-weight: 600; }
    .product-price { color: var(--brand-primary); }
    .empty-cart { text-align: center; padding: var(--space-xl); color: var(--text-secondary); }
    .cart-items { display: flex; flex-direction: column; gap: var(--space-md); }
    .cart-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .item-details { flex-grow: 1; }
    .item-name { font-weight: 500; }
    .item-price { font-size: .9rem; color: var(--text-secondary); }
    .item-actions { display: flex; align-items: center; gap: var(--space-sm); }
    .quantity-btn, .remove-btn {
      background: var(--background-main);
      border: 1px solid var(--border-color);
      border-radius: var(--rounded-sm);
      padding: var(--space-xs) var(--space-sm);
      cursor: pointer;
    }
    .remove-btn { color: var(--error); }
    .cart-total {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-top: var(--space-lg);
      padding-top: var(--space-lg);
      border-top: 1px solid var(--border-color);
    }
    .total-label { font-size: 1rem; color: var(--text-secondary); }
    .total-amount { font-size: 1.5rem; font-weight: 600; }
    .cart-actions {
      margin-top: var(--space-lg);
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-md);
    }
    .clear-btn, .checkout-btn {
      padding: var(--space-md);
      border-radius: var(--rounded-md);
      cursor: pointer;
      border: none;
      font-weight: 600;
      transition: all var(--transition-fast);
    }
    .clear-btn {
      background-color: var(--background-main);
      border: 1px solid var(--border-color);
    }
    .checkout-btn {
      background-color: var(--brand-primary);
      color: var(--text-light);
    }
    .clear-btn:hover, .checkout-btn:hover { opacity: .8; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe]
})
export class BillingComponent {
  private dataService = inject(MockDataService);
  products = this.dataService.getProducts();
  cart = signal<{ product: Product, quantity: number }[]>([]);
  
  total = computed(() => 
    this.cart().reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  );

  addToCart(product: Product) {
    const existingItem = this.cart().find(item => item.product.id === product.id);
    if (existingItem) {
      this.updateQuantity(product.id, existingItem.quantity + 1);
    } else {
      this.cart.update(currentCart => [...currentCart, { product, quantity: 1 }]);
    }
  }

  removeFromCart(productId: string) {
    this.cart.update(currentCart => currentCart.filter(item => item.product.id !== productId));
  }

  updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
    } else {
      this.cart.update(currentCart => 
        currentCart.map(item => 
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  }

  clearCart() {
    this.cart.set([]);
  }
}
