import { Component, OnInit } from '@angular/core';
import {InventoryService} from "../../../../services/msv/inventory-msv/inventory.service";
import {BehaviorSubject} from "rxjs";
import {UnitPackage} from "../../../../classes/unit-package";
import {InventoryOperationType} from "../../../../enums/inventory-operation-type";

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

  unitPackage: UnitPackage = new UnitPackage();
  settle: InventoryOperationType = InventoryOperationType.Settle;
  spoile: InventoryOperationType = InventoryOperationType.Spoile;
  damage: InventoryOperationType = InventoryOperationType.Damage

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

  onSelectCategory(id: number) {

  }

  onSelectItem(inventoryId: number) {

  }

  async onClickOperation(operationType: InventoryOperationType, productId: number, productUnit: number, unitMeasureValue: number, total: number) {
    let value = (<HTMLInputElement>document.getElementById(`${productId}-${productUnit}-${unitMeasureValue}`)).value;

    try {
      let resp = await this.msvService.fetchPatchWarehouseProduct(operationType, productId, unitMeasureValue, Number(value));
      window.location.reload();
    } catch (e) {
      console.log(e);
    }

  }
}
