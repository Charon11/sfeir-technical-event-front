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
import {NgxSpinnerService} from 'ngx-spinner';

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


  constructor(private db: AngularFirestore,
              private http: HttpClient,
              private authService: AuthService,
              private spinner: NgxSpinnerService) {
    this._subjects = db.collection(environment.collections.events);
    this._subjects$ = this._subjects.valueChanges().pipe(tap(() => this.spinner.hide()));
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
      tap(() => this.spinner.show()),
      flatMap(x => this.http.post(
        `${this.url}/subjects`,
        event,
        {headers: new HttpHeaders({Authorization: `Bearer ${x}`})}
        )
      )
    );
  }

  acceptEvent(event: any, date: Date = Timestamp.now().toDate(), link: string = null): Observable<any> {
    return from(this.authService.currentUserToken.getIdToken()).pipe(
      tap(() => this.spinner.show()),
      flatMap(x => this.http.put(
        `${this.url}/subjects/${event.id}/accept`,
        {scheduleDate: date, link},
        {headers: new HttpHeaders({Authorization: `Bearer ${x}`})}
        ),
      ),
      tap(() => {
          this._subjectsSubject.next(this._subjectsSubject.value.map(e => {
              if (e.id === event.id) {
                e.pending = true;
              }
              return e;
            }
            )
          );
        }
      ));
  }

  refuseEvent(event: any): Observable<any> {
    return from(this.authService.currentUserToken.getIdToken()).pipe(
      tap(() => this.spinner.show()),
      flatMap(x => this.http.put(
        `${this.url}/subjects/${event.id}/refuse`,
        Date.now(),
        {headers: new HttpHeaders({Authorization: `Bearer ${x}`})}
        )
      ),
      tap(() => {
          this._subjectsSubject.next(this._subjectsSubject.value.map(e => {
              if (e.id === event.id) {
                e.pending = true;
              }
              return e;
            })
          );
        }
      )
    );
  }

  deleteEvent(entityId: string): Observable<any> {
    return from(this.authService.currentUserToken.getIdToken()).pipe(
      tap(() => this.spinner.show()),
      flatMap(x => this.http.put(
        `${this.url}/subjects/${entityId}/delete`,
        Date.now(),
        {headers: new HttpHeaders({Authorization: `Bearer ${x}`})}
        )
      ),
      tap(() => {
          this._subjectsSubject.next(this._subjectsSubject.value.map(e => {
              if (e.id === entityId) {
                e.pending = true;
              }
              return e;
            })
          );
        }
      )
    );
  }

  changeDescription(entityId: string, description: string): Observable<any> {
    return from(this.authService.currentUserToken.getIdToken()).pipe(
      tap(() => this.spinner.show()),
      flatMap(x => this.http.put(
        `${this.url}/subjects/${entityId}/change-description`,
        {description},
        {headers: new HttpHeaders({Authorization: `Bearer ${x}`})}
        )
      ),
      tap(() => {
          this._subjectsSubject.next(this._subjectsSubject.value.map(e => {
              if (e.id === entityId) {
                e.pending = true;
              }
              return e;
            })
          );
        }
      )
    );
  }

  changeTittle(entityId: string, title: string): Observable<any> {
    return from(this.authService.currentUserToken.getIdToken()).pipe(
      tap(() => this.spinner.show()),
      flatMap(x => this.http.put(
        `${this.url}/subjects/${entityId}/change-title`,
        {title},
        {headers: new HttpHeaders({Authorization: `Bearer ${x}`})}
        )
      ),
      tap(() => {
          this._subjectsSubject.next(this._subjectsSubject.value.map(e => {
              if (e.id === entityId) {
                e.pending = true;
              }
              return e;
            })
          );
        }
      )
    );
  }

  changeType(entityId: string, type: string): Observable<any> {
    return from(this.authService.currentUserToken.getIdToken()).pipe(
      tap(() => this.spinner.show()),
      flatMap(x => this.http.put(
        `${this.url}/subjects/${entityId}/change-type`,
        {subjectType: type},
        {headers: new HttpHeaders({Authorization: `Bearer ${x}`})}
        )
      ),
      tap(() => {
          this._subjectsSubject.next(this._subjectsSubject.value.map(e => {
              if (e.id === entityId) {
                e.pending = true;
              }
              return e;
            })
          );
        }
      )
    );
  }

  changeRecordAuth(entityId: string, record: boolean): Observable<any> {
    return from(this.authService.currentUserToken.getIdToken()).pipe(
      tap(() => this.spinner.show()),
      flatMap(x => this.http.put(
        `${this.url}/subjects/${entityId}/change-record-authorisation`,
        {record},
        {headers: new HttpHeaders({Authorization: `Bearer ${x}`})}
        )
      ),
      tap(() => {
          this._subjectsSubject.next(this._subjectsSubject.value.map(e => {
              if (e.id === entityId) {
                e.pending = true;
              }
              return e;
            })
          );
        }
      )
    );
  }
}
