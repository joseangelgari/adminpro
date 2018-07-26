import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progress: number = 40;

  constructor() { }

  ngOnInit() {
  }

  cambiarProgress (valor : number):void{

    this.progress += valor;

    if(this.progress <= 0){
      this.progress = 0;
    } else if(this.progress >= 100){
      this.progress = 100;
    }
  }

}
