import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { DateFormatPipe } from './../../pipes/dateFormat.pipe';
import { ComplaintsDataService } from './../../services/complaints-data/complaints-data.service';
import { ComplaintsPerMilComponent } from './complaints-per-mil.component';

describe('ComplaintsPerMilComponent', () => {
  let component: ComplaintsPerMilComponent;
  let fixture: ComponentFixture<ComplaintsPerMilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ComplaintsPerMilComponent
      ]
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
