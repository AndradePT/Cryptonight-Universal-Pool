import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressPay, AddressInfo } from '../classes/AddressInfo';
import { ApiService } from '../classes/ApiService';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-worker-stats',
  templateUrl: './worker-stats.component.html',
  styleUrls: ['./worker-stats.component.css']
})
export class WorkerStatsComponent implements OnInit {

  AddressInfo: AddressInfo;
  Symbol: string;
  cookieValue = 'UNKNOWN';
  address: string;


  constructor(private router: Router,
    private route: ActivatedRoute,
    private ApiService: ApiService,
    private cookieService: CookieService) { }

  ngOnInit() {






    this.route.parent.params.subscribe(params => {

      this.Symbol = params['symbol'];


      this.cookieValue = this.cookieService.get('Address');
      if (this.cookieValue) {
        this.address = this.cookieValue;
        this.findAddres(this.address);
      }
    });

  }

  findAddres(address) {

    this.cookieService.set('Address', address);



    this.ApiService.getAddress(address, this.Symbol).subscribe((data) => {

      data.subscribe((dt) => {

        this.AddressInfo = dt;

      });

    });
  }





}
