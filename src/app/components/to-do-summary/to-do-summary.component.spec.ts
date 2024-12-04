import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoSummaryComponent } from './to-do-summary.component';

describe('ToDoSummaryComponent', () => {
  let component: ToDoSummaryComponent;
  let fixture: ComponentFixture<ToDoSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDoSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDoSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
