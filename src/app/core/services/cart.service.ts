import { Injectable, signal, computed, effect } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly TAX_RATE = 0.10;
  private storageKey = 'angular_pos_cart';

  // Initialize cart from localStorage
  cart = signal<CartItem[]>(this.loadCartFromStorage());

  // Computed signals for derived state
  subtotal = computed(() => 
    this.cart().reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  );

  tax = computed(() => this.subtotal() * this.TAX_RATE);

  total = computed(() => this.subtotal() + this.tax());

  cartCount = computed(() => 
    this.cart().reduce((sum, item) => sum + item.quantity, 0)
  );

  constructor() {
    // Effect to save cart to localStorage whenever it changes
    effect(() => {
      this.saveCartToStorage(this.cart());
    });
  }

  addToCart(product: Product): void {
    const existingItem = this.cart().find(item => item.product.id === product.id);
    if (existingItem) {
      this.updateQuantity(product.id, existingItem.quantity + 1);
    } else {
      this.cart.update(currentCart => [...currentCart, { product, quantity: 1 }]);
    }
  }

  removeFromCart(productId: string): void {
    this.cart.update(currentCart => currentCart.filter(item => item.product.id !== productId));
  }

  updateQuantity(productId: string, quantity: number): void {
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

  clearCart(): void {
    this.cart.set([]);
  }

  private saveCartToStorage(cart: CartItem[]): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(cart));
    }
  }

  private loadCartFromStorage(): CartItem[] {
    if (typeof localStorage !== 'undefined') {
        const savedCart = localStorage.getItem(this.storageKey);
        return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  }
}
