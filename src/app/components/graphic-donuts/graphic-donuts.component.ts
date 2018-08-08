import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graphic-donuts',
  templateUrl: './graphic-donuts.component.html',
  styles: ['']
})
export class GraphicDonutsComponent implements OnInit {
  @Input() labels: string[] = [
    "Download Sales",
    "In-Store Sales",
    "Mail-Order Sales"
  ];
  @Input() data: number[] = [350, 450, 100];

  constructor() {}

  ngOnInit() {
  }

}
