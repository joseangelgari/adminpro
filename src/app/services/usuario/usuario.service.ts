import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICES } from '../../config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    public http: HttpClient
  ) { 
    console.log("Servicio de usuario OK")
  }

  createUser(usuario: Usuario){
    let url = URL_SERVICES + '/usuario';
    return this.http.post( url, usuario )
                    .pipe(map((res:any) => {
                      swal('Usuario creado', usuario.email, 'success');
                      return res.usuario;
                    }))
  }
}
