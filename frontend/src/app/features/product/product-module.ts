import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { Product } from './product';


const routes: Routes = [
  { path: '', component: Product }
];

@NgModule({
  declarations: [
    Product
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductModule { }
