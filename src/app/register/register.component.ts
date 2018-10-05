import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import swal from 'sweetalert';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  ngOnInit() {

    this.forma = new FormGroup({
      name: new FormControl( null, Validators.required ),
      email: new FormControl( null, [Validators.required, Validators.email] ),
      password: new FormControl( null, Validators.required ),
      password2: new FormControl( null, Validators.required ),
      check: new FormControl( false )
    }, { validators: this.validateEquals( 'password', 'password2' )} );

    this.forma.setValue({
      name: 'Angel',
      email: 'test@test.com',
      password: '123456',
      password2: '123456',
      check: true
    })

  }

  validateEquals(field1: string, field2: string){
    return (group: FormGroup) => {

      let pass1 = group.controls[field1].value;
      let pass2 = group.controls[field2].value;

      if(pass1 === pass2){
        return null;
      }

      return {
        noEquals: true
      }

    }
  }

  registerUser(){

    if( this.forma.invalid){
      return;
    }

    if( !this.forma.value.check ){
      swal('Important', 'It\'s necessary to accept the terms', 'warning')
      return;
    }

    let usuario = new Usuario(
      this.forma.value.name,
      this.forma.value.email,
      this.forma.value.password
    )

    this._usuarioService.createUser(usuario)
      .subscribe( res => { this.router.navigate(['/login']) });
  
  }

}
