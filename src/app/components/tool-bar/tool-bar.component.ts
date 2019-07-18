import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {

  private _admin = false;

  constructor(private authService: AuthService,
              private router: Router,
              private afAuth: AngularFireAuth
  ) {
  }


  get isAgenda() {
    return this.router.url === '/agenda';
  }
  get isPropostion() {
    return this.router.url === '/propositions';
  }
  get isAdmin() {
    return this.router.url === '/admin';
  }

  ngOnInit() {
    this.afAuth.auth.onIdTokenChanged(user => {
      if (user) {
        user.getIdTokenResult().then(x => this._admin = x.claims.admin);
      } else {
        this._admin = false;
      }
    });
  }

  logout() {
    this.authService.doLogout()
      .then(() => {
        this.router.navigate(['']);
      }, (error) => {
        console.log('Logout error', error);
      });
  }

  login() {
    this.authService.doGoogleLogin()
      .then((x) => {
        console.log(x);
        this.router.navigate(['']);
      }, (error) => {
        console.log('Logout error', error);
      });
  }

  get admin(): boolean {
    return this._admin;
  }

  get isTest(): boolean {
    return !environment.production;
  }

  get currentUserToken() {
    return this.authService.currentUserToken;
  }


  currentUserId() {
    this.currentUserToken.getIdToken().then(token => console.log(token));
  }

}
