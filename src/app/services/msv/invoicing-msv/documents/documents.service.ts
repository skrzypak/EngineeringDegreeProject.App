import { Injectable } from '@angular/core';
import {UrlModuleApi} from "../../../../enums/url-module-api";
import {UniversalService} from "../../universal.service";

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  moduleBaseUri = UrlModuleApi.INVOICING_DOCUMENTS;

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

  async fetchGetTypes() {
    let resp = await this.universalService.fetchCustomGet(`${this.moduleBaseUri}/types`);
    return resp.data;
  }

  async fetchGetTypeById(id: number) {
    let resp = await this.universalService.fetchCustomGet(`${this.moduleBaseUri}/types/${id}`);
    return resp.data;
  }

  async fetchCreateType(data: any) {
    let resp = await this.universalService.fetchCustomPost(`${this.moduleBaseUri}/types`, data);
    return resp.data;
  }

  async fetchDeleteType(id: number) {
    let resp = await this.universalService.fetchCustomDelete(`${this.moduleBaseUri}/types/${id}`);
    return resp.data;
  }

  async fetchGetDocumentProducts(documentId: number) {
    let resp = await this.universalService.fetchCustomGet(`${this.moduleBaseUri}/${documentId}/products`);
    return resp.data;
  }

  async fetchGetDocumentProductsById(documentId: number, documentProductId: number) {
    let resp = await this.universalService.fetchCustomGet(`${this.moduleBaseUri}/${documentId}/products/${documentProductId}`);
    return resp.data;
  }

  async fetchCreateDocumentProduct(documentId: number, data: any) {
    let resp = await this.universalService.fetchCustomPost(`${this.moduleBaseUri}/${documentId}/products`, data);
    return resp.data;
  }

  async fetchDeleteDocumentProduct(documentId: number, documentProductId: number) {
    let resp = await this.universalService.fetchCustomDelete(`${this.moduleBaseUri}/${documentId}/products/${documentProductId}`);
    return resp.data;
  }
}
