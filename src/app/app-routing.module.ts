import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Alumnos Components
import { AlumnoHomeComponent } from './components/alumnos/alumno-home/alumno-home.component';

// Asesores Components
import { AsesorHomeComponent } from './components/asesores/asesor-home/asesor-home.component';

// Compartido
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
    { path: 'asesor', component: AsesorHomeComponent },
    { path: 'alumno', component: AlumnoHomeComponent },
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
