import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { Category, MenuItem } from '../models/menu.models';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private readonly http = inject(HttpClient);
  private readonly apiBase = 'http://localhost:5266/api';

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiBase}/categories`).pipe(timeout(5000));
  }

  getMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.apiBase}/menu-items`).pipe(timeout(5000));
  }
}
