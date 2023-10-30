import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contacto } from '../models/contactos.model';
import { GeneralResponse } from '../models/general_response.model';

@Injectable({
  providedIn: 'root'
})
export class ContactosService {
  private readonly url: string = "http://localhost:8080/contact";

  constructor(public http: HttpClient) { 

  }

  getAllContactos(): Observable<Contacto[]>{
    const idString = sessionStorage.getItem('id');
    const idNumber = parseInt(idString!, 10);
    const jwt = sessionStorage.getItem('jwt');
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + jwt);
    return this.http.get<Contacto[]>(`${this.url}/by-user/${idNumber}`, { headers });
  }

  addContacto(contacto : Contacto){
    const idString = sessionStorage.getItem('id');
    const idNumber = parseInt(idString!, 10);
    const jwt = sessionStorage.getItem('jwt');
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + jwt);
    contacto.userId = idNumber;
    return this.http.post<GeneralResponse>(`${this.url}/create`, contacto, { headers });
  }

  deleteContacto(id: number):Observable<any>{
    const jwt = sessionStorage.getItem('jwt');
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + jwt);
    return this.http.delete(`${this.url}/${id}`, { headers });
  }

  actualizarContacto(id: number, contactoActualizado: Contacto): Observable<any> {
    const jwt = sessionStorage.getItem('jwt');
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + jwt);
    const url = `${this.url}/${id}`;
    return this.http.put(url, contactoActualizado, { headers });
  }
}
