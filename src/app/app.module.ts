import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BuyorsellComponent } from './buyorsell/buyorsell.component';
import { HttpClientModule } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';

import {MatInputModule} from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    AppComponent,
    BuyorsellComponent
  ],
  imports:
      [ BrowserModule,
         FormsModule,
         MatSnackBarModule,
         ReactiveFormsModule,
         MatCardModule,
         MatSelectModule,
         MatInputModule,
         AgGridModule.withComponents(),
         HttpClientModule,
         BrowserAnimationsModule,
          MatButtonModule, MatToolbarModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
