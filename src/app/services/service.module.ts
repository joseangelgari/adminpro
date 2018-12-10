import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Services
import {SharedService, SidebarService, UsuarioService, LoginGuard, AdminGuard, UploadFileService, ModalImgService, HospitalService, MedicoService, VerifyTokenGuard} from './service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [ SharedService, SidebarService, UsuarioService, LoginGuard, AdminGuard, UploadFileService, ModalImgService, HospitalService, MedicoService, VerifyTokenGuard ],
  declarations: []
})
export class ServiceModule { }