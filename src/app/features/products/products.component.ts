import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';
import { MockDataService } from '../../core/services/mock-data.service';

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe],
  template: `
    <div class="products-grid">
      @for (product of products(); track product.id) {
        <div class="product-card">
          <div class="product-image-container">
            <img class="product-image" [src]="product.image" [alt]="product.name">
          </div>
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-description">{{ product.description }}</p>
            <div class="product-footer">
              <span class="product-price">{{ product.price | currency }}</span>
              <button class="add-to-cart-btn" (click)="addToCart(product)">
                <svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M17 18c-1.11 0-2 .89-2 2s.89 2 2 2 2-.89 2-2-.89-2-2-2zm-12 0c-1.11 0-2 .89-2 2s.89 2 2 2 2-.89 2-2-.89-2-2-2zm12.78-7.14c-.1-.28-.39-.44-.68-.34l-4.5 1.55c-.29.1-.49.38-.49.69v.01c0 .41.34.75.75.75H13l-1.42 2.58c-.18.31-.03.71.29.89.32.18.71.03.89-.29l1.7-3.08-1.1-3.32.9.9zM7.05 6h11.23l-1.28 4.49-3.72-1.24.49-1.49-1.57-.52-.49 1.49-1.92-.64L7.05 6z"/></svg>
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
        display: block;
        padding: var(--space-xl);
    }
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: var(--space-xl);
    }
    .product-card {
      background-color: var(--background-card);
      border-radius: var(--rounded-xl);
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-md);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: all var(--transition-slow);
    }
    .product-card:hover {
        transform: translateY(-8px);
        box-shadow: var(--shadow-xl);
    }
    .product-image-container {
        height: 200px;
        overflow: hidden;
        background-color: var(--background-main);
        display: grid;
        place-items: center;
        padding: var(--space-md);
    }
    .product-image {
      max-height: 100%;
      width: auto;
      object-fit: contain;
    }
    .product-info {
      padding: var(--space-lg);
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
    .product-name {
      font-size: 1.3rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 var(--space-sm) 0;
    }
    .product-description {
        color: var(--text-secondary);
        flex-grow: 1;
        margin: 0 0 var(--space-lg) 0;
        line-height: 1.5;
    }
    .product-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;
    }
    .product-price {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--brand-primary);
    }
    .add-to-cart-btn {
        display: inline-flex;
        align-items: center;
        gap: var(--space-sm);
        background-color: var(--brand-primary);
        color: #fff;
        border: none;
        padding: var(--space-sm) var(--space-md);
        border-radius: var(--rounded-md);
        cursor: pointer;
        font-weight: 600;
        font-size: 1rem;
        transition: background-color var(--transition-fast);
    }
    .add-to-cart-btn:hover {
      background-color: var(--brand-dark);
    }
    .add-to-cart-btn .icon {
        width: 1.2rem;
        height: 1.2rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {
  private cartService = inject(CartService);
  private mockDataService = inject(MockDataService);
  products = this.mockDataService.getProducts();

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
