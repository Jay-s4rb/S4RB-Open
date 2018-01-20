import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { ComplaintsPerMillionUnitsComponent } from './complaints-per-million-units.component';
import { ComplaintsService } from '../services/complaints.service';


describe('ComplaintsPerMillionUnitsComponent', () => {
  let component: ComplaintsPerMillionUnitsComponent;
  let fixture: ComponentFixture<ComplaintsPerMillionUnitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintsPerMillionUnitsComponent ],
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
