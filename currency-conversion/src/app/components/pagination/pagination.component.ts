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
  onStepForward = (): number => (this.step < 2 ? this.step++ : 0);

  private determineTable = () => {
    let table;
    switch (this.step) {
      case 0: {
        table = 'A';
        break;
      }
      case 1: {
        table = 'B';
        break;
      }
      case 2: {
        table = 'C';
        break;
      }
      default: {
        table = 'A';
        break;
      }
    }

    this.appService.selectedTableSource$.next(table);
  };
}
