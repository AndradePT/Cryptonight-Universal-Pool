import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../classes/ApiService';
import { Pools } from '../classes/Pools';


@Component({
  selector: 'app-pool-info',
  templateUrl: './pool-info.component.html',
  styleUrls: ['./pool-info.component.css']
})
export class PoolInfoComponent implements OnInit {



  constructor(private route: ActivatedRoute, private apiSerivce: ApiService) { }

  ngOnInit() {

   /* this.sub = this.route.params.subscribe(param => {
      this.name = param['symbol'];

    });


    this.apiSerivce.getCoininfo(this.name).subscribe(data => {
     // this.pool = data;
      //this.apiStats();
    });*/

  }


 /* findAddres() {

    this.apiSerivce.getAddress(this.pool.url, this.address).subscribe(data => {
      let dt = data.json();

      this.balance = this.coinsConvert(dt['stats'].balance).toString();
      this.paid = this.coinsConvert(dt['stats'].paid).toString();
      this.hashrate = dt['stats'].hashrate;


      for (let pay of Object.keys(dt['payments'])) {


        if (parseInt(pay) % 2 != 0)
          this.payments.push({
            Time: this.dateConver(dt['payments'][pay]).toLocaleDateString(),
            TransactionHash: dt['payments'][parseInt(pay) - 1].split(':')[0].substr(0, 22) + '...',
            Amount: this.coinsConvert(dt['payments'][parseInt(pay) - 1].split(':')[1]),
            Url: this.urlConvertTransactionExplorer(dt['payments'][parseInt(pay) - 1].split(':')[0])
          });
      }

    });*/

  }




