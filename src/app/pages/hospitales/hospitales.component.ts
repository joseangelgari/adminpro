import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/service.index';
import { Hospital } from '../../models/hospital.model';
import { ModalImgService } from '../../services/modal-img/modal-img.service';

declare function init_plugin();
declare var swal;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  loading: boolean = false;
  total: number;

  constructor(
    public _hospitalService: HospitalService,
    public _modalImgService: ModalImgService
  ) {
    _modalImgService.notification.subscribe(resp => this.loadHospitales())
  }

  ngOnInit() {
    init_plugin();
    this.loadHospitales();
  }

  loadHospitales(){
    this.loading = true;
    this._hospitalService.loadHospitales().subscribe((resp: any) => {
      this.hospitales = resp.hospitales;
      this.total = resp.total;
      this.loading = false;
    });
  }

  loadHospital(id: String){
    this._hospitalService.loadHospital(id).subscribe(resp => console.log(resp));
  }

  updateHospital(hospital: Hospital){
    this._hospitalService.updateHospital(hospital).subscribe(resp=>{
      this.loadHospitales();
    })
  }

  deleteHospital(id: String){

    swal({title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true}).then(willDelete => {
        if (willDelete) {
          this._hospitalService.deleteHospital(id).subscribe(resp => {
            this.loadHospitales();
          });
        }
    });
  }

  searchHospital(input: String){
    if(!input){
      this.loadHospitales();
      return;
    }
    
    this.loading = true;
    this._hospitalService.searchHospital(input).subscribe(resp => {
      this.hospitales = resp;
      this.loading = false;
    })
  }

  openModal(hospital: Hospital){
    this._modalImgService.openModal(hospital._id, hospital.img, 'hospitales');
  }

  openModalCreate(){
    swal("Nombre del hospital:", {
      content: "input",
      buttons: true
    })
    .then((value) => {
      this._hospitalService.createHospital(value).subscribe(resp => this.loadHospitales());
    });
  }

}
