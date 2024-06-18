import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit {
  private readonly appService = inject(AppService);

  selectedDate: string;

  ngOnInit(): void {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    this.selectedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    this.onDateChange();
  }

  onDateChange = (): void =>
    this.appService.selectedDateSource$.next(this.selectedDate);
}
