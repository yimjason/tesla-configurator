import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Model, TeslaModel, TeslaOption } from '../models/vehicles.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(private readonly httpClient: HttpClient) { }

  getOptions(id: TeslaModel): Observable<TeslaOption> {
    return <Observable<TeslaOption>>this.httpClient.get(`/options/${id}`);
  }

  getModels(): Observable<Model> {
    return <Observable<Model>>this.httpClient.get('/models');
  }
}
