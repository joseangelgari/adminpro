import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "src/app/services/service.index";
import { Usuario } from "../../models/usuario.model";

declare function init_plugin();

@Component({
  selector: "app-profile", 
  templateUrl: "./profile.component.html",
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imageUpload: File;
  previewImage: any;

  constructor(public _usuarioService: UsuarioService) {
    init_plugin();
    this.usuario = _usuarioService.usuario;
    console.log(this.usuario)
  }

  ngOnInit() {
  }

  update(usuario: Usuario) {
    if (!usuario.name) {
      swal("Faltó un campo", "El nombre es requerido", "warning");
      return false;
    }else if(!this.usuario.google && !usuario.email){
      swal("Faltó un campo", "El email es requerido", "warning");
      return false;
    }
    
    this.usuario.name = usuario.name;

    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }

    this._usuarioService.updateUser(this.usuario).subscribe(resp => {
      console.log(resp);
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
    this._usuarioService.changeImage(this.imageUpload, this.usuario._id);
  }
}
