import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {DocumentsService} from "../../../../../services/msv/invoicing-msv/documents/documents.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-document-types',
  templateUrl: './document-types.component.html',
  styleUrls: ['./document-types.component.css']
})
export class DocumentTypesComponent implements OnInit {

  ngFrmCtrl: any = {
    frm: FormGroup,
  }

  fetched: any = {
    types: {
      display: Array<any>(),
      data: Array<any>(),
      rxjs: new BehaviorSubject<number>(0)
    },
  }

  constructor(
    private documentsService: DocumentsService,
    private location: Location,
    private fb: FormBuilder,
  ) {
    this.ngFrmCtrl.frm = this.fb.group({
      id: new FormControl(),
      name: new FormControl('',[
        Validators.required,
        Validators.maxLength(300),
      ]),
      code: new FormControl('',[
        Validators.required,
        Validators.maxLength(6),
      ]),
      description: new FormControl('',[
        Validators.required,
        Validators.maxLength(3000),
      ]),
    });
  }

  async ngOnInit(): Promise<void> {
    await this.fetch();
  }

  async fetch() {
    try {
      let data = await this.documentsService.fetchGetTypes();
      //data.forEach((o : any) => o["selected"] = false);
      this.publish(data);
    } catch (e) {
      this.publish([]);
    }
  }

  async onSelect(id: number) {
    try {
      let resp = await this.documentsService.fetchGetTypeById(id);

      this.ngFrmCtrl.frm.setValue({
        id: resp.id,
        name: resp.name,
        code: resp.code,
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
      data.id = await this.documentsService.fetchCreateType(data);
      this.fetched.types.data.push(data)
      this.publish(this.fetched.types.data);
      this.onReset()
    } catch (e) {
      console.log(e)
    }
  }

  async onUpdate() {
    try {
      let data = this.ngFrmCtrl.frm.value
      await this.documentsService.fetchUpdateType(data);
      let objIndex = this.fetched.types.data.findIndex((obj: any) => obj.id == data.id)
      this.fetched.types.data[objIndex] = data;
      this.publish(this.fetched.types.data);
      this.onReset()
    } catch (e) {
      console.log(e)
    }
  }

  async onDelete() {
    try {
      let id = this.ngFrmCtrl.frm.value.id;
      await this.documentsService.fetchDeleteType(id);
      this.fetched.types.data = this.fetched.types.data.filter((o: any) => o.id != id);
      this.publish(this.fetched.types.data);
      this.onReset();
    } catch (e) {
      console.log(e)
    }
  }

  onReset() {
    this.ngFrmCtrl.frm.reset();
  }

  publish(o: Array<any>) {
    this.fetched.types.data = o;
    this.fetched.types.rxjs.next(o.length);
  }

  subscribeRenderer(e: any) {
    this.fetched.types.display = this.fetched.types.data.slice(e[0], e[1]);
  }

  navigateBackPage() {
    this.location.back()
  }
}
