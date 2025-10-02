import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-settings',
  template: `
    <div class="page-card">
      <div class="card-header">
        <h2 class="card-title">Settings</h2>
      </div>
      <form (submit)="saveSettings()">
        <div class="settings-section">
          <h3 class="section-title">Restaurant Profile</h3>
          <div class="form-grid">
            <div class="form-group">
              <label for="restaurantName">Restaurant Name</label>
              <input id="restaurantName" type="text" class="form-input" [value]="restaurantName()" (input)="restaurantName.set($event.target.value)">
            </div>
            <div class="form-group">
              <label for="address">Address</label>
              <input id="address" type="text" class="form-input" [value]="address()" (input)="address.set($event.target.value)">
            </div>
            <div class="form-group">
              <label for="phone">Phone</label>
              <input id="phone" type="text" class="form-input" [value]="phone()" (input)="phone.set($event.target.value)">
            </div>
          </div>
        </div>
        <div class="settings-section">
          <h3 class="section-title">Notification Settings</h3>
          <div class="form-group-inline">
            <label for="emailNotifications">Enable Email Notifications</label>
            <label class="toggle-switch">
              <input id="emailNotifications" type="checkbox" [checked]="emailNotifications()" (change)="emailNotifications.set($event.target.checked)">
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
        <div class="form-actions">
          <button type="submit" class="save-btn">Save Changes</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .page-card {
        background-color: var(--background-card);
        border-radius: var(--rounded-lg);
        box-shadow: var(--shadow-sm);
        padding: var(--space-lg);
        max-width: 800px;
        margin: 0 auto;
    }
    .card-header {
        margin-bottom: var(--space-lg);
        padding-bottom: var(--space-lg);
        border-bottom: 1px solid var(--border-color);
    }
    .card-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0;
    }
    .settings-section {
      margin-bottom: var(--space-xl);
    }
    .section-title {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: var(--space-lg);
      color: var(--text-primary);
    }
    .form-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-lg);
    }
    @media (min-width: 640px) {
      .form-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    .form-group {
      display: flex;
      flex-direction: column;
    }
    .form-group-inline {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-md) 0;
    }
    label {
      font-weight: 500;
      margin-bottom: var(--space-sm);
      color: var(--text-secondary);
    }
    .form-input {
      font-family: var(--font-body);
      padding: var(--space-sm) var(--space-md);
      border-radius: var(--rounded-md);
      border: 1px solid var(--border-color);
      background-color: var(--background-main);
      width: 100%;
      box-sizing: border-box;
    }
    .form-actions {
      margin-top: var(--space-xl);
      padding-top: var(--space-lg);
      border-top: 1px solid var(--border-color);
      display: flex;
      justify-content: flex-end;
    }
    .save-btn {
      background-color: var(--brand-primary);
      color: var(--text-light);
      border: none;
      padding: var(--space-md) var(--space-xl);
      border-radius: var(--rounded-md);
      cursor: pointer;
      font-weight: 600;
      transition: all var(--transition-fast);
    }
    .save-btn:hover {
      opacity: .9;
    }

    /* Toggle Switch */
    .toggle-switch {
      position: relative;
      display: inline-block;
      width: 50px;
      height: 28px;
    }
    .toggle-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .toggle-slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--background-main);
      border: 1px solid var(--border-color);
      transition: .4s;
      border-radius: 34px;
    }
    .toggle-slider:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 3px;
      bottom: 3px;
      background-color: var(--text-secondary);
      transition: .4s;
      border-radius: 50%;
    }
    input:checked + .toggle-slider {
      background-color: var(--brand-primary);
      border-color: var(--brand-primary);
    }
    input:checked + .toggle-slider:before {
      transform: translateX(22px);
      background-color: white;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  restaurantName = signal('The Angular Restaurant');
  address = signal('123 Angular Ave');
  phone = signal('555-555-5555');
  emailNotifications = signal(true);

  saveSettings() {
    // In a real application, you would save these settings to a backend service.
    console.log('Settings saved:', {
      restaurantName: this.restaurantName(),
      address: this.address(),
      phone: this.phone(),
      emailNotifications: this.emailNotifications(),
    });
  }
}
