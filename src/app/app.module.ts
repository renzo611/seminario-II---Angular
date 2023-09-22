import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { ListarContactosComponent } from './components/listar-contactos/listar-contactos.component';
import { CrearContactosComponent } from './components/crear-contactos/crear-contactos.component';
import { HttpClientModule } from '@angular/common/http';
import { ListarTareasComponent } from './components/listar-tareas/listar-tareas.component';
import { AgregarTareaComponent } from './components/agregar-tarea/agregar-tarea.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { EditarContactoComponent } from './components/editar-contacto/editar-contacto.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AuthComponent } from './components/auth/auth.component';


@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    ListarContactosComponent,
    CrearContactosComponent,
    ListarTareasComponent,
    AgregarTareaComponent,
    EditarContactoComponent,
    RegistroComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
