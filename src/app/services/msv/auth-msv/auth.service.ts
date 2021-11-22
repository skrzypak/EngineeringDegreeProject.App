import {Injectable} from '@angular/core';
import axios from "axios";
import {GlobalConstants} from "../../../common/global-constants";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiBaseURL = GlobalConstants.apiBaseURL;

  constructor(private router: Router) {
  }

  public async fetchSession() {
    try {
      await axios.get(
        `${this.apiBaseURL}/auth/msv/session`,
        {withCredentials: true});
      return true;
    } catch (e) {
      return false;
    }
  }

  async fetchLogin(username: string, password: string) {
    try {
      await axios.post(`${this.apiBaseURL}/auth/msv/no/login/`, {
        "username": username,
        "password": password
      }, {
        withCredentials: true,
      });
      await this.router.navigateByUrl('/');
    } catch (e: any) {
      let msg;

      switch (e.response.status) {
        case 401:
          msg = e.response.data
          break;
        default:
          msg = "Unable to establish a session"
      }

      throw {
        code: e.response.status,
        msg: msg
      }
    }
  }

  async fetchRegister(data: any) {
    try {
      return await axios({
        method: 'post',
        url: `${this.apiBaseURL}/auth/msv/no/register`,
        headers: {},
        data: {
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
        }
      });
    } catch (e) {
      throw e;
    }
  }

  async fetchRefreshToken() {
    try {
      await axios.post(
        `${this.apiBaseURL}/auth/msv/refresh-token`,
        {},
        {withCredentials: true});
    } catch (e) {
      throw e;
    }
  }

  async fetchPasswordChange(passwords: any) {
    try {
      await axios.patch(
        `${this.apiBaseURL}/auth/msv/change/password`,
        {
          "new": passwords.newPassword,
          "confirm": passwords.confirmPassword,
        },
        {withCredentials: true});
    } catch (e) {
      throw e;
    }
  }

  async fetchPasswordReset(username: string, passwords: any) {
    try {
      await axios.post(
        `${this.apiBaseURL}/auth/msv/no/request/${username}/password-reset`,
        {
          "new": passwords.newPassword,
          "confirm": passwords.confirmPassword,
        },
        {withCredentials: true});
      await this.router.navigateByUrl('/login');
    } catch (e) {
      throw e;
    }
  }

  async fetchLogout() {
    try {
      await axios.delete(
        `${this.apiBaseURL}/auth/msv/no/logout`,
        {withCredentials: true});
      await this.router.navigateByUrl('/login');
    } catch (e) {
      throw e;
    }
  }

  async fetchCloseAccount() {
    try {
      await axios.delete(
        `${this.apiBaseURL}/auth/msv/close-account`,
        {withCredentials: true});
      await this.router.navigateByUrl('/login');
    } catch (e) {
      throw e;
    }
  }

}
