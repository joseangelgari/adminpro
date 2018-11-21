import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { Medico } from '../../models/medico.model';
import { UploadFileService } from '../upload-file/upload-file.service';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  token: string = '';

  constructor(
    public http: HttpClient,
    public _uploadFileService: UploadFileService
  ) {
    this.token = localStorage.getItem('token');
  }

  loadMedicos(){
    let url = URL_SERVICES + '/medico';
    return this.http.get(url).pipe(map((resp:any) => {
      return resp.medicos;
    }))
  }

  loadMedico(id: String){
    let url = URL_SERVICES + '/medico/' + id;
    return this.http.get(url);
  }

  updateMedico(medico: Medico){
    let url = URL_SERVICES + '/medico/' + medico._id + '?token=' + this.token;
    return this.http.put(url, medico).pipe(map((resp: any) =>{
      swal('Actualizado correctamente', resp.medico.name, 'success');
      return true;
    }))
  }

  createMedico(medico: Medico){
    let url = URL_SERVICES + '/medico?token=' + this.token;
    return this.http.post(url, medico).pipe(map((resp: any) => {
      swal('Medico creado', resp.medico.name, 'success');
      return resp;
    }));
  }

  searchMedico(input: String){
    let url = URL_SERVICES + '/busqueda/coleccion/medicos/' + input;
    return this.http.get(url).pipe(map((resp:any) => {
      return resp.medicos;
    }))
  }

  deleteMedico(id: String){
    let url = URL_SERVICES + '/medico/' + id + '?token=' + this.token;
    return this.http.delete(url).pipe(map((resp: any) =>{
      swal('Eliminado correctamente', resp.medico.name, 'success');
      return true;
    }))
  }

  changeImage( file: File, id: string){
    this._uploadFileService.uploadFile(file, 'medicos', id)
      .then( (resp:any) => {
        swal('Imagen actualizada', resp.medico.name, 'success');
      })
      .catch( resp =>{
        console.log(resp);
      })
  } 
}
