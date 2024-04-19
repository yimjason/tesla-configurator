import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Color, Model } from '../../models/vehicles.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-model-and-color',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './model-and-color.component.html',
  styleUrl: './model-and-color.component.scss'
})
export class ModelAndColorComponent implements OnChanges {
  @Input() models: Model[] = [];
  selectedModel!: string | null | undefined;
  colors: Color[] | undefined = [];
  selectedColor!: string | null | undefined;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['models']) {
      this.prePopulateForm();
    }
  }

  prePopulateForm(): void {
    this.selectedModel = this.activatedRoute.snapshot.queryParamMap.get('model');
    this.selectedModel = this.models.find(model => model.code === this.selectedModel)?.code;
    if (!this.selectedModel) {
      this.selectedModel = 'Choose...';
    } else {
      this.selectedColor = this.activatedRoute.snapshot.queryParamMap.get('color');
      this.setColorDropdown(this.selectedColor);
    }
  }

  onModelSelect(event: Event): void {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    const value: string = target.value;
    this.selectedModel = this.models.find(model => model.code === value)?.code;
    this.setColorDropdown();
    this.router.navigate([], { queryParams: { model: this.selectedModel, color: this.selectedColor } });
  }

  setColorDropdown(defaultColor?: string | null): void {
    if (this.selectedModel) {
      this.colors = this.models.find(model => model.code === this.selectedModel)?.colors;
      if (this.colors && this.colors.length > 0) {
        let color: Color | undefined = this.colors.find(_color => _color.code === defaultColor);
        defaultColor = !color ? this.colors[0].code : color.code;
        this.setColor(defaultColor);
        this.router.navigate([], { queryParams: { ...this.activatedRoute.snapshot.queryParams, color: this.selectedColor } });
      }
    }
  }

  onColorSelect(event: Event): void {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    const value: string = target.value;
    this.setColor(value);
    this.router.navigate([], { queryParams: { ...this.activatedRoute.snapshot.queryParams, color: this.selectedColor } });
  }

  setColor(value: string): void {
    this.selectedColor = value;
  }

}
