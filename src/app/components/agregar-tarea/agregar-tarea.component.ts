import { Component, OnInit } from '@angular/core';
import { Tarea } from 'src/app/models/tarea.model';
import { TareaService } from 'src/app/services/tarea.service';
import { DialogoService } from 'src/app/services/dialogo.service';
import { Contacto } from 'src/app/models/contactos.model';
import { ContactosService } from 'src/app/services/contactos.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { GeneralResponse } from 'src/app/models/general_response.model';

@Component({
  selector: 'app-agregar-tarea',
  templateUrl: './agregar-tarea.component.html',
  styleUrls: ['./agregar-tarea.component.css']
})
export class AgregarTareaComponent implements OnInit {

  tarea: Tarea = new Tarea();
  fechaActual!: string;
  listaDeContactos : Contacto[] = [];

  constructor(private tareaService: TareaService, 
              private dialogoService: DialogoService,
              private contactosService : ContactosService,
              private readonly sweetAlertService: SweetAlertService) {}


  ngOnInit(): void {
    this.tarea.startDate = new Date();
    this.fechaActual = this.tarea.startDate.getDate() + '/' + (this.tarea.startDate.getMonth() + 1) + '/' + this.tarea.startDate.getFullYear();
    this.cargarContactos();
  }

  submitForm() {
    if (this.tarea.name.length > 2) {
      this.tareaService.addTarea(this.tarea).subscribe({
        next: (value: GeneralResponse) => {
          this.dialogoService.abrirDialogoNuevaTarea(false);
          this.sweetAlertService.showSuccessAlert('Tarea creada con existo', () => {});
        },
        error: (err) => {
          this.sweetAlertService.showErrorAlert('Error al registrar una nueva tarea', '', () => {});
        }
      });
    }
  }

  cargarContactos(){
    this.contactosService.getAllContactos().subscribe(( resp : Contacto[]) => {
      this.listaDeContactos = resp;
    });
  }

  cerrarDialogo() {
    this.dialogoService.abrirDialogoNuevaTarea(false);
  }

}
