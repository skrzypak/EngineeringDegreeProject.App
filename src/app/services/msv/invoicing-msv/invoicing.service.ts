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
    let url = `${this.moduleBaseUri}/suppliers-products-summary?`;

    if(query.startDate != null) {
      url += `startDate=${query.startDate}&`;
    }

    if(query.endDate != null) {
      url += `endDate=${query.endDate}&`;
    }

    if(query.suppliersIds != null) {
      query.suppliersIds.forEach((value: number) => {
        url += `suppliersIds=${value}&`;
      })
    }

    if(query.documentTypesIds != null) {
      query.documentTypesIds.forEach((value: number) => {
        url += `documentTypesIds=${value}&`;
      })
    }

    if(query.documentStates != null) {
      query.documentStates.forEach((value: number) => {
        url += `documentStates=${value}&`;
      })
    }

    if(query.productsIds != null) {
      query.productsIds.forEach((value: number) => {
        url += `productsIds=${value}&`;
      })
    }

    let resp = await this.universalService.fetchCustomGet(url);
    return resp.data;
  }

  async fetchGetProductsSummary(query: any): Promise<any> {
    let url = `${this.moduleBaseUri}/products-summary?`;

    if(query.startDate != null) {
      url += `startDate=${query.startDate}&`;
    }

    if(query.endDate != null) {
      url += `endDate=${query.endDate}&`;
    }

    if(query.documentTypesIds != null) {
      query.documentTypesIds.forEach((value: number) => {
        url += `documentTypesIds=${value}&`;
      })
    }

    if(query.documentStates != null) {
      query.documentStates.forEach((value: number) => {
        url += `documentStates=${value}&`;
      })
    }

    if(query.productsIds != null) {
      query.productsIds.forEach((value: number) => {
        url += `productsIds=${value}&`;
      })
    }

    let resp = await this.universalService.fetchCustomGet(url);
    return resp.data;
  }
}
