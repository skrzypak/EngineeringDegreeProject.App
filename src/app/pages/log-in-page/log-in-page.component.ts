import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MessageType} from "../../enums/message-type";
import {AuthService} from "../../services/auth-msv/auth/auth.service";

@Component({
  selector: 'app-log-in-page',
  templateUrl: './log-in-page.component.html',
  styleUrls: ['./log-in-page.component.css']
})
export class LogInPageComponent implements OnInit {

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {

  }

  message: string = ""
  messageType: MessageType = MessageType.Success;
  btnLoadingOnSubmit: boolean = false

  ngForm = new FormGroup({
    username: new FormControl('kskrzypczyk'),
    password: new FormControl('administrator'),
  });

  async onSubmit() {
    this.btnLoadingOnSubmit = true;

    try {
      await this.authService.login(this.ngForm.value.username, this.ngForm.value.password)
      this.message = ''
    } catch (error: any) {
      this.messageType = MessageType.Error;
      this.message = error.msg;
    } finally {
      this.btnLoadingOnSubmit = false;
    }
  }

}
