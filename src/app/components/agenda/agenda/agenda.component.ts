import { Component, OnInit } from '@angular/core';
import {EventsService} from '../../../services/events.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {

  private _subjects$: Observable<any[]>;
  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this._subjects$ = this.eventsService.accepted();
  }

  get subjects(): Observable<any[]> {
    return this._subjects$;
  }
}
