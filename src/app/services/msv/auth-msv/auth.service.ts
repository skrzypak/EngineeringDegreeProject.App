import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {UrlModuleApi} from "../../../enums/url-module-api";
import {UniversalService} from "../universal.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  moduleBaseUri = UrlModuleApi.AUTH_MSV;

  constructor(private router: Router, private universalService: UniversalService) {
  }

  public async fetchSession() : Promise<boolean> {
    try {
      await this.universalService.fetchCustomGet(`${this.moduleBaseUri}/session`, false);
      return true;
    } catch (e) {
      return false;
    }
  }

  async fetchLogin(username: string, password: string) {
    try {
      await this.universalService.fetchCustomPost(`${this.moduleBaseUri}/no/login`, {
        "username": username,
        "password": password
      }, false);
      await this.router.navigateByUrl('/');
    } catch (e: any) {
      throw {
        code: e.status,
        msg: e.status == 401 ? e.data : "Unable to establish a session"
      }
    }
  }

  async fetchRegister(data: any) {
    let resp = await this.universalService.fetchCustomPost(`${this.moduleBaseUri}/no/register`, {
      "username": data.username,
      "password": data.password,
      "confirmedPassword": data.repeatPassword,
      "person": {
        "firstName": data.firstName,
        "lastName": data.lastName,
        "gender": data.gender,
        "email": data.email,
        "phoneNumber": data.phoneNumber === '' ? '' : `+${data.phoneNumberPrefix}${data.phoneNumber}`
      }
    }, false);
    return resp.data;
  }

  async fetchRefreshToken() {
    await this.universalService.fetchCustomPost(`${this.moduleBaseUri}/refresh-token`, {}, false);
  }

  async fetchPasswordChange(currentPassword: string, newPassword: string, confirmPassword: string) {
    let resp = await this.universalService.fetchCustomPatch(`${this.moduleBaseUri}/change/password`, {
      "new": newPassword,
      "confirm": confirmPassword,
      "current": currentPassword,
    }, false);
    return resp.data;
  }

  async fetchPasswordReset(data: any) {
    let resp = await this.universalService.fetchCustomPost(`${this.moduleBaseUri}/no/request/${data.username}/password-reset`,{
      "new": data.new,
      "confirm": data.confirm,
    }, false);
    return resp.data;
  }

  async fetchLogout() {
    await this.universalService.fetchCustomDelete(`${this.moduleBaseUri}/no/logout`,false);
    await this.router.navigateByUrl('/login');
  }

  async fetchCloseAccount() {
    await this.universalService.fetchCustomDelete(`${this.moduleBaseUri}/close-account`, false);
    await this.router.navigateByUrl('/login');
  }

}
