import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

// Models
import { Alumno } from '../models/alumno';
import { Asesor } from '../models/asesor';
import { UID } from '../models/uid';

@Injectable({
  providedIn: 'root'
})
export class ReadDataUService {

  // private url = 'http://localhost/api-repos';
  private url = 'https://api-repos.herokuapp.com';

  constructor( private http: HttpClient ) { }

  getAsesor( uid: string ) {

    return this.http.get(`${this.url}/asesor/read-asesor.php?uid=${uid}`);

  }

  getAlumno( uid: string ) {

    return this.http.get(`${this.url}/alumno/read-alumno.php?uid=${uid}`);

  }

  getAlumnoByControl( username: string ) {

    return this.http.get(`${this.url}/alumno/read-alumnoByControl.php?username=${username}`);

  }

  getToken(): Observable<any> {
    return this.http.get(`${this.url}/token/getToken.php`);
  }

  getAlumnos() { return this.http.get(`${this.url}/alumno/get-alumnos.php`); }

  /*
  tipoUsuario() {

    const id: UID = {
      uid: localStorage.getItem('uid')
    };

    const idF = JSON.stringify(id);

    this.getAlumno( idF ).subscribe( ( resp: Alumno ) => {
      if ( resp.rol === 'alumno' ) {
        this.changeMessage2('alumno');
      } else {
        this.getAsesor( idF ).subscribe( ( r: Asesor ) => {
          if ( r.rol === 'asesor' ) {
            this.changeMessage2('asesor');
          }
        });
      }
    });

  }*/


}
