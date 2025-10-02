import { Component, inject } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  template: `
    <div class="toast-container">
      @for(toast of toastService.toasts(); track toast.id){
        <div [class]="'toast toast-' + toast.type" @fade>
          <span>{{ toast.message }}</span>
          <button (click)="toastService.remove(toast.id)">&times;</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .toast {
      padding: 15px 20px;
      border-radius: 8px;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-width: 250px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .toast-success { background-color: var(--success); }
    .toast-error { background-color: var(--error); }
    .toast-info { background-color: var(--brand-secondary); }
    .toast button {
      background: none;
      border: none;
      color: white;
      font-size: 1.2rem;
      cursor: pointer;
      margin-left: 20px;
    }
  `]
})
export class ToastComponent {
  toastService = inject(ToastService);
}
