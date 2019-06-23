import {Component, OnInit} from '@angular/core';
import {EventsService} from '../../services/events.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sfeir-event-front';

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
      this.eventsService.allSubjects().subscribe();
    }
}
