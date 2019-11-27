import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EventsService} from '../../../services/events.service';
import {AuthService} from '../../../services/auth.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-choose-accept-date-dialog',
  templateUrl: './choose-accept-date-dialog.component.html',
  styleUrls: ['./choose-accept-date-dialog.component.scss']
})
export class ChooseAcceptDateDialogComponent implements OnInit {

  private _acceptForm: FormGroup;


  constructor(@Inject(MAT_DIALOG_DATA) private _subject: any,
              private dialogRef: MatDialogRef<ChooseAcceptDateDialogComponent>,
              private fb: FormBuilder,
              private eventService: EventsService,
              private spinner: NgxSpinnerService) {
    this._acceptForm = this.fb.group({
      date: [ this._subject.scheduleDate ? {...this._subject}.scheduleDate : '', Validators.required],
      link: [this._subject.link ? {...this._subject}.link : '']
    });
  }

  ngOnInit() {
  }


  get acceptForm(): FormGroup {
    return this._acceptForm;
  }


  save() {
    const scheduleDate = new Date(this.acceptForm.value.date);
    scheduleDate.setHours(12);
    this.spinner.show();
    this.eventService.acceptEvent(this._subject, scheduleDate, this.acceptForm.value.link)
      .subscribe(() => this.dialogRef.close(), () => this.spinner.hide());
  }
}
