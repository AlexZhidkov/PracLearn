import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EoiStudentComponent } from './eoi-student.component';

describe('EoiStudentComponent', () => {
  let component: EoiStudentComponent;
  let fixture: ComponentFixture<EoiStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EoiStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EoiStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
