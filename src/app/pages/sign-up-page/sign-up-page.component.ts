import { Component, OnInit } from '@angular/core';
import {GlobalConstants} from "../../common/global-constants";
import {MessageType} from "../../enums/message-type";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import axios from "axios";

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {

  apiBaseURL = GlobalConstants.apiBaseURL;
  message: string = ""
  messageType: MessageType = MessageType.Success;
  btnLoadingOnSubmit: boolean = false

  ngForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(8),
    ]),
    repeatPassword: new FormControl('', [
      Validators.required,
    ]),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    gender: new FormControl(1),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"),
    ]),
    phoneNumber: new FormControl(''),
    phoneNumberPrefix: new FormControl(48),
  });

  get password() { return this.ngForm.get('password'); }
  get repeatPassword() { return this.ngForm.get('repeatPassword'); }

  constructor() { }

  ngOnInit(): void {
  }

  async onSubmit() {
    this.btnLoadingOnSubmit = true;

    try {
      const response = await axios({
        method: 'post',
        url: `${this.apiBaseURL}/auth/msv/no/register`,
        headers: {},
        data: {
          "username": this.ngForm.value.username,
          "password": this.ngForm.value.password,
          "confirmedPassword": this.ngForm.value.repeatPassword,
          "person": {
            "firstName": this.ngForm.value.firstName,
            "lastName": this.ngForm.value.lastName,
            "gender": this.ngForm.value.gender,
            "email": this.ngForm.value.email,
            "phoneNumber": this.ngForm.value.phoneNumber === '' ? '' :
              `+${this.ngForm.value.phoneNumberPrefix}${this.ngForm.value.phoneNumber}`
          }
        }
      });

      this.messageType = MessageType.Success;

      if(response.status == 204) {
        this.message = "Register complete successfully"
      }

    } catch (error: any) {

      this.messageType = MessageType.Error;

      if(error.response.status != 500) {
        this.message = error.response.data
      } else {
        this.message = "Unable complete register";
      }

    } finally {
      this.btnLoadingOnSubmit = false;
    }
  }

}
