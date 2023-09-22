import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AgregarTareaComponent } from '../components/agregar-tarea/agregar-tarea.component';
import { CrearContactosComponent } from '../components/crear-contactos/crear-contactos.component';
import { EditarContactoComponent } from '../components/editar-contacto/editar-contacto.component';
import { Contacto } from '../models/contactos.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DialogoService {

  constructor(public dialog: MatDialog,
              private router: Router) { }

  abrirDialogoNuevaTarea(abrir: boolean) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '800px';
    dialogConfig.height = '510px';
    dialogConfig.hasBackdrop = true;
  
    if (abrir) {
      dialogConfig.position = {
        left: '35%',
      };
  
      const dialogRef = this.dialog.open(AgregarTareaComponent, dialogConfig);
  
      dialogRef.afterClosed().subscribe(result => {
        this.router.navigate(['/tareas']);
      });
    } else {
      this.dialog.closeAll();
      this.router.navigate(['/tareas']);
    }
  }

  abrirDialogoNuevoContacto(abrir : boolean){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '800px';
    dialogConfig.height = '510px';
    dialogConfig.hasBackdrop = true;
  
    if (abrir) {
      dialogConfig.position = {
        left: '35%',
      };
  
      const dialogRef = this.dialog.open(CrearContactosComponent, dialogConfig);
  
      dialogRef.afterClosed().subscribe(result => {
        this.router.navigate(['/contactos']);
      });
    } else {
      this.dialog.closeAll();
      this.router.navigate(['/contactos']);
    }
  }

  abrirDialogoEditarContacto(abrir : boolean, contacto : Contacto){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '800px';
    dialogConfig.height = '510px';
    dialogConfig.hasBackdrop = true;
  
    if (abrir) {
      dialogConfig.position = {
        left: '35%',
      };
  
      dialogConfig.data = { contacto: contacto };
      const dialogRef = this.dialog.open(EditarContactoComponent, dialogConfig);
  
      dialogRef.afterClosed().subscribe(result => {
        this.router.navigate(['/contactos']);
      });
    } else {
      this.dialog.closeAll();
      this.router.navigate(['/contactos']);
    }
  }
  
}