import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {SuppliersService} from "../../../../../services/msv/purchases-msv/suppliers/suppliers.service";

@Component({
  selector: 'app-suppliers-page',
  templateUrl: './suppliers-page.component.html',
  styleUrls: ['./suppliers-page.component.css']
})
export class SuppliersPageComponent implements OnInit {

  ngFrmCtrl: any = {
    frm: FormGroup,
  }

  fetched: any = {
    suppliers: {
      display: Array<any>(),
      data: Array<any>(),
      rxjs: new BehaviorSubject<number>(0)
    }
  }

  constructor(
    private suppliersService: SuppliersService,
    private fb: FormBuilder,
  ) {
    this.ngFrmCtrl.frm = this.fb.group({
      id: new FormControl(),
      companyName: new FormControl(null,[
        Validators.required,
        Validators.maxLength(300),
      ]),
      nip: new FormControl(null,[
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      code:  new FormControl(null,[
        Validators.maxLength(6),
      ]),
      krs: new FormControl(null,[
        Validators.maxLength(10),
      ]),
      regon: new FormControl(null,[
        Validators.maxLength(9),
      ]),
      description: new FormControl(null,[
        Validators.maxLength(3000),
      ]),
      email: new FormControl(null,[
        Validators.maxLength(100),
      ]),
      phoneNumber: new FormControl(null,[
        Validators.maxLength(12),
      ]),
      streetAddress: new FormControl(null,[
        Validators.maxLength(100),
      ]),
      postalCode: new FormControl(null,[
        Validators.maxLength(6),
      ]),
      city: new FormControl(null,[
        Validators.maxLength(100),
      ]),
      state: new FormControl(null,[
        Validators.maxLength(100),
      ]),
      fax: new FormControl(null,[
        Validators.maxLength(40),
      ]),
      homepage: new FormControl(null,[
        Validators.maxLength(300),
      ]),
      archive: new FormControl(false,[
        Validators.required,
      ]),
    });
  }

  async ngOnInit(): Promise<void> {
    await this.fetch();
  }

  async fetch() {
    try {
      let data = await this.suppliersService.fetchGet();
      //data.forEach((o : any) => o["selected"] = false);
      this.publish(data);
    } catch (e) {
      this.publish([]);
    }
  }

  async onSelect(id: number) {
    try {
      let resp = await this.suppliersService.fetchGetById(id);

      this.ngFrmCtrl.frm.setValue({
        id: resp.id,
        nip: resp.nip,
        code: resp.code,
        companyName: resp.companyName,
        krs: resp.krs,
        regon: resp.regon,
        email: resp.email,
        phoneNumber: resp.phoneNumber,
        streetAddress: resp.streetAddress,
        postalCode: resp.postalCode,
        city: resp.city,
        state: resp.state,
        fax: resp.fax,
        homepage: resp.homepage,
        archive: resp.archive,
        description: resp.description,
      });

    } catch (e) {
      console.log(e)
      this.ngFrmCtrl.frm.reset();
    }
  }

  async onCreate() {
    try {
      let data = this.ngFrmCtrl.frm.value
      delete data.id;
      data.supplierContactPersons = [];
      await this.suppliersService.fetchCreate(data);
      setTimeout( function () {window.location.reload()}, 1500)
      this.onReset()
    } catch (e) {
      console.log(e)
    }
  }

  async onUpdate() {
    try {
      let data = this.ngFrmCtrl.frm.value
      await this.suppliersService.fetchUpdate(data);
      setTimeout( function () {window.location.reload()}, 1500)
      this.onReset()
    } catch (e) {
      console.log(e)
    }
  }

  async onDelete() {
    try {
      await this.suppliersService.fetchDelete(this.ngFrmCtrl.frm.value.id);
      setTimeout( function () {window.location.reload()}, 1500)
    } catch (e) {
      console.log(e)
      this.onReset();
    }
  }

  onReset() {
    this.ngFrmCtrl.frm.reset();
  }

  publish(o: Array<any>) {
    this.fetched.suppliers.data = o;
    this.fetched.suppliers.rxjs.next(o.length);
  }

  subscribeRenderer(e: any) {
    this.fetched.suppliers.display = this.fetched.suppliers.data.slice(e[0], e[1]);
  }

}
