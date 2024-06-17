import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  currencyForm: FormGroup;

  ngOnInit(): void {
    this.currencyForm = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(0)]],
      currencyFrom: ['', Validators.required],
      currencyTo: ['', Validators.required],
    });
  }

  onConvertCurrency = () => {
    
  };
}
