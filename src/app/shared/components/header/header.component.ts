import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header class="header">
      <h1>Restaurant POS</h1>
    </header>
  `,
  styles: [`
    .header {
      padding: 20px;
      background-color: #fff;
      border-bottom: 1px solid #ddd;
    }
    h1 {
      margin: 0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
