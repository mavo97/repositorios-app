import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Fecha local
import { registerLocaleData } from '@angular/common';
import localeEsMx from '@angular/common/locales/es-MX';

// Confs
registerLocaleData(localeEsMx, 'es-MX');
import { environment } from '../environments/environment';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AlumnoHomeComponent } from './components/alumnos/alumno-home/alumno-home.component';
import { AsesorHomeComponent } from './components/asesores/asesor-home/asesor-home.component';
import { AlumnoRepositoryComponent } from './components/alumnos/alumno-repository/alumno-repository.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

// Pipes
import { SortByPipe } from './pipes/sort-by.pipe';

// Extras
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { GraphQLModule } from './graphql.module';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlumnoHomeComponent,
    AsesorHomeComponent,
    NavbarComponent,
    AlumnoRepositoryComponent,
    SortByPipe
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
    RouterModule,
    MarkdownModule.forRoot({ loader: HttpClientModule })
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es-MX' } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
