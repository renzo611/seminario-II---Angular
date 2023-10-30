import { Component } from '@angular/core';
import { AuthService } from '../components/auth/auth.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent {
  isLoggin!: boolean;
  constructor(private readonly authService: AuthService) {
    this.isLoggin = authService.isLogin();
  }

}
