import {Injectable} from '@angular/core';
import {UniversalService} from "../../universal.service";
import {UrlModuleApi} from "../../../../enums/url-module-api";

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {

  moduleBaseUri = UrlModuleApi.GASTRONOMY_PARTICIPANTS;

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

  async fetchUpdate(data: any) {
    let resp = await this.universalService.fetchPut(this.moduleBaseUri, data.id, data);
    return resp.data;
  }
}
