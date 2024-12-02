import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestZoneJsComponent } from './test-zone-js.component';

describe('TestZoneJsComponent', () => {
  let component: TestZoneJsComponent;
  let fixture: ComponentFixture<TestZoneJsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestZoneJsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestZoneJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
