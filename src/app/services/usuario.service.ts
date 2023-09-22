import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly url: string = "http://localhost:3003/usuarios";

  constructor(public http: HttpClient) { }

  existeUsuario(email : string){
    return this.http.get<Usuario[]>(`${this.url}?email=${email}`)
    .pipe(
      map( resp => {
        return  (resp.length === 0) ? null : {emailTomado: true}
      })
     );
  }

  guardarUsuario(usuario : Usuario){
    return this.http.post(this.url,usuario);
  }

  getUser(email : string){
    return this.http.get<Usuario>(`${this.url}?email=${email}`);
  }
}
