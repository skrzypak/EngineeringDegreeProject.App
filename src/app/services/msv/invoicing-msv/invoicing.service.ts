import { Injectable } from '@angular/core';
import {UrlModuleApi} from "../../../enums/url-module-api";
import {UniversalService} from "../universal.service";

@Injectable({
  providedIn: 'root'
})
export class InvoicingService {

  moduleBaseUri = UrlModuleApi.INVOICING_MSV;

  constructor(private universalService: UniversalService) { }

  async fetchGetSuppliersProductsSummary(query: any): Promise<any> {
    let url = `${this.moduleBaseUri}/suppliers-products-summary?`
    let resp = await this.universalService.fetchCustomGet(url);
    return resp.data;
  }

  async fetchGetProductsSummary(query: any): Promise<any> {
    let url = `${this.moduleBaseUri}/products-summary?`
    let resp = await this.universalService.fetchCustomGet(url);
    return resp.data;
  }
}
