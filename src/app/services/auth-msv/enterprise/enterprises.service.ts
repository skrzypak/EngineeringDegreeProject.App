import {Injectable} from '@angular/core';
import axios from "axios";
import {GlobalConstants} from "../../../common/global-constants";
import {EspService} from "../../common/local-storage/esp.service";

@Injectable({
  providedIn: 'root'
})
export class EnterprisesService {

  apiBaseURL = GlobalConstants.apiBaseURL;

  constructor(private espService: EspService) { }

  async fetchGetEnterprises(): Promise<Array<any>> {
    try {
      let resp = await axios.get(`${this.apiBaseURL}/auth/enterprises`,  {withCredentials: true});
      return resp.data;
    } catch (e: any) {
      if(e.response.status == 404) {
        throw new Error("Not found any data");
      }
      throw new Error("Can't fetch data");
    }
  }

  async fetchGetEnterpriseById(id: number) {
    try {
      let resp = await axios.get(`${this.apiBaseURL}/auth/enterprises/${id}`,  {withCredentials: true});
      return resp.data
    } catch (e: any) {
      throw new Error(`Can't fetch data: ${e}`);
    }
  }

  async fetchCreateEnterprise(data: any) {
    try {
      let resp = await axios.post(`${this.apiBaseURL}/auth/enterprises`, data,{withCredentials: true});
      console.log(resp);
    } catch (e: any) {
      throw new Error(`Can't fetch data: ${e}`);
    }
  }

  async fetchDeleteEnterprise(id: number) {
    try {
      let resp = await axios.delete(`${this.apiBaseURL}/auth/enterprises/${id}`,{withCredentials: true});
      console.log(resp);
      try {
        let currEspActiveId = parseInt(this.espService.getActiveEspId())
        if(currEspActiveId == id){
          localStorage.removeItem("esp")
        }
      } catch (e) {
        localStorage.removeItem("esp")
      }
    } catch (e: any) {
      throw new Error(`Can't fetch data: ${e}`);
    }
  }

}
