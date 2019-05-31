import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessProjectComponent } from './business-project.component';

describe('BusinessProjectComponent', () => {
  let component: BusinessProjectComponent;
  let fixture: ComponentFixture<BusinessProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
