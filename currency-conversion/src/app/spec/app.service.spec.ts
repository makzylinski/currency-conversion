import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from '../services/app.service';
import { Rates } from '../models/rates.interface';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppService', () => {
  let service: AppService;
  let httpMock: HttpTestingController;
  let matSnackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatSnackBarModule
      ],
      providers: [
        AppService,
        MatSnackBar
      ]
    });

    service = TestBed.inject(AppService);
    httpMock = TestBed.inject(HttpTestingController);
    matSnackBar = TestBed.inject(MatSnackBar);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getExchangeRates', () => {
    const mockRatesResponse = {
      rates: [
        {
          currency: 'dolar amerykański',
          code: 'USD',
          mid: 3.8888,
          bid: 3.8800,
          ask: 3.8976
        },
      ]
    };

    it('should fetch exchange rates correctly', () => {
      const mockTable = 'A';
      const mockDate = '2024-06-19';

      service.getExchangeRates(mockTable, mockDate).subscribe((rates) => {
        expect(rates).toEqual(mockRatesResponse.rates);
      });

      const request = httpMock.expectOne(`${service['baseURL']}exchangerates/tables/${mockTable}/${mockDate}`);
      expect(request.request.method).toBe('GET');

      request.flush(mockRatesResponse);
    });

    it('should update currenciesDateSource$ with fetched rates', () => {
      const mockTable = 'A';
      const mockDate = '2024-06-19';

      service.getExchangeRates(mockTable, mockDate).subscribe(() => {
        expect(service['currenciesDateSource$'].getValue()).toEqual(mockRatesResponse.rates);
      });

      const request = httpMock.expectOne(`${service['baseURL']}exchangerates/tables/${mockTable}/${mockDate}`);
      request.flush(mockRatesResponse);
    });

    it('should handle HTTP errors', () => {
      const mockTable = 'A';
      const mockDate = '2024-06-19';
      const errorMessage = 'HTTP Error occurred';

      spyOn(matSnackBar, 'open');

      service.getExchangeRates(mockTable, mockDate).subscribe(() => {
        fail('Expected error handling');
      }, (error) => {
        expect(error.message).toBe(errorMessage);
        expect(matSnackBar.open).toHaveBeenCalledWith(errorMessage, 'Error');
      });

      const request = httpMock.expectOne(`${service['baseURL']}exchangerates/tables/${mockTable}/${mockDate}`);
      request.error(new ErrorEvent('network error', {
        message: errorMessage,
      }));
    });

    it('should return EMPTY on HTTP error', () => {
      const mockTable = 'A';
      const mockDate = '2024-06-19';

      service.getExchangeRates(mockTable, mockDate).subscribe((rates) => {
        expect(rates).toEqual([]);
      });

      const request = httpMock.expectOne(`${service['baseURL']}exchangerates/tables/${mockTable}/${mockDate}`);
      request.error(new ErrorEvent('network error'));
    });
  });

  describe('getCurrencies', () => {
    it('should return currenciesDateSource$', () => {
      const mockRates: Rates[] = [
        { currency: 'dolar amerykański', code: 'USD', mid: 3.8888, bid: 3.8800, ask: 3.8976 },
      ];

      service['currenciesDateSource$'].next(mockRates);

      service.getCurrencies().subscribe((rates) => {
        expect(rates).toEqual(mockRates);
      });
    });
  });
});