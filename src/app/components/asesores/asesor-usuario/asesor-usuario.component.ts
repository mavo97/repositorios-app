import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Apollo } from "apollo-angular";
import { Router, ActivatedRoute } from "@angular/router";

// Services
import { QuerysService } from "../../../providers/github/querys.service";
import { ReadDataUService } from "../../../providers/read-data-u.service";
import { AuthService } from "../../../providers/auth.service";

// Models
import { Repositorios } from "src/app/models/repositorios";
import { Repositorio } from "../../../models/repository";
import { Alumno } from "src/app/models/alumno";

@Component({
  selector: "app-asesor-usuario",
  templateUrl: "./asesor-usuario.component.html",
  styleUrls: ["./asesor-usuario.component.scss"],
})
export class AsesorUsuarioComponent implements OnInit {
  private querySubscription: Subscription;
  public repositorios: Repositorios = new Repositorios();
  public alumno: Alumno = new Alumno();
  nodosRepositorios: any[];
  username: string;
  buscando: boolean;
  mensaje: any;
  resultado: boolean;
  loading: boolean;
  repositorio: any;
  index: number;
  lengthRepositorios: number;
  loadingMain: boolean = false;

  constructor(
    public queryService: QuerysService,
    public readData: ReadDataUService,
    public apollo: Apollo,
    private route: ActivatedRoute,
    private auth: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe((params) => {
      this.username = params.usuario;
    });
    this.buscando = false;
    this.resultado = true;
    this.index = 1;

    this.cargandoData();
  }

  getAlumno() {
    this.readData
      .getAlumnoByControl(this.username)
      .subscribe((resp: Alumno) => {
        this.alumno = resp;
      });
  }

  getRepositories() {
    this.loadingMain = true;
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: this.queryService.getRepositories(),
        variables: { user: this.username },
      })
      .valueChanges.subscribe((resp: Repositorios) => {
        this.nodosRepositorios = resp.data.user.repositories.nodes.slice(0, 5);
        this.lengthRepositorios = resp.data.user.repositories.nodes.length;
        this.loadingMain = false;
      });
    this.loading = false;
  }
  getRepositoriesPaginator(index: number, indexEnd: number) {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: this.queryService.getRepositories(),
        variables: { user: this.username },
      })
      .valueChanges.subscribe((resp: Repositorios) => {
        // console.log(resp.data.user.repositories.nodes);
        this.nodosRepositorios = resp.data.user.repositories.nodes.slice(
          index,
          indexEnd
        );
      });
    this.loading = false;
  }
  cargandoData() {
    this.getAlumno();
    setTimeout(() => {
      this.getRepositories();
    }, 100);
    this.auth.changeMessage("asesorcompleto");
  }

  buscarRepo(event: any) {
    const busqueda: string = event.target.value;

    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: this.queryService.searchRepository(),
        variables: { owner: this.username, name: busqueda },
      })
      .valueChanges.subscribe(
        (resp: Repositorio) => {
          this.repositorio = resp.data.repository;
          this.resultado = false;
          this.buscando = true;
          this.loading = false;
        },
        (err) => {
          this.resultado = true;
        }
      );

    if (busqueda.length > 0) {
      this.buscando = true;
      this.loading = true;
    } else {
      this.buscando = false;
      this.resultado = false;
      this.loading = false;
    }
  }

  verRepositorio(repositorio: string) {
    this.router.navigate(["asesor/", repositorio]);
  }
  sort(index: number) {
    if (index === 1) {
      this.getRepositoriesPaginator(0, 5);
      this.index = index;
    } else if (index === 2) {
      this.getRepositoriesPaginator(5, 10);

      this.index = index;
    } else if (index === 3) {
      this.getRepositoriesPaginator(10, 15);

      this.index = index;
    } else {
      this.getRepositoriesPaginator(15, 20);
      this.index = index;
    }
  }
}
