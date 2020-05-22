import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';

// Models
import { Alumno } from 'src/app/models/alumno';
import { UID } from 'src/app/models/uid';
import { Alert } from '../../../models/alerts';
import { Repositorios } from 'src/app/models/repositorios';

// Providers
import { AuthService } from '../../../providers/auth.service';
import { ValidarCrearService } from '../../../providers/validar-crear.service';
import { ReadDataUService } from '../../../providers/read-data-u.service';
import { QuerysService } from '../../../providers/github/querys.service';

@Component({
  selector: 'app-alumno-home',
  templateUrl: './alumno-home.component.html',
  styleUrls: ['./alumno-home.component.css']
})
export class AlumnoHomeComponent implements OnInit {

  forma: FormGroup; // Formulario para validar
  public alumno: Alumno = new Alumno();
  public noRegistrado: boolean;
  private querySubscription: Subscription;
  public repositorios: Repositorios = new Repositorios();
  nodosRepositorios: any;
  username: string;

  constructor( public auth: AuthService,
               public validarcrear: ValidarCrearService,
               public readData: ReadDataUService,
               public queryService: QuerysService,
               public apollo: Apollo ) {

    // Validaciones para el formulario
    this.forma = new FormGroup({
      nocontrol: new FormControl('', [ Validators.required, Validators.maxLength(8),
      Validators.minLength(8), Validators.pattern(/^-?(0|[1-9]\d*)?$/) ]),

      username: new FormControl('', [ Validators.required ])
    });

               }

  ngOnInit() {

    this.validarAlumno();

  }

  validarAlumno() {

    const id: UID = {
      uid: localStorage.getItem('uid')
    };

    const idF = JSON.stringify(id);
    this.validarcrear.validarAlumno( idF ).subscribe( resp => {
      if ( resp.message === 'Cuenta de correo no se encuentra registrada.' ) {
          // console.log('Se debe registrar al alumno');
          this.noRegistrado = true;
      } else {
        // console.log('No se debe registrar al alumno');
        this.getAlumno();
        this.noRegistrado = false;

        setTimeout(() => {

          this.username = localStorage.getItem('username');
          this.getRepositories();

        }, 500);

      }

    });
  }

  completarRegistro() {

    this.alumno.uid = localStorage.getItem('uid');
    this.alumno.displayName = localStorage.getItem('displayName');
    this.alumno.photoURL = localStorage.getItem('photoURL');
    this.alumno.email = localStorage.getItem('email');
    this.alumno.nocontrol = this.forma.value.nocontrol;
    this.alumno.username = this.forma.value.username;
    this.alumno.rol = 'alumno';

    let peticion: Observable<any>;
    const alerta: Alert = new Alert();

    peticion = this.validarcrear.registrarAlumno( this.alumno );

    // console.log(this.alumno);
    alerta.cargando('Espere', 'Guardando información!');
    peticion.subscribe( resp => {
      if ( resp.message === 'Cuenta de correo ya se encuentra registrada.' ) {

        alerta.info('No se completo la operación', 'La cuenta de correo ya se encuentra registrada.' );

      } else if ( resp.message === 'Cuenta creada correctamente.' ) {

        alerta.exito('Éxito', 'Cuenta creada correctamente.');
        this.validarAlumno();

      }},
      (err) => {

        alerta.error('Intente más tarde.', 'Hubo un error al intentar crear su cuenta.');

      } );

  }

  getAlumno() {
    this.readData.getAlumno( localStorage.getItem('uid') )
    .subscribe( (resp: Alumno ) => {
      this.alumno = resp;
      localStorage.setItem('username', this.alumno.username);
    });
  }

  getRepositories() {

    this.querySubscription = this.apollo.watchQuery<any>({
      query: this.queryService.getRepositories(),
      variables: { user: this.username }
    })
      .valueChanges
      .subscribe( (resp: Repositorios ) => {
        // console.log(resp.data.user.repositories.nodes);
        this.nodosRepositorios = resp.data.user.repositories.nodes;
      });

  }

}
