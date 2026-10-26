import { Component, computed, signal,effect,inject } from '@angular/core';
import { Clase } from '../../models/Clase';
import { Inscripcion } from '../../models/Inscripcion';
import { porDiaYHorario } from '../../shared/constantes';
import { AuthService } from '../../services/auth.service';
import { ClasesService } from '../../services/clases.service';
import {toSignal} from '@angular/core/rxjs-interop';
import { InscripcionesService } from '../../services/inscripciones.service';

@Component({
  selector: 'app-admin-clases',
  imports: [],
  templateUrl: 'admin-clases.component.html',
})
export class AdminClases {

  private authService = inject(AuthService);
  private claseService = inject(ClasesService);
  private inscripcionesService = inject(InscripcionesService);

  clases = signal<Clase[]>([]);
  inscripciones = signal<Inscripcion[]>([]);

  clasesCargadas = toSignal(this.claseService.getClases(), { initialValue: [] });
  inscripcionesCargadas = toSignal(this.inscripcionesService.getTodas(), { initialValue: [] });

  /** Por cada clase (ordenadas por día y horario): cantidad de inscriptos */
  resumen = computed(() =>
    [...this.clases()].sort(porDiaYHorario).map(clase => ({
      clase,
      inscriptos: this.inscripciones().filter(i => i.claseId === clase.id).length,
    })),
  );

  // completar
  constructor() {
    effect(() => {
      this.clases.set(this.clasesCargadas());
      this.inscripciones.set(this.inscripcionesCargadas());
    });
  }

}
