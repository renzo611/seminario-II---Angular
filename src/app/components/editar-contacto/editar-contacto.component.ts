import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contacto } from 'src/app/models/contactos.model';
import { ContactosService } from 'src/app/services/contactos.service';
import { DialogoService } from 'src/app/services/dialogo.service';

@Component({
  selector: 'app-editar-contacto',
  templateUrl: './editar-contacto.component.html',
  styleUrls: ['./editar-contacto.component.css']
})
export class EditarContactoComponent {
  contacto : Contacto = new Contacto();

  constructor(
    private dialogoService : DialogoService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private contactoService : ContactosService
  ){
    this.contacto = data.contacto;
  }

  cerrarDialogo() {
    this.dialogoService.abrirDialogoEditarContacto(false, new Contacto());
  }

  submitForm(){
    if (this.contacto.email.length > 2) {
      this.contactoService.actualizarContacto(this.contacto.id,this.contacto).subscribe(() => {
        this.dialogoService.abrirDialogoEditarContacto(false, new Contacto());
      });
    } else {

    }
  }
}
