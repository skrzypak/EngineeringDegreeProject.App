import { Component, OnInit } from '@angular/core';
import {GlobalConstants} from "../../common/global-constants";
import {MessageType} from "../../enums/message-type";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/msv/auth-msv/auth.service";
import {Router} from "@angular/router";

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

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    this.btnLoadingOnSubmit = true;

    try {
      let resp = await this.authService.fetchRegister(this.ngForm.value);
      this.messageType = MessageType.Success;
      this.message = `Register complete successfully [DEV]: ${this.apiBaseURL}/auth/msv/no/register/confirmation/${resp}`;
      //await this.router.navigateByUrl('/login');
    } catch (error: any) {
      this.messageType = MessageType.Error;
      if(error.status != 500) {
        this.message = error.data
      } else {
        this.message = "Unable complete register";
      }
    } finally {
      this.btnLoadingOnSubmit = false;
    }
  }

}
