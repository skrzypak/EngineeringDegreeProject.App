import {Injectable} from '@angular/core';
import {GlobalConstants} from "../../common/global-constants";
import axios from "axios";
import {UrlModuleApi} from "../../enums/url-module-api";
import {EspService} from "../common/local-managments/esp.service";

@Injectable({
  providedIn: 'root'
})
export class UniversalService {

  apiBaseURL = GlobalConstants.apiBaseURL;

  constructor(private espService: EspService) { }

  async fetchPost(uri: UrlModuleApi, data: any) : Promise<any> {
    return await this.fetchCustomPost(uri, data);
  }

  async fetchGet(uri: UrlModuleApi) : Promise<any> {
    return await this.fetchCustomGet(uri)
  }

  async fetchGetById(uri: UrlModuleApi, id: number) : Promise<any> {
    return await this.fetchCustomGet(`${uri}/${id}`);
  }

  async fetchPut(uri: UrlModuleApi, id: number, data: any) : Promise<any> {
    return await this.fetchCustomPut(`${uri}/${id}`, data);
  }

  async fetchPatch(uri: UrlModuleApi, id: number, data: any) : Promise<any> {
    return await this.fetchCustomPatch(`${uri}/${id}`, data);
  }

  async fetchDelete(uri: UrlModuleApi, id: number) : Promise<any> {
    return await this.fetchCustomDelete(`${uri}/${id}`);
  }

  //#######################################################
  //
  //
  //
  //#######################################################

  async fetchCustomPost(path: string, data: any, esp: boolean = true) : Promise<any> {
    let u = this.setupCustomUrl(path, esp);
    try {
      console.log(data)
      let resp = await axios.post(u, data, {withCredentials: true});
      console.log(resp)
      return resp;
    } catch (e: any) {
      console.log(e.response)
      throw e.response;
    }
  }

  async fetchCustomGet(path: string, esp: boolean = true) : Promise<any> {
    let u = this.setupCustomUrl(path, esp);
    try {
      let resp = await axios.get(u, {withCredentials: true});
      console.log(resp)
      return resp;
    } catch (e: any) {
      console.log(e.response)
      throw e.response;
    }
  }

  async fetchCustomPut(path: string, data: any, esp: boolean = true) : Promise<any> {
    let u = this.setupCustomUrl(path, esp);
    try {
      console.log(data)
      let resp = await axios.put(u, data, {withCredentials: true});
      console.log(resp)
      return resp;
    } catch (e: any) {
      console.log(e.response)
      throw e.response;
    }
  }

  async fetchCustomPatch(path: string, data: any, esp: boolean = true) : Promise<any> {
    let u = this.setupCustomUrl(path, esp);
    try {
      console.log(data)
      let resp = await axios.patch(u, data, {withCredentials: true});
      console.log(resp)
      return resp;
    } catch (e: any) {
      console.log(e.response)
      throw e.response;
    }
  }

  async fetchCustomDelete(path: string, esp: boolean = true) : Promise<any> {
    try {
      let u = this.setupCustomUrl(path, esp);
      let resp = await axios.delete(u, {withCredentials: true});
      console.log(resp)
      return resp;
    } catch (e: any) {
      console.log(e.response)
      throw e.response;
    }
  }

  private setupCustomUrl(path:string, esp: boolean): string {
    let u = `${this.apiBaseURL}/${path}`;
    if (esp) {
      let espId = this.espService.getEspId();
      if(!u.includes("?")) {
        u = u + `/?espId=${espId}`
      } else {
        let character = u.charAt(u.length - 1)
        if(character != "&") {
          u = u + `&espId=${espId}`
        } else {
          u = u + `espId=${espId}`
        }
      }
    }
    console.log(u)
    return u;
  }
}
