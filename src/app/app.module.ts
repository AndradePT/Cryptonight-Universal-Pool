import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { ApiService } from '../app/classes/ApiService';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CardCoinComponent, DialogOverviewDialog } from './card-coin/card-coin.component';
import { PoolInfoComponent } from './pool-info/pool-info.component';

import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import {
  MatCardModule,
  MatButtonModule,
  MatListModule,
  MatDividerModule,
  MatTabsModule,
  MatSidenavModule,
  MatDialogModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule


} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RouterLinkWithHref } from '@angular/router/src/directives/router_link';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { WorkerStatsComponent } from './worker-stats/worker-stats.component';
import { PoolBlocksComponent } from './pool-blocks/pool-blocks.component';
import { PaymentsComponent } from './payments/payments.component';


const appRoute = [
  { path: 'home', component: HomeComponent },
  {
    path: 'poolinfo/:symbol', component: PoolInfoComponent, children: [
      { path: 'getting_started', component: GettingStartedComponent },
      { path: 'worker_stats', component: WorkerStatsComponent },
      { path: 'pool_blocks', component: PoolBlocksComponent },
      { path: 'payments', component: PaymentsComponent }
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];


@NgModule({
  declarations: [
    AppComponent,
    CardCoinComponent,
    DialogOverviewDialog,
    PoolInfoComponent,
    HomeComponent,
    GettingStartedComponent,
    WorkerStatsComponent,
    PoolBlocksComponent,
    PaymentsComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoute),
    HttpModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatTabsModule,
    MatSidenavModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule
  ],
  providers: [ApiService, CookieService],
  bootstrap: [AppComponent],
  entryComponents: [DialogOverviewDialog]
})
export class AppModule { }
