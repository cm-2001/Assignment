import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';
import { MockDataService } from '../../core/services/mock-data.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  template: `
    <div class="products-grid">
      @for (product of products(); track product.id) {
        <div class="product-card">
          <img [src]="product.image" [alt]="product.name">
          <h3>{{ product.name }}</h3>
          <p>{{ product.price | currency }}</p>
          <button (click)="addToCart(product)">
            Add to Cart
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
    }
    .product-card {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 1rem;
      text-align: center;
    }
    .product-card img {
      max-width: 100%;
      height: auto;
      margin-bottom: 1rem;
    }
    .product-card h3 {
      margin: 0.5rem 0;
    }
    .product-card p {
      margin: 0.5rem 0;
      font-weight: bold;
    }
    .product-card button {
      background-color: #007bff;
      color: #fff;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    .product-card button:hover {
      background-color: #0056b3;
    }
    .product-card button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
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
