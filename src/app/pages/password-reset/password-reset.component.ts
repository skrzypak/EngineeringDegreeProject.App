import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/msv/auth-msv/auth.service";
import {MessageType} from "../../enums/message-type";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private location: Location,
    private route: ActivatedRoute,) { }

  ngForm = new FormGroup({
    username: new FormControl(''),
    new: new FormControl(''),
    confirm: new FormControl(''),
  });


  message: string = ""
  messageType: MessageType = MessageType.Success;
  btnLoadingOnSubmit: boolean = false

  ngOnInit(): void {
    this.ngForm.patchValue({
      username: this.route.snapshot.paramMap.get('username')
    });
  }

  async onSubmit() {
    this.btnLoadingOnSubmit = true;

    try {
      let resp = await this.authService.fetchPasswordReset(this.ngForm.value)
      this.messageType = MessageType.Success;
      this.message = resp
    } catch (error: any) {
      this.messageType = MessageType.Error;
      this.message = error.msg;
    } finally {
      this.btnLoadingOnSubmit = false;
    }
  }

  navigateBackPage() {
    this.location.back()
  }

}
