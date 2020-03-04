import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ClientTableComponent } from './components/client-table/client-table.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';




@NgModule({
  declarations: [
    AppComponent,
    ClientTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatSliderModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,MatButtonModule,
    NgbModule,
    FormsModule,
    MatCardModule,
    MatSnackBarModule

  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
