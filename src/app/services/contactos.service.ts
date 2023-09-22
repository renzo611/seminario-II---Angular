import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contacto } from '../models/contactos.model';

@Injectable({
  providedIn: 'root'
})
export class ContactosService {
  private readonly url: string = "http://localhost:3001/contactos";

  constructor(public http: HttpClient) { 

  }

  getAllContactos(): Observable<Contacto[]>{
    return this.http.get<Contacto[]>(this.url);
  }

  addContacto(contacto : Contacto){
    return this.http.post(this.url, contacto);
  }

  deleteContacto(id: number):Observable<any>{
    return this.http.delete(this.url + "/"  + id);
  }

  actualizarContacto(id: number, contactoActualizado: Contacto): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.put(url, contactoActualizado);
  }
}
