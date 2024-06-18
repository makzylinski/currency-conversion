import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppService } from 'src/app/services/app.service';
import { BehaviorSubject, of } from 'rxjs';
import { Rates } from 'src/app/models/rates.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { CurrencyListComponent } from '../components/currency-list/currency-list.component';
describe('CurrencyListComponent', () => {
  let component: CurrencyListComponent;
  let fixture: ComponentFixture<CurrencyListComponent>;
  let mockAppService: jasmine.SpyObj<AppService>;
  let selectedDateSource$: BehaviorSubject<string>;
  let selectedTableSource$: BehaviorSubject<string>;
  beforeEach(async () => {
    selectedDateSource$ = new BehaviorSubject<string>('2024-06-18');
    selectedTableSource$ = new BehaviorSubject<string>('A');
    mockAppService = jasmine.createSpyObj('AppService', [
      'getExchangeRates',
      'getCurrencies',
    ]);
    mockAppService.selectedDateSource$ = selectedDateSource$;
    mockAppService.selectedTableSource$ = selectedTableSource$;
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule, MatProgressSpinnerModule, CurrencyListComponent],
      providers: [{ provide: AppService, useValue: mockAppService }],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyListComponent);
    component = fixture.componentInstance;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should fetch data and initialize rates$', () => {
    const mockRates: Rates[] = [
      { currency: 'USD', code: 'USD', mid: 3.8888, bid: 3.88, ask: 3.8976 },
      { currency: 'EUR', code: 'EUR', mid: 4.4591, bid: 4.4482, ask: 4.47 },
    ];
    mockAppService.getExchangeRates.and.returnValue(of(null));
    mockAppService.getCurrencies.and.returnValue(of(mockRates));
    fixture.detectChanges();
    component.rates$.subscribe((rates) => {
      expect(rates).toEqual(mockRates);
    });
    expect(mockAppService.getExchangeRates).toHaveBeenCalledWith(
      'A',
      '2024-06-18',
    );
    expect(mockAppService.getCurrencies).toHaveBeenCalled();
  });
  it('should render list of currencies when rates$ is populated', () => {
    const mockRates: Rates[] = [
      { currency: 'USD', code: 'USD', mid: 3.8888, bid: 3.88, ask: 3.8976 },
      { currency: 'EUR', code: 'EUR', mid: 4.4591, bid: 4.4482, ask: 4.47 },
    ];
    component.rates$ = of(mockRates);
    fixture.detectChanges();
    const spinnerElement = fixture.nativeElement.querySelector('mat-spinner');
    expect(spinnerElement).toBeFalsy();
    const currencyElements =
      fixture.nativeElement.querySelectorAll('.currency li');
    expect(currencyElements.length).toBe(mockRates.length);
    currencyElements.forEach((element: HTMLElement, index: number) => {
      const rate = mockRates[index];
      const expectedText = `${rate.currency} - ${rate.code} : ${rate.mid} ${component.calculateMid(rate)}`;
      expect(element.textContent).toContain(expectedText);
    });
  });
});
