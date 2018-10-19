import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Services
import {SharedService, SidebarService, UsuarioService, LoginGuard} from './service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [ SharedService, SidebarService, UsuarioService, LoginGuard ],
  declarations: []
})
export class ServiceModule { }
