import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ClasesService } from '../../services/clases.service';
import { InscripcionesService } from '../../services/inscripciones.service';
import { AuthService } from '../../services/auth.service';
import { Clase } from '../../models/Clase';
import { Inscripcion } from '../../models/Inscripcion';

@Component({
  selector: 'app-clase-detalle',
  imports: [RouterLink],
  templateUrl: 'clase-detalle.component.html',
})
export class ClaseDetalle {
  
  private inscripcionesSrv = inject(InscripcionesService);
  private router = inject(Router);
  protected auth = inject(AuthService);

  id = input.required<string>();

  clase = signal<Clase | null>(null);
  inscripcion = signal<Inscripcion | null>(null);
  yaInscripto = computed(() => this.inscripcion() !== null);

  enviando = signal(false);  // funciona como un "loading..."
  error = signal('');

  // completar ambos effect()
  constructor() {
    // Si cambia el :id, se carga la clase.
    effect(() => {
      const id = this.id();

    });

    // Si cambia el :id o el usuario logueado, se verifica si ya está anotado
    effect(() => {
      const id = this.id();
      const usuario = this.auth.usuario();
      if (!usuario) return;

    });
  }

  anotarme() {
    const usuario = this.auth.usuario();
    const clase = this.clase();
    if (!usuario || !clase || this.yaInscripto()) return;

    
    // completar
  }
}
