import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { UsuarioService } from './usuario.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator{

  constructor(private readonly usuarioService : UsuarioService) { }

  validate(control: AbstractControl<any, any>): Observable<ValidationErrors | null> {
      const email = control.value;
      return this.usuarioService.existeUsuario(email);
  }
}
