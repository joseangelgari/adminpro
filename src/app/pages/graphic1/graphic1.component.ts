import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-graphic1",
  templateUrl: "./graphic1.component.html",
  styles: []
})
export class Graphic1Component implements OnInit {


  graphics: any = [
    {
      id: '1',
      labels: ['Con frijoles', 'Con Natilla', 'Con tocino'],
      data: [24, 30, 46],
      type: 'doughnut',
      leyend: 'El pan se come con'
    },
    {
      id: '2',
      labels: ['Hombres', 'Mujeres'],
      data: [4500,  6000],
      type: 'doughnut',
      leyend: 'Entrevistados'
    },
    {
      id: '3',
      labels: ['Sí', 'No'],
      data: [95,5],
      type: 'doughnut',
      leyend: '¿Le hace pear el queso costeño?'
    },
    {
      id: '4',
      labels: ['No', 'Sí'],
      data: [85, 15],
      type: 'doughnut',
      leyend: '¿Le importa que le haga pear?'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
