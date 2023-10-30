import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralResponse } from 'src/app/models/general_response.model';
import { Usuario } from 'src/app/models/usuario.model';
import { EmailValidatorService } from 'src/app/services/email-validator.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  get emailErrorMsg(): string{
    const error = this.miFormulario.get('email')?.errors;
    if(error?.['required']){
      return 'Email obligatorio'
    }else if(error?.['pattern']){
      return 'El valor ingresado no tiene formato de correo';
    }else if(error?.['emailTomado']){
      return 'El email ya existe';
    }

    return '';
  }
  miFormulario : FormGroup = this.fb.group({
    nombre: ['',[Validators.required, Validators.pattern(this.vs.nombreApellidoPatter)]],
    email: ['',[Validators.required, Validators.pattern(this.vs.emailPattern)],[this.emailValidator]],
    username: ['',[Validators.required]],
    password: ['',[Validators.required, Validators.minLength(6)]],
    password2: ['',[Validators.required]],
  },{
    validators: [ this.vs.camposIguales('password','password2')]
  })

  constructor(private readonly fb: FormBuilder, 
              private readonly vs : ValidatorService, 
              private readonly emailValidator : EmailValidatorService,
              private readonly userService: UsuarioService,
              private readonly sweetAlertService: SweetAlertService,
              private readonly router: Router ){}

  ngOnInit(): void {

  }

  campoNoValido( campo : string){
    return this.miFormulario.get(campo)?.invalid
           && this.miFormulario.get(campo)?.touched;
  }

  submitFormulario(){
    this.userService.guardarUsuario(new Usuario(
      this.miFormulario.get('name')!.value,
      this.miFormulario.get('email')!.value,
      this.miFormulario.get('username')!.value,
      this.miFormulario.get('password')!.value,
    )).subscribe({
      next: (response: GeneralResponse) => {
        this.sweetAlertService.showSuccessAlert('Usuario registrado correctamente',() => {
          this.router.navigate(['/login']);
        });
      },
      error: (err) => {
        this.sweetAlertService.showErrorAlert('Error', 'Hubo un error al intetar registrar al usuario');
      }
    });
  }

  
  
}
