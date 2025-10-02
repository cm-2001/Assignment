import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { MockDataService } from '../../core/services/mock-data.service';
import { Customer } from '../../core/models/customer.model';

@Component({
  selector: 'app-customers',
  template: `
    <div class="page-card">
      <div class="card-header">
        <h2 class="card-title">Customers</h2>
        <div class="header-actions">
          <input type="text" class="search-input" placeholder="Search customers..." [value]="searchTerm()" (input)="searchTerm.set($event.target.value)"/>
        </div>
      </div>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            @for(customer of filteredCustomers(); track customer.id){
              <tr>
                <td>{{ customer.name }}</td>
                <td>{{ customer.email }}</td>
                <td>{{ customer.phone }}</td>
                <td>
                  <button class="action-btn edit-btn">Edit</button>
                  <button class="action-btn delete-btn">Delete</button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .page-card {
        background-color: var(--background-card);
        border-radius: var(--rounded-lg);
        box-shadow: var(--shadow-sm);
        padding: var(--space-lg);
    }
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-lg);
        padding-bottom: var(--space-lg);
        border-bottom: 1px solid var(--border-color);
    }
    .card-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0;
    }
    .header-actions {
        display: flex;
        gap: var(--space-md);
    }
    .search-input {
        font-family: var(--font-body);
        padding: var(--space-sm) var(--space-md);
        border-radius: var(--rounded-md);
        border: 1px solid var(--border-color);
        background-color: var(--background-main);
        min-width: 250px;
    }
    .table-container {
        overflow-x: auto;
    }
    .data-table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
    }
    .data-table th, .data-table td {
        padding: var(--space-md);
        vertical-align: middle;
    }
    .data-table thead {
        background-color: var(--background-main);
    }
    .data-table th {
        font-weight: 600;
        color: var(--text-secondary);
        text-transform: uppercase;
        font-size: .8rem;
        border-bottom: 1px solid var(--border-color);
    }
    .data-table tbody tr {
        border-bottom: 1px solid var(--border-color);
    }
    .data-table tbody tr:last-child { border: none; }
    .action-btn {
        border: none;
        padding: var(--space-sm) var(--space-md);
        border-radius: var(--rounded-md);
        cursor: pointer;
        transition: all var(--transition-fast);
        margin-right: var(--space-sm);
    }
    .action-btn:hover { opacity: .8; }
    .edit-btn {
        background-color: var(--brand-primary);
        color: var(--text-light);
    }
    .delete-btn {
        background-color: var(--error);
        color: var(--text-light);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomersComponent {
  private dataService = inject(MockDataService);
  private customers = this.dataService.getCustomers();

  searchTerm = signal('');

  filteredCustomers = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.customers().filter((customer: Customer) => customer.name.toLowerCase().includes(term) || customer.email.toLowerCase().includes(term));
  });
}
