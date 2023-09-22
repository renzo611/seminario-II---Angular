import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  formularioInicioSesion: FormGroup;

  constructor(private fb: FormBuilder,
              private usuarioService : UsuarioService) {
    this.formularioInicioSesion = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  submitFormulario(): void {
    if (this.formularioInicioSesion.valid) {
      const email = this.formularioInicioSesion.value.email;
      const password = this.formularioInicioSesion.value.password;
      this.usuarioService.getUser(email).subscribe((userResponse) => {
        if(userResponse && userResponse.password === password){
          Swal.fire("Confirmacion", "Inicio de sesion exitoso", "success");
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error de inicio de sesión',
            text: 'Credenciales incorrectas. Por favor, inténtalo de nuevo.',
          });
        }
      })
    }
  }
}
