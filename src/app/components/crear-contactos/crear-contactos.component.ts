import { Component } from '@angular/core';
import { Contacto } from 'src/app/models/contactos.model';
import { GeneralResponse } from 'src/app/models/general_response.model';
import { ContactosService } from 'src/app/services/contactos.service';
import { DialogoService } from 'src/app/services/dialogo.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-crear-contactos',
  templateUrl: './crear-contactos.component.html',
  styleUrls: ['./crear-contactos.component.css']
})
export class CrearContactosComponent {
  contacto : Contacto = new Contacto();
  constructor(private dialogoService: DialogoService,
              private contactoService: ContactosService,
              private readonly sweetAlertService: SweetAlertService,
              ){}

  cerrarDialogo() {
    this.dialogoService.abrirDialogoNuevoContacto(false);
  }

  submitForm() {
    if (this.contacto.email.length > 2) {
      this.contactoService.addContacto(this.contacto).subscribe({
        next: (value: GeneralResponse) => {
          this.dialogoService.abrirDialogoNuevaTarea(false);
        },
        error: (err) => {
          this.sweetAlertService.showErrorAlert('Error al registrar un nuevo contacto', '', () => {});
        }
      });
    }
  }

}
