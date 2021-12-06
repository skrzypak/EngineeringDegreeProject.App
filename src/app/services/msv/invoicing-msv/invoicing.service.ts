import { Injectable } from '@angular/core';
import {UrlModuleApi} from "../../../enums/url-module-api";
import {UniversalService} from "../universal.service";

@Injectable({
  providedIn: 'root'
})
export class InvoicingService {

  moduleBaseUri = UrlModuleApi.INVOICING_MSV;

  constructor(private universalService: UniversalService) { }

  async fetchGetSummary(): Promise<Array<any>> {
    let resp = await this.universalService.fetchCustomGet(`${this.moduleBaseUri}/summary`);
    return resp.data;
  }
}
