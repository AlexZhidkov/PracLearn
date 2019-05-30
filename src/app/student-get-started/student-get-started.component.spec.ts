import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGetStartedComponent } from './student-get-started.component';

describe('StudentGetStartedComponent', () => {
  let component: StudentGetStartedComponent;
  let fixture: ComponentFixture<StudentGetStartedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentGetStartedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentGetStartedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
