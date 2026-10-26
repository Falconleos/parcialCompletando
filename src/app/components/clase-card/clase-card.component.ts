import { Component, effect, inject, input, output,signal } from '@angular/core';
import { ClasesService } from '../../services/clases.service';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Clase } from '../../models/Clase';

@Component({
  imports: [],
  selector: 'app-clase-card',
  templateUrl: './clase-card.component.html',
})
export class ClaseCard {
  
  private claseService = inject(ClasesService);
  private route = inject(Router);

  clase = input<Clase>();
  verDetalle = output<number>();

}
