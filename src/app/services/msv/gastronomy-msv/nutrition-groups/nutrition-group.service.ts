import { Injectable } from '@angular/core';
import {UrlModuleApi} from "../../../../enums/url-module-api";
import {UniversalService} from "../../universal.service";

@Injectable({
  providedIn: 'root'
})
export class NutritionGroupService {

  moduleBaseUri = UrlModuleApi.GASTRONOMY_NUTRITION_GROUPS;

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

  async fetchUpdate(id:number, data: any) {
    let resp = await this.universalService.fetchPut(this.moduleBaseUri, id, data);
    return resp.data;
  }
}
