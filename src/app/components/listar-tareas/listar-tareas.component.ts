import { Component } from '@angular/core';
import { Contacto } from 'src/app/models/contactos.model';
import { Tarea } from 'src/app/models/tarea.model';
import { ContactosService } from 'src/app/services/contactos.service';
import { DialogoService } from 'src/app/services/dialogo.service';
import { TareaService } from 'src/app/services/tarea.service';

@Component({
  selector: 'app-listar-tareas',
  templateUrl: './listar-tareas.component.html',
  styleUrls: ['./listar-tareas.component.css']
})
export class ListarTareasComponent{
  listaTareas : Tarea[] = [];
  tareasFiltradas: Tarea[] = [];
  formularioEnEdicion = false;
  listaDeContactos : Contacto[] = []; 
  listaDeContactosFiltrados : Contacto[] = [];

  filtro = {
    titulo: '',
    usuario: ''
  };

  constructor(private readonly tareaService : TareaService,
              private dialogoService: DialogoService,
              private contactosService : ContactosService){
    this.getAllTareas();
    this.cargarContactos();
  }

  getAllTareas(){
    this.tareaService.getAllTareas().subscribe(( resp : Tarea[]) => {
      this.listaTareas = resp;
      this.tareasFiltradas = resp;
    })
  }

  agregarNuevaTarea(){
    this.formularioEnEdicion = !this.formularioEnEdicion;
    this.dialogoService.abrirDialogoNuevaTarea(this.formularioEnEdicion);
    this.getAllTareas();
  }

  filtrarPorTitulo() {
    if(this.filtro.titulo.length > 2){
      this.tareasFiltradas = this.listaTareas.filter(tarea => tarea.name.includes(this.filtro.titulo));
    }else{
      this.tareasFiltradas = [...this.listaTareas];
    }
  }

  filtrarPorContacto(){
    if(this.filtro.usuario){
      this.tareasFiltradas = this.listaTareas.filter(tarea => {
        return tarea.contactName === this.filtro.usuario
      });
    }else{
      this.tareasFiltradas = [...this.listaTareas];
    }
  }

  cargarContactos(){
    this.contactosService.getAllContactos().subscribe(( resp : Contacto[]) => {
      this.listaDeContactos = resp;
    });
  }
}
