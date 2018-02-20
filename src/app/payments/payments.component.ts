import { Component, OnInit } from '@angular/core';
import { ApiService } from '../classes/ApiService';
import { ActivatedRoute, Router } from '@angular/router';

import { PaymentsInfo, Payments } from '../classes/Payments';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  PaymentsInfo: PaymentsInfo;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private ApiService: ApiService) { }

  ngOnInit() {

    this.route.parent.params.subscribe(params => {


      this.ApiService.UpdatePayment(params['symbol']).subscribe((data) => {

        data.subscribe((dt) => {

          this.PaymentsInfo = dt;


        });

      });


    });


  }




}

