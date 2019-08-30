import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EventsService} from '../../../services/events.service';
import {merge, Observable} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-edit-event-dialog',
  templateUrl: './edit-event-dialog.component.html',
  styleUrls: ['./edit-event-dialog.component.scss']
})
export class EditEventDialogComponent implements OnInit {

  private _eventForm: FormGroup;
  private _typeOptions: Array<any>;


  constructor(@Inject(MAT_DIALOG_DATA) private _subject: any,
    private dialogRef: MatDialogRef<EditEventDialogComponent>,
              private fb: FormBuilder,
              private eventService: EventsService,
              private spinner: NgxSpinnerService) {
    this.createForm();
    this._typeOptions = [
      {code: 'QUARTER_BACKS', label: 'Quarter Backs'},
      {code: 'BOUFFE_FRONT', label: 'Bouffe Front'},
      {code: 'BEYOND_KEYBOARDS', label: 'Beyond Keyboards'},
      {code: 'SFEIR_HOBBIES', label: 'Sfeir Hobbies'},
    ];
  }

  ngOnInit() {
  }


  get eventForm(): FormGroup {
    return this._eventForm;
  }


  get typeOptions(): Array<any> {
    return this._typeOptions;
  }

  createForm() {
    const eventClone = {...this._subject};
    this._eventForm = this.fb.group({
      title: [eventClone.title, Validators.required],
      description: [eventClone.description],
      subjectType: [eventClone.subjectType, Validators.required],
      record: [eventClone.record, Validators.required],
    });
  }

  save() {
    this.spinner.show();
    const propertyToChange$: Array<Observable<any>> = [];
    if (this._subject.title !== this._eventForm.value.title) {
      propertyToChange$.push(this.eventService.changeTittle(this._subject.id, this._eventForm.value.title));
    }
    if (this._eventForm.value.description !== null && this._subject.description !== this._eventForm.value.description) {
      propertyToChange$.push(this.eventService.changeDescription(this._subject.id, this._eventForm.value.description));
    }
    if (this._subject.subjectType !== this._eventForm.value.subjectType) {
      propertyToChange$.push(this.eventService.changeType(this._subject.id, this._eventForm.value.subjectType));
    }
    if (this._subject.record !== this._eventForm.value.record) {
      propertyToChange$.push(this.eventService.changeRecordAuth(this._subject.id, this._eventForm.value.record));
    }
    if (propertyToChange$.length === 0) { this.dialogRef.close();}
    merge(...propertyToChange$).subscribe(() => this.dialogRef.close(), () => this.spinner.hide());
  }

}
