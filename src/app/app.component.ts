import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/toast/toast.component';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet />
    <app-toast />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, ToastComponent]
})
export class AppComponent {}
