import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConverterComponent } from '../components/converter/converter.component';
import { AppService } from '../services/app.service';
import { of } from 'rxjs';
import { mockRates } from './mock/mock-rates';

describe('ConverterComponent', () => {
  let component: ConverterComponent;
  let fixture: ComponentFixture<ConverterComponent>;
  let mockAppService: jasmine.SpyObj<AppService>;

  beforeEach(async () => {
    mockAppService = jasmine.createSpyObj('AppService', ['getCurrencies']);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, MatSnackBarModule, ConverterComponent],
      providers: [{ provide: AppService, useValue: mockAppService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form and load currencies', () => {
    mockAppService.getCurrencies.and.returnValue(of(mockRates));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.currencyForm).toBeDefined();
    expect(component.currencyForm.controls['amount']).toBeDefined();
    expect(component.currencyForm.controls['currencyFrom']).toBeDefined();
    expect(component.currencyForm.controls['currencyTo']).toBeDefined();

    expect(component.currencyOptions$).toBeDefined();
    component.currencyOptions$.subscribe(currencies => {
      expect(currencies).toEqual(mockRates);
    });

    expect(mockAppService.getCurrencies).toHaveBeenCalled();
  });

  it('should calculate currency conversion correctly', () => {
    component.currencyOptions$ = of(mockRates);
  
    component.currencyForm.patchValue({
      amount: 100,
      currencyFrom: 'USD',
      currencyTo: 'EUR',
    });
  
    fixture.detectChanges();
  
    component.onConvertCurrency();
  
    expect(component.result).toBeDefined();
    if (component.result !== null) {
      expect(component.result).toBeCloseTo((100 * 3.8888) / 4.4591, 2);
    }
  });

  it('should handle invalid form submission', () => {
    component.currencyForm.patchValue({
      amount: 100,
      currencyFrom: 'USD',
      currencyTo: 'EUR',
    });

    component.currencyOptions$ = of(mockRates);

    component.onConvertCurrency();

    expect(component.result).toBeNull();
  });
});