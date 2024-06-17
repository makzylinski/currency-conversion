import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
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

  ngOnInit(): void {
    this.currencyForm = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(0)]],
      currencyFrom: ['', Validators.required],
      currencyTo: ['', Validators.required],
    });

    this.currencyOptions$ = this.appService.getCurrencies();
  }

  onConvertCurrency = () => {
    
  };
}
