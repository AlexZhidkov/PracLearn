import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityTodoComponent } from './university-todo.component';

describe('UniversityTodoComponent', () => {
  let component: UniversityTodoComponent;
  let fixture: ComponentFixture<UniversityTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversityTodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
