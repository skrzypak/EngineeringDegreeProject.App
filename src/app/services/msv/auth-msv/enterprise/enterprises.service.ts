import {Injectable} from '@angular/core';
import axios from "axios";
import {GlobalConstants} from "../../../../common/global-constants";
import {EspService} from "../../../common/local-storage/esp.service";

@Injectable({
  providedIn: 'root'
})
export class EnterprisesService {

  apiBaseURL = GlobalConstants.apiBaseURL;

  constructor(private espService: EspService) {
  }

  async fetchGetEnterprises(): Promise<Array<any>> {
    try {
      let resp = await axios.get(
        `${this.apiBaseURL}/auth/enterprises`,
        {withCredentials: true});
      return resp.data;
    } catch (e: any) {
      if (e.response.status == 404) {
        throw new Error("Not found any data");
      }
      throw new Error("Can't fetch data");
    }
  }

  async fetchGetEnterpriseById(id: number) {
    try {
      let resp = await axios.get(
        `${this.apiBaseURL}/auth/enterprises/${id}`,
        {withCredentials: true});
      return resp.data
    } catch (e: any) {
      throw new Error(`Can't fetch data: ${e}`);
    }
  }

  async fetchGetEnterpriseUsers(enterpriseId: number) {
    try {
      let resp = await axios.get(
        `${this.apiBaseURL}/auth/enterprises/${enterpriseId}/users`,
        {withCredentials: true});
      return resp.data
    } catch (e: any) {
      throw new Error(`Can't fetch data: ${e}`);
    }
  }

  async fetchCreateEnterprise(data: any) {
    try {
      let resp = await axios.post(
        `${this.apiBaseURL}/auth/enterprises`,
        data,
        {withCredentials: true});
    } catch (e: any) {
      throw new Error(`Can't fetch data: ${e}`);
    }
  }

  async fetchUpdateEnterprise(enterpriseId: number, data: any) {
    try {
      let resp = await axios.put(
        `${this.apiBaseURL}/auth/enterprises/${enterpriseId}`,
        data,
        {withCredentials: true});
    } catch (e: any) {
      throw new Error(`Can't fetch data: ${e}`);
    }
  }

  async fetchAddEnterpriseUser(enterpriseId: number, username: string, email: string) {
    try {
      let resp = await axios.patch(
        `${this.apiBaseURL}/auth/enterprises/${enterpriseId}/users/users?username=${username}&email=${email}`,
        {},
        {withCredentials: true});
    } catch (e: any) {
      throw new Error(`Can't fetch data: ${e}`);
    }
  }

  async fetchDeleteEnterprise(id: number) {
    try {
      let resp = await axios.delete(
        `${this.apiBaseURL}/auth/enterprises/${id}`,
        {withCredentials: true});
      try {
        let currEspActiveId = parseInt(this.espService.getActiveEspId())
        if (currEspActiveId == id) {
          localStorage.removeItem("esp")
        }
      } catch (e) {
        localStorage.removeItem("esp")
      }
    } catch (e: any) {
      throw new Error(`Can't fetch data: ${e}`);
    }
  }

  async fetchRemoveEnterpriseUser(id: number, enterpriseUserId: number) {
    try {
      await axios.delete(
      `${this.apiBaseURL}/auth/enterprises/${id}/users?enterpriseUserId=${enterpriseUserId}`,
      {withCredentials: true});
    } catch (e: any) {
      throw new Error(`Can't fetch data: ${e}`);
    }
  }

  async fetchLeftFromEnterprise(id: number) {
    try {
      await axios.delete(
      `${this.apiBaseURL}/auth/enterprises/${id}/left`,
      {withCredentials: true});
    } catch (e: any) {
      throw new Error(`Can't fetch data: ${e}`);
    }
  }

}
