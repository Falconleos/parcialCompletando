import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clase } from '../models/Clase';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../shared/constantes';

@Injectable({ providedIn: 'root' })
export class ClasesService {

  private http = inject(HttpClient);
  private url = `${API_URL}/clases`;

  getClases(): Observable<Clase[]> {
    return this.http.get<Clase[]>(this.url);
  }

  getClase(id: number | string): Observable<Clase> {
    return this.http.get<Clase>(`${this.url}/${id}`);
  }
}
