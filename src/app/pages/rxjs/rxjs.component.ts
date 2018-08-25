import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { retry, map, filter } from "rxjs/operators";

@Component({
  selector: "app-rxjs",
  templateUrl: "./rxjs.component.html",
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy{

  subscription: Subscription;

  constructor() {
    this.subscription = this.returnObs().subscribe(
      num => console.log("Subs: ", num),
      error => console.error("Error papá y 3 veces que no es lo mismo", error),
      () => console.log("¡La fiesta se acabó!")
    );
  }

  ngOnInit() {}

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  returnObs(): Observable<any> {
    return new Observable(observer => {
      let count = 0;
      let counter = setInterval(() => {
        count++;
        let outputCount = {
          valor : count
        }
        observer.next(outputCount);
        // if (count == 5) {
        //   clearInterval(counter);
        //   observer.complete();
        // }
      }, 200);
    }).pipe(retry(2))
      .pipe(map( (res : any) => {
        return res.valor;
      }))
      .pipe(filter( valor => {
        return valor % 2 == 1 ?  true : false;
      }));
  }
}
