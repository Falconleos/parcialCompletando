import { Component, computed, effect, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Clase } from '../../models/Clase';
import { Inscripcion } from '../../models/Inscripcion';
import { Usuario } from '../../models/Usuario';

@Component({
  selector: 'app-admin-clase-detalle',
  imports: [RouterLink],
  templateUrl: 'admin-clases-detalle.component.html',
})
export class AdminClaseDetalle {  

  clase = signal<Clase | null>(null);
  inscripciones = signal<Inscripcion[]>([]);
  usuarios = signal<Usuario[]>([]);

  /** Join inscripción → usuario (sin la contraseña) */
  inscriptos = computed(() =>
    this.inscripciones().map(i => {
      const u = this.usuarios().find(u => u.id === i.usuarioId);
      return {
        inscripcionId: i.id,
        nombre: u?.nombre ?? '(usuario desconocido)',
        email: u?.email ?? '-',
      };
    }),
  );

  constructor() {

    // Si cambia el :id, se recargan la clase y sus inscriptos
    effect(() => {
      const id = this.id();

    });
  }

  // completar
  quitar(inscripcionId: number, nombre: string) {
    if (!confirm(`¿Quitar a ${nombre} de esta clase?`)) return;
    
  }
}
