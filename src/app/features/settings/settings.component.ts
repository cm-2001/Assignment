import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-settings',
  template: `
    <div class="settings-container">
      <h2>Settings</h2>
      <form (submit)="saveSettings()">
        <div class="form-group">
          <label for="restaurantName">Restaurant Name</label>
          <input id="restaurantName" type="text" [value]="restaurantName()" (input)="restaurantName.set($event.target.value)">
        </div>
        <div class="form-group">
          <label for="address">Address</label>
          <input id="address" type="text" [value]="address()" (input)="address.set($event.target.value)">
        </div>
        <div class="form-group">
          <label for="phone">Phone</label>
          <input id="phone" type="text" [value]="phone()" (input)="phone.set($event.target.value)">
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  `,
  styles: [`
    .settings-container {
      padding: 20px;
    }
    .form-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
    }
    input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      padding: 10px 15px;
      background-color: #333;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  restaurantName = signal('The Angular Restaurant');
  address = signal('123 Angular Ave');
  phone = signal('555-555-5555');

  saveSettings() {
    // In a real application, you would save these settings to a backend service.
    console.log('Settings saved:', {
      restaurantName: this.restaurantName(),
      address: this.address(),
      phone: this.phone(),
    });
  }
}
