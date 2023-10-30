import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarea } from '../models/tarea.model';
import { GeneralResponse } from '../models/general_response.model';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private readonly baseUrl: string = "http://localhost:8080/task";
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

  getAllTareas(): Observable<Tarea[]> {
    const idNumber = this.getIdFromSession();
    return this.http.get<Tarea[]>(`${this.baseUrl}/by-user/${idNumber}`, { headers: this.headers });
  }

  addTarea(tarea: Tarea): Observable<any> {
    const idNumber = this.getIdFromSession();
    tarea.userId = idNumber;
    return this.http.post(`${this.baseUrl}/create`, tarea, { headers: this.headers });
  }

  eliminarTarea(id: number): Observable<GeneralResponse> {
    return this.http.delete<GeneralResponse>(`${this.baseUrl}/${id}`, { headers: this.headers });
  }
}
