import { Component } from '@angular/core';
import { Contacto } from 'src/app/models/contactos.model';
import { GeneralResponse } from 'src/app/models/general_response.model';
import { ContactosService } from 'src/app/services/contactos.service';
import { DialogoService } from 'src/app/services/dialogo.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-listar-contactos',
  templateUrl: './listar-contactos.component.html',
  styleUrls: ['./listar-contactos.component.css']
})
export class ListarContactosComponent {

  contactos : Contacto[] = [];
  formularioEnEdicion: boolean = false;

  constructor(private readonly contactosServices : ContactosService,
              private readonly dialogoService : DialogoService,
              private readonly sweetAlertService: SweetAlertService){
    this.cargarContactos();

  }

  editarContacto(contacto : Contacto){
    this.formularioEnEdicion = !this.formularioEnEdicion;
    this.dialogoService.abrirDialogoEditarContacto(this.formularioEnEdicion, contacto);
    this.cargarContactos();
  }

  eliminarContacto(id: number) {
    this.sweetAlertService.showConfirmationAlert(
      'Confirmar eliminación',
      '¿Estás seguro de eliminar este contacto?',
      () => {
        this.contactosServices.deleteContacto(id).subscribe({
          next: (resp: GeneralResponse) => {
            this.cargarContactos();
            this.sweetAlertService.showSuccessAlert('Contacto eliminado correctamente');
          },
          error: (err) => {
            this.sweetAlertService.showErrorAlert('Error al eliminar este contacto', 'Al paracer un hubo un error!');
          }
        });
      }
    );
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
