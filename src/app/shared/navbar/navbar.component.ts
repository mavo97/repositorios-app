import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  photoUrl: string;

  constructor( public auth: AuthService) { }


  ngOnInit() {

    this.photoUrl = localStorage.getItem('photoURL');

  }

  logOut() {

    this.auth.logout();
    this.photoUrl = '';

  }

}
