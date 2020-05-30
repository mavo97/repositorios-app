import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// Models
import { Alumno } from '../models/alumno';
import { Asesor } from '../models/asesor';

@Injectable({
  providedIn: 'root'
})
export class ValidarCrearService {

  // private url = 'http://localhost/api-repos';
  private url = 'https://api-repos.herokuapp.com';

  constructor( private http: HttpClient ) { }

  validarAlumno( uid ) {
    return this.http.post(`${ this.url }/alumno/alumno-existe.php`, uid)
    .pipe(
      map( ( resp: any ) => {
        return resp;
      }),
    );
  }

  validarAsesor( uid ) {
    return this.http.post(`${ this.url }/asesor/asesor-existe.php`, uid)
    .pipe(
      map( ( resp: any ) => {
        return resp;
      }),
    );
  }

  registrarAlumno( alumno: Alumno ) {

    return this.http.post(`${ this.url }/alumno/create-alumno.php`, alumno)
    .pipe(
      map( ( resp: any ) => {
        return resp;
      }),
    );

  }

  registrarAsesor( asesor ) {

    return this.http.post(`${ this.url }/asesor/create-asesor.php`, asesor)
    .pipe(
      map( ( resp: any ) => {
        return resp;
      }),
    );

  }


}
