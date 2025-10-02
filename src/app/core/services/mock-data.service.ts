import { Injectable, signal } from '@angular/core';
import { Order } from '../../core/models/order.model';
import { Product } from '../../core/models/product.model';
import { Customer } from '../../core/models/customer.model';

// Helper function to generate a date within the last 30 days
const रीसेंटDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30));
  return date;
};

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private orders = signal<Order[]>([
    { id: '1', customerName: 'Chris Evans', total: 58, status: 'completed', date: रीसेंटDate() },
    { id: '2', customerName: 'Scarlett Johansson', total: 81, status: 'pending', date: रीसेंटDate() },
    { id: '3', customerName: 'Robert Downey Jr.', total: 132, status: 'completed', date: रीसेंटDate() },
    { id: '4', customerName: 'Tom Holland', total: 34, status: 'cancelled', date: रीसेंटDate() },
    { id: '5', customerName: 'Zendaya', total: 95, status: 'completed', date: रीसेंटDate() },
    { id: '6', customerName: 'Mark Ruffalo', total: 62, status: 'pending', date: रीसेंटDate() },
  ]);

  private products = signal<Product[]>([
    {
      id: '1',
      name: 'Gourmet Angus Burger',
      price: 15.99,
      category: 'Main Course',
      sales: 180,
      image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiM2NjMiIHN0cm9rZS13aWR0aD0iMyI+PHBhdGggZD0iTTIwIDcwaDYwYTEwIDEwIDAgMCAwIDAtMjBoLTYwYTEwIDEwIDAgMCAwIDAgMjB6Ii8+PHBhdGggZD0iTTMwIDYwaDQwIi8+PHBhdGggZD0iTTMwIDUwYzEwLTcgMzAtNyA0MCAwIi8+PHBhdGggZD0iTTMwIDM1aDQwIi8+PHBhdGggZD0iTTIwIDMwaDYwYTEwIDEwIDAgMCAxIDAgMjBoLTYwYTEwIDEwIDAgMCAxIDAtMjB6Ii8+PC9nPjwvc3ZnPg==',
      description: 'A juicy, handcrafted Angus beef patty with fresh lettuce, tomatoes, and our secret sauce.'
    },
    {
      id: '2',
      name: 'Crispy Golden Fries',
      price: 6.99,
      category: 'Side Dish',
      sales: 320,
      image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiM2NjMiIHN0cm9rZS13aWR0aD0iMyI+PHBhdGggZD0iTTMwIDgwaDQwbC01LTUwaC0zMGwtNSA1MHoiLz48cGF0aCBkPSJNNCAyMGw1IDYwbDIwLTEweiIvPjxwYXRoIGQ9Ik0zNSA0MGwxMCA0MCIvPjxwYXRoIGQ9Ik01MCAzMGwxMCA1MCIvPjxwYXRoIGQ9Ik02NSA0MGwxMCA0MCIvPjxwYXRoIGQ9Ik04MCAyMGwtMjAgNDBsNSAyMHoiLz48L2c+PC9zdmc+',
      description: 'Perfectly seasoned, crispy golden fries, cooked to perfection. The perfect side for any meal.'
    },
    {
      id: '3',
      name: 'Artisanal Fizzy Soda',
      price: 4.50,
      category: 'Beverage',
      sales: 550,
      image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiM2NjMiIHN0cm9rZS13aWR0aD0iMyI+PHBhdGggZD0iTTQwIDIwaDIwbDEwIDYwaC00MGwxMC02MHoiLz48cGF0aCBkPSJNMzAgMjBoNDAiLz48L2c+PC9zdmc+',
      description: 'A refreshing, bubbly soda made with natural flavors and real cane sugar.'
    },
    {
      id: '4',
      name: 'Organic Garden Salad',
      price: 12.50,
      category: 'Salad',
      sales: 95,
      image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiM2NjMiIHN0cm9rZS13aWR0aD0iMyI+PHBhdGggZD0iTTIwIDgwYy0xMC0yMCg3MC0yMCA2MCAwaC02MHoiLz48cGF0aCBkPSJNNjAgODBMMzAgNDBjLTE1IDE1LTIwIDM1IDAgNDBjMjAgNSAyNSA1IDMwIDB6Ii8+PHBhdGggZD0iTTcwIDgwYzEwLTIwLTEwLTQwLTI1LTQwIi8+PC9nPjwvc3ZnPg==',
      description: 'A fresh mix of organic greens, cherry tomatoes, cucumbers, and a light vinaigrette dressing.'
    }
  ]);

  private customers = signal<Customer[]>([
    { id: '1', name: 'Chris Evans', email: 'cevans@marvel.com', phone: '111-222-3333' },
    { id: '2', name: 'Scarlett Johansson', email: 'sjohansson@marvel.com', phone: '444-555-6666' },
    { id: '3', 'name': 'Robert Downey Jr.', email: 'rdj@marvel.com', phone: '777-888-9999' },
    { id: '4', name: 'Tom Holland', email: 'tholland@marvel.com', phone: '123-456-7890' },
    { id: '5', name: 'Zendaya', email: 'zendaya@marvel.com', phone: '987-654-3210' },
    { id: '6', name: 'Mark Ruffalo', email: 'mruffalo@marvel.com', phone: '555-123-4567' }
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
