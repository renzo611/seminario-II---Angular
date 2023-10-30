import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contacto } from '../models/contactos.model';
import { GeneralResponse } from '../models/general_response.model';

@Injectable({
  providedIn: 'root'
})
export class ContactosService {
  private readonly baseUrl: string = "http://localhost:8080/contact";
  private headers!: HttpHeaders;

  constructor(public http: HttpClient) {
    this.setupHeaders();
  }

  private setupHeaders(): void {
    const jwt = sessionStorage.getItem('jwt');
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
  }

  private getIdFromSession(): number {
    const idString = sessionStorage.getItem('id');
    return parseInt(idString || '0', 10);
  }

  getAllContactos(): Observable<Contacto[]> {
    const idNumber = this.getIdFromSession();
    return this.http.get<Contacto[]>(`${this.baseUrl}/by-user/${idNumber}`, { headers: this.headers });
  }

  addContacto(contacto: Contacto): Observable<GeneralResponse> {
    const idNumber = this.getIdFromSession();
    contacto.userId = idNumber;
    return this.http.post<GeneralResponse>(`${this.baseUrl}/create`, contacto, { headers: this.headers });
  }

  deleteContacto(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.headers });
  }

  actualizarContacto(id: number, contactoActualizado: Contacto): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put(url, contactoActualizado, { headers: this.headers });
  }
}
