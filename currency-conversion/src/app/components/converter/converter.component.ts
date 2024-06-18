import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Observable, map, take } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
import { Rates } from 'src/app/models/rates.interface';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly appService = inject(AppService);
  currencyForm: FormGroup;
  currencyOptions$: Observable<Rates[]>;
  result: any;

  ngOnInit(): void {
    this.currencyForm = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(0)]],
      currencyFrom: [null, Validators.required],
      currencyTo: [null, Validators.required],
    });

    this.currencyOptions$ = this.appService.getCurrencies();
  }

  onConvertCurrency = (): void => {
    const amount = parseFloat(this.currencyForm.controls['amount'].value);
    const currencyFrom = this.currencyForm.controls['currencyFrom'].value;
    const currencyTo = this.currencyForm.controls['currencyTo'].value;

    this.currencyOptions$
      .pipe(
        take(1),
        map((curr: Rates[]) => {
          const fromRateValue = this.calculateRateValue(
            curr.find((rate) => rate.code === currencyFrom),
          );
          const toRateValue = this.calculateRateValue(
            curr.find((rate) => rate.code === currencyTo),
          );

          if (fromRateValue !== null && toRateValue !== null) {
            this.result = ((amount * fromRateValue) / toRateValue).toFixed(2);
          } else {
            this.result = null;
          }
        }),
      )
      .subscribe();
  };

  private calculateRateValue(rate: Rates | undefined): number | null {
    if (!rate) {
      return null;
    }

    if (typeof rate.mid === 'number') {
      return rate.mid;
    } else if (typeof rate.bid === 'number' && typeof rate.ask === 'number') {
      return (rate.bid + rate.ask) / 2;
    } else {
      return null;
    }
  }
}
