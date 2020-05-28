import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogueadoGuard implements CanActivate {
  tipoUsuario: string;

  constructor(  private router: Router ) {}


  canActivate(): boolean {
    this.tipoUsuario = localStorage.getItem('provider');
    if ( this.tipoUsuario === 'asesor' ) {
      this.router.navigateByUrl('/asesor');
      return false;
    } else if ( this.tipoUsuario === 'alumno' ) {
      this.router.navigateByUrl('/alumno');
      return false;
    } else {
      return true;
    }
  }

}
