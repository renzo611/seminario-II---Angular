import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contacto } from 'src/app/models/contactos.model';
import { GeneralResponse } from 'src/app/models/general_response.model';
import { ContactosService } from 'src/app/services/contactos.service';
import { DialogoService } from 'src/app/services/dialogo.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-editar-contacto',
  templateUrl: './editar-contacto.component.html',
  styleUrls: ['./editar-contacto.component.css']
})
export class EditarContactoComponent {
  contacto : Contacto = new Contacto();

  constructor(
    private readonly dialogoService : DialogoService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly contactoService : ContactosService,
    private readonly sweetAlertService: SweetAlertService,
  ){
    this.contacto = data.contacto;
  }

  cerrarDialogo() {
    this.dialogoService.abrirDialogoEditarContacto(false, new Contacto());
  }

  submitForm() {
    if (this.contacto.email.length > 2) {
      this.sweetAlertService.showConfirmationAlert(
        'Confirmar actualización',
        '¿Estás seguro de actualizar este contacto?',
        () => {
          this.contactoService.actualizarContacto(this.contacto.id, this.contacto).subscribe({
            next: (resp : GeneralResponse) => {
              this.dialogoService.abrirDialogoNuevaTarea(false);
            },
            error: (err) => {
              this.sweetAlertService.showErrorAlert('Error al actualizar el contacto', 'Hubo un error al actualizar el contacto' );
            }
          });
        },
      );
    }
  }
  
}
