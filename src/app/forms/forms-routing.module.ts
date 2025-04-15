import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormbuilderComponent } from './formbuilder/formbuilder.component';

const routes: Routes = [
  {
    path: '', component: FormbuilderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
