import { Component } from '@angular/core';
import { Contacto } from 'src/app/models/contactos.model';
import { ContactosService } from 'src/app/services/contactos.service';
import { DialogoService } from 'src/app/services/dialogo.service';

@Component({
  selector: 'app-crear-contactos',
  templateUrl: './crear-contactos.component.html',
  styleUrls: ['./crear-contactos.component.css']
})
export class CrearContactosComponent {
  contacto : Contacto = new Contacto();
  constructor(private dialogoService: DialogoService,
              private contactoService: ContactosService){}

  cerrarDialogo() {
    this.dialogoService.abrirDialogoNuevoContacto(false);
  }

  submitForm() {
    if (this.contacto.email.length > 2) {
      this.contactoService.addContacto(this.contacto).subscribe(() => {
        this.dialogoService.abrirDialogoNuevaTarea(false);
      });
    } else {

    }
  }

}
