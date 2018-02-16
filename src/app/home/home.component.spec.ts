import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { HomeComponent } from './home.component';
import { ReportService } from '../_shared/report.service';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const TestData = {"Quarter": "1", "Month": "2012-01-01T00:00:00", "Complaints": 27, "UnitsSold": 4932508 };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      declarations: [ HomeComponent ],
      providers: [ReportService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
