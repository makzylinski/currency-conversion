import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from 'src/app/services/app.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-currency-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss'],
})
export class CurrencyListComponent implements OnInit {
  private readonly appService = inject(AppService);

  rates$: Observable<any>;

  ngOnInit(): void {
    this.appService.getExchangeRates('A').subscribe((e) => console.log(e));
  }
}
