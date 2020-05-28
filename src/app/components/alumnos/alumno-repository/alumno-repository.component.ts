import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { QuerysService } from '../../../providers/github/querys.service';

// Models
import { Repository } from '../../../models/repositorio';
import { Commit } from '../../../models/commits';
import { Content } from '../../../models/content';

@Component({
  selector: 'app-alumno-repository',
  templateUrl: './alumno-repository.component.html',
  styleUrls: ['./alumno-repository.component.scss']
})
export class AlumnoRepositoryComponent implements OnInit {

  private querySubscription: Subscription;
  photoUser: string; username: string; commit: boolean;
  repo: string; repository: any; sshUrl: string; commits: any; content: string;
  url: string;

  constructor( public queryService: QuerysService,
               public apollo: Apollo, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.route.params.subscribe(params => { this.repo = params.repositorio; });
    this.username = localStorage.getItem('username'); this.photoUser = localStorage.getItem('photoURL');
    this.getRepo( 'master:', this.repo );
    this.getContent('README.md');
  }

  getRepo( branch: string, name: string) {
    this.querySubscription = this.apollo.watchQuery<any>({ query: this.queryService.getRepository(),
      variables: { owner: this.username, name, branch }
    }).valueChanges.subscribe( ( resp: Repository ) => {
      this.repository = resp.data.repository.object.entries; this.sshUrl = resp.data.repository.sshUrl;
      this.url = resp.data.repository.url;
    });
  }
  copyUrl( inputElement ) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  getCommits() {
    this.querySubscription = this.apollo.watchQuery<any>({ query: this.queryService.getCommits(),
      variables: { owner: this.username, name: this.repo }
    }).valueChanges.subscribe( ( resp: Commit ) => {
      this.commits = resp.data.repository.ref.target.history.edges; console.log(this.commits);
    });
    this.commit = true;
  }
  hideCommits() { this.commit = false; }

  getContent( nameFile: string ) {
    this.querySubscription = this.apollo.watchQuery<any>({ query: this.queryService.getContent(),
      variables: { owner: this.username, name: this.repo, file: `master:${ nameFile }` }
    }).valueChanges.subscribe( ( resp: Content ) => { this.content = resp.data.repository.object.text; });
  }
  verRepo( url ) { window.open(url, '_blank'); }
}
