import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AltasRoutingModule } from './altas-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxCaptchaModule } from 'ngx-captcha';
import {FormsModule  , ReactiveFormsModule } from '@angular/forms';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';



@NgModule({
  declarations: [],
  imports: [

    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    AltasRoutingModule,
    NgxSpinnerModule,
    RecaptchaModule,
    RecaptchaFormsModule


    
    
  ]
})
export class AltasModule { }
