import { Component, OnInit } from "@angular/core";
import { Router, ActivationEnd } from "@angular/router";
import { filter, map } from 'rxjs/operators';
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-breadcrumbs",
  templateUrl: "./breadcrumbs.component.html",
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  label: string = '';

  constructor(
    private router: Router,
    private title: Title
  ) {

    this.getDataRouter()
      .subscribe(data => {
        console.log(data);
        this.label = data.title;
        this.title.setTitle(data.title);
      });
  }

  getDataRouter(){
    return  this.router.events
              .pipe(filter( event => event instanceof ActivationEnd))
              .pipe(filter( (event: ActivationEnd) => event.snapshot.firstChild === null))
              .pipe(map( (event: ActivationEnd) => event.snapshot.data))
  }

  ngOnInit() {}
}
