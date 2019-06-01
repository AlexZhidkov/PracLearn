import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-business-help',
  templateUrl: './business-help.component.html',
  styleUrls: ['./business-help.component.scss']
})
export class BusinessHelpComponent implements OnInit {
  @Output() closeButtonClicked = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
