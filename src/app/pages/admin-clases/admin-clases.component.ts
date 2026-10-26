import { Component, computed, signal } from '@angular/core';
import { Clase } from '../../models/Clase';
import { Inscripcion } from '../../models/Inscripcion';
import { porDiaYHorario } from '../../shared/constantes';

@Component({
  selector: 'app-admin-clases',
  imports: [],
  templateUrl: 'admin-clases.component.html',
})
export class AdminClases {

  clases = signal<Clase[]>([]);
  inscripciones = signal<Inscripcion[]>([]);

  /** Por cada clase (ordenadas por día y horario): cantidad de inscriptos */
  resumen = computed(() =>
    [...this.clases()].sort(porDiaYHorario).map(clase => ({
      clase,
      inscriptos: this.inscripciones().filter(i => i.claseId === clase.id).length,
    })),
  );

  // completar
  constructor() {
    
  }
}
