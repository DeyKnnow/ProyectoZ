import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export interface Planeta {
  id: number;
  name: string;
  isDestroyed: boolean;
  description: string;
  image: string;
  deleteAt: null;
}

type ApiResponse = { items: Planeta[] }

@Injectable({
  providedIn: 'root'
})
export class PlanetasService {
  
  httpClient = inject(HttpClient);

  getAll(): Promise<ApiResponse> {
    return firstValueFrom(
      this.httpClient.get<ApiResponse>('https://dragonball-api.com/api/planets?page=1&limit=10')
    )
  }
  constructor() { }
}
