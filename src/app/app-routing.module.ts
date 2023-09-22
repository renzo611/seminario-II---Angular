import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListarContactosComponent } from './components/listar-contactos/listar-contactos.component';
import { ListarTareasComponent } from './components/listar-tareas/listar-tareas.component';


const routes = [
  {
    path: 'contactos', component : ListarContactosComponent
  },
  {
    path: 'tareas' , component: ListarTareasComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
