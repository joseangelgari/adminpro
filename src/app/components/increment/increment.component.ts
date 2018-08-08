import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styleUrls: ['./increment.component.css']
})
export class IncrementComponent implements OnInit {

  @ViewChild('inputProgress') inputProgress: ElementRef;

  @Input() leyend = 'Leyenda';
  @Input() progress : number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

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

    this.cambioValor.emit(this.progress);

  }

  onChangeInput(inputChange){


    if(inputChange < 0){
      this.progress = 0;
    } else if(inputChange > 100){
      this.progress = 100;
    }else{
      this.progress = inputChange;
    }

    this.inputProgress.nativeElement.value = this.progress;
    this.cambioValor.emit(this.progress);
  }

}
