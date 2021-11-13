import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MessageType} from "../../enums/message-type";
import { GlobalConstants } from '../../common/global-constants';
import axios from "axios";

@Component({
  selector: 'app-log-in-page',
  templateUrl: './log-in-page.component.html',
  styleUrls: ['./log-in-page.component.css']
})
export class LogInPageComponent implements OnInit {

  apiBaseURL = GlobalConstants.apiBaseURL;

  constructor() { }

  ngOnInit(): void {
  }

  message: string = ""
  messageType: MessageType = MessageType.Success;
  btnLoadingOnSubmit: boolean = false

  ngForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  async onSubmit() {

    this.btnLoadingOnSubmit = true;

    try {
      const response = await axios({
        method: 'post',
        url: `${this.apiBaseURL}/auth/msv/no/login`,
        headers: {},
        data: {
          "username": this.ngForm.value.username,
          "password": this.ngForm.value.password
        }
      });

      this.messageType = MessageType.Success;

      if(response.status == 200) {
        this.message = "Established a session"
      }

    } catch (error: any) {

      this.messageType = MessageType.Error;

      if(error.response.status == 401) {
        this.message = error.response.data
      } else {
        this.message = "Unable to establish a session";
      }

    } finally {
      this.btnLoadingOnSubmit = false;
    }
  }

}
