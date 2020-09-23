import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoWidetComponent } from './todo-widet.component';

describe('TodoWidetComponent', () => {
  let component: TodoWidetComponent;
  let fixture: ComponentFixture<TodoWidetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoWidetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoWidetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
