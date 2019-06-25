/* tslint:disable:variable-name */
import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {filter, flatMap, map, mergeMap, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import * as firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

@Injectable({
  providedIn: 'root'
})
export class EventsService {


  private readonly _subjects: AngularFirestoreCollection<any>;
  private readonly _subjects$: Observable<Array<any>>;
  private _subjectsSubject: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  private url = environment.commandsUrl;


  get subjects(): Observable<Array<any>> {
    return this._subjectsSubject.asObservable();
  }


  constructor(private db: AngularFirestore, private http: HttpClient, private authService: AuthService) {
    this._subjects = db.collection(environment.collections.events);
    this._subjects$ = this._subjects.valueChanges();
  }

   allSubjects(): Observable<Array<any>> {
    return this._subjects$.pipe(
      tap(x => this._subjectsSubject.next(x))
    );
  }

   accepted(): Observable<Array<any>> {
    return this.subjects.pipe(
      map(x => x.filter(s => s.status === 'Accepté'))
    );
  }

   myPropositions(uid: string): Observable<Array<any>> {
    return this.subjects.pipe(
      map(x => x.filter(s => s.createdBy.uid === uid))
    );
  }

  addEvent(event: any): Observable<any> {
    return from(this.authService.currentUserToken.getIdToken()).pipe(
      flatMap(x => this.http.post(
        `${this.url}/subjects`,
        event,
        { headers : new HttpHeaders({Authorization: `Bearer ${x}`})}
        )
      )
    );
  }

  acceptEvent(event: any): Observable<any> {
    return from(this.authService.currentUserToken.getIdToken()).pipe(
      flatMap(x => this.http.put(
        `${this.url}/subjects/${event.id}/accept`,
        {scheduleDate : Timestamp.now().toDate()},
        { headers : new HttpHeaders({Authorization: `Bearer ${x}`})}
        )
      )
    );
  }

  refuseEvent(event: any): Observable<any> {
    return from(this.authService.currentUserToken.getIdToken()).pipe(
      flatMap(x => this.http.put(
        `${this.url}/subjects/${event.id}/refuse`,
        Date.now(),
        { headers : new HttpHeaders({Authorization: `Bearer ${x}`})}
        )
      )
    );
  }
}
