/* tslint:disable:variable-name */
import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {filter, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsService {


  private readonly _subjects: AngularFirestoreCollection<any>;
  private readonly _subjects$: Observable<Array<any>>;
  private _subjectsSubject: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  private _acceptedSubjectsSubject: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);

  get subjects(): Observable<Array<any>> {
    return this._subjectsSubject.asObservable();
  }

  get acceptedSubjects(): Observable<Array<any>> {
    return this._acceptedSubjectsSubject.asObservable();
  }

  constructor(private db: AngularFirestore) {
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
      map(x => x.filter(s => s.status === 'Accepté')),
      tap(x => this._acceptedSubjectsSubject.next(x))
    );
  }

   myPropositions(uid: string): Observable<Array<any>> {
    return this.subjects.pipe(
      map(x => x.filter(s => s.createdBy.uid === uid)),
      tap(x => this._acceptedSubjectsSubject.next(x))
    );
  }
}
