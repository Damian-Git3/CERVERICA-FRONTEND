import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AlertasService {
  constructor(private messageService: MessageService) {}

  showSuccess(message: string, summary?: string) {
    this.messageService.add({
      severity: 'success',
      summary: summary ?? 'Éxito',
      detail: message,
    });
  }

  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

  showInfo(message: string) {
    this.messageService.add({
      severity: 'info',
      summary: 'Información',
      detail: message,
    });
  }

  showWarn(message: string) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Advertencia',
      detail: message,
    });
  }

  showCustom(message: string, severity: string, summary: string) {
    this.messageService.add({
      severity,
      summary,
      detail: message,
    });
  }

  clear() {
    this.messageService.clear();
  }
}
