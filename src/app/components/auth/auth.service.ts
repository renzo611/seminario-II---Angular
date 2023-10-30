import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthModel } from 'src/app/models/auth.model';
import { AuthResponse } from 'src/app/models/auth_response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly url: string = "http://localhost:8080/auth";

  constructor(public http: HttpClient) { }

  login(authModel: AuthModel){
    return this.http.post<AuthResponse>(`${this.url}/login`, authModel);
  }

  setCredentials(loginResponse: AuthResponse){
    sessionStorage.setItem('jwt', loginResponse.jwt);
    sessionStorage.setItem('id', loginResponse.userId.toString());
  }

  isLogin(){
    if(sessionStorage.getItem('jwt') && sessionStorage.getItem('id'))
      return true;

    return false;
  }

  cerrarSesion(){
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('id');
  }
}
