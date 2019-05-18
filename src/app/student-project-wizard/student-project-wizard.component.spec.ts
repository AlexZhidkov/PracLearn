import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProjectWizardComponent } from './student-project-wizard.component';

describe('StudentProjectWizardComponent', () => {
  let component: StudentProjectWizardComponent;
  let fixture: ComponentFixture<StudentProjectWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentProjectWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProjectWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
