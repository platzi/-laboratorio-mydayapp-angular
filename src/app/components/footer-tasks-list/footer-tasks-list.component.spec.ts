import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterTasksListComponent } from './footer-tasks-list.component';

describe('FooterTasksListComponent', () => {
  let component: FooterTasksListComponent;
  let fixture: ComponentFixture<FooterTasksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterTasksListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterTasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
