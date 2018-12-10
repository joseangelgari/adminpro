import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { 
    this.usuario = _usuarioService.usuario;
  }

  ngOnInit() {
  }

  search(input: String){
    if(!input){
      this.router.navigate(['/dashboard']);
      return;
    }

    this.router.navigate(['/search', input]);
  }
}
