import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/services/email-validator.service';
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

  constructor(private fb: FormBuilder, private vs : ValidatorService, private emailValidator : EmailValidatorService ){}

  ngOnInit(): void {

  }

  campoNoValido( campo : string){
    return this.miFormulario.get(campo)?.invalid
           && this.miFormulario.get(campo)?.touched;
  }

  submitFormulario(){
    this.miFormulario.markAllAsTouched();
  }

  
}
