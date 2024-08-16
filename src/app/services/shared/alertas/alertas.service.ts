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

  showError(message: string, summary?: string) {
    this.messageService.add({
      severity: 'error',
      summary: summary ?? 'Error',
      detail: message,
    });
  }

  showInfo(message: string, summary?: string) {
    this.messageService.add({
      severity: 'info',
      summary: summary ?? 'Información',
      detail: message,
    });
  }

  showWarn(message: string, summary?: string) {
    this.messageService.add({
      severity: 'warn',
      summary: summary ?? 'Advertencia',
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
