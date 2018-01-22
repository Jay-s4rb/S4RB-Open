import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleComponent } from './toggle.component';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { By }              from '@angular/platform-browser';

describe('ToggleComponent', () => {
  let component: ToggleComponent;
  let fixture: ComponentFixture<ToggleComponent>;
  let de: DebugElement;
  let el: HTMLElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('input'));
    el = de.nativeElement
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should switch toggle boolean when clicked' , () => {
    expect(component.toggleValue).toBe(false)

    el.click();
    el.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.toggleValue).toBe(true)
  })
});
