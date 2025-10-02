import { Injectable, signal } from '@angular/core';
import { Toast } from '../models/toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts = signal<Toast[]>([]);

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    const newToast: Toast = {
      id: Date.now(),
      message,
      type
    };
    this.toasts.update(currentToasts => [...currentToasts, newToast]);
    setTimeout(() => this.remove(newToast.id), 5000);
  }

  remove(id: number) {
    this.toasts.update(currentToasts => currentToasts.filter(toast => toast.id !== id));
  }
}
