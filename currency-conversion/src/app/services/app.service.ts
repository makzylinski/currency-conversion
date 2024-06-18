import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { Rates } from '../models/rates.interface';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly baseURL = 'http://api.nbp.pl/api/';
  private readonly http = inject(HttpClient);
  selectedDateSource$ = new BehaviorSubject<string>('');
  selectedTableSource$ = new BehaviorSubject<string>('');
  currenciesDateSource$ = new BehaviorSubject<Rates[]>([]);

  getExchangeRates = (table: string, date: string): Observable<any> =>
    this.http
      .get<any>(`${this.baseURL}exchangerates/tables/${table}/${date}`)
      .pipe(tap((rates) => this.currenciesDateSource$.next(rates[0].rates)));

  getCurrencies = (): Observable<Rates[]> => {
    return this.currenciesDateSource$;
  };
}
