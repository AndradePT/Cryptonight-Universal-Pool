import { Component, OnInit } from '@angular/core';
import * as coinmarketcap from 'coinmarketcap';

@Component({
  selector: 'app-coin-value',
  templateUrl: './coin-value.component.html',
  styleUrls: ['./coin-value.component.css']
})
export class CoinValueComponent implements OnInit {

  client: any;

  constructor() { }

  async ngOnInit() {

    this.client = await coinmarketcap.ticker({ limit: 10 });

    console.log(this.client)
  }

}
