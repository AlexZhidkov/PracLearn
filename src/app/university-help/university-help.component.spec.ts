import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityHelpComponent } from './university-help.component';

describe('UniversityHelpComponent', () => {
  let component: UniversityHelpComponent;
  let fixture: ComponentFixture<UniversityHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversityHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
