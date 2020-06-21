import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      LoginComponent,
      RegisterComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      RouterModule.forRoot([
         { path: '', component: HomeComponent },
         { path: 'login', component: LoginComponent },
         { path: 'register', component: RegisterComponent },
         { path: 'part', loadChildren: () => import('./modules/part/part.module').then(m => m.PartModule) },
         { path: 'purchase', loadChildren: () => import('./modules/purchase/purchase.module').then(m => m.PurchaseModule) },
      ])
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
