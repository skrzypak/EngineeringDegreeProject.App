import { Injectable } from '@angular/core';
import {GlobalConstants} from "../../../../common/global-constants";
import {EspService} from "../../../common/local-storage/esp.service";
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class NutritionGroupService {

  apiBaseURL = GlobalConstants.apiBaseURL;

  constructor(private espService: EspService) { }

  async fetchGetNutritionGroups(): Promise<Array<any>> {
    try {
      let espId = this.espService.getActiveEspId();
      let resp = await axios.get(`${this.apiBaseURL}/gastronomy/nutrition-groups?espId=${espId}`,  {withCredentials: true});
      return resp.data;
    } catch (e: any) {
      if(e.response.status == 404) {
        throw new Error("Not found any data");
      }
      throw new Error("Can't fetch data");
    }
  }

  async fetchGetNutritionGroupById(id: number) {
    try {
      let espId = this.espService.getActiveEspId();
      let resp = await axios.get(`${this.apiBaseURL}/gastronomy/nutrition-groups/${id}?espId=${espId}`,  {withCredentials: true});
      return resp.data
    } catch (e: any) {
      throw new Error(`Can't fetch data: ${e}`);
    }
  }

  async fetchCreateNutritionGroup(data: any) {
    try {
      let espId = this.espService.getActiveEspId();
      let resp = await axios.post(`${this.apiBaseURL}/gastronomy/nutrition-groups?espId=${espId}`, data,{withCredentials: true});
      console.log(resp);
    } catch (e: any) {
      throw new Error(`Can't fetch data: ${e}`);
    }
  }

  async fetchDeleteNutritionGroup(id: number) {
    try {
      let espId = this.espService.getActiveEspId();
      await axios.delete(`${this.apiBaseURL}/gastronomy/nutrition-groups/${id}?espId=${espId}`,{withCredentials: true});
    } catch (e: any) {
      throw new Error(`Can't fetch data: ${e}`);
    }
  }
}
