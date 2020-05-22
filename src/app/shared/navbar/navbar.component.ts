import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../providers/auth.service';
import { ReadDataUService } from '../../providers/read-data-u.service';


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

  ngOnInit() {

    this.photoUrl = localStorage.getItem('photoURL');
    this.getToken();

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
