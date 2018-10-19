import { Component, OnInit } from '@angular/core';

declare function init_plugin();

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor() {
    init_plugin();
   }

  ngOnInit() {
  }

}

