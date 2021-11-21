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

  public async getStatus() {
    try {
      await axios.get(`${this.apiBaseURL}/auth/msv/session`, {withCredentials: true});
      return true;
    } catch (e) {
      return false;
    }
  }

  async logout() {
    try {
      await axios.delete(`${this.apiBaseURL}/auth/msv/no/logout`, {withCredentials: true});
      await this.router.navigateByUrl('/login');
    } catch (e) {
      throw e;
    }
  }

  async login(username: string, password: string) {
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

}
