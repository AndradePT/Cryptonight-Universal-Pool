import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../app/classes/ApiService';
import {Pools} from '../../app/classes/Pools';
import { Console } from '@angular/core/src/console';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  _poolArray: Pools[];
 
  constructor(private apiSerivce: ApiService) {
  }

  GetApis(): void {
     


 
 
  }

  ngOnInit():void {
    this.apiSerivce.getApis().subscribe((data)=>{
      this._poolArray = data;
    
    });
     
  }
}
