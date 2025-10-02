import { Injectable, signal } from '@angular/core';
import { Order } from '../../core/models/order.model';
import { Product } from '../../core/models/product.model';
import { Customer } from '../../core/models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private orders = signal<Order[]>([
    { id: '1', customerName: 'John Doe', total: 50, status: 'completed', date: new Date() },
    { id: '2', customerName: 'Jane Smith', total: 75, status: 'pending', date: new Date() },
    { id: '3', customerName: 'Sam Wilson', total: 120, status: 'completed', date: new Date() },
    { id: '4', customerName: 'Alice Johnson', total: 30, status: 'cancelled', date: new Date() },
  ]);

  private products = signal<Product[]>([
    { id: '1', name: 'Burger', price: 12, category: 'Food', sales: 150 },
    { id: '2', name: 'Fries', price: 5, category: 'Food', sales: 250 },
    { id: '3', name: 'Soda', price: 3, category: 'Drinks', sales: 500 },
    { id: '4', name: 'Salad', price: 10, category: 'Food', sales: 75 },
  ]);

  private customers = signal<Customer[]>([
    { id: '1', name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '234-567-8901' },
    { id: '3', name: 'Sam Wilson', email: 'sam@example.com', phone: '345-678-9012' },
  ]);

  getOrders() {
    return this.orders;
  }

  getProducts() {
    return this.products;
  }

  getCustomers() {
    return this.customers;
  }
}
