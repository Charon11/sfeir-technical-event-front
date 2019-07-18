import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @Input('subject') private _subject: any;

  constructor(private _sanitizer: DomSanitizer) {
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
}
