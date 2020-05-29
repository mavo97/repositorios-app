import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Alumnos Components
import { AlumnoHomeComponent } from './components/alumnos/alumno-home/alumno-home.component';
import { AlumnoRepositoryComponent } from './components/alumnos/alumno-repository/alumno-repository.component';

// Asesores Components
import { AsesorHomeComponent } from './components/asesores/asesor-home/asesor-home.component';
import { AsesorUsuarioComponent } from './components/asesores/asesor-usuario/asesor-usuario.component';
import { AsesorAlumnoRepoComponent } from './components/asesores/asesor-alumno-repo/asesor-alumno-repo.component';

// Compartido
import { LoginComponent } from './components/login/login.component';

// Guards
import { AlumnoGuard } from './guards/alumno.guard';
import { AsesorGuard } from './guards/asesor.guard';
import { LogueadoGuard } from './guards/logueado.guard';

const routes: Routes = [
    { path: 'asesor', component: AsesorHomeComponent, canActivate: [ AsesorGuard ] },
    { path: 'alumno', component: AlumnoHomeComponent, canActivate: [ AlumnoGuard ] },
    { path: 'alumno/:repositorio', component: AlumnoRepositoryComponent, canActivate: [ AlumnoGuard ] },
    { path: 'asesor/:usuario', component: AsesorUsuarioComponent, canActivate: [ AsesorGuard ]},
    { path: 'asesor/:usuario/:repositorio', component: AsesorAlumnoRepoComponent, canActivate: [ AsesorGuard ]},
    { path: '', component: LoginComponent, canActivate: [ LogueadoGuard ] },
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
