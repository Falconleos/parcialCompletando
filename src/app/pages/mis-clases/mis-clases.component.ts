import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ClasesService } from '../../services/clases.service';
import { Inscripcion } from '../../models/Inscripcion';
import { porDiaYHorario } from '../../shared/constantes';

@Component({
  selector: 'app-mis-clases',
  imports: [RouterLink],
  templateUrl: 'mis-clases.component.html',
})
export class MisClases {
  private clasesSrv = inject(ClasesService);

  inscripciones = signal<Inscripcion[]>([]);
  clases = toSignal(this.clasesSrv.getClases(), { initialValue: [] });

  /** Join inscripción → clase, ordenado por día y horario */
  lista = computed(() =>
    this.inscripciones()
      .flatMap(i => {
        const clase = this.clases().find(c => c.id === i.claseId);
        return clase ? [{ ...clase, inscripcionId: i.id }] : [];
      })
      .sort(porDiaYHorario),
  );

  //completar
  constructor() {
    // Se necesita el usuario logueado para saber de quién son las inscripciones.
    // Si no hay sesión, la lista queda vacía.
    
  }

  // completar
  cancelar(inscripcionId: number) {
    if (!confirm('¿Seguro que querés cancelar tu inscripción a esta clase?')) return;
    
  }
}
