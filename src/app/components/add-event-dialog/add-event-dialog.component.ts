import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventsService} from '../../services/events.service';
import {AuthService} from '../../services/auth.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.scss']
})
export class AddEventDialogComponent implements OnInit {

  private _eventForm: FormGroup;
  private _typeOptions: Array<any>;

  constructor(private dialogRef: MatDialogRef<AddEventDialogComponent>,
              private fb: FormBuilder,
              private eventService: EventsService,
              private spinner: NgxSpinnerService
  ) {
    this.createForm();
    this._typeOptions = [
      {code: 'QUARTER_BACKS', label: 'Quarter Backs'},
      {code: 'BOUFFE_FRONT', label: 'Bouffe Front'},
      {code: 'BEYOND_KEYBOARDS', label: 'Beyond Keyboards'},
    ];
  }

  ngOnInit() {
  }

  get typeOptions(): Array<any> {
    return this._typeOptions;
  }

  get eventForm(): FormGroup {
    return this._eventForm;
  }

  createForm() {
    this._eventForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      subjectType: ['', Validators.required],
      record: [true, Validators.required],
    });
  }

  addEvent() {
    this.spinner.show();
    const event = {...this.eventForm.value};
    this.eventService.addEvent(event).subscribe(() => this.dialogRef.close(), () => this.spinner.hide());
  }
}
