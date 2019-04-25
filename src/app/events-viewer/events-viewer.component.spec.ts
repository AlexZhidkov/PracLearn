import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsViewerComponent } from './events-viewer.component';

describe('EventsViewerComponent', () => {
  let component: EventsViewerComponent;
  let fixture: ComponentFixture<EventsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
