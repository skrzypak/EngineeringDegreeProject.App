import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EspService {

  constructor() { }

  setEsp(obj: any) {
    localStorage.setItem("esp", JSON.stringify(obj))
  }

  getEsp() : any {
    let retrievedObject = localStorage.getItem('esp');
    if(retrievedObject !== null) {
      return JSON.parse(retrievedObject)
    } else {
      throw new Error("404");
    }
  }

  getEspId() : string {
    let retrievedObject = localStorage.getItem('esp');
    if(retrievedObject !== null) {
      return JSON.parse(retrievedObject).id
    } else {
      throw new Error("404");
    }
  }
}
