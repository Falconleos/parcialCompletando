import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../shared/constantes';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';

@Injectable({ providedIn: 'root' })
export class UsuariosService {

    private http = inject(HttpClient);
    private url = `${API_URL}/usuarios`;

    getUsuarios():Observable<Usuario[]>{
        return this.http.get<Usuario[]>(this.url);
    }
  
}
