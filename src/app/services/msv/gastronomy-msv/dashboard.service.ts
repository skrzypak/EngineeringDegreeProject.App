import { Injectable } from '@angular/core';
import {UrlModuleApi} from "../../../enums/url-module-api";
import {UniversalService} from "../universal.service";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  moduleBaseUri = UrlModuleApi.GASTRONOMY_MSV;

  constructor(private universalService: UniversalService) { }

  async fetchGetParticipants(queryDate: string): Promise<Array<any>> {
    let resp = await this.universalService.fetchCustomGet(`${this.moduleBaseUri}/list/day/participants?queryDate=${queryDate}`);
    return resp.data;
  }

  async fetchGetGroupPlansMenus(queryDate: string): Promise<Array<any>> {
    let resp = await this.universalService.fetchCustomGet(`${this.moduleBaseUri}/list/day/group-plan-menu?queryDate=${queryDate}`);
    return resp.data;
  }

}
