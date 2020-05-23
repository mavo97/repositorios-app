import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from '../../../providers/auth.service';
import { ReadDataUService } from '../../../providers/read-data-u.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( public auth: AuthService,
               public data: ReadDataUService ) {
                }

  photoUrl: string;
  tipoUsuario: string;
  alumno: boolean;
  asesor: boolean;

  ngOnInit() {

    this.getToken();
    this.tipoUsuario = localStorage.getItem('provider');

  }

  ngDoCheck(): void {
    this.auth.currentMessage.subscribe( message => {
      if ( message !== 'sinusuario' ) { this.photoUrl = localStorage.getItem('photoURL'); }
      if ( message === 'alumnocompleto') { this.alumno = true; } else if ( message === 'asesorcompleto' ) { this.asesor = true; }
      if ( message === 'sinusuario' ) { this.alumno = false; this.asesor = false; }
    } );
  }

  logOut() {

    this.auth.logout();
    this.photoUrl = '';

  }

  getToken() {
    const data = this.data.getToken();
    data.subscribe( resp => {
      localStorage.setItem('apikey', resp.token);
    });
  }

}
