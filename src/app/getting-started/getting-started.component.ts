import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../classes/ApiService';
import { Poolinfo } from '../classes/Poolinfo';
import * as coinmarketcap from 'coinmarketcap';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.css']
})
export class GettingStartedComponent implements OnInit {

  Poolinfo: Poolinfo;
  Url: string;
  price_usd: string = '-';
  price_btc: string = '-';


  constructor(private router: Router,
    private route: ActivatedRoute,
    private ApiService: ApiService) { }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {


      this.ApiService.getCoininfo(params['symbol']).subscribe((data) => {

        this.ApiService.UpdateCoins(data.url).subscribe((dt) => {
          this.Poolinfo = dt;
          this.Url = data.url.replace(':8117','').replace('http://','');

          this.values(dt.Name)
        })

      });


    });
  }

  async values(coin) {
    var t = await coinmarketcap.tickerByAsset(coin);

    this.price_btc = t.price_btc;
    this.price_usd = t.price_usd;

    console.log(t)
  }


}
