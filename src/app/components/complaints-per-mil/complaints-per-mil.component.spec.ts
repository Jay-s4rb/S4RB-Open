import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsPerMilComponent } from './complaints-per-mil.component';

describe('ComplaintsPerMilComponent', () => {
  let component: ComplaintsPerMilComponent;
  let fixture: ComponentFixture<ComplaintsPerMilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintsPerMilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintsPerMilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
