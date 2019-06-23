import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {



  constructor(
    public authService: AuthService,
    private router: Router,
    public afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(user =>
        this.router.navigate(['/agenda']),
      err =>
        console.log(err.message)
    );
  }

  ngOnInit() {
  }

  tryGoogleLogin() {
    this.authService.doGoogleLogin()
      .then(res => {
        this.router.navigate(['/agenda']);
      });
  }

  tryAnonymousLogin() {
    this.authService.doLogin()
      .then(res => {
        this.router.navigate(['/agenda']);
      });
  }


}
