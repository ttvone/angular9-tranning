import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { PurchaseService } from './services/purchase.service';

@NgModule({
  declarations: [
    HomeComponent
  ],
  providers: [
    PurchaseService
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent },
    ])
  ]
})
export class PurchaseModule { }
