import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from 'src/app/services/app.service';
import { Observable } from 'rxjs/internal/Observable';
import { Rates } from 'src/app/models/rates.interface';
import { combineLatest, map } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-currency-list',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './currency-list.component.html',
})
export class CurrencyListComponent implements OnInit {
  private readonly appService = inject(AppService);

  rates$: Observable<Rates[]>;

  ngOnInit(): void {
    combineLatest([
      this.appService.selectedDateSource$,
      this.appService.selectedTableSource$,
    ])
      .pipe(map(([date, table]) => this.fetchData(date, table)))
      .subscribe();
  }

  private fetchData = (date: string, table: string) => {
    if (date && table) {
      this.appService.getExchangeRates(table, date).subscribe();
      this.rates$ = this.appService.getCurrencies();
    }
  };
}
