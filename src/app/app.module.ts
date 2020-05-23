import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';

// Fecha local
import localeEsMx from '@angular/common/locales/es-MX';
// Registrar
registerLocaleData(localeEsMx, 'es-MX');

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

// Libraries
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AlumnoHomeComponent } from './components/alumnos/alumno-home/alumno-home.component';
import { AsesorHomeComponent } from './components/asesores/asesor-home/asesor-home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { GraphQLModule } from './graphql.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlumnoHomeComponent,
    AsesorHomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GraphQLModule
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es-MX' } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
