import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnInit {
  private readonly appService = inject(AppService);
  step = 0;

  ngOnInit(): void {
    this.determineTable();
  }

  onStepBack = (): void => {
    this.step > 0 ? this.step-- : 0;
    this.determineTable();
  };
  onStepForward = (): void => {
    this.step <= 1 ? this.step++ : 0;
    this.determineTable();
  };

  private determineTable = () => {
    let table: string;
    !this.step ? (table = 'A') : (table = 'C');   //API table B is not found

    this.appService.selectedTableSource$.next(table);
  };
}
