import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from 'src/app/services/app.service';
import { Observable } from 'rxjs/internal/Observable';
import { Rates } from 'src/app/models/rates.interface';

@Component({
  selector: 'app-currency-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss'],
})
export class CurrencyListComponent implements OnInit {
  private readonly appService = inject(AppService);

  rates$: Observable<Rates[]>;

  ngOnInit(): void {
    this.appService.selectedDateSource$.subscribe((date) =>
      this.fetchData(date),
    );
  }

  private fetchData = (date: string) => {
    this.appService.getExchangeRates('A', date).subscribe();
    this.rates$ = this.appService.getCurrencies();
  }
}
