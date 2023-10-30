import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthModel } from 'src/app/models/auth.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from './auth.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { AuthResponse } from 'src/app/models/auth_response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  formularioInicioSesion: FormGroup;

  constructor(private fb: FormBuilder,
              private readonly authService: AuthService,
              private readonly sweetAlertService: SweetAlertService,
              private router: Router,) {

    this.formularioInicioSesion = this.fb.group({
      email: ['test@gmail.com', [Validators.required, Validators.email]],
      password: ['1234@gai', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  submitFormulario(): void {
    if (this.formularioInicioSesion.valid) {
      const email = this.formularioInicioSesion.value.email;
      const password = this.formularioInicioSesion.value.password;
      
      this.authService.login(new AuthModel(email, password)).subscribe({
        next: (value: AuthResponse) => {
          this.authService.setCredentials(value);
          this.router.navigate(['/contactos']);
          window.location.reload();
        },
        error: (err) => {
          if (err.error.code === 403) {
            this.sweetAlertService.showErrorAlert('Error al iniciar sesión', 'Credenciales incorrectas', () => {});
          } else {
            this.sweetAlertService.showErrorAlert('Error al iniciar sesión', 'Error interno. Inténtelo más tarde', () => {});
          }
        }
      });
    }
  }
  
}
