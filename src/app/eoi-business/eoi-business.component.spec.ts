import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EoiBusinessComponent } from './eoi-business.component';

describe('EoiBusinessComponent', () => {
  let component: EoiBusinessComponent;
  let fixture: ComponentFixture<EoiBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EoiBusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EoiBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
