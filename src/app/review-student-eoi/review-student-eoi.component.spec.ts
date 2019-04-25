import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewStudentEoiComponent } from './review-student-eoi.component';

describe('ReviewStudentEoiComponent', () => {
  let component: ReviewStudentEoiComponent;
  let fixture: ComponentFixture<ReviewStudentEoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewStudentEoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewStudentEoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
