import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from 'src/app/services/service.index';
import { Medico } from '../../models/medico.model';
import { NgForm } from '@angular/forms';
import { MedicoService } from '../../services/medico/medico.service';
import { Router, ActivatedRoute } from '@angular/router';

declare function init_plugin();

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  
  hospitales: Hospital[] = [];
  hospital: Hospital = new Hospital('', '');
  medico: Medico = new Medico('', '');
  previewImage: any;
  id: String = '';
  imageUpload: File;

  constructor(
    public _hospitalService: HospitalService,
    public _medicoService: MedicoService,
    public router: Router,
    public route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    init_plugin();
    this.route.params.subscribe(params => {
      this.id = params['id']
      if(this.id != 'nuevo' && this.id){
        this._medicoService.loadMedico(this.id).subscribe((resp:any) => {
          this.medico = resp.medico;
          if(resp.medico.hospital){
            this.changeHospital(resp.medico.hospital);
          }
          else{
            this.changeHospital('');
          }
        })
      }
    })
    this._hospitalService.loadHospitales().subscribe((resp: any) => this.hospitales = resp.hospitales);
  }

  saveMedico(f: NgForm){
    if(!f.valid){
      return;
    }

    if(this.id == 'nuevo'){
      this._medicoService.createMedico(this.medico).subscribe((resp) => {
        this.router.navigate(['medico', resp.medico._id]);
      });
      return;
    }

    this._medicoService.updateMedico(this.medico).subscribe();


  }

  changeHospital(id: String){
    if(!id){
      this.hospital = new Hospital('', '')
      return;
    }
    this._hospitalService.loadHospital(id).subscribe((resp: any) => {
      this.hospital = resp.hospital;
    }); 
  }

  selectImage( file: File ){
    if(!file){
      return;
    }

    if(file.type.indexOf('image') < 0){
      swal('Archivo no válido', 'El archivo seleccionado no es una imagen', 'error');
      return;
    }

    this.imageUpload = file;

    // Preview image while select
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => this.previewImage = reader.result;

  }

  changeImage(){
    this._medicoService.changeImage(this.imageUpload, this.medico._id);
  }

}
