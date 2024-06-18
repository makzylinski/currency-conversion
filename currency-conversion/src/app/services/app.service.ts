import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EMPTY, catchError, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { Rates } from '../models/rates.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly toast = inject(MatSnackBar);
  private readonly baseURL = 'http://api.nbp.pl/api/';
  private readonly http = inject(HttpClient);
  selectedDateSource$ = new BehaviorSubject<string>('');
  selectedTableSource$ = new BehaviorSubject<string>('');
  currenciesDateSource$ = new BehaviorSubject<Rates[]>([]);

  getExchangeRates = (table: string, date: string): Observable<any> =>
    this.http
      .get<any>(`${this.baseURL}exchangerates/tables/${table}/${date}`)
      .pipe(
        tap((rates) => this.currenciesDateSource$.next(rates[0].rates)),
        catchError((err, cautht) => {
          this.toast.open(err.message, 'Error');
          return EMPTY;
        }),
      );

  getCurrencies = (): Observable<Rates[]> => {
    return this.currenciesDateSource$;
  };
}
