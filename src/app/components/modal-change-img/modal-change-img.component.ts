import { Component, OnInit } from '@angular/core';
import { UsuarioService, ModalImgService, UploadFileService } from 'src/app/services/service.index';

@Component({
  selector: 'app-modal-change-img',
  templateUrl: './modal-change-img.component.html',
  styleUrls: ['./modal-change-img.component.css']
})

export class ModalChangeImgComponent implements OnInit {

  imageUpload: File;
  previewImage: any; 

  constructor(
    public _usuarioService: UsuarioService,
    public _modalImgService: ModalImgService,
    public _uploadFileService : UploadFileService
    ) {
  }

  ngOnInit() {
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
    if(this.imageUpload){
      this._uploadFileService.uploadFile(this.imageUpload, this._modalImgService.type, this._modalImgService.id)
      .then( (resp:any) => {
        swal('Imagen actualizada', this._modalImgService.type, 'success');
        this._modalImgService.notification.emit(resp);
        this.closeModal();
      })
      .catch( resp =>{
        console.log(resp);
      })
    }
  }

  closeModal(){
    this.imageUpload = null;
    this.previewImage = '';
    this._modalImgService.closeModal();
  }

}
