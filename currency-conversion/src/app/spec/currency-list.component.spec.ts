import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyListComponent } from '../components/currency-list/currency-list.component';

describe('CurrencyListComponent', () => {
  let component: CurrencyListComponent;
  let fixture: ComponentFixture<CurrencyListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CurrencyListComponent]
    });
    fixture = TestBed.createComponent(CurrencyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
