import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {InventoryService} from "../../../../services/msv/inventory-msv/inventory.service";

@Component({
  selector: 'app-inventory-statistic-page',
  templateUrl: './inventory-statistic-page.component.html',
  styleUrls: ['./inventory-statistic-page.component.css']
})
export class InventoryStatisticPageComponent implements OnInit {

  fetched: any = {
    msv: {
      display: Array<any>(),
      data: Array<any>(),
      rxjs: new BehaviorSubject<number>(0)
    },
  }

  constructor(private msvService: InventoryService) { }

  async ngOnInit(): Promise<void> {
    await this.fetch();
  }


  async fetch() {
    try {
      this.fetched.msv.data = await this.msvService.fetchGetSummary();
    } catch (e) {
      console.log(e)
    }
  }

}
