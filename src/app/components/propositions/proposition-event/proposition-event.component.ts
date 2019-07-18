import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import * as firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;
import {MatDialog} from '@angular/material';
import {EditEventDialogComponent} from '../edit-event-dialog/edit-event-dialog.component';
import {DeleteConfirmDialogComponent} from '../delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-proposition-event',
  templateUrl: './proposition-event.component.html',
  styleUrls: ['./proposition-event.component.scss']
})
export class PropositionEventComponent implements OnInit {

  @Input('subject') private _subject: any;


  constructor(private _sanitizer: DomSanitizer,
              private dialog: MatDialog) {
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

  openDialog(): void {
    this.dialog.open(EditEventDialogComponent, {
      data : this.subject,
      width: '90%',
    });

  }

  openConfirmDialog() {
    this.dialog.open(DeleteConfirmDialogComponent, {
      data : this.subject.id,
      width: '300px',
    });

  }
}
