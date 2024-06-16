import { Component, OnInit, inject } from '@angular/core';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly appService = inject(AppService);

  ngOnInit(): void {
    this.appService.getExchangeRates('A').subscribe(e => console.log(e))
  }
}
