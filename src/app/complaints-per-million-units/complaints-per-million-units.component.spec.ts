import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, ResponseOptions } from '@angular/http';
import { By }              from '@angular/platform-browser';
import { MockBackend } from '@angular/http/testing';

import { ToggleComponent } from '../shared/toggle/toggle.component'

import { ComplaintsPerMillionUnitsComponent } from './complaints-per-million-units.component';
import { ComplaintsService } from '../services/complaints.service';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { consolidation } from '../Enums';


describe('ComplaintsPerMillionUnitsComponent', () => {
  let component: ComplaintsPerMillionUnitsComponent;
  let fixture: ComponentFixture<ComplaintsPerMillionUnitsComponent>;
  let deMonthly: DebugElement;
  let deQuarterly: DebugElement;
  let elMonthly: HTMLElement;
  let elQuarterly: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintsPerMillionUnitsComponent, ToggleComponent ],
      providers: [ ComplaintsService,
                  {provide: XHRBackend, useClass: MockBackend} ],
      imports: [HttpModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintsPerMillionUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    deMonthly = fixture.debugElement.query(By.css('#monthly'));
    elMonthly = deMonthly.nativeElement

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display monthly or quarterly', () => {
    expect(elMonthly.hasAttribute('hidden')).toBe(false);
    component.monthlyOrQuarterly = consolidation.quarterly;
    fixture.detectChanges();
    deQuarterly = fixture.debugElement.query(By.css('#quarterly'));
    elQuarterly = deQuarterly.nativeElement
    expect(elQuarterly.hasAttribute('hidden')).toBe(false);
  })

});
