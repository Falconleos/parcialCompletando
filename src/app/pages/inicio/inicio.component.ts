import { Component, computed, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { ClasesService } from '../../services/clases.service';
import { DIAS, porDiaYHorario } from '../../shared/constantes';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
})
export class Inicio {
  private clasesSrv = inject(ClasesService);
  private fb = inject(NonNullableFormBuilder);
  private route = inject(Router);

  dias = DIAS;
  clases = toSignal(this.clasesSrv.getClases(), { initialValue: [] });

  // completar
  busqueda = this.fb.control('');
  diaFiltro = this.fb.control(''); // '' = todos los días

  private texto = toSignal(this.busqueda.valueChanges, { initialValue: '' });
  private dia = toSignal(this.diaFiltro.valueChanges, { initialValue: '' });

  /** Clases filtradas por nombre y día, ordenadas por día y horario */
  filtradas = computed(() => {
    const t = this.texto().toLowerCase().trim();
    const d = this.dia();
    return this.clases()
      .filter(c => c.nombre.toLowerCase().includes(t))
      .filter(c => d === '' || c.dia === d)
      .sort(porDiaYHorario);
  });

  irADetalle(id: number) {
    this.route.navigate(['/detalle', id]);
  }
}
