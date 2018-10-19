import { Component, OnInit } from '@angular/core';

declare function init_plugin();

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  progress1: number = 40;
  progress2: number = 80;
  progress100: boolean = false;

  constructor() {init_plugin();}

  ngOnInit() {
  }

  updateProgress(event):void{
    if(event == 100){
      this.progress100 = true;
      setTimeout(()=>{ 
        this.progress100 = false;
      }, 3000);
    }
  }
}
