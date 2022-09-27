import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {trigger,state,style,animate,transition}from '@angular/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { FormsModule } from '@angular/forms';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';
import { MatDialogModule } from '@angular/material/dialog';

import { ToastrModule } from 'ngx-toastr';
import { AddImageComponent } from './add-image/add-image.component';
import { CallbackFilterPipe } from './pipes/callback-filter.pipe';
import { MyFavouritesComponent } from './my-favourites/my-favourites.component';

const dbConfig: DBConfig  = {
  name: 'MyDb',
  version: 1,
  objectStoresMeta: [{
    store: 'giphy',
    storeConfig: { keyPath: 'id', autoIncrement: false },
    storeSchema: [
      { name: 'id', keypath: 'id', options: { unique: true } },
      { name: 'name', keypath: 'name', options: { unique: false }},
      { name: 'url', keypath: 'url', options: { unique: false }},
      { name: 'date', keypath: 'date', options: { unique: false }},
    ]
  }]
};

@NgModule({
  declarations: [
    AppComponent,
    AddImageComponent,
    CallbackFilterPipe,
    MyFavouritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    InfiniteScrollModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    DragDropModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [DatePipe, CallbackFilterPipe],
  bootstrap: [AppComponent],
  entryComponents: [AddImageComponent],
})
export class AppModule { }
