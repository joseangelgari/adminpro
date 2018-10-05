import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  constructor() {

    this.countThree()
      .then(() => {
        console.log("Resolve");
      })
      .catch(( error ) => {
        console.error("what da faq?", error);
      });

   }

  ngOnInit() {
  }

  countThree() :Promise<boolean> {
    return new Promise((resolve, reject) => {
      let count = 0;
      let interval = setInterval(() => {
        count ++;
        console.log(count);
        if(count == 3){
          reject(false);
          clearInterval(interval);
        }
      }, 1000);
    });
  }

}
