import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { map } from 'rxjs/operators';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(
    public _activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params =>{
      this.search(params['searching']);
    })
  }

  search(searching: String){
    let url = URL_SERVICES + '/busqueda/todo/' + searching;
    this.http.get(url).subscribe((resp: any) => {
      console.log(resp)
      this.usuarios = resp.usuarios;
      this.medicos = resp.medicos;
      this.hospitales = resp.hospitales;
    })
  }

}
