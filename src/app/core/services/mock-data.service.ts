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
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQG1xItIGKAEOZ3ww3qOWlHFKmWHmI3eZMnQ&s',
      description: 'A juicy, handcrafted Angus beef patty with fresh lettuce, tomatoes, and our secret sauce.'
    },
    {
      id: '2',
      name: 'Crispy Golden Fries',
      price: 6.99,
      category: 'Side Dish',
      sales: 320,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1lO_JzluHozmMKaIFpxdCSo-O5SX13x2ZMA&s',
      description: 'Perfectly seasoned, crispy golden fries, cooked to perfection. The perfect side for any meal.'
    },
    {
      id: '3',
      name: 'Artisanal Fizzy Soda',
      price: 4.50,
      category: 'Beverage',
      sales: 550,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZoebPfGhunpAJxD0aeKVqZ-vfpnBTv-vTBQ&s',
      description: 'A refreshing, bubbly soda made with natural flavors and real cane sugar.'
    },
    {
      id: '4',
      name: 'Organic Garden Salad',
      price: 12.50,
      category: 'Salad',
      sales: 95,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcXVQQDgaxZPH6YK6Kad4xnLf_RtKGV33KPg&s',
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
