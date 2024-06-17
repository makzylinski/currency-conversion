import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly baseURL = 'http://api.nbp.pl/api/';
  private readonly http = inject(HttpClient);
  selectedDateSource$ = new BehaviorSubject<string>('');

  getExchangeRates = (table: string, date: string): Observable<any> =>
    this.http
      .get<any>(`${this.baseURL}exchangerates/tables/${table}/${date}`)
      .pipe(map((rates) => rates[0].rates));
}
