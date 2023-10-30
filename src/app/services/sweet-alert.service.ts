import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  showErrorAlert(title: string, reason: string, onCancel?: () => void) {
    Swal.fire({
      title: title,
      text: reason,
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancelar',
      heightAuto: false,
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        if (onCancel && typeof onCancel === 'function') {
          onCancel();
        }
      }
    });
  }

  showSuccessAlert(title: string, onConfirm?: () => void) {
    Swal.fire({
      title: title,
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
      heightAuto: false,
    }).then((result) => {
      if (result.isConfirmed) {
        if (onConfirm && typeof onConfirm === 'function') {
          onConfirm();
        }
      }
    });
  }

  showConfirmationAlert(
    title: string,
    reason: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) {
    Swal.fire({
      title: title,
      text: reason,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      heightAuto: false,
    }).then((result) => {
      if (result.isConfirmed) {
        if (onConfirm && typeof onConfirm === 'function') {
          onConfirm();
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        if (onCancel && typeof onCancel === 'function') {
          onCancel();
        }
      }
    });
  }
}
