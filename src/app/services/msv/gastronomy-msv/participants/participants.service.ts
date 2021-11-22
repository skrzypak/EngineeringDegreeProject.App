import {Injectable} from '@angular/core';
import {UniversalService} from "../../universal.service";
import {UrlModuleApi} from "../../../../enums/url-module-api";

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {

  moduleBaseUri = UrlModuleApi.GASTRONOMY_PARTICIPANTS;

  constructor(private universalService: UniversalService) { }

  async fetchGetParticipants(): Promise<Array<any>> {
    let resp = await this.universalService.fetchGet(this.moduleBaseUri);
    return resp.data;
  }

  async fetchGetParticipantById(id: number) {
    let resp = await this.universalService.fetchGetById(this.moduleBaseUri, id);
    return resp.data;
  }

  async fetchCreateParticipant(data: any) {
    let resp = await this.universalService.fetchPost(this.moduleBaseUri, data);
    return resp.data;
  }

  async fetchDeleteParticipant(id: number) {
    let resp = await this.universalService.fetchDelete(this.moduleBaseUri, id);
    return resp.data;
  }
}
