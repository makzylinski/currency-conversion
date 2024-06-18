import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { ConverterComponent } from './components/converter/converter.component';
import { CurrencyListComponent } from './components/currency-list/currency-list.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DatepickerComponent,
    ConverterComponent,
    CurrencyListComponent,
    PaginationComponent,
    MatSnackBarModule,
  ],
})
export class AppModule {}
