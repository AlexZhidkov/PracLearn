import { Component, OnInit } from '@angular/core';
import { EventStoreService } from '../services/event-store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-events-viewer',
  templateUrl: './events-viewer.component.html',
  styleUrls: ['./events-viewer.component.scss']
})
export class EventsViewerComponent implements OnInit {
  isLoading = true;
  events: Observable<any[]>;

  constructor(
    private eventStoreService: EventStoreService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.events = this.eventStoreService.list();
    this.events.subscribe(e => {
      this.isLoading = false;
    });
  }

}
