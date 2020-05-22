import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

// Services
import { ValidarCrearService } from './validar-crear.service';

// Models
import { User } from '../models/user';
import { Asesor } from '../models/asesor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public usuario: User = new User();

  constructor( public afAuth: AngularFireAuth,
               private router: Router,
               private buscar: ValidarCrearService  ) {

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

    // Asesor
    if ( proveedor === 'google') {

      const id = {
        uid: localStorage.getItem('uid')
      };
      const idF = JSON.stringify(id);

      if ( id.uid !== null ) {

        this.buscar.validarAsesor(idF).subscribe(

          (resp) => {

            if ( resp.message === 'Cuenta de correo no se encuentra registrada.' ) {
              // console.log('Se debe registrar al alumno');
              this.logout();
            } else {
              // console.log('No se debe registrar al alumno');
              this.router.navigateByUrl('/asesor');
          }

           }

        );

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
      // Alumno

      const id = {
        uid: localStorage.getItem('uid')
      };
      const idF = JSON.stringify(id);

      if ( id.uid !== null ) {

        this.buscar.validarAlumno(idF).subscribe(

          (resp) => {

            if ( resp.message === 'Cuenta de correo no se encuentra registrada.' ) {
              // console.log('Se debe registrar al alumno');
              this.logout();
            } else {
              // console.log('No se debe registrar al alumno');
              this.router.navigateByUrl('/alumno');
          }

           }

        );

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
    localStorage.setItem('photoURL', this.usuario.photoURL);
  }

  eliminarData() {
    localStorage.removeItem('uid');
    localStorage.removeItem('photoURL');
    localStorage.removeItem('username');
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/');
    this.eliminarData();
  }


}
