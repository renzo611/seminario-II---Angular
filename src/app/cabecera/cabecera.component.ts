import { Component } from '@angular/core';
import { AuthService } from '../components/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent {
  isLoggin!: boolean;
  constructor(private readonly authService: AuthService,
              private readonly router: Router) {
    this.isLoggin = authService.isLogin();
  }

  cerrarSesion(){
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
    window.location.reload();
  }
}
