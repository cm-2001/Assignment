import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSignal = signal<CartItem[]>([]);

  // Public signals for components to use
  cart = this.cartSignal.asReadonly();
  subtotal = computed(() => this.cart().reduce((acc, item) => acc + (item.product.price * item.quantity), 0));
  tax = computed(() => this.subtotal() * 0.10); // 10% tax
  total = computed(() => this.subtotal() + this.tax());

  addToCart(product: Product) {
    this.cartSignal.update(currentCart => {
      const existingItem = currentCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return currentCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...currentCart, { product, quantity: 1 }];
      }
    });
  }

  clearCart() {
    this.cartSignal.set([]);
  }
}
