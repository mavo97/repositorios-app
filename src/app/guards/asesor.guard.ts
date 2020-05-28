import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AsesorGuard implements CanActivate {

  tipoUsuario: string;

  constructor(  private router: Router ) {}


  canActivate(): boolean {
    this.tipoUsuario = localStorage.getItem('provider');
    if ( this.tipoUsuario === 'asesor' ) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
