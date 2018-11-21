import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, type: string = 'usuarios'): any {

    let url = URL_SERVICES + '/img';

    if(!img){
      return url + '/usuarios/not-found';
    }

    if( img.indexOf('https') >= 0 ){
      return img;
    }

    switch(type){
      case 'usuarios':
        url += '/usuarios/' + img;
        break;
      case 'medicos':
        url += '/medicos/' + img;
        break;
      case 'hospitales':
        url += '/hospitales/' + img;
        break;
      default :
        console.log('Tipo de imagen no existe. Disponible: usuarios, medicos, hospitales');
        url += '/usuarios/not-found';
        break;
    }

    return url;
  }

}
