import {Injectable} from '@angular/core';
import {UrlModuleApi} from "../../../../enums/url-module-api";
import {UniversalService} from "../../universal.service";
import {EspService} from "../../../common/local-managments/esp.service";

@Injectable({
  providedIn: 'root'
})
export class EnterprisesService {

  private fetched: Array<any> = [];

  moduleBaseUri = UrlModuleApi.AUTH_ENTERPRISES;

  constructor(private universalService: UniversalService, private espService: EspService) {
  }

  setupEnterpriseActive(espId: number) {
    if(this.fetched.length > 0) {
      let item = this.fetched.find((o: any) => o.id == espId);
      if (item != null) {
        this.espService.setEsp(item);
      } else {
        throw new Error("ENTERPRISE NOT EXISTS");
      }
    } else {
      throw new Error("404");
    }
  }

  getActiveEnterpriseId() : string {
    if(this.fetched.length > 0) {
      if(!this.checkEspLocalStorage()) {
        // Saved esp not exits - set new
        this.espService.setEsp(this.fetched[0]);
        return this.fetched[0].id;
      } else  {
        return this.espService.getEspId();
      }
    } else {
      throw Error("404");
    }
  }

  checkEspLocalStorage() : boolean {
    if(this.fetched.length > 0) {
      try {
        return this.fetched.some((o: any) => o.id == this.espService.getEspId());
      } catch (e) {
        return false;
      }
    } else {
      return false;
    }
  }

  getLocalEnterprises(): Array<any> {
    return this.fetched;
  }

  getLocalEnterprise(id: number): any {
    return this.fetched.find((o: any) => o.id == id);
  }

  async fetchGet(): Promise<Array<any>> {
    let resp = await this.universalService.fetchCustomGet(this.moduleBaseUri, false);
    this.fetched = resp.data;
    return resp.data;
  }

  async fetchGetById(id: number) {
    let resp = await this.universalService.fetchGetById(this.moduleBaseUri, id);
    return resp.data;
  }

  async fetchGetUsers(enterpriseId: number) {
    let resp = await this.universalService.fetchCustomGet(`${this.moduleBaseUri}/${enterpriseId}/users`);
    return resp.data;
  }

  async fetchCreate(data: any) {
    let resp = await this.universalService.fetchCustomPost(this.moduleBaseUri, data, false);
    return resp.data;
  }

  async fetchUpdate(enterpriseId: number, data: any) {
    let resp = await this.universalService.fetchPut(this.moduleBaseUri, enterpriseId, data);
    return resp.data;
  }

  async fetchAddUser(enterpriseId: number, username: string, email: string) {
    let resp = await this.universalService
      .fetchCustomPatch(`${this.moduleBaseUri}/${enterpriseId}/users/users?username=${username}&email=${email}`, {});
    return resp.data;
  }

  async fetchDelete(id: number) {
    try {
      await this.universalService.fetchDelete(this.moduleBaseUri, id);
      if (parseInt(this.espService.getEspId()) == id) {
        localStorage.removeItem("esp")
      }
    } catch (e: any) {} finally {
      setTimeout( function () {window.location.reload()}, 1500)
    }
  }

  async fetchRemoveUser(id: number, enterpriseUserId: number) {
    let resp = await this.universalService
      .fetchCustomDelete(`${this.moduleBaseUri}/${id}/users?enterpriseUserId=${enterpriseUserId}`);
    return resp.data;
  }

  async fetchLeftYourself(id: number) {
    let resp = await this.universalService
      .fetchCustomDelete(`${this.moduleBaseUri}/${id}/left`);
    return resp.data;
  }

}
