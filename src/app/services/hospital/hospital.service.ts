import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { Hospital } from '../../models/hospital.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  token: string = '';

  constructor(
    public http: HttpClient
  ) { 
    this.token = localStorage.getItem('token');
  }

  loadHospitales(){
    let url = URL_SERVICES + '/hospital';
    return this.http.get(url);
  }

  loadHospital(id: String){
    let url = URL_SERVICES + '/hospital/' + id;
    return this.http.get(url);
  }

  createHospital(name: String){
    let url = URL_SERVICES + '/hospital?token=' + this.token;
    return this.http.post(url, {name}).pipe(map((resp : any)  => {
      swal('Creación correcta', resp.hospital.name, 'success');
      return true;
    }));
  }

  updateHospital(hospital: Hospital){
    let url = URL_SERVICES + '/hospital/' + hospital._id + '?token=' + this.token;
    return this.http.put(url, hospital).pipe(map((resp: any) =>{
      swal('Actualizado correctamente', resp.hospital.name, 'success');
      return true;
    }));
  }

  deleteHospital(id: String){
    let url = URL_SERVICES + '/hospital/' + id + '?token=' + this.token;
    return this.http.delete(url).pipe(map((resp: any) => {
      swal('Eliminado correctamente', resp.hospital.name, 'success');
      return true;
    }));
  }

  searchHospital(input: String){
    let url = URL_SERVICES + '/busqueda/coleccion/hospitales/' + input;
    return this.http.get(url).pipe(map((resp:any)=>{
      return resp.hospitales;
    }));
  }
}
