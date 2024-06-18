import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  step = 0;

  onStepBack = (): number => (this.step > 0 ? this.step-- : 0);

  onStepForward = (): number => (this.step < 2 ? this.step++ : 0);
}
