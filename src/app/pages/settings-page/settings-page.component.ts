import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {

  ngFrmCtrl: any = {
    frm: FormGroup,
  }

  constructor(private fb: FormBuilder) {
    this.ngFrmCtrl.frm = this.fb.group({
      new: new FormControl(),
      confirm: new FormControl('',[
        Validators.required,
        Validators.minLength(8),
      ]),
      current: new FormControl('',[
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  ngOnInit(): void {
  }

  onReset() {
    this.ngFrmCtrl.frm.reset();
  }

  onCloseAccount() {

  }

  onUpdate() {

  }
}
