import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsPerMillionUnitsComponent } from './complaints-per-million-units.component';

describe('ComplaintsPerMillionUnitsComponent', () => {
  let component: ComplaintsPerMillionUnitsComponent;
  let fixture: ComponentFixture<ComplaintsPerMillionUnitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintsPerMillionUnitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintsPerMillionUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
