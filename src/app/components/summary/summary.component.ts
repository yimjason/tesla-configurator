import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Color, Model, SummaryData, TeslaConfig, TeslaOption } from '../../models/vehicles.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent implements OnChanges{
  @Input() data!: SummaryData;
  vehicleName!: string | undefined;
  colorName!: string | undefined;
  colorPrice!: number | undefined;
  configName!: string | undefined;
  range!: number | undefined;
  speed!: number | undefined;
  configPrice!: number | undefined;
  hasTowHitchOption!: boolean;
  hasYokeOption!: boolean;
  towHitchPrice: number = 1000;
  yokePrice: number = 1000;
  total: number = 0;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      console.log('this.data', this.data)
      const { models, modelCode, colorCode, option, configId, towHitchOption, yokeOption }: SummaryData = this.data; 
      const model: Model | undefined = models.find(item => item.code === modelCode);
      if (model) {
        this.vehicleName = model.description;
        const color: Color | undefined = model.colors.find(item => item.code === colorCode);
        if (color) {
          this.colorName = color.description;
          this.colorPrice = color.price;
          this.total+=this.colorPrice;
        }
      }
      const config: TeslaConfig | undefined = option.configs.find(item => item.id == configId);
      console.log('option.configs', option.configs)
      console.log('configId', configId)
      if (config) {
        this.configName = config.description;
        this.range = config.range;
        this.speed = config.speed;
        this.configPrice = config.price;
        this.total+=this.configPrice;
      }
      this.hasTowHitchOption = towHitchOption;
      this.hasYokeOption = yokeOption;
      if (this.hasTowHitchOption) {
        this.total+=this.towHitchPrice;
      }
      if (this.hasYokeOption) {
        this.total+=this.yokePrice;
      }
    }
  }


}
