import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';


// Models
import { Alumno } from 'src/app/models/alumno';
import { UID } from 'src/app/models/uid';
import { Alert } from '../../../models/alerts';

// Providers
import { AuthService } from '../../../providers/auth.service';
import { ValidarCrearService } from '../../../providers/validar-crear.service';
import { ReadDataUService } from '../../../providers/read-data-u.service';


@Component({
  selector: 'app-alumno-home',
  templateUrl: './alumno-home.component.html',
  styleUrls: ['./alumno-home.component.css']
})
export class AlumnoHomeComponent implements OnInit {

  forma: FormGroup; // Formulario para validar
  public alumno: Alumno = new Alumno();
  public noRegistrado: boolean;

  constructor( public auth: AuthService,
               public validarcrear: ValidarCrearService,
               public readData: ReadDataUService ) {

    // Validaciones para el formulario
    this.forma = new FormGroup({
      nocontrol: new FormControl('', [ Validators.required, Validators.maxLength(8),
      Validators.minLength(8), Validators.pattern(/^-?(0|[1-9]\d*)?$/) ]),

      username: new FormControl('', [ Validators.required ])
    });

               }

  ngOnInit() {

    const id: UID = {
      uid: localStorage.getItem('uid')
    };

    const idF = JSON.stringify(id);
    // console.log(idF);
    this.validarcrear.validarAlumno( idF ).subscribe( resp => {
      if ( resp.message === 'Cuenta de correo no se encuentra registrada.' ) {
          // console.log('Se debe registrar al alumno');
          this.noRegistrado = true;
      } else {
        // console.log('No se debe registrar al alumno');
        this.getAlumno();
        this.noRegistrado = false;
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
    alerta.cargando('Espere', 'Guardando información!');
    peticion.subscribe( resp => {
      if ( resp.message === 'Cuenta de correo ya se encuentra registrada.' ) {

        alerta.info('No se completo la operación', 'La cuenta de correo ya se encuentra registrada.' );

      } else if ( resp.message === 'Cuenta creada correctamente.' ) {

        alerta.exito('Éxito', 'Cuenta creada correctamente.');
        this.noRegistrado = false;

      }},
      (err) => {

        alerta.error('Intente más tarde.', 'Hubo un error al intentar crear su cuenta.');

      } );

  }

  getAlumno() {
    this.readData.getAlumno( localStorage.getItem('uid') )
    .subscribe( (resp: Alumno ) => {
      this.alumno = resp;
      console.log(this.alumno);
    });
  }

}
