import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() {}

  public showSuccessful(message: string, title?: string) {
    return this.showWithIcon(message, title, 'success');
  }

  public showWarning(message: string, title?: string) {
    return this.showWithIcon(message, title, 'warning');
  }

  public showError(message: string, title?: string) {
    return this.showWithIcon(message, title, 'error');
  }

  private showWithIcon(message: string, title: string, messageType: SweetAlertIcon) {
    return Swal.fire({
      title: title,
      //text: message,
      html: message,
      icon: messageType,
      showCloseButton: true,
      showConfirmButton: false
    });
  }


  public showConfirmation(message: string, title?: string) {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    });
  }

}
