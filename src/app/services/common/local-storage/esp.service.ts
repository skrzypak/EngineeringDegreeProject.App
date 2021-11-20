import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EspService {

  constructor() { }

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

  getActiveEspId() : string {
    let retrievedObject = localStorage.getItem('esp');
    if(retrievedObject !== null) {
      return JSON.parse(retrievedObject).id
    } else {
      throw new Error("No active esp");
    }
  }
}
