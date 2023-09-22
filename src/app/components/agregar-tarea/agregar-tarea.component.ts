import { Component, OnInit } from '@angular/core';
import { Tarea } from 'src/app/models/tarea.model';
import { TareaService } from 'src/app/services/tarea.service';
import { DialogoService } from 'src/app/services/dialogo.service';
import { Contacto } from 'src/app/models/contactos.model';
import { ContactosService } from 'src/app/services/contactos.service';

@Component({
  selector: 'app-agregar-tarea',
  templateUrl: './agregar-tarea.component.html',
  styleUrls: ['./agregar-tarea.component.css']
})
export class AgregarTareaComponent implements OnInit {

  tarea: Tarea = new Tarea();
  tareas: Tarea[] = [];
  fechaActual!: string;
  listaDeContactos : Contacto[] = [];

  constructor(private tareaService: TareaService, 
              private dialogoService: DialogoService,
              private contactosService : ContactosService) {}


  ngOnInit(): void {
    this.tarea.fechaInicio = new Date();
    this.fechaActual = this.tarea.fechaInicio.getDate() + '/' + (this.tarea.fechaInicio.getMonth() + 1) + '/' + this.tarea.fechaInicio.getFullYear();
    this.cargarContactos();
  }

  submitForm() {
    console.log(this.tarea);
    if (this.tarea.titulo.length > 2) {
      this.tareaService.addTarea(this.tarea).subscribe(() => {
        this.dialogoService.abrirDialogoNuevaTarea(false);
      });
    } else {

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
