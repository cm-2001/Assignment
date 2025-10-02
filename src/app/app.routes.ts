import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'dashboard',
                loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
                data: { title: 'Dashboard' }
            },
            {
                path: 'products',
                loadComponent: () => import('./features/products/products.component').then(m => m.ProductsComponent),
                data: { title: 'Products' }
            },
            {
                path: 'orders',
                loadComponent: () => import('./features/orders/orders.component').then(m => m.OrdersComponent),
                data: { title: 'Orders' }
            },
            {
                path: 'customers',
                loadComponent: () => import('./features/customers/customers.component').then(m => m.CustomersComponent),
                data: { title: 'Customers' }
            },
            {
                path: 'billing',
                loadComponent: () => import('./features/billing/billing.component').then(m => m.BillingComponent),
                data: { title: 'Billing' }
            },
            {
                path: 'settings',
                loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent),
                data: { title: 'Settings' }
            },
        ]
    }
];