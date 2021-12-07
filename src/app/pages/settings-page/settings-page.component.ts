import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/msv/auth-msv/auth.service";

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {

  result = {
    msg: '',
    code: -1
  }
  @ViewChild('btnUpdate') btnUpdate!: ElementRef;

  ngFrmCtrl: any = {
    frm: FormGroup,
  }

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.ngFrmCtrl.frm = this.fb.group({
      newPassword: new FormControl('',[
          Validators.required,
          Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('',[
        Validators.required,
        Validators.minLength(8),
      ]),
      currentPassword: new FormControl('',[
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  ngOnInit(): void {
  }

  onReset() {
    this.result.msg = '';
    this.result.code = -1;
    this.ngFrmCtrl.frm.reset();
  }

  async onCloseAccount() {
    let isConfirmed = confirm("Are you sure that you want close this account?");
    if(isConfirmed){
      await this.authService.fetchCloseAccount();
    }
  }

  async onUpdate() {
    try {
      this.btnUpdate.nativeElement.classList.add('is-loading')
      const {currentPassword, newPassword, confirmPassword} = this.ngFrmCtrl.frm.value
      this.result.msg = await this.authService.fetchPasswordChange(currentPassword, newPassword, confirmPassword);
      this.result.code = 0;
    } catch (e: any) {
      this.result.msg = e.data;
      this.result.code = 1;
      console.log(e);
    }  finally {
      this.btnUpdate.nativeElement.classList.remove('is-loading')
    }
  }
}
