import { Component, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Apollo } from "apollo-angular";
import { Router, ActivatedRoute } from "@angular/router";

// Services
import { QuerysService } from "../../../providers/github/querys.service";
import { ReadDataUService } from "../../../providers/read-data-u.service";
import { AuthService } from "../../../providers/auth.service";

// Models
import { Repository } from "../../../models/repositorio";
import { Commit } from "../../../models/commits";
import { Content } from "../../../models/content";
import { Alumno } from "src/app/models/alumno";

@Component({
  selector: "app-asesor-alumno-repo",
  templateUrl: "./asesor-alumno-repo.component.html",
  styleUrls: ["./asesor-alumno-repo.component.scss"],
})
export class AsesorAlumnoRepoComponent implements OnInit {
  private querySubscription: Subscription;
  public alumno: Alumno = new Alumno();
  photoUser: string;
  username: string;
  commit: boolean;
  repo: string;
  repository: any;
  sshUrl: string;
  commits: any;
  content: string;
  url: string;
  branchName: string;
  loading: boolean = false;
  constructor(
    public queryService: QuerysService,
    public readData: ReadDataUService,
    public apollo: Apollo,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.cargandoData();
  }

  cargandoData() {
    this.loading = true;
    this.route.params.subscribe((params) => {
      this.repo = params.repositorio;
    });
    this.route.params.subscribe((params) => {
      this.username = params.usuario;
    });
    this.getAlumno();
    this.getBranchName(this.repo);
    this.auth.changeMessage("asesorcompleto");
  }

  getRepo(branch: string, name: string) {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: this.queryService.getRepository(),
        variables: { owner: this.username, name, branch },
      })
      .valueChanges.subscribe((resp: Repository) => {
        this.repository = resp.data.repository.object.entries;
        this.sshUrl = resp.data.repository.sshUrl;
        this.url = resp.data.repository.url;
        this.loading = false;
      });
  }
  getBranchName(name: string) {
    console.log("branchname");

    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: this.queryService.getRepositoryBranchName(),
        variables: { owner: this.username, name },
      })
      .valueChanges.subscribe((resp: Repository) => {
        console.log(resp);

        this.branchName = resp.data.repository.defaultBranchRef.name;
        this.getRepo(`${this.branchName}:`, this.repo);
        this.getContent("README.md", this.branchName);
      });
  }

  copyUrl(inputElement) {
    inputElement.select();
    document.execCommand("copy");
    inputElement.setSelectionRange(0, 0);
  }

  getCommits(branchName: string) {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: this.queryService.getCommits(),
        variables: {
          owner: this.username,
          name: this.repo,
          branch: branchName,
        },
      })
      .valueChanges.subscribe((resp: Commit) => {
        this.commits = resp.data.repository.ref.target.history.edges;
      });
    this.commit = true;
  }
  hideCommits() {
    this.commit = false;
  }

  getContent(nameFile: string, branchName: string) {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: this.queryService.getContent(),
        variables: {
          owner: this.username,
          name: this.repo,
          file: `${branchName}:${nameFile}`,
        },
      })
      .valueChanges.subscribe((resp: Content) => {
        this.content = resp.data.repository.object.text;
      });
  }
  verRepo(url) {
    window.open(url, "_blank");
  }

  getAlumno() {
    this.readData
      .getAlumnoByControl(this.username)
      .subscribe((resp: Alumno) => {
        this.photoUser = resp.photoURL;
      });
  }
}
