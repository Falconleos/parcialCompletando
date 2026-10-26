import { Injectable, computed, effect, signal,inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Sesion, Usuario } from '../models/Usuario';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../shared/constantes';
import { toSignal } from '@angular/core/rxjs-interop';

const CLAVE_STORAGE = 'gym-sesion';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private url = `${API_URL}/usuarios`;

  /** Usuario logueado (null = guest) */
  readonly usuario = signal<Sesion | null>(this.leerStorage());

  readonly logueado = computed(() => this.usuario() !== null);
  readonly esAdmin = computed(() => this.usuario()?.rol === 'admin');
  readonly esUser = computed(() => this.usuario()?.rol === 'user');

  constructor() {
    // Cada vez que cambia la sesión, la persistimos
    effect(() => {
     const u = this.usuario();
     if(u){
      localStorage.setItem(CLAVE_STORAGE,JSON.stringify(u));
     }else{
      localStorage.removeItem(CLAVE_STORAGE);
     }
      //completar
    });
  }

  /** Devuelve true si las credenciales son correctas */
  login(email: string, password: string): Observable<boolean> {
    return this.http.get<Usuario[]>(this.url,{params:{email,password}})
      .pipe(
        map(lista =>{
          if(lista.length===0)return false;
          const {password:_,...session} = lista[0];
          this.usuario.set(session);
          return true;
        })
      )
  }

  logout() {
    localStorage.removeItem(CLAVE_STORAGE);
  }

  private leerStorage(): Sesion | null {
    const raw = localStorage.getItem(CLAVE_STORAGE);
    if(raw){
      this.usuario.set(JSON.parse(raw));
      return JSON.parse(raw);
    }else{
      return null;
    }
  }
}
