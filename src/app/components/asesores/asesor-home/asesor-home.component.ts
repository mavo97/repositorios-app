import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

// Models
import { UID } from 'src/app/models/uid';
import { Alert } from '../../../models/alerts';
import { Asesor } from 'src/app/models/asesor';


// Providers
import { AuthService } from '../../../providers/auth.service';
import { ValidarCrearService } from '../../../providers/validar-crear.service';
import { ReadDataUService } from '../../../providers/read-data-u.service';

@Component({
  selector: 'app-asesor-home',
  templateUrl: './asesor-home.component.html',
  styleUrls: ['./asesor-home.component.css']
})
export class AsesorHomeComponent implements OnInit {

  forma: FormGroup; // Formulario para validar
  public noRegistrado: boolean;
  public asesor: Asesor = new Asesor();

  constructor( public auth: AuthService,
               public validarcrear: ValidarCrearService,
               public readData: ReadDataUService ) {

    // Validaciones para el formulario
    this.forma = new FormGroup({
      telefono: new FormControl('', [ Validators.required, Validators.maxLength(10),
      Validators.minLength(10), Validators.pattern(/^-?(0|[1-9]\d*)?$/) ]),

      departamento: new FormControl('', [ Validators.required ])
    });
                }

  ngOnInit() {

    const id: UID = {
      uid: localStorage.getItem('uid')
    };

    const idF = JSON.stringify(id);

    this.validarcrear.validarAsesor( idF ).subscribe( resp => {
      if ( resp.message === 'Cuenta de correo no se encuentra registrada.' ) {
        // console.log('Se debe registrar al asesor');
        this.noRegistrado = true;
      } else {
        // console.log('No se debe registrar al asesor');
        this.noRegistrado = false;
        this.getAsesor();

      }
    });

  }

  completarRegistro() {

    this.asesor.uid = localStorage.getItem('uid');
    this.asesor.displayName = localStorage.getItem('displayName');
    this.asesor.photoURL = localStorage.getItem('photoURL');
    this.asesor.email = localStorage.getItem('email');
    this.asesor.telefono = this.forma.value.telefono;
    this.asesor.departamento = this.forma.value.departamento;
    this.asesor.rol = 'asesor';

    // console.log(this.asesor);

    let peticion: Observable<any>;
    const alerta: Alert = new Alert();
    const asesorR = JSON.stringify( this.asesor );

    peticion = this.validarcrear.registrarAsesor( asesorR );
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

  getAsesor() {
    this.readData.getAsesor( localStorage.getItem('uid') )
    .subscribe( (resp: Asesor ) => {
      this.asesor = resp;
      // console.log(this.asesor);
    });
  }

}
