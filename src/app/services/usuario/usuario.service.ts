import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICES } from '../../config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) { 
    this.loadUserFromLocal();
    console.log("Servicio de usuario OK")
  }

  isLogin(){
    return ( this.token.length > 5 ) ? true : false;
  }

  loadUserFromLocal(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    }else{
      this.token = '';
      this.usuario = null;
    }
  }

  saveLocalStorage( id: string, token: string, usuario: Usuario){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  createUser(usuario: Usuario){

    let url = URL_SERVICES + '/usuario';
    return this.http.post( url, usuario )
      .pipe(map((res:any) => {
        swal('Usuario creado', usuario.email, 'success');
        return res.usuario;
      }))

  }

  loginGoogle( token: string ){

    let url = URL_SERVICES + '/login/google';
    return this.http.post( url, {token})
      .pipe(map((res: any)=>{
        this.saveLocalStorage(res.id, res.token, res.usuario);
        return true;
      }));

  }

  login(usuario: Usuario, remember: boolean = false){

    if(remember){
      localStorage.setItem('email', usuario.email);
    }else{
      localStorage.removeItem('email');
    }

    let url = URL_SERVICES + '/login';
    return this.http.post( url, usuario )
      .pipe(map((res:any) => {
        this.saveLocalStorage(res.id, res.token, res.usuario);
        return true;
      }))
  }

  logout(){
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }
}
