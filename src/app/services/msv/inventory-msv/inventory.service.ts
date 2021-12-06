import { Injectable } from '@angular/core';
import {UrlModuleApi} from "../../../enums/url-module-api";
import {UniversalService} from "../universal.service";

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

  async fetchGetSummary(): Promise<Array<any>> {
    let resp = await this.universalService.fetchCustomGet(`${this.moduleBaseUri}/summary`);
    return resp.data;
  }
}
