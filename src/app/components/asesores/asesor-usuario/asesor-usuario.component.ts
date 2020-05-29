import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { QuerysService } from '../../../providers/github/querys.service';
import { ReadDataUService } from '../../../providers/read-data-u.service';
import { AuthService } from '../../../providers/auth.service';

// Models
import { Repositorios } from 'src/app/models/repositorios';
import { Repositorio } from '../../../models/repository';
import { Alumno } from 'src/app/models/alumno';

@Component({
  selector: 'app-asesor-usuario',
  templateUrl: './asesor-usuario.component.html',
  styleUrls: ['./asesor-usuario.component.scss']
})
export class AsesorUsuarioComponent implements OnInit {

  private querySubscription: Subscription;
  public repositorios: Repositorios = new Repositorios();
  public alumno: Alumno = new Alumno();
  nodosRepositorios: any; username: string; buscando: boolean; mensaje: any;
  resultado: boolean; loading: boolean; repositorio: any;

  constructor( public queryService: QuerysService, public readData: ReadDataUService,
               public apollo: Apollo, private route: ActivatedRoute, private auth: AuthService,
               public router: Router ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => { this.username = params.usuario; });
    this.buscando = false; this.resultado = true;
    this.cargandoData();
  }

  getAlumno() {
    this.readData.getAlumnoByControl( this.username ).subscribe( (resp: Alumno ) => { this.alumno = resp; });
 }

  getRepositories() {
  this.querySubscription = this.apollo.watchQuery<any>({ query: this.queryService.getRepositories(),
    variables: { user: this.username }
  }).valueChanges.subscribe( ( resp: Repositorios ) => {
      this.nodosRepositorios = resp.data.user.repositories.nodes; });
  this.loading = false;
}

 cargandoData() {
  this.getAlumno();
  setTimeout(() => { this.getRepositories(); }, 100);
  this.auth.changeMessage('asesorcompleto');
 }

 buscarRepo( event: any ) {

  const busqueda: string = event.target.value;

  this.querySubscription = this.apollo.watchQuery<any>({ query: this.queryService.searchRepository(),
    variables: { owner: this.username, name: busqueda}
  }).valueChanges.subscribe( (resp: Repositorio ) =>
  { this.repositorio = resp.data.repository; this.resultado = false; this.buscando = true; this.loading = false;
    }, (err) => { this.resultado = true; });

  if ( busqueda.length > 0 ) { this.buscando = true; this.loading = true;
  } else { this.buscando = false; this.resultado = false; this.loading = false; }
}

  verRepositorio( repositorio: string ) { this.router.navigate(['asesor/', repositorio]); }

}
