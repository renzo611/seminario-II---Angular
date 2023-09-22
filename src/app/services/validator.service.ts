import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  public nombreApellidoPatter : string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern : string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor() { }

  camposIguales( campo1: string, campo2: string){
    return ( fg : AbstractControl): ValidationErrors | null => {

      const pass1 = fg.get(campo1)?.value;
      const pass2 = fg.get(campo2)?.value;

      if(pass1 !== pass2){
        fg.get(campo2)?.setErrors({noIguales:true});
        return {noIguales: true}
      }

      fg.get(campo2)?.setErrors(null);
      return null;
    }
  }
}
