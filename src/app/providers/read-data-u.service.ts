import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Models
import { Alumno } from '../models/alumno';
import { Asesor } from '../models/asesor';

@Injectable({
  providedIn: 'root'
})
export class ReadDataUService {

  private url = 'http://localhost/api-repos';

  constructor( private http: HttpClient ) { }

  getAsesor( uid: string ) {

    return this.http.get(`${this.url}/asesor/read-asesor.php?uid=${uid}`);

  }

  getAlumno( uid: string ) {

    return this.http.get(`${this.url}/alumno/read-alumno.php?uid=${uid}`);

  }

  getToken(): Observable<any> {
    return this.http.get(`${this.url}/token/getToken.php`);
  }

}
