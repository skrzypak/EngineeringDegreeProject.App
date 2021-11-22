import { Injectable } from '@angular/core';
import axios from "axios";
import {GlobalConstants} from "../../../../common/global-constants";

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  apiBaseURL = GlobalConstants.apiBaseURL;

  constructor() { }

  public async fetchGetUserDetails() {
    try {
      return await axios.get(
        `${this.apiBaseURL}/auth/person/account`,
        {withCredentials: true});
    } catch (e) {
      throw e;
    }
  }

  public async fetchUpdateUserDetails(data: any) {
    try {
      return await axios.put(
        `${this.apiBaseURL}/auth/person/account`,
        {data},
        {withCredentials: true});
    } catch (e) {
      throw e;
    }
  }
}
