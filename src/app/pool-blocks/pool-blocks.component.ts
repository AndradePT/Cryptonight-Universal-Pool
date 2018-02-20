import { Component, OnInit } from '@angular/core';

import { ApiService } from '../classes/ApiService';
import { ActivatedRoute, Router } from '@angular/router';

import { PoolBlocks } from '../classes/poolblocks';

@Component({
  selector: 'app-pool-blocks',
  templateUrl: './pool-blocks.component.html',
  styleUrls: ['./pool-blocks.component.css']
})
export class PoolBlocksComponent implements OnInit {

  poolblock: PoolBlocks[] = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private ApiService: ApiService) { }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      this.ApiService.UpdateBlokcs(params['symbol']).subscribe(data => {

        data.subscribe(dt => this.poolblock = dt)

      })
    });
  }






}


