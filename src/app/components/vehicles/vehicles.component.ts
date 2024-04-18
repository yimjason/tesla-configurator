import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelAndColorComponent } from '../model-and-color/model-and-color.component';
import { ConfigAndOptionsComponent } from '../config-and-options/config-and-options.component';
import { SummaryComponent } from '../summary/summary.component';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule, ModelAndColorComponent, ConfigAndOptionsComponent, SummaryComponent],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss'
})
export class VehiclesComponent {
  steps: number[] = [1, 2, 3];
  step: WritableSignal<number> = signal(1);

  goToStep(step: number): void {
    console.log('step', step)
    this.step.set(step);
  }
}
