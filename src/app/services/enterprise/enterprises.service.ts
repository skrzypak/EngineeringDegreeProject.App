import { Injectable } from '@angular/core';
import axios from "axios";
import {GlobalConstants} from "../../common/global-constants";

@Injectable({
  providedIn: 'root'
})
export class EnterprisesService {

  apiBaseURL = GlobalConstants.apiBaseURL;

  constructor() { }

  async getEnterprises() {
    try {
      let resp = await axios.get(`${this.apiBaseURL}/auth/enterprises`,  {withCredentials: true});
      return resp.data
    } catch (e: any) {
      if(e.response.status == 404) {
        throw new Error("No found");
      } else {
        throw new Error("Error");
      }
    }

  }

  setActiveEsp(obj: any) {
    localStorage.setItem("esp", JSON.stringify(obj))
  }

  getActiveEsp() : any {
    let retrievedObject = localStorage.getItem('esp');
    if(retrievedObject !== null) {
      return JSON.parse(retrievedObject)
    } else {
      throw new Error("No active esp");
    }
  }

}
