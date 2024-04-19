import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TeslaConfig, TeslaOption } from '../../models/vehicles.model';
import { VehiclesService } from '../../services/vehicles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-config-and-options',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './config-and-options.component.html',
  styleUrl: './config-and-options.component.scss'
})
export class ConfigAndOptionsComponent implements OnInit, OnDestroy {
  @Input() model!: string | null;
  @Input() color!: string | null;
  @Output() selectedOption: EventEmitter<TeslaOption> = new EventEmitter<TeslaOption>();
  selectedConfig!: string | number | null | undefined;
  configs: TeslaConfig[] = []
  option!: TeslaOption;
  range!: number;
  speed!: number;
  price!: number;
  isTowHitchedChecked: boolean = false;
  isYokeChecked: boolean = false;

  private unsubscribe: Subject<null> = new Subject<null>();

  constructor(
    private readonly vehiclesService: VehiclesService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.getOptions();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }

  get showDescription(): boolean {
    return (this.range !== null && this.range !== undefined) && (this.speed !== null && this.speed !== undefined) && (this.price !== null && this.price !== undefined);
  }

  getOptions(): void {
    if (this.model) {
      this.vehiclesService.getOption(this.model).pipe(takeUntil(this.unsubscribe)).subscribe((data: TeslaOption) => {
        console.log('data', data)
        this.option = data;
        this.configs = this.option.configs;
        this.prePopulateForm();
        this.selectedOption.emit(this.option);
      });
    }
  }

  prePopulateForm(): void {
    const config: string | null = this.activatedRoute.snapshot.queryParamMap.get('config');
    this.selectedConfig = typeof config === 'string' ? parseInt(config) : null;
    this.isTowHitchedChecked = this.activatedRoute.snapshot.queryParamMap.get('towHitchOption') === 'true';
    this.isYokeChecked = this.activatedRoute.snapshot.queryParamMap.get('yokeOption') === 'true';
    this.setConfig(this.selectedConfig); 
  }

  onConfigSelect(event: Event): void {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    const value: number = parseInt(target.value);
    this.setConfig(value);
    this.router.navigate([], { queryParams: { ...this.activatedRoute.snapshot.queryParams, config: this.selectedConfig } });
  }

  setConfig(configId?: number | null) {
    this.selectedConfig = configId;
    const config: TeslaConfig | undefined = this.configs.find(item => item.id === this.selectedConfig);
    if (config) {
      this.range = config.range;
      this.speed = config.speed;
      this.price = config.price;
    } else {
      this.selectedConfig = 'Choose...';
    }
  }

  onTowHitchChange(): void {
    this.router.navigate([], { queryParams: { ...this.activatedRoute.snapshot.queryParams, towHitchOption: this.isTowHitchedChecked } });
  }

  onYokeChange(): void {
    this.router.navigate([], { queryParams: { ...this.activatedRoute.snapshot.queryParams, yokeOption: this.isYokeChecked } });
  }

}
