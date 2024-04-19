import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelAndColorComponent } from '../model-and-color/model-and-color.component';
import { ConfigAndOptionsComponent } from '../config-and-options/config-and-options.component';
import { SummaryComponent } from '../summary/summary.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Model, SummaryData, TeslaOption } from '../../models/vehicles.model';
import { VehiclesService } from '../../services/vehicles.service';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule, ModelAndColorComponent, ConfigAndOptionsComponent, SummaryComponent],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss'
})
export class VehiclesComponent implements OnInit, OnDestroy {
  summaryData!: SummaryData;
  models: Model[] = [];
  option!: TeslaOption;
  step: number = 1;
  isStep1NotCompleted: boolean = true;
  isStep2NotCompleted: boolean = true;
  selectedModel!: string | null;
  selectedColor!: string | null;
  private selectedConfig!: number | null;
  private towHitchOption: boolean = false;
  private yokeOption: boolean = false;
  private unsubscribe: Subject<null> = new Subject<null>();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly vehiclesService: VehiclesService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.router.navigate([]);
    this.getModels();
    this.activatedRoute.queryParams.pipe(takeUntil(this.unsubscribe)).subscribe((params: Params) => {
      this.selectedModel = params['model'];
      this.selectedColor = params['color'];
      this.selectedConfig = parseInt(params['config']);
      this.towHitchOption = params['towHitchOption'] === 'true';
      this.yokeOption = params['yokeOption'] === 'true';
      this.isStep1NotCompleted = !(this.selectedModel || this.selectedColor);
      this.isStep2NotCompleted = !this.selectedConfig;
      this.setSummaryData();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }

  get showImage(): boolean {
    return (!!this.selectedModel && this.selectedModel !== 'Choose...') && !!this.selectedColor;
  }

  get imageUrl(): string {
    return `/assets/images/${this.selectedModel}/${this.selectedColor}.jpg`; 
  }

  setSummaryData(): void {
    this.summaryData = {
      models: this.models,
      modelCode: this.selectedModel,
      colorCode: this.selectedColor,
      option: this.option,
      configId: this.selectedConfig,
      towHitchOption: this.towHitchOption,
      yokeOption: this.yokeOption,
    }
  }

  goToStep(step: number): void {
    this.step = step;
  }

  getModels(): void {
    this.vehiclesService.getModels().pipe(takeUntil(this.unsubscribe)).subscribe((data: Model[]) => {
      this.models = data;
      this.summaryData.models = this.models;
    });
  }

  onSelectedOption(option: TeslaOption): void {
    this.option = option;
    this.summaryData.option = this.option;
  }
}
