import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListarContactosComponent } from './components/listar-contactos/listar-contactos.component';
import { ListarTareasComponent } from './components/listar-tareas/listar-tareas.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AuthComponent } from './components/auth/auth.component';


const routes = [
  {
    path: 'contactos', component : ListarContactosComponent
  },
  {
    path: 'tareas' , component: ListarTareasComponent
  },
  {
    path: 'registro', component: RegistroComponent
  },
  {
    path: 'login', component : AuthComponent
  },
  {
    path: '**', redirectTo: 'login'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
