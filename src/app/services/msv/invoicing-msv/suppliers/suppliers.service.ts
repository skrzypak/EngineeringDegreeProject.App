import { Injectable } from '@angular/core';
import {UrlModuleApi} from "../../../../enums/url-module-api";
import {UniversalService} from "../../universal.service";

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  moduleBaseUri = UrlModuleApi.INVOICING_SUPPLIERS;

  constructor(private universalService: UniversalService) { }

  async fetchGet(): Promise<Array<any>> {
    let resp = await this.universalService.fetchGet(this.moduleBaseUri);
    return resp.data;
  }

  async fetchGetById(id: number) {
    let resp = await this.universalService.fetchGetById(this.moduleBaseUri, id);
    return resp.data;
  }

  async fetchCreate(data: any) {
    let resp = await this.universalService.fetchPost(this.moduleBaseUri, data);
    return resp.data;
  }

  async fetchDelete(id: number) {
    let resp = await this.universalService.fetchDelete(this.moduleBaseUri, id);
    return resp.data;
  }

  async fetchGetContacts(supplierId: number) {
    let resp = await this.universalService.fetchCustomGet(`${this.moduleBaseUri}/${supplierId}/contacts/all`);
    return resp.data;
  }

  async fetchGetContactById(supplierId: number, id: number) {
    let resp = await this.universalService.fetchCustomGet(`${this.moduleBaseUri}/${supplierId}/contacts/${id}`);
    return resp.data;
  }

  async fetchContactCreate(supplierId: number, data: any) {
    let resp = await this.universalService.fetchCustomPost(`${this.moduleBaseUri}/${supplierId}/contacts`, data);
    return resp.data;
  }

  async fetchContactDelete(supplierId: number, id: any) {
    let resp = await this.universalService.fetchCustomDelete(`${this.moduleBaseUri}/${supplierId}/contacts/${id}`);
    return resp.data;
  }
}
