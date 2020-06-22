import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { PurchaseService } from './services/purchase.service';
import { CreateComponent } from './components/create/create.component';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    CreateComponent
  ],
  providers: [
    PurchaseService
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent },
      { path: 'create', component: CreateComponent },
      { path: 'update/:id', component: CreateComponent },
    ])
  ]
})
export class PurchaseModule { }
