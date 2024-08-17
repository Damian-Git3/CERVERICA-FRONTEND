import { inject, Injectable } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AlertasService {
  _MessageService = inject(MessageService);
  _ConfirmationService = inject(ConfirmationService);

  showSuccess(message: string, summary?: string) {
    this._MessageService.add({
      severity: 'success',
      summary: summary ?? 'Éxito',
      detail: message,
    });
  }

  showError(message: string, summary?: string) {
    this._MessageService.add({
      severity: 'error',
      summary: summary ?? 'Error',
      detail: message,
    });
  }

  showInfo(message: string, summary?: string) {
    this._MessageService.add({
      severity: 'info',
      summary: summary ?? 'Información',
      detail: message,
    });
  }

  showWarn(message: string, summary?: string) {
    this._MessageService.add({
      severity: 'warn',
      summary: summary ?? 'Advertencia',
      detail: message,
    });
  }

  showCustom(message: string, severity: string, summary: string) {
    this._MessageService.add({
      severity,
      summary,
      detail: message,
    });
  }

  clear() {
    this._MessageService.clear();
  }

  confirmarEliminacion(event: Event): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this._ConfirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Estas seguro de eliminar este registro?',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-sm',
        acceptLabel: 'Sí',
        rejectLabel: 'No',
        accept: () => {
          resolve(true);
        },
        reject: () => {
          resolve(false);
        },
      });
    });
  }
}
