import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICES } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file/upload-file.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _uploadFileService: UploadFileService
  ) { 
    this.loadUserFromLocal();
  }

  renovateToken(){
    var url = URL_SERVICES + '/login/renovate-token?token=' + this.token;
    return this.http.get(url)
      .pipe(map((resp: any) => {
        this.token = resp.token;
        localStorage.setItem('token', resp.token);
      }))
      .pipe(catchError(err => {
        this.router.navigate(['/login']);
        swal('Login again', 'we couldn\'t to renovate the token', 'error')
        return throwError(err)
      }))
  }

  isLogin(){
    return ( this.token.length > 5 ) ? true : false;
  }

  loadUserFromLocal(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
      this.menu = JSON.parse( localStorage.getItem('menu') );
    }else{
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  saveLocalStorage( id: string, token: string, usuario: Usuario, menu: any){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  createUser(usuario: Usuario){

    let url = URL_SERVICES + '/usuario';
    return this.http.post( url, usuario )
      .pipe(map((res:any) => {
        swal('Usuario creado', usuario.email, 'success');
        return res.usuario;
      }))
      .pipe(catchError(err => {
        swal(err.error.mensaje, err.error.errors.message, 'error')
        return throwError(err)
      }))

  }

  updateUser(usuario: Usuario){
    let url = URL_SERVICES + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario)
      .pipe(map((resp:any)=>{
        if(usuario._id === this.usuario._id){
          localStorage.setItem('usuario', JSON.stringify(resp.usuario));
        }
        swal('Usuario actualizado', usuario.email, 'success');
        return resp;
      }));
  }

  loginGoogle( token: string ){
    let url = URL_SERVICES + '/login/google';
    return this.http.post( url, {token})
      .pipe(map((res: any)=>{
        this.saveLocalStorage(res.id, res.token, res.usuario, res.menu);
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
        this.saveLocalStorage(res.id, res.token, res.usuario, res.menu);
        return true;
      }))
      .pipe(catchError(err => {
        swal('Error login', err.error.mensaje, 'error')
        return throwError(err)
      }))
  }

  logout(){
    this.usuario = null;
    this.token = '';
    this.menu = []

    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  changeImage( file: File, id: string){
    this._uploadFileService.uploadFile(file, 'usuarios', id)
      .then( (resp:any) => {
        this.usuario.img = resp.usuario.img;
        swal('Imagen actualizada', resp.usuario.email, 'success');
        localStorage.setItem('usuario', JSON.stringify(resp.usuario));
      })
      .catch( resp =>{
        console.log(resp);
      })
  } 

  loadUsers( from: number = 0 ){
    let url = URL_SERVICES + '/usuario?from=' + from;
    return this.http.get(url);
  }

  searchUsers(value: string){
    let url = URL_SERVICES + '/busqueda/coleccion/usuarios/' + value;
    return this.http.get(url).pipe(map((resp:any) => resp.usuarios));
  }

  deleteUser(usuario: Usuario){
    let url = URL_SERVICES + '/usuario/' + usuario._id + '?token=' + this.token;
    
    return this.http.delete(url).pipe(map((resp:any) => {
      swal('Usuario eliminado', resp.usuario.email, 'success');
      return true;
    } ));
  }
}
