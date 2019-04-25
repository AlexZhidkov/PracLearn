import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfSourcedProjectComponent } from './self-sourced-project.component';

describe('SelfSourcedProjectComponent', () => {
  let component: SelfSourcedProjectComponent;
  let fixture: ComponentFixture<SelfSourcedProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfSourcedProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfSourcedProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
