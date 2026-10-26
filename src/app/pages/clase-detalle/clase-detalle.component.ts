import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ClasesService } from '../../services/clases.service';
import { InscripcionesService } from '../../services/inscripciones.service';
import { AuthService } from '../../services/auth.service';
import { Clase } from '../../models/Clase';
import { Inscripcion } from '../../models/Inscripcion';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-clase-detalle',
  imports: [RouterLink],
  templateUrl: 'clase-detalle.component.html',
})
export class ClaseDetalle {
  
  private inscripcionesSrv = inject(InscripcionesService);
  private router = inject(Router);
  protected auth = inject(AuthService);
  private clasesSrv = inject(ClasesService);

  id = input.required<string>();

  clase = signal<Clase | null>(null);
  inscripcion = signal<Inscripcion | null>(null);
  yaInscripto = computed(() => this.inscripcion() !== null);

  enviando = signal(false);  // funciona como un "loading..."
  error = signal('');
  claseSeleccionada = toSignal(this.clasesSrv.getClase(this.id()), { initialValue: null });

  // completar ambos effect()
  constructor() {
    // Si cambia el :id, se carga la clase.
    effect(() => {
      const id = this.id();
      this.clase.set(this.claseSeleccionada());

    });

    // Si cambia el :id o el usuario logueado, se verifica si ya está anotado
    effect(() => {
      const id = this.id();
      const usuario = this.auth.usuario();
      if (!usuario) return;
      this.inscripcionesSrv.getPorUsuarioYClase(usuario.id, id).subscribe({
        next: (inscripciones) => {
          this.inscripcion.set(inscripciones.length > 0 ? inscripciones[0] : null);
        }
      });
    });
  }

  anotarme() {
    const usuario = this.auth.usuario();
    const clase = this.clase();
    if (!usuario || !clase || this.yaInscripto()) return;

    this.enviando.set(true);
    // completar
    this.inscripcionesSrv.inscribir({ usuarioId: usuario.id, claseId: clase.id }).subscribe({
      next: (inscripcion) => {
        this.inscripcion.set(inscripcion);
        this.enviando.set(false);
      },
      error: (err) => {
        this.error.set('Error al inscribirse: ' + err.message);
        this.enviando.set(false);
      }
    });
  }
}
