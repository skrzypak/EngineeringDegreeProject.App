import { Component, OnInit } from '@angular/core';
import {InventoryService} from "../../../../services/msv/inventory-msv/inventory.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-warehouse-page',
  templateUrl: './warehouse-page.component.html',
  styleUrls: ['./warehouse-page.component.css']
})
export class WarehousePageComponent implements OnInit {

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
      this.fetched.msv.data = await this.msvService.fetchGetWarehouse();
    } catch (e) {
      console.log(e)
    }
  }

}
