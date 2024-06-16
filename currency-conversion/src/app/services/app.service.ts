import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly baseURL = 'http://api.nbp.pl/api/';
  private readonly http = inject(HttpClient);

  getExchangeRates = (table: string): Observable<any> =>
    this.http.get<any>(`${this.baseURL}exchangerates/tables/${table}/`);
}