import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MockDataService } from '../../core/services/mock-data.service';
import { CartService } from '../../core/services/cart.service';
import { ToastService } from '../../core/services/toast.service';
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
        @if(cartService.cart().length === 0){
          <div class="empty-cart">
            <p>Your cart is empty</p>
          </div>
        } @else {
          <div class="cart-items">
            @for(item of cartService.cart(); track item.product.id){
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

          <div class="summary-section">
            <div class="summary-row">
              <span>Subtotal</span>
              <span>{{ cartService.subtotal() | currency:'USD' }}</span>
            </div>
            <div class="summary-row">
              <span>Tax (10%)</span>
              <span>{{ cartService.tax() | currency:'USD' }}</span>
            </div>
            <div class="summary-row total-row">
              <span>Total</span>
              <span>{{ cartService.total() | currency:'USD' }}</span>
            </div>
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
    .summary-section {
      margin-top: var(--space-lg);
      padding-top: var(--space-lg);
      border-top: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }
    .summary-row {
      display: flex;
      justify-content: space-between;
    }
    .total-row {
      font-size: 1.2rem;
      font-weight: 600;
      margin-top: var(--space-sm);
    }
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
  cartService = inject(CartService);
  private toastService = inject(ToastService);

  products = this.dataService.getProducts();

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.toastService.show(`Added ${product.name} to cart`, 'success');
  }

  removeFromCart(productId: string) {
    const item = this.cartService.cart().find(i => i.product.id === productId);
    if (item) {
        this.cartService.removeFromCart(productId);
        this.toastService.show(`Removed ${item.product.name} from cart`, 'info');
    }
  }

  updateQuantity(productId: string, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
  }

  clearCart() {
    this.cartService.clearCart();
    this.toastService.show('Cart cleared', 'info');
  }
}
