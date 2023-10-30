import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarea } from '../models/tarea.model';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private readonly url: string = "http://localhost:8080/task";

  constructor(public http: HttpClient) { }

  getAllTareas():Observable<Tarea[]>{
    const idString = sessionStorage.getItem('id');
    const idNumber = parseInt(idString!, 10);
    const jwt = sessionStorage.getItem('jwt');
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + jwt);
    return this.http.get<Tarea[]>(`${this.url}/by-user/${idNumber}`, { headers });
  }

  addTarea(tarea: Tarea):Observable<any>{
    const idString = sessionStorage.getItem('id');
    const idNumber = parseInt(idString!, 10);
    const jwt = sessionStorage.getItem('jwt');
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + jwt);
    tarea.userId = idNumber
    return this.http.post(`${this.url}/create`,tarea, { headers });
  }
}
