import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

// Models
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public usuario: User = new User();

  constructor( public afAuth: AngularFireAuth,
               private router: Router  ) {

    this.afAuth.authState.subscribe( ( user: User ) => {
    // console.log( 'Estado del usuario: ', user );

    if (!user) {
    return;
    }

    this.usuario.uid = user.uid;
    this.usuario.displayName = user.displayName;
    this.usuario.photoURL = user.photoURL;
    this.usuario.email = user.email;

    });

    // console.log(this.usuario);
  }

  login( proveedor: string) {
    if ( proveedor === 'google') {

      if ( localStorage.getItem('uid') ) {
        this.router.navigateByUrl('/asesor');
      } else {
        this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
      }

      this.afAuth.authState.subscribe( user => {

        if (user) {
          this.router.navigateByUrl('/asesor');
          this.asignarData();
        }

        }, (err) => {
          console.log('Hubo un error', err);
        } );

    } else {
      
      if ( localStorage.getItem('uid') ) {
        this.router.navigateByUrl('/alumno');
      } else {
        this.afAuth.auth.signInWithPopup(new auth.GithubAuthProvider());
      }

      this.afAuth.authState.subscribe( user => {

        if (user) {
          this.router.navigateByUrl('/alumno');
          this.asignarData();
        }

        }, (err) => {
          console.log('Hubo un error', err);
        });

    }
  }

  asignarData() {
    localStorage.setItem('uid', this.usuario.uid);
    localStorage.setItem('displayName', this.usuario.displayName);
    localStorage.setItem('photoURL', this.usuario.photoURL);
    localStorage.setItem('email', this.usuario.email);
  }

  eliminarData() {
    localStorage.removeItem('uid');
    localStorage.removeItem('displayName');
    localStorage.removeItem('photoURL');
    localStorage.removeItem('email');
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/');
    this.eliminarData();
  }


}
