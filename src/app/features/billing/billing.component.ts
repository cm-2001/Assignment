import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-billing',
  imports: [CommonModule],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillingComponent {
  private cartService = inject(CartService);

  cartItems = this.cartService.cart;
  subtotal = computed(() => this.cartService.subtotal());
  tax = computed(() => this.cartService.tax());
  total = computed(() => this.cartService.total());

  processPayment() {
    // In a real app, you'd integrate with a payment gateway
    alert('Payment processed successfully!');
    this.cartService.clearCart();
  }
}
