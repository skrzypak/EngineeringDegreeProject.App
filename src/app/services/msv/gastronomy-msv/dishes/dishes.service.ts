import { Injectable } from '@angular/core';
import {UniversalService} from "../../universal.service";
import {UrlModuleApi} from "../../../../enums/url-module-api";

@Injectable({
  providedIn: 'root'
})
export class DishesService {

  moduleBaseUri = UrlModuleApi.GASTRONOMY_DISHES;

  constructor(private universalService: UniversalService) { }

  async fetchGetDishes(): Promise<Array<any>> {
    let resp = await this.universalService.fetchGet(this.moduleBaseUri);
    return resp.data;
  }

  async fetchGetDishById(id: number) {
    let resp = await this.universalService.fetchGetById(this.moduleBaseUri, id);
    return resp.data;
  }

  async fetchCreateDish(data: any) {
    let resp = await this.universalService.fetchPost(this.moduleBaseUri, data);
    return resp.data;
  }

  async fetchDeleteDish(id: number) {
    let resp = await this.universalService.fetchDelete(this.moduleBaseUri, id);
    return resp.data;
  }
}
