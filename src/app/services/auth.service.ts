import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) {
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
        .signInWithRedirect(provider)
        .then(res => {
          console.log(res);
          resolve(res);
        });
    });
  }

  doLogin() {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInAnonymously()
        .then(res => {
          resolve(res);
        }, err => reject(err));
    });
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut().then(() => console.log('User Signout'));
        resolve();
      } else {
        reject();
      }
    });
  }

  get currentUserToken() {
    return this.afAuth.auth.currentUser;
  }
}
