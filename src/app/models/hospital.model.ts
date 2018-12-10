import { Usuario } from 'src/app/models/usuario.model';

export class Hospital{

  constructor(
    public name: string,
    public img?: string,
    public _id?: string,
    public usuario?: Usuario
  ){}

}