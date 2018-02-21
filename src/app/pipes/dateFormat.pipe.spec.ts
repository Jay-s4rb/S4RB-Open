import { DateFormatPipe } from './dateFormat.pipe';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

beforeEach(async(() => {
  TestBed.configureTestingModule({
    declarations: [
      DateFormatPipe
    ],
    providers: [
      DateFormatPipe
    ]
  })
  .compileComponents();
}));

describe('DateFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new DateFormatPipe("dd MMM yyyy");
    expect(pipe).toBeTruthy();
  });
});

it('should transform ', inject([DateFormatPipe], (datePipe) => {
  let pipe = new DateFormatPipe("dd MMM yyyy");
  let testDate: number = Date.UTC(0,0,1);

  expect(pipe.transform(testDate.toString()))
      .toBe(datePipe.transform(testDate));
}));
