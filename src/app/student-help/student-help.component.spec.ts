import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentHelpComponent } from './student-help.component';

describe('StudentHelpComponent', () => {
  let component: StudentHelpComponent;
  let fixture: ComponentFixture<StudentHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
