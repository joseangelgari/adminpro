import { Component, OnInit } from "@angular/core";
import { UsuarioService, ModalImgService } from "src/app/services/service.index";
import { Usuario } from "src/app/models/usuario.model";

declare function init_plugin();
declare var swal;

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  from: number = 0;
  totalUsers: number = 0;
  loading: boolean = false;

  constructor(
    public _usuariosService: UsuarioService,
    public _modalImgService: ModalImgService,
    ) {
      _modalImgService.notification.subscribe(resp => this.loadUsers())
    }

  ngOnInit() {
    init_plugin();
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this._usuariosService.loadUsers(this.from).subscribe((resp: any) => {
      this.totalUsers = resp.total;
      this.usuarios = resp.usuarios;
      this.loading = false;
    });
  }

  changeFrom(value: number) {
    let from = this.from + value;

    if (from >= this.totalUsers) {
      return;
    } else if (from < 0) {
      return;
    }

    this.from += value;
    this.loadUsers();
  }

  searchUsers(value: string) {
    if (value) {
      this.loading = true;
      this._usuariosService.searchUsers(value).subscribe(resp => {
        this.usuarios = resp;
        this.loading = false;
      });
    } else {
      this.loadUsers();
    }
  }

  deleteUser(usuario: Usuario) {
    if(usuario._id === this._usuariosService.usuario._id){
      swal('No puedes borrar tu propio usuario', usuario.email, 'error');
      return;
    }

    swal({title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true}).then(willDelete => {
      if (willDelete) {
        this._usuariosService.deleteUser(usuario).subscribe(resp => {
          this.loadUsers();
        });
      }
    });
  }

  saveUser(usuario: Usuario){
    this._usuariosService.updateUser(usuario).subscribe();
  }

  openModal(usuario: Usuario){
    this._modalImgService.openModal(usuario._id, usuario.img, 'usuarios');
  }
}
