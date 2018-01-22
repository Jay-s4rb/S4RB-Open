import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit {

  constructor() { }

  @Output() onToggle = new EventEmitter<boolean>();
  @Input() firstOption: string;
  @Input() secondOption: string;
  public toggleValue = false;

  ngOnInit() {
  }

}
