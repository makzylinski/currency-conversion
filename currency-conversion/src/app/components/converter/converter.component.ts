import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

  onConvertCurrency = () => {
    const amount = this.currencyForm.controls['amount'].value;
    const currencyFrom = this.currencyForm.controls['currencyFrom'].value;
    const currencyTo = this.currencyForm.controls['currencyTo'].value;

    this.currencyOptions$.pipe(
      take(1),
      map(curr => {
        const fromRate = curr.find(rate => rate.code === currencyFrom)?.mid;
        const toRate = curr.find(rate => rate.code === currencyTo)?.mid;

        console.log('amount: ', amount)
        console.log('fromRate: ', fromRate)
        console.log('toRate: ', toRate)

        // if (fromRate !== undefined && toRate !== undefined) {
        //   this.result = (amount * fromRate) / toRate;
        // } else {
        //   this.result = null;
        // }
      })
    ).subscribe()
  };
}
