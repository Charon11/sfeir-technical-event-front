import {Component, OnInit} from '@angular/core';
import {EventsService} from '../../services/events.service';
import {AuthService} from '../../services/auth.service';
import {MatDialog} from '@angular/material';
import {AddEventDialogComponent} from '../add-event-dialog/add-event-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sfeir-event-front';

  constructor(private eventsService: EventsService, private authService: AuthService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.eventsService.allSubjects().subscribe();
  }

  get currentUserToken() {
    return this.authService.currentUserToken;
  }

  openDialog(): void {
    this.dialog.open(AddEventDialogComponent, {
      width: '90%',
    });

  }
}
