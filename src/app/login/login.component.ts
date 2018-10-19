import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Usuario } from "../models/usuario.model";
import { UsuarioService } from "../services/service.index";
import { Router } from "@angular/router";

declare const gapi: any;
declare function init_plugin();

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  email: string;
  public auth2: any;

  constructor(public _usuarioService: UsuarioService, public router: Router) {
    init_plugin();
  }

  ngOnInit() {
    this.email = localStorage.getItem("email");
    this.googleInit()
  }

  googleInit() {
    gapi.load("auth2", () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          "106670480894-e14rghn9uq7jfjei4gfnpumdd29nkrad.apps.googleusercontent.com",
        cookie: "single_host_origin",
        scope: "profile email"
      });
      this.attachSignin(document.getElementById("btnGoogle"));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this._usuarioService.loginGoogle(token)
        .subscribe(() => window.location.href  = '#/dashboard');
    });
  }

  login(forma: NgForm) {
    if (forma.invalid) {
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._usuarioService
      .login(usuario, forma.value.remember)
      .subscribe(() => this.router.navigate(["/dashboard"]));
  }
}
