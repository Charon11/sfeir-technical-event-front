import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EventsService} from '../../services/events.service';

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
              private eventService: EventsService) {
    this.createForm();
    this._typeOptions = [
      {code: 'QUARTER_BACKS', label: 'Quarter Backs'},
      {code: 'BOUFFE_FRONT', label: 'Bouffe Front'},
      {code: 'BEYOND_KEYBOARDS', label: 'Beyond Keyboards'},
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
    const eventClone = {...this._subject}
    this._eventForm = this.fb.group({
      title: [eventClone.title, Validators.required],
      description: [eventClone.description],
      subjectType: [eventClone.subjectType, Validators.required],
    });
  }

  save() {
    console.log('Check modify value for update');
  }

}
