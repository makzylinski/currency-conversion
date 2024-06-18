import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppService } from 'src/app/services/app.service';
import { BehaviorSubject } from 'rxjs';
import { PaginationComponent } from '../components/pagination/pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let mockAppService: jasmine.SpyObj<AppService>;
  let selectedTableSource$ = new BehaviorSubject<string>('A');

  beforeEach(async () => {
    spyOn(selectedTableSource$, 'next');

    mockAppService = jasmine.createSpyObj('AppService', [], {
      selectedTableSource$: selectedTableSource$
    });

    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
      providers: [{ provide: AppService, useValue: mockAppService }]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call determineTable when onStepBack is called', () => {
    const spy = spyOn<any>(component, 'determineTable').and.callThrough();
    component.onStepBack();
    expect(spy).toHaveBeenCalled();
  });

  it('should call determineTable when onStepForward is called', () => {
    const spy = spyOn<any>(component, 'determineTable').and.callThrough();
    component.onStepForward();
    expect(spy).toHaveBeenCalled();
  });

  it('should call appService.selectedTableSource$.next with "A" when step is 0', () => {
    component.step = 1;
    component.onStepBack();
    expect(selectedTableSource$.next).toHaveBeenCalledWith('A');
  });

  it('should call appService.selectedTableSource$.next with "C" when step is 1', () => {
    component.step = 0;
    component.onStepForward();
    expect(selectedTableSource$.next).toHaveBeenCalledWith('C');
  });
});