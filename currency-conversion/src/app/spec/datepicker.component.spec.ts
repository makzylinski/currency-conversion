import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AppService } from 'src/app/services/app.service';
import { DatepickerComponent } from '../components/datepicker/datepicker.component';
import { BehaviorSubject } from 'rxjs';

describe('DatepickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;
  let mockAppService: jasmine.SpyObj<AppService>;
  let selectedDateSource$: BehaviorSubject<string>;

  beforeEach(waitForAsync(() => {
    selectedDateSource$ = new BehaviorSubject<string>('');
    mockAppService = jasmine.createSpyObj('AppService', [
      'selectedDateSource$',
    ]);
    mockAppService.selectedDateSource$ = selectedDateSource$;

    TestBed.configureTestingModule({
      declarations: [],
      imports: [FormsModule, DatepickerComponent],
      providers: [{ provide: AppService, useValue: mockAppService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should initialize with yesterday's date and update AppService on init", () => {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    const expectedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    expect(component.selectedDate).toEqual(expectedDate);
    expect(selectedDateSource$.getValue()).toEqual(expectedDate);
  });

  it('should update AppService.selectedDateSource$ on date change', () => {
    const newDate = '2024-06-18';
    const inputElement = fixture.debugElement.query(By.css('input'));
    inputElement.nativeElement.value = newDate;
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button'));
    buttonElement.nativeElement.click();
    fixture.detectChanges();
    expect(selectedDateSource$.getValue()).toEqual(newDate);
  });
});
