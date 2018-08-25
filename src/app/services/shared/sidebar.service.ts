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
      title: 'Outside',
      icon: 'icon-layers menu-icon',
      submenu: [
        {title: 'Login', url: '/login'},
        {title: 'Register', url: '/register'}
      ]
    }
  ]

  constructor() { }
}
