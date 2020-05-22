import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( public auth: AuthService ) { }

  ngOnInit() {
  }

  ingresar( proveedor: string ) {
    // console.log(proveedor);
    this.auth.login(proveedor);
    if ( proveedor === 'google' ) {
      localStorage.setItem('provider', 'asesor');
    } else {
      localStorage.setItem('provider', 'alumno');
    }

  }

}
