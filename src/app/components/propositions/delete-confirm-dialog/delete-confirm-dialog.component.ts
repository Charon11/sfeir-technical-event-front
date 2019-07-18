import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder} from '@angular/forms';
import {EventsService} from '../../../services/events.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrls: ['./delete-confirm-dialog.component.scss']
})
export class DeleteConfirmDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private id: string,
              private dialogRef: MatDialogRef<DeleteConfirmDialogComponent>,
              private eventService: EventsService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
  }

  delete() {
    this.spinner.show();
    this.eventService.deleteEvent(this.id)
      .subscribe(() => this.dialogRef.close(), () => this.spinner.hide());
  }

}
