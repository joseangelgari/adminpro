import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ModalImgService {

  id: string = '';
  img: string = '';
  type: string = '';
  notification = new EventEmitter<any>()

  constructor() {}

  openModal(id: string, img: string, type: string){
    this.id = id;
    this.img = img;
    this.type = type;
    $('#modal-change-image').modal('show');
  }

  closeModal(){
    $('#modal-change-image').modal('hide');
    this.id = '';
    this.type = '';
    this.img = '';
  }
}
