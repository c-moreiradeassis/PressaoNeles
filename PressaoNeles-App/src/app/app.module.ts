import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppComponent } from './app.component';
import { PartidoComponent } from './partido/partido.component';
import { NavComponent } from './nav/nav.component';
import { DeputadoComponent } from './deputado/deputado.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [	
    AppComponent,
    PartidoComponent,
    NavComponent,
    DeputadoComponent,
    HomeComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({ timeOut: 2000 }),
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.chasingDots
    }),
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
