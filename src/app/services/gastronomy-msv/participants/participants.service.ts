import { Injectable } from '@angular/core';
import {GlobalConstants} from "../../../common/global-constants";
import axios from "axios";
import {EspService} from "../../common/local-storage/esp.service";

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {

  apiBaseURL = GlobalConstants.apiBaseURL;

  constructor(private espService: EspService) { }

  async fetchGetParticipants(): Promise<Array<any>> {
    try {
      let espId = this.espService.getActiveEspId();
      let resp = await axios.get(`${this.apiBaseURL}/gastronomy/participants?espId=${espId}`,  {withCredentials: true});
      return resp.data;
    } catch (e: any) {
      if(e.response.status == 404) {
        throw new Error("Not found any data");
      }
      throw new Error("Can't fetch data");
    }
  }

  async fetchGetParticipantById(id: number) {
    try {
      let espId = this.espService.getActiveEspId();
      let resp = await axios.get(`${this.apiBaseURL}/gastronomy/participants/${id}?espId=${espId}`,  {withCredentials: true});
      return resp.data
    } catch (e: any) {
      throw new Error(`Can't fetch data: ${e}`);
    }
  }

  async fetchCreateParticipant(data: any) {
    try {
      let espId = this.espService.getActiveEspId();
      let resp = await axios.post(`${this.apiBaseURL}/gastronomy/participants?espId=${espId}`, data,{withCredentials: true});
      console.log(resp);
    } catch (e: any) {
      throw new Error(`Can't fetch data: ${e}`);
    }
  }

  async fetchDeleteParticipant(id: number) {
    try {
      let espId = this.espService.getActiveEspId();
      await axios.delete(`${this.apiBaseURL}/gastronomy/participants/${id}?espId=${espId}`,{withCredentials: true});
    } catch (e: any) {
      throw new Error(`Can't fetch data: ${e}`);
    }
  }
}
