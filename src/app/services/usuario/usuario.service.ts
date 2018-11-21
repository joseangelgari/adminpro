import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICES } from '../../config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file/upload-file.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _uploadFileService: UploadFileService
  ) { 
    this.loadUserFromLocal();
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
