import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {EventsService} from '../../../services/events.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  private _subjects$: Observable<any[]>;

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this._subjects$ = this.eventsService.subjects;
  }

  get subjects(): Observable<any[]> {
    return this._subjects$;
  }
}
