import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any = [
    {
      title: 'Principal',
      icon: 'icon-speedometer menu-icon',
      submenu: [
        {title: 'Dashboard', url: '/dashboard'},
        {title: 'Progress Bar', url: '/progress'},
        {title: 'Graphics', url: '/graphic1'},
        {title: 'Promises', url: '/promises'},
        {title: 'Rxjs', url: '/rxjs'}
      ]
    },
    {
      title: 'Maintenance',
      icon: 'mdi mdi-lock',
      submenu: [
        {title: 'Usuarios', url: '/usuarios'},
        {title: 'Hospitales', url: '/hospitales'},
        {title: 'Médicos', url: '/medicos'}
      ]
    }
  ]

  constructor() { }
}
