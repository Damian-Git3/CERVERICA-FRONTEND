import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AlertasService {
  constructor(private messageService: MessageService) {}

  showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Correcto',
      detail: message,
    });
  }

  alertaSuccess(resumen: string, mensaje: string) {
    this.messageService.add({
      severity: 'success',
      summary: resumen,
      detail: mensaje,
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
