import { Component, OnInit, inject } from '@angular/core';
import { AppService } from './services/app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly appService = inject(AppService);
  private readonly formBuilder = inject(FormBuilder);

  currencyForm: FormGroup;

  ngOnInit(): void {
    this.currencyForm = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(0)]],
      currencyFrom: ['', Validators.required],
      currencyTo: ['', Validators.required],
    });
    this.appService.getExchangeRates('A').subscribe((e) => console.log(e));
  }

  onConvertCurrency = () => null;
}
