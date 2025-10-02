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
    { id: '1', name: 'Classic Burger', price: 12, category: 'Food', sales: 150, image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI0QyQjQ4QyIvPjxyZWN0IHk9IjMwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjOEI0NTEzIi8+PHJlY3QgeT0iNTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAiIGZpbGw9IiNGRkQ3MDAiLz48cmVjdCB5PSI3MCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMCIgZmlsbD0iIzIyOEIyMiIvPjwvc3ZnPg==' },
    { id: '2', name: 'Golden Fries', price: 5, category: 'Food', sales: 250, image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI0ZGRDcwMCIvPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjBFNjhDIi8+PHJlY3QgeD0iMzAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iODAiIGZpbGw9IiNGMEU2OEMiLz48cmVjdCB4PSI1MCIgeT0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSI4MCIgZmlsbD0iI0YwRTY4QyIvPjxyZWN0IHg9IjcwIiB5PSIxMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjBFNjhDIi8+PC9zdmc+' },
    { id: '3', name: 'Fizzy Soda', price: 3, category: 'Drinks', sales: 500, image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI0RDMTQzQyIvPjxyZWN0IHk9IjQwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjRkZGRkZGIi8+PC9zdmc+' },
    { id: '4', name: 'Fresh Salad', price: 10, category: 'Food', sales: 75, image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzIyOEIyMiIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEwIiBmaWxsPSIjOTBFRTkwIi8+PGNpcmNsZSBjeD0iNzAiIGN5PSI2MCIgcj0iMTUiIGZpbGw9IiNBREZGMkYiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjQwIiByPSI4IiBmaWxsPSIjRkY2MzQ3Ii8+PC9zdmc+' },
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
