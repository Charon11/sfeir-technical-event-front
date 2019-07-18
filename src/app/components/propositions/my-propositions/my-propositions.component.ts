import { Component, OnInit } from '@angular/core';
import {EventsService} from '../../../services/events.service';
import {AuthService} from '../../../services/auth.service';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-my-propositions',
  templateUrl: './my-propositions.component.html',
  styleUrls: ['./my-propositions.component.scss']
})
export class MyPropositionsComponent implements OnInit {

  private _subjects$: Observable<any[]>;

  constructor(private eventsService: EventsService,
              private authService: AuthService) { }
  ngOnInit() {
    this._subjects$ = this.eventsService.myPropositions(this.authService.currentUserToken.uid);
  }

  get subjects(): Observable<any[]> {
    return this._subjects$;
  }
}
