import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import * as firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;
import {EventsService} from '../../../services/events.service';

@Component({
  selector: 'app-admin-event',
  templateUrl: './admin-event.component.html',
  styleUrls: ['./admin-event.component.scss']
})
export class AdminEventComponent implements OnInit {

  @Input('subject') private _subject: any;

  constructor(private _sanitizer: DomSanitizer,
              private eventsService: EventsService) {
  }
  ngOnInit() {
  }

  get subject(): any {
    return this._subject;
  }

  public get photoUrl() {
    return this.subject.createdBy.photoURL ?
      this._sanitizer.bypassSecurityTrustStyle(`url(${this.subject.createdBy.photoURL})`) :
      this._sanitizer.bypassSecurityTrustStyle(`url("https://firebasestorage.googleapis.com/v0/b/test-comment-2acc0.appspot.com/o/profile-image%2Fdefault_medium_avatar-57d58da4fc778fbd688dcbc4cbc47e14ac79839a9801187e42a796cbd6569847.png?alt=media&token=860895cc-84b4-4266-b239-bb13f255f243")`);
  }

  toDate(date: Timestamp) {
    return date.toDate();
  }

  accept() {
    this.eventsService.acceptEvent(this._subject).subscribe();
  }

  refuse() {
    this.eventsService.refuseEvent(this._subject).subscribe();
  }
}
