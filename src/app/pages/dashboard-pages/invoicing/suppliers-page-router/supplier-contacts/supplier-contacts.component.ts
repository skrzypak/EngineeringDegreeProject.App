import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {SuppliersService} from "../../../../../services/msv/invoicing-msv/suppliers/suppliers.service";
import {Location} from '@angular/common';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-supplier-contacts',
  templateUrl: './supplier-contacts.component.html',
  styleUrls: ['./supplier-contacts.component.css']
})
export class SupplierContactsComponent implements OnInit {

  ngFrmCtrl: any = {
    frm: FormGroup,
  }

  fetched: any = {
    contacts: {
      display: Array<any>(),
      data: Array<any>(),
      rxjs: new BehaviorSubject<number>(0)
    }
  }

  supplierId: number = 0;

  constructor(
    private suppliersService: SuppliersService,
    private location: Location,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.ngFrmCtrl.frm = this.fb.group({
      id: new FormControl(),
      firstName: new FormControl('',[
        Validators.required,
        Validators.maxLength(300),
      ]),
      lastName: new FormControl('',[
        Validators.required,
        Validators.maxLength(300),
      ]),
      email: new FormControl(null,[
        Validators.maxLength(100),
      ]),
      phoneNumber: new FormControl(null,[
        Validators.maxLength(12),
      ]),
      description: new FormControl(null,[
        Validators.maxLength(3000),
      ]),
    });
  }

  async ngOnInit(): Promise<void> {
    let paramSupplierId = this.route.snapshot.paramMap.get('supplierId')

    try {
      this.supplierId = Number(paramSupplierId);
    } catch (e) {
      this.location.back()
    } finally {
      if(this.supplierId <= 0) {
        this.location.back()
      }
    }

    await this.fetch();
  }

  async fetch() {
    try {
      let data = await this.suppliersService.fetchGetContacts(this.supplierId);
      //data.forEach((o : any) => o["selected"] = false);
      this.publish(data);
    } catch (e) {
      this.publish([]);
    }
  }

  async onSelect(id: number) {
    try {
      let resp = await this.suppliersService.fetchGetContactById(this.supplierId, id);

      this.ngFrmCtrl.frm.setValue({
        id: resp.id,
        firstName: resp.firstName,
        lastName: resp.lastName,
        email: resp.email,
        phoneNumber: resp.phoneNumber,
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
      data.id = await this.suppliersService.fetchContactCreate(this.supplierId, data);
      this.fetched.contacts.data.push(data)
      this.publish(this.fetched.contacts.data);
      this.onReset()
    } catch (e) {
      console.log(e)
    }
  }

  async onUpdate() {
  }

  async onDelete() {
    try {
      let id = this.ngFrmCtrl.frm.value.id;
      await this.suppliersService.fetchContactDelete(this.supplierId, id);
      this.fetched.contacts.data = this.fetched.contacts.data.filter((o: any) => o.id != id);
      this.publish(this.fetched.contacts.data);
    } catch (e) {
      console.log(e)
      this.onReset();
    }
  }

  onReset() {
    this.ngFrmCtrl.frm.reset();
  }

  publish(o: Array<any>) {
    this.fetched.contacts.data = o;
    this.fetched.contacts.rxjs.next(o.length);
  }

  subscribeRenderer(e: any) {
    this.fetched.contacts.display = this.fetched.contacts.data.slice(e[0], e[1]);
  }

  navigateBackPage() {
    this.location.back()
  }
}
