import { Injectable } from '@angular/core';
import {UrlModuleApi} from "../../../enums/url-module-api";
import {UniversalService} from "../universal.service";
import {InventoryOperationType} from "../../../enums/inventory-operation-type";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  moduleBaseUri = UrlModuleApi.INVENTORY_MSV;

  constructor(private universalService: UniversalService) { }

  async fetchGetWarehouse(): Promise<Array<any>> {
    let resp = await this.universalService.fetchGet(this.moduleBaseUri);
    return resp.data;
  }

  async fetchPatchWarehouseProduct(operationType: InventoryOperationType, productId: number, unitMeasureValue: number, quantity: number): Promise<any> {
    let url = `${this.moduleBaseUri}/products/${productId}?operationType=${operationType}&quantity=${quantity}&unitMeasureValue=${unitMeasureValue}`
    let resp = await this.universalService.fetchCustomPatch(url, {});
    return resp.data;
  }

  async fetchGetSummary(startDate: string, endDate: string): Promise<any> {
    let resp = await this.universalService.fetchCustomGet(`${this.moduleBaseUri}/summary?startDate=${startDate}&endDate=${endDate}`);
    return resp.data;
  }
}
