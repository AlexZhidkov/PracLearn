import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessHelpComponent } from './business-help.component';

describe('BusinessHelpComponent', () => {
  let component: BusinessHelpComponent;
  let fixture: ComponentFixture<BusinessHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
