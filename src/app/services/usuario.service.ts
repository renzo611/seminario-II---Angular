import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { map } from 'rxjs';
import { GeneralResponse } from '../models/general_response.model';
import { ExistUser } from '../models/exist_user_response';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly url: string = "http://localhost:8080/user";

  constructor(public http: HttpClient) { }

  existeUsuario(email : string){
    return this.http.get<ExistUser>(`${this.url}/exist/${email}`)
  }

  guardarUsuario(usuario : Usuario){
    return this.http.post<GeneralResponse>(`${this.url}/register`,usuario);
  }
}
