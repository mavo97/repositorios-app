import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnoGuard implements CanActivate {

  tipoUsuario: string;

  constructor(  private router: Router ) {}


  canActivate(): boolean {
    this.tipoUsuario = localStorage.getItem('provider');
    if ( this.tipoUsuario === 'alumno' ) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
