import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarea } from '../models/tarea.model';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private readonly url: string = "http://localhost:4000/tareas";

  constructor(public http: HttpClient) { }

  getAllTareas( ):Observable<Tarea[]>{
    console.log(this.http.get<Tarea[]>(this.url));
    return this.http.get<Tarea[]>(this.url);
  }

  addTarea(tarea: Tarea):Observable<any>{
    return this.http.post(this.url,tarea);
  }
}
