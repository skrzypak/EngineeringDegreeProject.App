import { Injectable } from '@angular/core';
import {UrlModuleApi} from "../../../../enums/url-module-api";
import {UniversalService} from "../../universal.service";

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  moduleBaseUri = UrlModuleApi.AUTH_PERSONS;

  constructor(private universalService: UniversalService) { }

  public async fetchGetUserDetails() {
    let resp = await this.universalService.fetchCustomGet(`${this.moduleBaseUri}/account`, false);
    return resp.data;
  }

  public async fetchUpdateUserDetails(data: any) {
    let resp = await this.universalService.fetchCustomPut(`${this.moduleBaseUri}/account`, data, false);
    return resp.data;
  }
}
