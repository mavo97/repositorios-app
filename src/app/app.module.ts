import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Fecha local
import { registerLocaleData } from '@angular/common';
import localeEsMx from '@angular/common/locales/es-MX';
// Registrar
registerLocaleData(localeEsMx, 'es-MX');

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AlumnoHomeComponent } from './components/alumnos/alumno-home/alumno-home.component';
import { AsesorHomeComponent } from './components/asesores/asesor-home/asesor-home.component';
import { AlumnoRepositoryComponent } from './components/alumnos/alumno-repository/alumno-repository.component';

// Libraries
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { GraphQLModule } from './graphql.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlumnoHomeComponent,
    AsesorHomeComponent,
    NavbarComponent,
    AlumnoRepositoryComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GraphQLModule,
    RouterModule
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es-MX' } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
