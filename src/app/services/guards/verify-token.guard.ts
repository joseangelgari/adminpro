import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyTokenGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public route: Router
  ) { }

  canActivate(): Promise<boolean> | boolean {
    let token = this._usuarioService.token;
    let payload = JSON.parse(atob(token.split('.')[1]));

    var expired = this.expired(payload.exp);
    if (expired) {
      this.route.navigate(['/login']);
      return false;
    }
    this.validateToken(payload.exp);
    return true;
  }

  validateToken(dateToValidate): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let tokenExp = new Date(dateToValidate * 1000);
      let now = new Date();

      now.setTime(now.getTime() + (1 * 60 * 60 * 1000));

      if (tokenExp.getTime() > now.getTime()) {
        resolve(true);
      } else {
        this._usuarioService.renovateToken().subscribe(() => {
          resolve(true);
        }, () => {
          this.route.navigate(['/login']);
          reject(false)
        })
      }

    })
  }

  expired(dateToValidate: number) {
    var now = new Date().getTime() / 1000;
    if (dateToValidate < now) {
      return true;
    } else {
      return false;
    }
  }
}
