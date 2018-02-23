import { Component, OnInit, Input, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from '../../app/classes/ApiService';
import { Observable } from 'rxjs/Observable';
import { Pools } from '../classes/Pools';
import { Ports, Poolinfo } from '../classes/Poolinfo';
import * as coinmarketcap from 'coinmarketcap';
import {Subscription} from "rxjs";


@Component({
  selector: 'app-card-coin',
  templateUrl: './card-coin.component.html',
  styleUrls: ['./card-coin.component.css']
})
export class CardCoinComponent implements OnInit, OnDestroy {
  @Input() configPool: Pools;



  Poolinfo: any;
  price_usd: string = '-';
  price_btc: string = '-';
  timerSub: any;
  subscription: Subscription;


  constructor(private apiSerivce: ApiService, public dialog: MatDialog) {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

    
  }

  ngOnInit() {

    this.UpdateCard();

    let timer = Observable.interval(15000);
    this.subscription = timer.subscribe(t => {
      this.UpdateCard()
    });

    

  }

  UpdateCard(): any {
    this.apiSerivce.UpdateCoins(this.configPool.url).subscribe((data) => {

      this.Poolinfo = data;

      this.values(data.pool.Name)

    });
  }


  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewDialog, {
      width: '600px',
      data: { port: this.Poolinfo.pool.ports, url: this.configPool.conn }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
    });
  }


  async values(coin) {

    try {



      var client = await coinmarketcap.tickerByAsset(coin);

      if (!client.error) {
        this.price_btc = client.price_btc;
        this.price_usd = client.price_usd;

      }
    }
    catch (e) {
      if (e instanceof RangeError) {
        console.log('out of range');
      }
    }



  }


}


@Component({
  selector: 'dialog-overview-dialog',
  templateUrl: './dialog-overview-dialog.html',
  styleUrls: ['./dialog-overview-dialog.css']
})
export class DialogOverviewDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Ports) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}




