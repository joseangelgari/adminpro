import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';
import { ModalImgService } from 'src/app/services/service.index';

declare function init_plugin();
declare var swal;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  loading: boolean = false;

  constructor(
    public _medicoService: MedicoService,
    public _modalImgService: ModalImgService
  ) {
    _modalImgService.notification.subscribe(resp => this.loadMedicos())
  }

  ngOnInit() {
    init_plugin();
    this.loadMedicos();
  }

  loadMedicos(){
    this.loading = true;
    this._medicoService.loadMedicos().subscribe(resp => {
      this.medicos = resp;
      this.loading = false;
    });
  }

  searchMedico(input: String){
    if(!input){
      this.loadMedicos();
      return;
    }

    this.loading = true;
    this._medicoService.searchMedico(input).subscribe(resp => {
      this.medicos = resp;
      this.loading = false;
    })
  }

  deleteMedico(id: String){
    swal({title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true}).then(willDelete => {
        if (willDelete) {
          this._medicoService.deleteMedico(id).subscribe(resp => this.loadMedicos());
        }
    });
  }

}
