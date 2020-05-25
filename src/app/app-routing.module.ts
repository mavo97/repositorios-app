import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Alumnos Components
import { AlumnoHomeComponent } from './components/alumnos/alumno-home/alumno-home.component';
import { AlumnoRepositoryComponent } from './components/alumnos/alumno-repository/alumno-repository.component';

// Asesores Components
import { AsesorHomeComponent } from './components/asesores/asesor-home/asesor-home.component';

// Compartido
import { LoginComponent } from './components/login/login.component';

// Guards
import { AlumnoGuard } from './guards/alumno.guard';
import { AsesorGuard } from './guards/asesor.guard';

const routes: Routes = [
    { path: 'asesor', component: AsesorHomeComponent, canActivate: [ AsesorGuard ] },
    { path: 'alumno', component: AlumnoHomeComponent, canActivate: [ AlumnoGuard ] },
    { path: 'alumno/:repositorio', component: AlumnoRepositoryComponent, canActivate: [ AlumnoGuard ] },
    { path: '', component: LoginComponent },
    { path: '**', pathMatch: 'full', redirectTo: '' }
  ];

@NgModule({
declarations: [],
imports: [
    RouterModule.forRoot( routes )
],
exports: [
    RouterModule
]
})
export class AppRoutingModule { }
