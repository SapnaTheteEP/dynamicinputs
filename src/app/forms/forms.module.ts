import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsRoutingModule } from './forms-routing.module';
import { FormbuilderComponent } from './formbuilder/formbuilder.component';
import { SharedModule } from '../shared.module';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [
    FormbuilderComponent
  ],
  imports: [
    CommonModule,
    FormsRoutingModule,
    SharedModule,
    MatRadioModule
  ]
})
export class FormsModule { }
