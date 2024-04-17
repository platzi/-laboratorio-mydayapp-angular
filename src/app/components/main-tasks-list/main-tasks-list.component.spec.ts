import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTasksListComponent } from './main-tasks-list.component';

describe('MainTasksListComponent', () => {
  let component: MainTasksListComponent;
  let fixture: ComponentFixture<MainTasksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainTasksListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainTasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
