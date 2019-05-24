import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessSelfSourcedProjectComponent } from './business-self-sourced-project.component';

describe('BusinessSelfSourcedProjectComponent', () => {
  let component: BusinessSelfSourcedProjectComponent;
  let fixture: ComponentFixture<BusinessSelfSourcedProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessSelfSourcedProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessSelfSourcedProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
