import { Component } from '@angular/core';
import { Contacto } from 'src/app/models/contactos.model';
import { ContactosService } from 'src/app/services/contactos.service';
import { DialogoService } from 'src/app/services/dialogo.service';

@Component({
  selector: 'app-listar-contactos',
  templateUrl: './listar-contactos.component.html',
  styleUrls: ['./listar-contactos.component.css']
})
export class ListarContactosComponent {

  contactos : Contacto[] = [];
  formularioEnEdicion: boolean = false;

  constructor(private readonly contactosServices : ContactosService,
              private readonly dialogoService : DialogoService){
    this.cargarContactos();

  }

  editarContacto(contacto : Contacto){
    this.formularioEnEdicion = !this.formularioEnEdicion;
    this.dialogoService.abrirDialogoEditarContacto(this.formularioEnEdicion, contacto);
    this.cargarContactos();
  }

  eliminarContacto(id : number){
    this.contactosServices.deleteContacto(id).subscribe(( resp: any) => {
      this.cargarContactos();
    });
  } 

  agregarContacto(){
    this.formularioEnEdicion = !this.formularioEnEdicion;
    this.dialogoService.abrirDialogoNuevoContacto(this.formularioEnEdicion);
    this.cargarContactos();
  }

  cargarContactos(){
    this.contactosServices.getAllContactos().subscribe(( resp : Contacto[]) => {
      this.contactos = resp;
    })
  }


}
